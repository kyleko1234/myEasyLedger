package com.easyledger.api.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.PersonInRosterDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Permission;
import com.easyledger.api.model.PermissionType;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.VerificationToken;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PermissionRepository;
import com.easyledger.api.repository.PermissionTypeRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.PersonService;

@RestController
@RequestMapping("/${app.apiVersion}")
public class InvitationController {
	private AuthorizationService authorizationService;
	private PermissionRepository permissionRepo;
	private OrganizationRepository organizationRepo;
	private PermissionTypeRepository permissionTypeRepo;
	private PersonService personService;
	private PersonRepository personRepo;

	public InvitationController(AuthorizationService authorizationService, PermissionRepository permissionRepo,
			OrganizationRepository organizationRepo, PermissionTypeRepository permissionTypeRepo, PersonService personService,
			PersonRepository personRepo) {
		super();
		this.authorizationService = authorizationService;
		this.permissionRepo = permissionRepo;
		this.organizationRepo = organizationRepo;
		this.permissionTypeRepo = permissionTypeRepo;
		this.personService = personService;
		this.personRepo = personRepo;
	}

	@PostMapping("/organization/{organizationId}/invitation")
    @ResponseStatus(HttpStatus.CREATED)
    public Permission inviteUserByEmail(@PathVariable(value = "organizationId") Long organizationId, 
    		@Valid @RequestBody PersonInRosterDTO dto, Authentication authentication) throws ResourceNotFoundException, UnauthorizedException, ConflictException {
    	if (dto.getPermissionTypeId() >= 3) {
    		authorizationService.authorizeOwnPermissionsByOrganizationId(authentication, organizationId);
    	} else {
    		authorizationService.authorizeAdminPermissionsByOrganizationId(authentication, organizationId);
    	}
    	Organization organization = organizationRepo.findById(organizationId)
    			.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id: " + organizationId));
    	PermissionType permissionType = permissionTypeRepo.findById(dto.getPermissionTypeId())
    			.orElseThrow(() -> new ResourceNotFoundException("PermissionType not found for this id: " + dto.getPermissionTypeId()));

    	VerificationToken verificationToken = personService.createInvitedPerson(dto.getEmail(), dto.getLocale()); //although we use a VerificationToken with a default expiry we will probably ignore the expiry when verifying user.
    	Person createdPerson = personRepo.findByEmail(dto.getEmail())
    			.orElseThrow(() -> new ResourceNotFoundException("Person not found for this email: " + dto.getEmail()));
    	
    	Permission permission = new Permission();
    	permission.setPerson(createdPerson);
    	permission.setOrganization(organization);
    	permission.setPermissionType(permissionType);
    	
    	return permissionRepo.save(permission);
    	//emailDispatchService.sendInvitationEmail

    }
	
}
