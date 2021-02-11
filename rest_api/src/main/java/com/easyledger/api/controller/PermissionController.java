package com.easyledger.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Permission;
import com.easyledger.api.model.PermissionType;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PermissionRepository;
import com.easyledger.api.repository.PermissionTypeRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.security.AuthorizationService;

@RestController
@RequestMapping("/v0.2")
public class PermissionController {
	private PermissionRepository permissionRepo;
	private PermissionTypeRepository permissionTypeRepo;
	private OrganizationRepository organizationRepo;
	private PersonRepository personRepo;
	private AuthorizationService authorizationService;
	
	public PermissionController(PermissionRepository permissionRepo, PermissionTypeRepository permissionTypeRepo,
			OrganizationRepository organizationRepo, PersonRepository personRepo,
			AuthorizationService authorizationService) {
		super();
		this.permissionRepo = permissionRepo;
		this.permissionTypeRepo = permissionTypeRepo;
		this.organizationRepo = organizationRepo;
		this.personRepo = personRepo;
		this.authorizationService = authorizationService;
	}
	
	@PostMapping("/organization/{organizationId}/permission")
    @ResponseStatus(HttpStatus.CREATED)
    public Permission createPermission(@PathVariable(value = "organizationId") Long organizationId, 
    		@Valid @RequestBody PersonInRosterDTO dto, Authentication authentication) throws ResourceNotFoundException, UnauthorizedException {
    	if (dto.getPermissionTypeId() >= 3) {
    		authorizationService.authorizeOwnPermissionsByOrganizationId(authentication, organizationId);
    	} else {
    		authorizationService.authorizeAdminPermissionsByOrganizationId(authentication, organizationId);
    	}
     	
    	Permission permission = new Permission();
    	
    	Person person = personRepo.findByEmail(dto.getEmail())
    			.orElseThrow(() -> new ResourceNotFoundException("Person not found for this email: " + dto.getEmail()));

    	Organization organization = organizationRepo.findById(organizationId)
    			.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id: " + organizationId));

    	PermissionType permissionType = permissionTypeRepo.findById(dto.getPermissionTypeId())
    			.orElseThrow(() -> new ResourceNotFoundException("PermissionType not found for this id: " + dto.getPermissionTypeId()));
    	
    	permission.setPerson(person);
    	permission.setOrganization(organization);
    	permission.setPermissionType(permissionType);
    	
    	return permissionRepo.save(permission);
    }
    
	@PatchMapping("/permission/{permissionId}")
	public Permission editPermission(@PathVariable(value = "permissionId") Long permissionId, @Valid @RequestBody PersonInRosterDTO dto, 
			Authentication authentication) throws ResourceNotFoundException, UnauthorizedException {
		Permission permission = permissionRepo.findById(permissionId)
				.orElseThrow(() -> new ResourceNotFoundException("Permission object not found for this id: " + permissionId));
		
		Long organizationId = permission.getOrganization().getId();
		authorizationService.assertHigherPermissionType(authentication, organizationId, permission.getPermissionType().getId());
		if (dto.getPermissionTypeId() >= 3) {
			authorizationService.authorizeOwnPermissionsByOrganizationId(authentication, organizationId);
		} else {
			authorizationService.authorizeAdminPermissionsByOrganizationId(authentication, organizationId);
		}
		
		PermissionType permissionType = permissionTypeRepo.findById(dto.getPermissionTypeId())
				.orElseThrow(() -> new ResourceNotFoundException("PermissionType not found for this id: " + dto.getPermissionTypeId()));
		permission.setPermissionType(permissionType);
		return permissionRepo.save(permission);
	}
	
    @DeleteMapping("/permission/{permissionId}")
    public Map<String, Boolean> deletePermission(@PathVariable(value = "permissionId") Long permissionId, Authentication authentication)
        throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	Permission permission = permissionRepo.findById(permissionId)
				.orElseThrow(() -> new ResourceNotFoundException("Permission object not found for this id: " + permissionId));
    	authorizationService.assertHigherPermissionType(authentication, permission.getOrganization().getId(), permission.getPermissionType().getId());
    	permissionRepo.delete(permission);
    	
    	Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

}
