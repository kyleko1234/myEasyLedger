package com.easyledger.api.controller;

import java.util.List;
import java.util.Map;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.service.PersonService;

@RestController
@RequestMapping("/v0.2")
public class PersonController {
	private PersonRepository personRepo;
	private PersonService personService;


	public PersonController(PersonRepository personRepo, PersonService personService) {
		super();
		this.personRepo = personRepo;
		this.personService = personService;
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
        //PersonDTO dto = new PersonDTO(person);
    	return ResponseEntity.ok().body(person);
    }
    
    //TODO allow client to update roles?
    @PreAuthorize("#id == principal.getId()")
    @PatchMapping("/person/{id}")
    public ResponseEntity<Person> patchPerson(@PathVariable Long id, @RequestBody Map<Object, Object> fields) 
    	throws ConflictException, ResourceNotFoundException {
        Person person = personRepo.findById(id)
        	.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + id));
        
        personService.updatePerson(person, fields);
        
    	final Person updatedPerson = personRepo.save(person);
    	return ResponseEntity.ok(person);
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

