package com.easyledger.api;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.util.ReflectionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
    @ResponseStatus(HttpStatus.CREATED)
    public Person createPerson(@Valid @RequestBody Person person) 
    	throws ConflictException {
    	String email = person.getEmail();
    	checkForUniqueEmail(email);
    	return personRepo.save(person); //
    	
    }
    
    @PatchMapping("/person/{id}")
    public ResponseEntity<Person> patchPerson(@PathVariable Long id, @RequestBody Map<Object, Object> fields) 
    	throws ConflictException, ResourceNotFoundException {
        Person person = personRepo.findById(id)
        	.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + id));
        // 'fields' is a Json Request Body represented as a Map. Key is the field name, Value is the value name.
        // Iterate over 'fields', identifying the correct fields of Person to patch.
        for (Map.Entry<Object, Object> entry : fields.entrySet()) {
        	String k = entry.getKey().toString();
        	if (k.equals("firstName")) {
        		person.setFirstName((String) entry.getValue());
        	}
        	if (k.equals("lastName")) {
        		person.setLastName((String) entry.getValue());
        	}
        	if (k.equals("email")) {
        		String email = entry.getValue().toString();
        		checkForUniqueEmail(email); //checks that email is unique and not already registered, otherwise aborts the patch operation and returns HTTP 409
        		person.setEmail(email);
        	}
        	if (k.equals("password")) {
        		person.setPassword((String) entry.getValue());
        	}
        	
        }
    	final Person updatedPerson = personRepo.save(person);
    	return ResponseEntity.ok(updatedPerson);
    }
    
    private void checkForUniqueEmail(String email) 
    	throws ConflictException {
    	if (personRepo.findByEmail(email.toLowerCase()).isEmpty() == false) {
    		throw new ConflictException("Person already registered with this email :: " + email);
    	}
    }
    
}

