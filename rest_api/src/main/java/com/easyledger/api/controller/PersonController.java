package com.easyledger.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.PasswordChangeFormDTO;
import com.easyledger.api.dto.PersonInRosterDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.security.UserPrincipal;
import com.easyledger.api.service.PersonService;

@RestController
@RequestMapping("/${app.apiVersion}")
public class PersonController {
	private PersonRepository personRepo;
	private PersonService personService;
	private AuthorizationService authorizationService;


	public PersonController(PersonRepository personRepo, PersonService personService, AuthorizationService authorizationService) {
		super();
		this.personRepo = personRepo;
		this.personService = personService;
		this.authorizationService = authorizationService;
	}

	@Secured("ROLE_ADMIN")
	@GetMapping("/person")
    public List<Person> getAllPersons() {
        List<Person> persons = personRepo.findAll();
        return persons;
    }

	
	@PreAuthorize("#personId == principal.getId()")
    @GetMapping("/person/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable(value = "id") Long personId)
        throws ResourceNotFoundException {
    	Person person = personRepo.findById(personId)
    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId)); 
    	return ResponseEntity.ok().body(person);
    }
	
    //TODO allow client to update roles?
    @PreAuthorize("#id == principal.getId()")
    @PatchMapping("/person/{id}")
    public ResponseEntity<Person> patchPerson(@PathVariable(value = "id") Long id, @RequestBody Map<Object, Object> fields) 
    	throws ConflictException, ResourceNotFoundException {
        Person person = personRepo.findById(id)
        	.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + id));
        
        personService.updatePerson(person, fields);
        
    	final Person updatedPerson = personRepo.save(person);
    	return ResponseEntity.ok(updatedPerson);
    }
    
    @PatchMapping("/person/password")
    public Map<String, Boolean> updatePassword(@RequestBody PasswordChangeFormDTO dto, Authentication authentication) throws ConflictException, ResourceNotFoundException {
    	personService.updatePassword(dto, (UserPrincipal) authentication.getPrincipal());
        Map<String, Boolean> response = new HashMap<>();
        response.put("updated", Boolean.TRUE);
        return response;
    }
    
    @GetMapping("/organization/{organizationId}/person")
    public List<PersonInRosterDTO> getAllPersonsInOrganization(@PathVariable(value = "organizationId") Long organizationId, Authentication authentication) 
    		throws UnauthorizedException {
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
    	return personRepo.getAllPersonsInOrganization(organizationId);
    }
    
 /*   @DeleteMapping("/person/{id}")
    public Map<String, Boolean> deletePerson(@PathVariable(value = "id") Long personId)
        throws ResourceNotFoundException, ConflictException {
        Person person = personRepo.findById(personId)
        	.orElseThrow(() -> new ResourceNotFoundException("person not found for this id :: " + personId));

        personRepo.delete(person);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
*/
}

