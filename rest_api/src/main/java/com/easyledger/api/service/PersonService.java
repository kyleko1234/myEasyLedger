package com.easyledger.api.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.PasswordChangeFormDTO;
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
import com.easyledger.api.security.UserPrincipal;

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
    
    @Autowired
    AuthenticationManager authenticationManager;


	public PersonService(OrganizationRepository organizationRepo, PersonRepository personRepo, PasswordEncoder passwordEncoder, RoleRepository roleRepo,
			VerificationService verificationService, AccountSubtypeRepository accountSubtypeRepo, 
			PermissionRepository permissionRepo, PermissionTypeRepository permissionTypeRepo, AccountRepository accountRepo, 
			AuthenticationManager authenticationManager) {
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
		this.authenticationManager = authenticationManager;
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
        			
        		case "locale":
        			assertValidLocale(v.toString());
        			person.setLocale(v.toString());
        			break;
        		
        		case "currentOrganizationId":
        			person.setCurrentOrganizationId(Long.valueOf(((Integer) v).longValue()));
        			break;
        		
        		case "appearance":
        			person.setAppearance(v.toString());
        			break;
        	}  	
        }
	}
	
	public void updatePassword(PasswordChangeFormDTO dto, UserPrincipal userPrincipal) throws ConflictException, ResourceNotFoundException {
    	authenticationManager.authenticate(
    			new UsernamePasswordAuthenticationToken(
    					userPrincipal.getEmail(),
    					dto.getCurrentPassword()
    					)
    	);
		if (!dto.getNewPassword().equals(dto.getConfirmNewPassword())) {
			throw new ConflictException("Passwords do not match.");
		}
		Person person = personRepo.findById(userPrincipal.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + userPrincipal.getId()));
		person.setPassword(passwordEncoder.encode(dto.getNewPassword()));
		personRepo.save(person);
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
    	
    	Role userRole = roleRepo.findByName("ROLE_USER")
    			.orElseThrow(() -> new AppException("ROLE_USER does not exist."));
    	person.setRoles(Collections.singleton(userRole));
    	
    	//persist person
    	person = personRepo.save(person);
    	
    	Permission permission = new Permission();
    	PermissionType own = permissionTypeRepo.findByName("OWN")
    			.orElseThrow(() -> new AppException("OWN is not a valid permission type."));
    	
    	permission.setPermissionType(own);
    	permission.setPerson(person);
    	permission.setOrganization(organization);
    	
    	permissionRepo.save(permission);
    	
    	autoPopulateOrganization(organization, signUpRequest.getLocale());
    	//create and persist VerificationToken for person
    	VerificationToken verificationToken = verificationService.createVerificationTokenForPerson(person);
    	
    	return verificationToken;
    	
	}
	
	/* Automatically populate a person with default AccountGroups. By default we create a corresponding AccountGroup for every AccountSubtype. */
	public void autoPopulateOrganization(Organization organization, String locale) throws ResourceNotFoundException {
		if (organization.isIsEnterprise()) {
			autoPopulateEnterprise(organization, locale);
		} else {
			autoPopulatePersonal(organization, locale);
		}
		
	}
	private void autoPopulateEnterprise(Organization organization, String locale) {
		List<AccountSubtype> accountSubtypes = accountSubtypeRepo.findAll(); //List of AccountType objects, ordered by accountTypeId
		ArrayList<Account> defaultAccounts = new ArrayList<Account>();
		switch (locale) {
			case "zh-TW":
				String[] translatedSubtypeNames = { //This array should be exactly identical to the list of account subtypes, in order of accountSubtypeId, translated into chinese.
						"現金及約當現金", "具市場性證劵", "流動應收帳款", "存貨", "其它流動資產", "不具市場性證劵", "非流動應收帳款", "不動產、廠房及設備", "無形資產及商譽", "其它非流動性資產",
						"流動應付帳款", "應付股利", "遞延收入", "短期負債", "遞延所得稅", "其它流動負債", "長期負債", "非流動應付帳款", "其它流動負債",
						"投入資本", "股份報酬", "本期股利及約當股利", "其它業主權益",
						"收入", "投資活動之收入", "融資活動之收入",
						"銷貨成本", "研究發展費用", "銷售、總務及管理費用", "折舊及攤銷", "投資活動之費用", "融資活動之費用", "利息費用", "賦稅費用", "非經常性項目"
				};
				for (int i = 0; i < translatedSubtypeNames.length; i++) {
					Account account = new Account(translatedSubtypeNames[i], accountSubtypes.get(i));
					defaultAccounts.add(account);
				}
				break;
			case "en-US":
			default:
				for (AccountSubtype accountSubtype : accountSubtypes) {
					Account account = new Account(accountSubtype.getName(), accountSubtype);
					defaultAccounts.add(account);
				}
				break;
		}
		for (Account account : defaultAccounts) {
			account.setOrganization(organization);
		}
		accountRepo.saveAll(defaultAccounts);
	}
	
	private void autoPopulatePersonal(Organization organization, String locale) throws ResourceNotFoundException {
		AccountSubtype otherCurrentAssets = accountSubtypeRepo.findById((long) 5)
		.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
		AccountSubtype otherCurrentLiabilities = accountSubtypeRepo.findById((long) 16)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 16"));
		AccountSubtype revenue = accountSubtypeRepo.findById((long) 24)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 24"));
		AccountSubtype costOfSales = accountSubtypeRepo.findById((long) 27)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 27"));
		ArrayList<Account> defaultAccounts = new ArrayList<Account>();
		switch (locale) {
			case "zh-TW": {
				ArrayList<Account> topLevelAccounts = new ArrayList<Account>();
				ArrayList<Account> childAccounts = new ArrayList<Account>();
				String[] assetAccountNames = {"活期存款帳戶", "投資理財帳戶"};
				String[] liabilityAccountNames = {"信用卡"};
				String[] incomeAccountNames = {"薪水", "其它"};
				String[] expenseAccountNames = {"食品", "衣", "住", "行", "育", "外食", "樂", "所得稅", "其它"};
				for (String accountName : assetAccountNames) {
					Account account = new Account(accountName, otherCurrentAssets);
					topLevelAccounts.add(account);
				}
				for (String accountName : liabilityAccountNames) {
					Account account = new Account(accountName, otherCurrentLiabilities);
					topLevelAccounts.add(account);
				}
				for (String accountName : incomeAccountNames) {
					Account account = new Account(accountName, revenue);
					topLevelAccounts.add(account);
				}
				for (String accountName : expenseAccountNames) {
					Account account = new Account(accountName, costOfSales);
					topLevelAccounts.add(account);
				}
				Account foodExpensesParentAccount = new Account("食", costOfSales);
				topLevelAccounts.add(foodExpensesParentAccount);
				for (Account account : topLevelAccounts) {
					account.setOrganization(organization);
				}
				accountRepo.saveAll(topLevelAccounts);
				String[] foodExpensesChildAccountNames = {"食品", "外食"};
				for (String accountName : foodExpensesChildAccountNames) {
					Account account = new Account(accountName, foodExpensesParentAccount);
					account.setOrganization(organization);
					accountRepo.save(account);
				}
				break;
			}
			case "en-US":
			default: {
				String[] assetAccountNames = {"Savings Account", "Checking Account", "Investment Account"};
				String[] liabilityAccountNames = {"Credit Card"};
				String[] incomeAccountNames = {"Salary", "Other income"};
				String[] expenseAccountNames = {"Grocery", "Apparel", "Housing", "Transportation", "Learning", "Dining", "Entertainment", "Taxes", "Other Expenses"};
				for (String accountName : assetAccountNames) {
					Account account = new Account(accountName, otherCurrentAssets);
					defaultAccounts.add(account);
				}
				for (String accountName : liabilityAccountNames) {
					Account account = new Account(accountName, otherCurrentLiabilities);
					defaultAccounts.add(account);
				}
				for (String accountName : incomeAccountNames) {
					Account account = new Account(accountName, revenue);
					defaultAccounts.add(account);
				}
				for (String accountName : expenseAccountNames) {
					Account account = new Account(accountName, costOfSales);
					defaultAccounts.add(account);
				}
				break;
			}
		}
		for (Account account : defaultAccounts) {
			account.setOrganization(organization);
		}
		accountRepo.saveAll(defaultAccounts);
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
