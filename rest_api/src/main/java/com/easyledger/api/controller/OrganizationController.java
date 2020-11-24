package com.easyledger.api.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.JournalEntryDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.OrganizationRepository;

@RestController
@RequestMapping("/v0.1")
public class OrganizationController {
	
	private OrganizationRepository organizationRepo;

	public OrganizationController(OrganizationRepository organizationRepo) {
		super();
		this.organizationRepo = organizationRepo;
	}
	
	@Secured("ROLE_ADMIN")
	@GetMapping("/organization")
	public List<Organization> getAllOrganizations(){
		return organizationRepo.findAll();
	}

	@GetMapping("/organization/{id}")
	public ResponseEntity<Organization> getOrganizationById(@PathVariable(value = "id") Long organizationId) 
		throws ResourceNotFoundException {
		Organization organization = organizationRepo.findById(organizationId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId)); 
		return ResponseEntity.ok(organization);
	}
	
	@GetMapping("/organization/{id}/person")
	public HashSet<Person> getPersonsInOrganization(@PathVariable(value = "id") Long organizationId) 
		throws ResourceNotFoundException{
		Organization organization = organizationRepo.findById(organizationId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId)); 
		HashSet<Person> persons = new HashSet<Person>(organization.getPersons());
		return persons;
	}
	
	@PostMapping("/organization")
    @ResponseStatus(HttpStatus.CREATED)
	public Organization createOrganization(@Valid @RequestBody Organization organization)
		throws ConflictException {
		if (organization.getId() != null) {
			throw new ConflictException("Please do not attempt to manually create an organization id.");
		}
		return organizationRepo.save(organization);
	}
	
	@PutMapping("/organization/{id}")
	public Organization updateOrganization(@PathVariable(value = "id") Long organizationId, 
			@Valid @RequestBody Organization organization) throws ConflictException, ResourceNotFoundException {
		if (!organization.getId().equals(organizationId)) {
			throw new ConflictException("Organization ID in request body does not match URI.");
		}
		organizationRepo.findById(organizationId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId)); 
		return organizationRepo.save(organization);
	}
	
/*    @DeleteMapping("/organization/{id}")
    @Transactional(rollbackFor=Exception.class)
    public Map<String, Boolean> deleteAccountSubtype(@PathVariable(value = "id") Long organizationId)
        throws ResourceNotFoundException, ConflictException {
        Organization organization = organizationRepo.findById(organizationId)
        	.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));

        if (!organization.getJournalEntries().isEmpty()) {
        	throw new ConflictException("Please remove all Entries from this Organization before deleting the Organization.");
        }
        
        HashSet<Person> persons = new HashSet<Person>(organization.getPersons());
        for (Person person : persons) {
        	person.removeOrganization(organization);
        }
        
        organizationRepo.delete(organization);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
*/
	
}
