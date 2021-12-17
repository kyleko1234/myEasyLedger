package com.easyledger.api.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
	
	public VerificationToken createInvitedPerson(String email, String locale) throws ConflictException {
		assertUniqueEmail(email);
		assertValidLocale(locale);
		
		Person person = new Person();
		person.setEmail(email);
		person.setPassword(passwordEncoder.encode(UUID.randomUUID().toString())); //this password should never be used, and exists only to appease the non-null constraint of the password field on the person table
		person.setLocale(locale);
		person.setEnabled(false);
    	Role userRole = roleRepo.findByName("ROLE_USER")
    			.orElseThrow(() -> new AppException("ROLE_USER does not exist."));
    	person.setRoles(Collections.singleton(userRole));
    	person = personRepo.save(person);
    	
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
	private void autoPopulateEnterprise(Organization organization, String locale) throws ResourceNotFoundException {
		switch (locale) {
			case "zh-TW":
				autoPopulateEnterpriseZhTW(organization);
				break;
			case "en-US":
			default:
				autoPopulateEnterpriseEnUS(organization);
				break;
		}
	}
	
	private void autoPopulateEnterpriseEnUS(Organization organization) {
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
	}
	
	//this is LONG. sorry
	private void autoPopulateEnterpriseZhTW(Organization organization) throws ResourceNotFoundException {
		ArrayList<Account> topLevelAccounts = new ArrayList<Account>();
		ArrayList<Account> childAccounts = new ArrayList<Account>();
		
		/*create default COA */
		AccountSubtype cashAndCashEquivalents = accountSubtypeRepo.findById((long) 1)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
		Account 現金及約當現金 = new Account("現金及約當現金", cashAndCashEquivalents, "111");
		topLevelAccounts.add(現金及約當現金);
		childAccounts.add(new Account("庫存現金", 現金及約當現金, "1111"));
		childAccounts.add(new Account("零用金／週轉金", 現金及約當現金, "1112"));
		childAccounts.add(new Account("銀行存款", 現金及約當現金, "1113"));
		childAccounts.add(new Account("在途現金", 現金及約當現金, "1114"));
		childAccounts.add(new Account("約當現金", 現金及約當現金, "1115"));
		
		AccountSubtype currentReceivables = accountSubtypeRepo.findById((long) 3)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
		Account 應收帳款淨額 = new Account("應收帳款淨額", currentReceivables, "119");
		topLevelAccounts.add(應收帳款淨額);
		Account 應收票據淨額 = new Account("應收票據淨額", currentReceivables, "118");
		topLevelAccounts.add(應收票據淨額);
		childAccounts.add(new Account("未賺得融資收益", 應收帳款淨額, "1196"));
		childAccounts.add(new Account("應收分期帳款", 應收帳款淨額, "1193"));
		childAccounts.add(new Account("未實現利息收入", 應收帳款淨額, "1194"));
		childAccounts.add(new Account("備抵呆帳 - 應收租賃款", 應收帳款淨額, "1198"));
		childAccounts.add(new Account("備抵銷售退回及折讓", 應收帳款淨額, "1192"));
		childAccounts.add(new Account("備抵呆帳 - 應收帳款及分期帳款", 應收帳款淨額, "1199"));
		childAccounts.add(new Account("應收帳款 - 關係人", 應收帳款淨額, "1197"));
		childAccounts.add(new Account("應收租賃款", 應收帳款淨額, "1195"));
		childAccounts.add(new Account("應收帳款", 應收帳款淨額, "1191"));
		childAccounts.add(new Account("應收票據貼現 - 關係人", 應收票據淨額, "1186"));
		childAccounts.add(new Account("備抵呆帳-應收關係人票據", 應收票據淨額, "1188"));
		childAccounts.add(new Account("應收票據貼現", 應收票據淨額, "1182"));
		childAccounts.add(new Account("其他應收票據", 應收票據淨額, "1184"));
		childAccounts.add(new Account("應收票據 - 關係人", 應收票據淨額, "1183"));
		childAccounts.add(new Account("應收票據", 應收票據淨額, "1181"));
		childAccounts.add(new Account("備抵呆帳 - 應收票據", 應收票據淨額, "1185"));
		childAccounts.add(new Account("其他應收票據 - 關係人", 應收票據淨額, "1187"));

		AccountSubtype intangibleAssetsAndGoodwill = accountSubtypeRepo.findById((long) 9)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
		Account 無形資產及商譽 = new Account("無形資產及商譽", intangibleAssetsAndGoodwill, "149 - 155");
		topLevelAccounts.add(無形資產及商譽);
		childAccounts.add(new Account("商譽 - 成本", 無形資產及商譽, "1541"));
		childAccounts.add(new Account("特許權 - 成本", 無形資產及商譽, "1511"));
		childAccounts.add(new Account("電腦軟體 - 重估增值", 無形資產及商譽, "1532"));
		childAccounts.add(new Account("累計減損 - 商標權", 無形資產及商譽, "1494"));
		childAccounts.add(new Account("累計減損 - 商譽", 無形資產及商譽, "1543"));
		childAccounts.add(new Account("著作權 - 成本", 無形資產及商譽, "1521"));
		childAccounts.add(new Account("累計攤銷 - 其他無形資產", 無形資產及商譽, "1552"));
		childAccounts.add(new Account("商標權 - 重估增值", 無形資產及商譽, "1492"));
		childAccounts.add(new Account("累計攤銷 - 電腦軟體", 無形資產及商譽, "1533"));
		childAccounts.add(new Account("電腦軟體 - 成本", 無形資產及商譽, "1531"));
		childAccounts.add(new Account("累計攤銷 - 特許權", 無形資產及商譽, "1513"));
		childAccounts.add(new Account("累計減損 - 其他無形資產", 無形資產及商譽, "1553"));
		childAccounts.add(new Account("累計減損 - 特許權", 無形資產及商譽, "1514"));
		childAccounts.add(new Account("累計減損 - 電腦軟體", 無形資產及商譽, "1534"));
		childAccounts.add(new Account("累計攤銷 - 商譽", 無形資產及商譽, "1542"));
		childAccounts.add(new Account("專利權 - 成本", 無形資產及商譽, "1501"));
		childAccounts.add(new Account("著作權 - 重估增值", 無形資產及商譽, "1522"));
		childAccounts.add(new Account("其他無形資產", 無形資產及商譽, "1551"));
		childAccounts.add(new Account("累計減損 - 專利權", 無形資產及商譽, "1504"));
		childAccounts.add(new Account("特許權 - 重估增值", 無形資產及商譽, "1512"));
		childAccounts.add(new Account("累計攤銷 - 著作權", 無形資產及商譽, "1523"));
		childAccounts.add(new Account("累計攤銷 - 專利權", 無形資產及商譽, "1503"));
		childAccounts.add(new Account("商標權 - 成本", 無形資產及商譽, "1491"));
		childAccounts.add(new Account("累計減損 - 著作權", 無形資產及商譽, "1524"));
		childAccounts.add(new Account("累計攤銷 - 商標權", 無形資產及商譽, "1493"));
		childAccounts.add(new Account("專利權 - 重估增值", 無形資產及商譽, "1502"));

		/* end creation of COA*/
		
		//save accounts
		for (Account account : topLevelAccounts) {
			account.setOrganization(organization);
		}
		accountRepo.saveAll(topLevelAccounts);
		for (Account account : childAccounts) {
			account.setOrganization(organization);
		}
		accountRepo.saveAll(childAccounts);
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
		switch (locale) {
			case "zh-TW": {
				ArrayList<Account> topLevelAccounts = new ArrayList<Account>();
				ArrayList<Account> childAccounts = new ArrayList<Account>();
				String[] assetAccountNames = {"活期存款帳戶", "投資理財帳戶", "現金"};
				String[] liabilityAccountNames = {"信用卡"};
				String[] incomeAccountNames = {"薪水", "其它"};
				String[] expenseAccountNames = {"衣", "住", "行", "育", "樂", "所得稅", "其它"};
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
				Account bankAccounts = new Account("Bank Accounts", otherCurrentAssets);
				Account cash = new Account("Cash", otherCurrentAssets);
				Account creditCards = new Account("Credit Cards", otherCurrentLiabilities);
				Account jobs = new Account("Jobs", revenue);
				Account projects = new Account("Projects", revenue);
				Account discretionary = new Account("Discretionary", costOfSales);
				Account education = new Account("Education", costOfSales);
				Account food = new Account("Food", costOfSales);
				Account living = new Account("Living", costOfSales);
				Account transportation = new Account("Transportation", costOfSales);
				Account[] topLevelAccounts = {
						bankAccounts, cash, creditCards, jobs, projects, discretionary, education, food, living, transportation
				};
				for (Account account : topLevelAccounts) {
					account.setOrganization(organization);
				}
				accountRepo.saveAll(Arrays.asList(topLevelAccounts));
				
				Account savingsAccount = new Account("Savings Account", bankAccounts);
				Account checkingAccount = new Account("Checking Account", bankAccounts);
				Account investmentAccount = new Account("Investment Account", bankAccounts);
				Account creditCardOne = new Account("Credit Card #1", creditCards);
				Account jobOne = new Account("Job #1", jobs);
				Account projectOne = new Account("Project #1", projects);
				Account apparel = new Account("Apparel", discretionary);
				Account entertainment = new Account("Entertainment", discretionary);
				Account tuition = new Account("Tuition", education);
				Account dining = new Account("Dining", food);
				Account groceries = new Account("Groceries", food);
				Account rent = new Account("Rent", living);
				Account gas = new Account("Gas", transportation);
				Account[] childAccounts = {
						savingsAccount, checkingAccount, investmentAccount, creditCardOne, jobOne, projectOne, apparel,
						entertainment, tuition, dining, groceries, rent, gas
				};
				for (Account account : childAccounts) {
					account.setOrganization(organization);
				}
				accountRepo.saveAll(Arrays.asList(childAccounts));
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
