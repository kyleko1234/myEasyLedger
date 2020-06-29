package com.easyledger.api.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PersonRepository;

@Service
public class PersonService {
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	@Autowired
	private PersonRepository personRepo;

	public PersonService(OrganizationRepository organizationRepo, PersonRepository personRepo) {
		super();
		this.organizationRepo = organizationRepo;
		this.personRepo = personRepo;
	}
	
	public void updatePerson(Person person, Map<Object, Object> fields) 
		throws ConflictException, ResourceNotFoundException {
		
        for (Map.Entry<Object, Object> entry : fields.entrySet()) {
        	Object k = entry.getKey();
        	Object v = entry.getValue();
        	
        	switch (k.toString()) {
        	
        		case "personId":
        			throw new ConflictException("Cannot manually set id for person object.");
        			
        		case "firstName":
        			person.setFirstName((String) v);
        			break;
        			
        		case "lastName":
        			person.setLastName((String) v);
        			break;
        			
        		case "email" :
        			if (v == null) {
        				throw new ConflictException("Person must have an email.");
        			}
        			assertUniqueEmail(v.toString());
        			person.setEmail(v.toString());
        			break;
        			
        		case "password":
        			if (v == null) {
        				throw new ConflictException("Person must have a password.");
        			}
        			person.setPassword(v.toString());
        			break;
        			
        		case "organizationIds":
        			person.removeOrganizations();
        			if (v != null) {
        				//Json's list of int is automatically parsed as ArrayList<Integer> by Spring
	        			ArrayList<Integer> organizationIds = (ArrayList<Integer>) v;
	        			for (Integer organizationId : organizationIds) {
	        				//cast Integer to Long
	        				Long id = Long.valueOf(organizationId.longValue());
	        				person.addOrganization(organizationRepo.findById(id)
	            					.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId.toString())));
	            			}
        			}
        			break;
        	}
        	
        }
		
	}

	public void assertCompletePerson(Person person) 
			throws ConflictException {
		if (person.getEmail() == null) {
			throw new ConflictException("Email is a required field.");
		}
		if (person.getPassword() == null) {
			throw new ConflictException("Password is a required field.");
		}
	}
	
    public void assertUniqueEmail(String email) 
        	throws ConflictException {
        String formattedEmail = email.toLowerCase().trim();
        if (personRepo.findByEmail(formattedEmail).isEmpty() == false) {
        	throw new ConflictException("Person already registered with this email :: " + email.trim());
        }
    }
        
}
