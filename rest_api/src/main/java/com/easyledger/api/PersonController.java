package com.easyledger.api;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.util.ReflectionUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v0.1")
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
    
    @PostMapping("/person")
    public Person createPerson(@Valid @RequestBody Person person) 
    	throws ConflictException {
    	String email = person.getEmail();
    	if (personRepo.findByEmail(email).isEmpty() == false) {
    		throw new ConflictException("Person already registered with this email :: " + email);
    	}
    	return personRepo.save(person);
    	
    }
    
    
    
    @PutMapping("/person/{id}")
    public ResponseEntity<Person> putPerson(@PathVariable(value = "id") Long personId,
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
    
    @PatchMapping("/person/{id}")
    public ResponseEntity<Person> patchPerson(@PathVariable Long id, @RequestBody Map<Object, Object> fields) 
    	throws ResourceNotFoundException {
        Person person = personRepo.findById(id)
        	.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + id));
        // Fields is a Json Request Body represented as a Map. Key is the field name, Value is the value name.
        fields.forEach((k, v) -> {
           // Use reflection to find field K in person, and set to value v
        	Field field = ReflectionUtils.findField(Person.class, (String) k);
        	field.setAccessible(true);
        	ReflectionUtils.setField(field, person, v);
        	field.setAccessible(false);
        });
    	final Person updatedPerson = personRepo.save(person);
    	return ResponseEntity.ok(updatedPerson);
    }
    
}

