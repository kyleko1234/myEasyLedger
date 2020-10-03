package com.easyledger.api.controller;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.util.ReflectionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.PersonDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.service.PersonService;

@RestController
@RequestMapping("/v0.1")
public class PersonController {
	private PersonRepository personRepo;
	private PersonService personService;


	public PersonController(PersonRepository personRepo, PersonService personService) {
		super();
		this.personRepo = personRepo;
		this.personService = personService;
	}


	@GetMapping("/person")
    public ArrayList<PersonDTO> getAllPersons() {
		ArrayList<PersonDTO> dtos = new ArrayList<PersonDTO>();
        List<Person> persons = personRepo.findAll();
        for (Person person : persons) {
        	dtos.add(new PersonDTO(person));
        }
        return dtos;
    }

	
    @GetMapping("/person/{id}")
    public ResponseEntity<PersonDTO> getPersonById(@PathVariable(value = "id") Long personId)
        throws ResourceNotFoundException {
    	Person person = personRepo.findById(personId)
    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + personId)); 
        PersonDTO dto = new PersonDTO(person);
    	return ResponseEntity.ok().body(dto);
    }
    
    @PostMapping("/person")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PersonDTO> createPerson(@RequestBody Map<Object, Object> fields) 
    	throws ConflictException, ResourceNotFoundException {
    	
    	Person person = new Person();
        personService.updatePerson(person, fields);
        personService.assertCompletePerson(person);
        if (person.getId() != null) {
        	throw new ConflictException("Please do not attempt to manually create a personId.");
        }
    	final Person updatedPerson = personRepo.save(person);
    	PersonDTO dto = new PersonDTO(updatedPerson);
    	return ResponseEntity.ok(dto);
    }
    
    @PatchMapping("/person/{id}")
    public ResponseEntity<PersonDTO> patchPerson(@PathVariable Long id, @RequestBody Map<Object, Object> fields) 
    	throws ConflictException, ResourceNotFoundException {
        Person person = personRepo.findById(id)
        	.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + id));
        
        personService.updatePerson(person, fields);
        
    	final Person updatedPerson = personRepo.save(person);
    	PersonDTO dto = new PersonDTO(updatedPerson);
    	return ResponseEntity.ok(dto);
    }
    
 /*   @DeleteMapping("/person/{id}")
    public Map<String, Boolean> deleteCategory(@PathVariable(value = "id") Long personId)
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

