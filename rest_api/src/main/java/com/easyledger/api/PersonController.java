package com.easyledger.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public List<Person> getAllLineItems() {
        return personRepo.findAll();
    }

	
    @GetMapping("/person/{id}")
    public ResponseEntity<Person> getLineItemById(@PathVariable(value = "id") Long personId)
        throws ResourceNotFoundException {
    	Person person = personRepo.findById(personId)
    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId)); 
        return ResponseEntity.ok().body(person);
    }
}

