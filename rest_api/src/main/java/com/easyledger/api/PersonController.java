package com.easyledger.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class PersonController {
	private PersonRepository personRepo;



	public PersonController(PersonRepository personRepo) {
		super();
		this.personRepo = personRepo;
	}


	@GetMapping("/person")
    public List<Person> getAllPersons() {
        return personRepo.findAll();
    }

	
    @GetMapping("/person/{id}")
    public ResponseEntity<Person> getPersonId(@PathVariable(value = "id") Long personId)
        throws ResourceNotFoundException {
    	Person person = personRepo.findById(personId)
    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId)); 
        return ResponseEntity.ok().body(person);
    }
    
    @PutMapping("/person/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable(value = "id") Long personId,
    			@Valid @RequestBody Person personDetails) throws ResourceNotFoundException {
    	Person person = personRepo.findById(personId)
    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId));
    	person.setFirstName(personDetails.getFirstName());
    	person.setLastName(personDetails.getLastName());
    	person.setEmail(personDetails.getEmail());
    	person.setPassword(personDetails.getPassword());
    	final Person updatedPerson = personRepo.save(person);
    	return ResponseEntity.ok(updatedPerson);
    				
    }
    	

}

