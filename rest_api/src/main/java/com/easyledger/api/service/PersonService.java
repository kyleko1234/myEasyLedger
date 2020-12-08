package com.easyledger.api.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.easyledger.api.exception.AppException;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.Role;
import com.easyledger.api.model.VerificationToken;
import com.easyledger.api.payload.ApiResponse;
import com.easyledger.api.payload.SignUpRequest;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.repository.RoleRepository;

@Service
public class PersonService {
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	@Autowired
	private PersonRepository personRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private VerificationService verificationService;
	
    @Autowired
    PasswordEncoder passwordEncoder;


	public PersonService(OrganizationRepository organizationRepo, PersonRepository personRepo, PasswordEncoder passwordEncoder, RoleRepository roleRepo,
			VerificationService verificationService) {
		super();
		this.organizationRepo = organizationRepo;
		this.personRepo = personRepo;
		this.passwordEncoder = passwordEncoder;
		this.roleRepo = roleRepo;
		this.verificationService = verificationService;
	}
	
	public void updatePerson(Person person, Map<Object, Object> fields) 
		throws ConflictException, ResourceNotFoundException { 
		//TODO: add ability to update ROLES
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
        			
        		case "password": //TODO: password update should be a different endpoint than the other update functions
        			if (v == null) {
        				throw new ConflictException("Person must have a password.");
        			}
        			person.setPassword(passwordEncoder.encode(v.toString()));
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
	
	//before calling this method it is recommended to validate the signup request by calling signUpRequest.validateRequest()
	//creates a and persists an person, an organization for the person, and a verification token, based on the data from the signuprequest form.
	//The created Person will be unverified (i.e. person.enabled = false). The VerificationToken for the person is returned by this method, and should be used by the AuthController to create a verification link and send a verification email to the user.
	public VerificationToken createPersonFromSignUpRequest(SignUpRequest signUpRequest) throws ConflictException { 
    	assertUniqueEmail(signUpRequest.getEmail());
    	
    	//create and persist organization from signUpRequest
    	Organization organization = new Organization(signUpRequest.getOrganizationName());
    	organizationRepo.save(organization);
    	
    	//create a person from signUpRequest, with enabled=false
    	Person person = new Person(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getEmail(), signUpRequest.getPassword(), false);
    	person.setPassword(passwordEncoder.encode(person.getPassword()));
    	person.addOrganization(organization);
    	
    	Role userRole = roleRepo.findByName("ROLE_USER")
    			.orElseThrow(() -> new AppException("ROLE_USER does not exist."));
    	person.setRoles(Collections.singleton(userRole));
    	
    	//persist person
    	person = personRepo.save(person);
    	
    	//create and persist VerificationToken for person
    	VerificationToken verificationToken = verificationService.createVerificationTokenForPerson(person);
    	
    	return verificationToken;
    	
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
        if (personRepo.existsByEmail(formattedEmail)) {
        	throw new ConflictException("Person already registered with this email :: " + email.trim());
        }
    }
        
}
