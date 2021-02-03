package com.easyledger.api.service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.easyledger.api.exception.AppException;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.Role;
import com.easyledger.api.model.VerificationToken;
import com.easyledger.api.payload.ApiResponse;
import com.easyledger.api.payload.SignUpRequest;
import com.easyledger.api.repository.AccountGroupRepository;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.AccountTypeRepository;
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
	private AccountGroupRepository accountGroupRepo;
	
	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	@Autowired
	private AccountTypeRepository accountTypeRepo;
	
	@Autowired
	private AccountRepository accountRepo;
		
    @Autowired
    PasswordEncoder passwordEncoder;


	public PersonService(OrganizationRepository organizationRepo, PersonRepository personRepo, PasswordEncoder passwordEncoder, RoleRepository roleRepo,
			VerificationService verificationService, AccountTypeRepository accountTypeRepo, AccountSubtypeRepository accountSubtypeRepo, 
			AccountRepository accountRepo, AccountGroupRepository accountGroupRepo) {
		super();
		this.organizationRepo = organizationRepo;
		this.personRepo = personRepo;
		this.passwordEncoder = passwordEncoder;
		this.roleRepo = roleRepo;
		this.verificationService = verificationService;
		this.accountTypeRepo = accountTypeRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.accountRepo = accountRepo;
		this.accountGroupRepo = accountGroupRepo;
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
	        				//cast Integer to Long because apparently java has no elegant way to do that
	        				Long id = Long.valueOf(organizationId.longValue());
	        				person.addOrganization(organizationRepo.findById(id)
	            					.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId.toString())));
	            			}
        			}
        			break;
        		case "locale":
        			assertValidLocale(v.toString());
        			person.setLocale(v.toString());
        			break;
        			
        	}  	
        }
	}
	
	@Transactional
	//before calling this method it is recommended to validate the signup request by calling signUpRequest.validateRequest()
	//creates a and persists an person, an organization for the person, and a verification token, based on the data from the signuprequest form.
	//The created Person will be unverified (i.e. person.enabled = false). The VerificationToken for the person is returned by this method, and should be used by the AuthController to create a verification link and send a verification email to the user.
	public VerificationToken createPersonFromSignUpRequest(SignUpRequest signUpRequest) throws ConflictException { 
    	assertUniqueEmail(signUpRequest.getEmail());
    	assertValidLocale(signUpRequest.getLocale());
    	
    	//create and persist organization from signUpRequest
    	Organization organization = new Organization(signUpRequest.getOrganizationName());
    	organizationRepo.save(organization);
    	
    	//create a person from signUpRequest, with enabled=false
    	Person person = new Person(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getEmail(), signUpRequest.getPassword(), false, signUpRequest.getLocale());
    	person.setPassword(passwordEncoder.encode(person.getPassword()));
    	person.addOrganization(organization);
    	
    	Role userRole = roleRepo.findByName("ROLE_USER")
    			.orElseThrow(() -> new AppException("ROLE_USER does not exist."));
    	person.setRoles(Collections.singleton(userRole));
    	
    	//persist person
    	person = personRepo.save(person);
    	
    	autoPopulateOrganization(organization);
    	//create and persist VerificationToken for person
    	VerificationToken verificationToken = verificationService.createVerificationTokenForPerson(person);
    	
    	return verificationToken;
    	
	}
	
	/* Automatically populate a person with default AccountGroups. By default we create a corresponding AccountGroup for every AccountSubtype. */
	private void autoPopulateOrganization(Organization organization) {
		List<AccountSubtype> accountSubtypes = accountSubtypeRepo.findAll(); //List of AccountType objects, ordered by accountTypeId
		ArrayList<AccountGroup> defaultAccountGroups = new ArrayList<AccountGroup>();
		for (AccountSubtype accountSubtype : accountSubtypes) {
			AccountGroup group = new AccountGroup(accountSubtype.getName(), accountSubtype);
			defaultAccountGroups.add(group);
		}
		for (AccountGroup accountGroup : defaultAccountGroups) {
			accountGroup.setOrganization(organization);
		}
		accountGroupRepo.saveAll(defaultAccountGroups);
		
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
    
    public void assertValidLocale(String locale)
    	throws ConflictException {
    	List<String> supportedLocales = new ArrayList<String>(Arrays.asList("en-US", "zh-TW"));
    	if (!supportedLocales.contains(locale)) {
    		throw new ConflictException("Given locale is invalid or not yet supported.");
    	}
    }
        
}
