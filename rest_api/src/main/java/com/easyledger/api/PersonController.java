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
    	assertUniqueEmail(email);
    	return personRepo.save(person); //
    	
    }
    
    @PatchMapping("/person/{id}")
    public ResponseEntity<Person> patchPerson(@PathVariable Long id, @RequestBody Map<Object, Object> fields) 
    	throws ConflictException, ResourceNotFoundException {
        Person person = personRepo.findById(id)
        	.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + id));
        // 'fields' is a Json Request Body represented as a Map. Key is the field name, Value is the value name.
        
        /* First checks if the field is an Email. If true, email is tested for uniqueness, throwing ConflictException if not unique
         * and aborting the PATCH. If email is unique, it is saved using Person's setter. For all other fields, Reflection is used
         * to set the values for the field. If all fields are valid the PATCH is executed and the Person is saved into the db. */
        for (Map.Entry<Object, Object> entry : fields.entrySet()) {
        	Object k = entry.getKey();
        	Object v = entry.getValue();
        	
        	if (k.toString().equals("email")) {
        		assertUniqueEmail(v.toString());
        		person.setEmail(v.toString());
        	} else {
	        	Field field = ReflectionUtils.findField(Person.class, (String) k);
	        	ReflectionUtils.makeAccessible(field);
	        	ReflectionUtils.setField(field, person, v);
        	}      	
        }
    	final Person updatedPerson = personRepo.save(person);
    	return ResponseEntity.ok(updatedPerson);
    }
    
    private void assertUniqueEmail(String email) 
    	throws ConflictException {
    	String formattedEmail = email.toLowerCase().trim();
    	if (personRepo.findByEmail(formattedEmail).isEmpty() == false) {
    		throw new ConflictException("Person already registered with this email :: " + email.trim());
    	}
    }
    
}

