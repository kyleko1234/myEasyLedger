package com.easyledger.api.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.easyledger.api.exception.AppException;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Permission;
import com.easyledger.api.model.PermissionType;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.Role;
import com.easyledger.api.model.VerificationToken;
import com.easyledger.api.payload.SignUpRequest;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PermissionRepository;
import com.easyledger.api.repository.PermissionTypeRepository;
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
	private AccountSubtypeRepository accountSubtypeRepo;
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private PermissionRepository permissionRepo;
	
	@Autowired
	private PermissionTypeRepository permissionTypeRepo;
	
    @Autowired
    PasswordEncoder passwordEncoder;


	public PersonService(OrganizationRepository organizationRepo, PersonRepository personRepo, PasswordEncoder passwordEncoder, RoleRepository roleRepo,
			VerificationService verificationService, AccountSubtypeRepository accountSubtypeRepo, 
			PermissionRepository permissionRepo, PermissionTypeRepository permissionTypeRepo, AccountRepository accountRepo) {
		super();
		this.organizationRepo = organizationRepo;
		this.personRepo = personRepo;
		this.passwordEncoder = passwordEncoder;
		this.roleRepo = roleRepo;
		this.verificationService = verificationService;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.permissionRepo = permissionRepo;
		this.permissionTypeRepo = permissionTypeRepo;
		this.accountRepo = accountRepo;
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
        			
        		case "locale":
        			assertValidLocale(v.toString());
        			person.setLocale(v.toString());
        			break;
        		
        		case "currentOrganizationId":
        			person.setCurrentOrganizationId(Long.valueOf(((Integer) v).longValue()));
        			break;
        	}  	
        }
	}
	
	@Transactional
	//before calling this method it is recommended to validate the signup request by calling signUpRequest.validateRequest()
	//creates a and persists an person, an organization for the person, and a verification token, based on the data from the signuprequest form.
	//The created Person will be unverified (i.e. person.enabled = false). The VerificationToken for the person is returned by this method, and should be used by the AuthController to create a verification link and send a verification email to the user.
	public VerificationToken createPersonFromSignUpRequest(SignUpRequest signUpRequest) throws ConflictException, ResourceNotFoundException { 
    	assertUniqueEmail(signUpRequest.getEmail());
    	assertValidLocale(signUpRequest.getLocale());
    	
    	//create and persist organization from signUpRequest
    	Organization organization = new Organization(signUpRequest.getOrganizationName(), signUpRequest.getCurrency(), signUpRequest.isIsEnterprise());
    	organizationRepo.save(organization);
    	
    	//create a person from signUpRequest, with enabled=false
    	Person person = new Person(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getEmail(), signUpRequest.getPassword(), false, signUpRequest.getLocale());
    	person.setPassword(passwordEncoder.encode(person.getPassword()));
    	
    	Permission permission = new Permission();
    	PermissionType own = permissionTypeRepo.findByName("OWN")
    			.orElseThrow(() -> new AppException("OWN is not a valid permission type."));
    	
    	permission.setPermissionType(own);
    	permission.setPerson(person);
    	permission.setOrganization(organization);
    	
    	permissionRepo.save(permission);
    	
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
	public void autoPopulateOrganization(Organization organization) throws ResourceNotFoundException {
		if (organization.isIsEnterprise()) {
			List<AccountSubtype> accountSubtypes = accountSubtypeRepo.findAll(); //List of AccountType objects, ordered by accountTypeId
			ArrayList<Account> defaultAccounts = new ArrayList<Account>();
			for (AccountSubtype accountSubtype : accountSubtypes) {
				Account account = new Account(accountSubtype.getName(), accountSubtype);
				defaultAccounts.add(account);
			}
			for (Account account : defaultAccounts) {
				account.setOrganization(organization);
			}
			accountRepo.saveAll(defaultAccounts);
		} else {
			AccountSubtype otherCurrentAssets = accountSubtypeRepo.findById((long) 5)
					.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
			AccountSubtype otherCurrentLiabilities = accountSubtypeRepo.findById((long) 16)
					.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 16"));
			AccountSubtype otherIncome = accountSubtypeRepo.findById((long) 26)
					.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 27"));
			AccountSubtype otherExpenses = accountSubtypeRepo.findById((long) 31)
					.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 32"));
			
			Account cash = new Account("Cash", otherCurrentAssets);
			Account bankAccounts = new Account("Bank Accounts", otherCurrentAssets);
			Account creditCards = new Account("Credit Cards", otherCurrentLiabilities);
			Account jobs = new Account("Jobs", otherIncome);
			Account projects = new Account("Projects", otherIncome);
			Account food = new Account("Food", otherExpenses);
			Account living = new Account("Living", otherExpenses);
			Account transportation = new Account("Transportation", otherExpenses);
			Account education = new Account("Education", otherExpenses);
			Account discretionary = new Account("Discretionary", otherExpenses);
			
			List<Account> parentAccounts = Arrays.asList(cash, bankAccounts, creditCards, jobs, projects, food, living, transportation, education, discretionary);
			for (Account account : parentAccounts) {
				account.setOrganization(organization);
				accountRepo.save(account);
			}
			
			Account cashAccount = new Account("Cash", cash);
			Account savingsAccount = new Account("Savings Account", bankAccounts);
			Account checkingAccount = new Account("Checking Account", bankAccounts);
			Account investmentAccount = new Account("Investment Account", bankAccounts);
			Account creditCard = new Account("Credit Card #1", creditCards);
			Account job = new Account("Job #1", jobs);
			Account project = new Account("Project #1", projects);
			Account groceries = new Account("Groceries", food);
			Account dining = new Account("Dining", food);
			Account rent = new Account("Rent", living);
			Account transportationAccount = new Account("Transportation", transportation);
			Account tuition = new Account("Tuition", education);
			Account apparel = new Account("Apparel", discretionary);
			Account entertainment = new Account("Entertainment", discretionary);
			
			List<Account> childAccounts = Arrays.asList(cashAccount, savingsAccount, checkingAccount, investmentAccount, creditCard,
					job, project, groceries, dining, rent, transportationAccount, tuition, apparel, entertainment);
			for (Account account : childAccounts) {
				account.setOrganization(organization);;
				accountRepo.save(account);
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
