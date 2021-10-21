package com.easyledger.api.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.DateRangeDTO;
import com.easyledger.api.dto.MonthlyNetAssetsDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Permission;
import com.easyledger.api.model.PermissionType;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PermissionRepository;
import com.easyledger.api.repository.PermissionTypeRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.security.UserPrincipal;
import com.easyledger.api.service.OrganizationService;
import com.easyledger.api.service.PersonService;

@RestController
@RequestMapping("/${app.apiVersion}")
public class OrganizationController {
	
	private OrganizationRepository organizationRepo;
	private PersonRepository personRepo;
	private PersonService personService;
	private AuthorizationService authorizationService;
	private PermissionRepository permissionRepo;
	private PermissionTypeRepository permissionTypeRepo;
	private OrganizationService organizationService;

	public OrganizationController(OrganizationRepository organizationRepo, PersonRepository personRepo,
			PersonService personService, PermissionRepository permissionRepo, PermissionTypeRepository permissionTypeRepo, 
			AuthorizationService authorizationService, OrganizationService organizationService) {
		super();
		this.organizationRepo = organizationRepo;
		this.personRepo = personRepo;
		this.authorizationService = authorizationService;
		this.personService = personService;
		this.permissionRepo = permissionRepo;
		this.permissionTypeRepo = permissionTypeRepo;
		this.organizationService = organizationService;
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/organization")
	public List<Organization> getAllOrganizations(){
		return organizationRepo.findAll();
	}

	@GetMapping("/organization/{id}")
	public ResponseEntity<Organization> getOrganizationById(@PathVariable(value = "id") Long organizationId, Authentication authentication) 
		throws ResourceNotFoundException, UnauthorizedException {
		Organization organization = organizationRepo.findById(organizationId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return ResponseEntity.ok(organization);
	}
	
	/* @GetMapping("/organization/{id}/person")
	public HashSet<Person> getPersonsInOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication) 
		throws ResourceNotFoundException, UnauthorizedException{
		Organization organization = organizationRepo.findById(organizationId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId)); 
		authorizationService.authorizeByOrganizationId(authentication, organizationId);
		HashSet<Person> persons = new HashSet<Person>(organization.getPersons());
		return persons;
	} */
	
	@PostMapping("/organization")
    @ResponseStatus(HttpStatus.CREATED)
	public Organization createOrganization(@Valid @RequestBody Organization organization, Authentication authentication)
		throws ConflictException, ResourceNotFoundException {
		if (organization.getId() != null) {
			throw new ConflictException("Please do not attempt to manually create an organization id.");
		}
		Organization savedOrganization = organizationRepo.save(organization);
		
		Person currentUser = personRepo.findById(((UserPrincipal) authentication.getPrincipal()).getId())
				.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + ((UserPrincipal) authentication.getPrincipal()).getId()));
		personService.autoPopulateOrganization(savedOrganization, currentUser.getLocale());
		currentUser.setCurrentOrganizationId(savedOrganization.getId());
		personRepo.save(currentUser);
		
		PermissionType own = permissionTypeRepo.findByName("OWN")
				.orElseThrow(() -> new ResourceNotFoundException("OWN is not a valid permission type."));
		
		Permission permission = new Permission();
		permission.setPerson(currentUser);
		permission.setOrganization(savedOrganization);
		permission.setPermissionType(own);
		permissionRepo.save(permission);
		
		return savedOrganization;
	}
	
	@PutMapping("/organization/{id}")
	public Organization updateOrganization(@PathVariable(value = "id") Long organizationId, 
					@Valid @RequestBody Organization organization, Authentication authentication)
					throws ConflictException, ResourceNotFoundException, UnauthorizedException {
		if (!organization.getId().equals(organizationId)) {
			throw new ConflictException("Organization ID in request body does not match URI.");
		}
		authorizationService.authorizeAdminPermissionsByOrganizationId(authentication, organizationId);
		Organization oldOrganization = organizationRepo.findById(organizationId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		oldOrganization.setName(organization.getName()); //only allow users to change the name and fiscal year field
		oldOrganization.setFiscalYearBegin(organization.getFiscalYearBegin());
		return organizationRepo.save(oldOrganization);
	}
	
	@GetMapping("/organization/{organizationId}/monthlyNetAssets/{numberOfMonths}")
	public List<MonthlyNetAssetsDTO> getMonthlyNetAssetsDTOsForOrganization(@PathVariable(value = "organizationId") Long organizationId, 
			@PathVariable(value="numberOfMonths") int numberOfMonths, Authentication authentication) throws UnauthorizedException {
    	//check authorization
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
    	return organizationService.getMonthlyNetAssetsDTOsForOrganization(organizationId, numberOfMonths);
	}
		
	@GetMapping("/organization/{organizationId}/dateRangePresetsUpToDate/{endDate}")
	public List<DateRangeDTO> getDateRangePresetsForOrganizationUpToDate(@PathVariable(value = "organizationId") Long organizationId, 
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) 
			throws UnauthorizedException, ResourceNotFoundException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return organizationService.getDateRangePresetsForOrganizationUpToDate(organizationId, endDate);
	}
	
    @DeleteMapping("/organization/{id}")
    public Map<String, Boolean> deleteAccountSubtype(@PathVariable(value = "id") Long organizationId, Authentication authentication)
        throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	authorizationService.authorizeOwnPermissionsByOrganizationId(authentication, organizationId);
        Organization organization = organizationRepo.findById(organizationId)
        	.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
        if (organizationRepo.organizationContainsJournalEntries(organizationId)) {
        	throw new ConflictException("Organization contains undeleted journal entries!");
        }
        organizationRepo.delete(organization);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE); 
        return response; 
    }

	
}
