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
        		
        		case "resultsPerPage":
        			person.setResultsPerPage((int) v);
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
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 1"));
		Account 現金及約當現金 = new Account("現金及約當現金", cashAndCashEquivalents, "111");
		topLevelAccounts.add(現金及約當現金);
		childAccounts.add(new Account("庫存現金", 現金及約當現金, "1111"));
		childAccounts.add(new Account("零用金／週轉金", 現金及約當現金, "1112"));
		childAccounts.add(new Account("銀行存款", 現金及約當現金, "1113"));
		childAccounts.add(new Account("在途現金", 現金及約當現金, "1114"));
		childAccounts.add(new Account("約當現金", 現金及約當現金, "1115"));
		
		AccountSubtype currentReceivables = accountSubtypeRepo.findById((long) 3)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 3"));
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
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 9"));
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

		AccountSubtype inventory = accountSubtypeRepo.findById((long) 4)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 4"));
		Account 存貨 = new Account("存貨", inventory, "123");
		topLevelAccounts.add(存貨);
		childAccounts.add(new Account("商品存貨", 存貨, "1231"));
		childAccounts.add(new Account("在製品", 存貨, "1237"));
		childAccounts.add(new Account("委外加工", 存貨, "1238"));
		childAccounts.add(new Account("在途原物料", 存貨, "1241"));
		childAccounts.add(new Account("寄銷品", 存貨, "1232"));
		childAccounts.add(new Account("原料", 存貨, "1239"));
		childAccounts.add(new Account("農業產品", 存貨, "1243"));
		childAccounts.add(new Account("備抵存貨跌價", 存貨, "1242"));
		childAccounts.add(new Account("物料", 存貨, "1240"));
		childAccounts.add(new Account("在建工程", 存貨, "1244"));
		childAccounts.add(new Account("在途商品", 存貨, "1233"));
		childAccounts.add(new Account("副產品", 存貨, "1236"));
		childAccounts.add(new Account("備抵存貨跌價", 存貨, "1234"));
		childAccounts.add(new Account("製成品", 存貨, "1235"));
		
		AccountSubtype nonCurrentReceivables = accountSubtypeRepo.findById((long) 7)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 7"));
		Account 非流動應收票據 = new Account("非流動應收票據 / 帳款", nonCurrentReceivables, "157");
		topLevelAccounts.add(非流動應收票據);
		childAccounts.add(new Account("長期應收票據及款項 - 關係人", 非流動應收票據, "1576"));
		childAccounts.add(new Account("長期應收款", 非流動應收票據, "1572"));
		childAccounts.add(new Account("長期應收票據", 非流動應收票據, "1571"));
		childAccounts.add(new Account("催收款項 - 關係人", 非流動應收票據, "1577"));
		childAccounts.add(new Account("催收款項", 非流動應收票據, "1573"));

		AccountSubtype otherCurrentAssets = accountSubtypeRepo.findById((long) 5)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
		Account 其他流動資產 = new Account("其他流動資產", otherCurrentAssets, "128");
		topLevelAccounts.add(其他流動資產);
		Account 預付款項 = new Account("預付款項", otherCurrentAssets, "126");
		topLevelAccounts.add(預付款項);
		childAccounts.add(new Account("備供出售金融資產 - 流動", 其他流動資產, "113"));
		childAccounts.add(new Account("無活絡市場之債務工具投資 - 流動", 其他流動資產, "115"));
		childAccounts.add(new Account("本期所得稅資產", 其他流動資產, "122"));
		childAccounts.add(new Account("生物資產 - 流動", 其他流動資產, "125"));
		childAccounts.add(new Account("透過損益按公允價值衡量之金融資產 - 流動", 其他流動資產, "112"));
		childAccounts.add(new Account("應收建造合約款", 其他流動資產, "120"));
		childAccounts.add(new Account("員工借支", 其他流動資產, "1283"));
		childAccounts.add(new Account("避險之衍生金融資產 - 流動", 其他流動資產, "117"));
		childAccounts.add(new Account("以成本衡量之金融資產 - 流動", 其他流動資產, "114"));
		childAccounts.add(new Account("存出保證金 - 流動", 其他流動資產, "1284"));
		childAccounts.add(new Account("其他應收款 - 流動", 其他流動資產, "121"));
		childAccounts.add(new Account("代付款", 其他流動資產, "1282"));
		childAccounts.add(new Account("暫付款", 其他流動資產, "1281"));
		childAccounts.add(new Account("持有至到期日金融資產 - 流動", 其他流動資產, "116"));
		childAccounts.add(new Account("用品盤存", 預付款項, "1264"));
		childAccounts.add(new Account("預付投資款", 預付款項, "1267"));
		childAccounts.add(new Account("留抵稅額", 預付款項, "1269"));
		childAccounts.add(new Account("預付保險費", 預付款項, "1263"));
		childAccounts.add(new Account("預付租金", 預付款項, "1262"));
		childAccounts.add(new Account("其他預付款項", 預付款項, "1270"));
		childAccounts.add(new Account("進項稅額", 預付款項, "1268"));
		childAccounts.add(new Account("預付貨款", 預付款項, "1266"));
		childAccounts.add(new Account("預付款項", 預付款項, "1261"));
		childAccounts.add(new Account("其他預付費用", 預付款項, "1265"));
		
		AccountSubtype otherNonCurrentAssets = accountSubtypeRepo.findById((long) 10)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 10"));
		Account 其他非流動資產 = new Account("其他非流動資產", otherNonCurrentAssets, "157 - 158");
		topLevelAccounts.add(其他非流動資產);
		childAccounts.add(new Account("備抵呆帳 - 長期應收關係人票據及款項", 其他非流動資產, "1588"));
		childAccounts.add(new Account("預付設備款", 其他非流動資產, "1582"));
		childAccounts.add(new Account("備抵呆帳 - 催收款項", 其他非流動資產, "1575"));
		childAccounts.add(new Account("持有至到期日金融資產 - 非流動", 其他非流動資產, "135"));
		childAccounts.add(new Account("同業往來", 其他非流動資產, "1585"));
		childAccounts.add(new Account("以成本衡量之金融資產 - 非流動", 其他非流動資產, "133"));
		childAccounts.add(new Account("人壽保險現金解約價值", 其他非流動資產, "1587"));
		childAccounts.add(new Account("備供出售金融資產 - 非流動", 其他非流動資產, "132"));
		childAccounts.add(new Account("無活絡市場之債務工具投資 - 非流動", 其他非流動資產, "134"));
		childAccounts.add(new Account("生物資產 - 非流動", 其他非流動資產, "148"));
		childAccounts.add(new Account("存出保證金 - 非流動", 其他非流動資產, "1583"));
		childAccounts.add(new Account("遞延所得稅資產", 其他非流動資產, "156"));
		childAccounts.add(new Account("採用權益法之投資", 其他非流動資產, "137"));
		childAccounts.add(new Account("避險之衍生金融資產 - 非流動", 其他非流動資產, "136"));
		childAccounts.add(new Account("備抵呆帳 - 催收關係人款項", 其他非流動資產, "1589"));
		childAccounts.add(new Account("預付退休金", 其他非流動資產, "1581"));
		childAccounts.add(new Account("預付投資款", 其他非流動資產, "1580"));
		childAccounts.add(new Account("礦產資源淨額", 其他非流動資產, "147"));
		childAccounts.add(new Account("其他非流動資產 - 其他", 其他非流動資產, "1586"));
		childAccounts.add(new Account("備抵呆帳 - 長期應收票據及款項", 其他非流動資產, "1574"));
		childAccounts.add(new Account("長期預付保險費", 其他非流動資產, "1579"));
		childAccounts.add(new Account("透過損益按公允價值衡量之金融資產", 其他非流動資產, "131"));
		childAccounts.add(new Account("長期預付租金", 其他非流動資產, "1578"));
		childAccounts.add(new Account("業主 (股東) 往來", 其他非流動資產, "1584"));

		AccountSubtype propertyPlantEquipment = accountSubtypeRepo.findById((long) 8)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 8"));
		Account 投資性不動產 = new Account("投資性不動產", propertyPlantEquipment, "138");
		topLevelAccounts.add(投資性不動產);
		Account 不動產廠房及設備 = new Account("不動產、廠房及設備", propertyPlantEquipment, "139 - 146");
		topLevelAccounts.add(不動產廠房及設備);
		childAccounts.add(new Account("累計減損 - 生產性植 物", 不動產廠房及設備, "1468"));
		childAccounts.add(new Account("未完工程及待驗設備", 不動產廠房及設備, "1464"));
		childAccounts.add(new Account("機器設備 - 成本", 不動產廠房及設備, "1421"));
		childAccounts.add(new Account("土地 - 重估增值", 不動產廠房及設備, "1392"));
		childAccounts.add(new Account("累計折舊 - 機器設備", 不動產廠房及設備, "1422"));
		childAccounts.add(new Account("累計折舊 - 土地改良物", 不動產廠房及設備, "1403"));
		childAccounts.add(new Account("累計減損 - 土地", 不動產廠房及設備, "1393"));
		childAccounts.add(new Account("累計折舊 - 辦公設備", 不動產廠房及設備, "1432"));
		childAccounts.add(new Account("累計折舊 - 租賃權益改良", 不動產廠房及設備, "1462"));
		childAccounts.add(new Account("土地改良物 - 重估增值", 不動產廠房及設備, "1402"));
		childAccounts.add(new Account("累計減損 - 房屋及建築", 不動產廠房及設備, "1414"));
		childAccounts.add(new Account("土地 - 成本", 不動產廠房及設備, "1391"));
		childAccounts.add(new Account("累計減損 - 出租設備", 不動產廠房及設備, "1453"));
		childAccounts.add(new Account("累計減損 - 租賃權益改良", 不動產廠房及設備, "1463"));
		childAccounts.add(new Account("累計折舊 - 房屋及建築", 不動產廠房及設備, "1413"));
		childAccounts.add(new Account("累計減損 - 租賃資產", 不動產廠房及設備, "1443"));
		childAccounts.add(new Account("房屋及建築 - 成本", 不動產廠房及設備, "1411"));
		childAccounts.add(new Account("出租設備 - 成本", 不動產廠房及設備, "1451"));
		childAccounts.add(new Account("房屋及建築 - 重估增值", 不動產廠房及設備, "1412"));
		childAccounts.add(new Account("累計減損 - 機器設備", 不動產廠房及設備, "1423"));
		childAccounts.add(new Account("累計減損 - 辦公設備", 不動產廠房及設備, "1433"));
		childAccounts.add(new Account("租賃權益改良 - 成本", 不動產廠房及設備, "1461"));
		childAccounts.add(new Account("累計折舊 - 租賃資產", 不動產廠房及設備, "1442"));
		childAccounts.add(new Account("土地改良物 - 成本", 不動產廠房及設備, "1401"));
		childAccounts.add(new Account("生產性植物 - 成本", 不動產廠房及設備, "1466"));
		childAccounts.add(new Account("累計減損 - 土地改良物", 不動產廠房及設備, "1404"));
		childAccounts.add(new Account("租賃資產 - 成本", 不動產廠房及設備, "1441"));
		childAccounts.add(new Account("辦公設備 - 成本", 不動產廠房及設備, "1431"));
		childAccounts.add(new Account("累計折舊 - 生產性植物", 不動產廠房及設備, "1467"));
		childAccounts.add(new Account("累計折舊 - 出租設備", 不動產廠房及設備, "1452"));
		childAccounts.add(new Account("累計減損 - 投資性不動產 - 土地", 投資性不動產, "1383"));
		childAccounts.add(new Account("累計折舊 - 投資性不動產 - 建築物", 投資性不動產, "1387"));
		childAccounts.add(new Account("投資性不動產 - 土地 - 成本", 投資性不動產, "1381"));
		childAccounts.add(new Account("累計減損- 投資性不動產 - 建築物", 投資性不動產, "1388"));
		childAccounts.add(new Account("投資性不動產 - 建築物 - 重估增值", 投資性不動產, "1385"));
		childAccounts.add(new Account("投資性不動產 - 土地 - 累計公允價值變動數", 投資性不動產, "1382"));
		childAccounts.add(new Account("投資性不動產 - 建築物 - 累計公允價值變動數", 投資性不動產, "1386"));
		childAccounts.add(new Account("投資性不動產 - 建築物 - 成本", 投資性不動產, "1384"));

		AccountSubtype costOfSales = accountSubtypeRepo.findById((long) 27)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 27"));
		Account 直接人工 = new Account("直接人工", costOfSales, "514");
		topLevelAccounts.add(直接人工);
		Account 銷貨成本 = new Account("銷貨成本", costOfSales, "511");
		topLevelAccounts.add(銷貨成本);
		Account 製造費用 = new Account("製造費用", costOfSales, "515 - 516");
		topLevelAccounts.add(製造費用);
		Account 進料 = new Account("進料", costOfSales, "513");
		topLevelAccounts.add(進料);
		Account 營業費用 = new Account("營業費用", costOfSales, "611 - 613");
		topLevelAccounts.add(營業費用);
		Account 勞務成本 = new Account("勞務成本", costOfSales, "561");
		topLevelAccounts.add(勞務成本);
		Account 進貨 = new Account("進貨", costOfSales, "512");
		topLevelAccounts.add(進貨);

		childAccounts.add(new Account("捐贈", 營業費用, "6122"));
		childAccounts.add(new Account("薪資支出", 營業費用, "6111"));
		childAccounts.add(new Account("研究發展費用", 營業費用, "6130"));
		childAccounts.add(new Account("其他營業費用", 營業費用, "6134"));
		childAccounts.add(new Account("勞務費", 營業費用, "6133"));
		childAccounts.add(new Account("稅捐", 營業費用, "6123"));
		childAccounts.add(new Account("訓練費", 營業費用, "6132"));
		childAccounts.add(new Account("廣告費", 營業費用, "6118"));
		childAccounts.add(new Account("文具用品", 營業費用, "6113"));
		childAccounts.add(new Account("修繕費", 營業費用, "6117"));
		childAccounts.add(new Account("呆帳損失", 營業費用, "6124"));
		childAccounts.add(new Account("租金支出", 營業費用, "6112"));
		childAccounts.add(new Account("伙食費", 營業費用, "6128"));
		childAccounts.add(new Account("水電瓦斯費", 營業費用, "6119"));
		childAccounts.add(new Account("外銷損失", 營業費用, "6127"));
		childAccounts.add(new Account("郵電費", 營業費用, "6116"));
		childAccounts.add(new Account("保險費", 營業費用, "6120"));
		childAccounts.add(new Account("職工福利", 營業費用, "6129"));
		childAccounts.add(new Account("運費", 營業費用, "6115"));
		childAccounts.add(new Account("旅費", 營業費用, "6114"));
		childAccounts.add(new Account("交際費", 營業費用, "6121"));
		childAccounts.add(new Account("佣金支出", 營業費用, "6131"));

		childAccounts.add(new Account("其他製造費用", 製造費用, "5169"));
		childAccounts.add(new Account("製造費用 - 訓練費", 製造費用, "5167"));
		childAccounts.add(new Account("製造費用 - 郵電費", 製造費用, "5156"));
		childAccounts.add(new Account("製造費用 - 保險費", 製造費用, "5160"));
		childAccounts.add(new Account("製造費用 - 運費", 製造費用, "5155"));
		childAccounts.add(new Account("製造費用 - 租金支出", 製造費用, "5152"));
		childAccounts.add(new Account("製造費用 - 伙食費", 製造費用, "5165"));
		childAccounts.add(new Account("製造費用 - 水電瓦斯費", 製造費用, "5159"));
		childAccounts.add(new Account("製造費用 - 稅捐", 製造費用, "5162"));
		childAccounts.add(new Account("製造費用 - 間接材料", 製造費用, "5168"));
		childAccounts.add(new Account("製造費用 - 包裝費", 製造費用, "5158"));
		childAccounts.add(new Account("製造費用 - 修繕費", 製造費用, "5157"));
		childAccounts.add(new Account("製造費用 - 職工福利", 製造費用, "5166"));
		childAccounts.add(new Account("製造費用 - 旅費", 製造費用, "5154"));
		childAccounts.add(new Account("間接人工", 製造費用, "5151"));
		childAccounts.add(new Account("製造費用 - 文具用品", 製造費用, "5153"));
		childAccounts.add(new Account("製造費用 - 加工費", 製造費用, "5161"));

		childAccounts.add(new Account("進料退出", 進料, "5133"));
		childAccounts.add(new Account("進料費用", 進料, "5132"));
		childAccounts.add(new Account("進料折讓", 進料, "5134"));
		childAccounts.add(new Account("進料", 進料, "5131"));
		
		childAccounts.add(new Account("進貨退出", 進貨, "5123"));
		childAccounts.add(new Account("進貨", 進貨, "5121"));
		childAccounts.add(new Account("進貨折讓", 進貨, "5124"));
		childAccounts.add(new Account("進貨費用", 進貨, "5122"));

		childAccounts.add(new Account("銷貨成本", 銷貨成本, "5111"));
		childAccounts.add(new Account("分期付款銷貨成本", 銷貨成本, "5112"));

		AccountSubtype depreciationAndAmortization = accountSubtypeRepo.findById((long) 30)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 30"));
		Account 折舊及攤銷 = new Account("折舊及攤銷", depreciationAndAmortization);
		topLevelAccounts.add(折舊及攤銷);
		childAccounts.add(new Account("折舊", 折舊及攤銷, "6125"));
		childAccounts.add(new Account("各項耗竭及攤提", 折舊及攤銷, "6126"));
		childAccounts.add(new Account("製造費用 - 折舊", 折舊及攤銷, "5163"));
		childAccounts.add(new Account("製造費用 - 各項耗竭及攤提", 折舊及攤銷, "5164"));

		AccountSubtype expenseFromFinancing = accountSubtypeRepo.findById((long) 32)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 32"));
		Account 金融活動之費用 = new Account("金融活動之費用", expenseFromFinancing);
		topLevelAccounts.add(金融活動之費用);
		childAccounts.add(new Account("兌換損失", 金融活動之費用, "7182"));
		
		AccountSubtype expenseFromInvesting = accountSubtypeRepo.findById((long) 31)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 31"));
		Account 投資活動之費用 = new Account("投資活動之費用", expenseFromInvesting);
		topLevelAccounts.add(投資活動之費用);
		childAccounts.add(new Account("處分投資性不動產損失", 投資活動之費用, "7192"));
		childAccounts.add(new Account("處分投資損失", 投資活動之費用, "7194"));

		AccountSubtype interestExpense = accountSubtypeRepo.findById((long) 33)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 33"));
		Account 利息費用 = new Account("利息費用", interestExpense, "715");
		topLevelAccounts.add(利息費用);
		
		AccountSubtype nonRecurringItems = accountSubtypeRepo.findById((long) 35)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 35"));
		Account 非經常性項目 = new Account("非經常性項目", nonRecurringItems);
		topLevelAccounts.add(非經常性項目);
		childAccounts.add(new Account("其他營業外費損", 非經常性項目, "724"));
		childAccounts.add(new Account("採權益法認列之投資損失", 非經常性項目, "7172"));
		childAccounts.add(new Account("處分不動產、廠房及設備損失", 非經常性項目, "7202"));
		childAccounts.add(new Account("透過損益按公允價值衡量之金融資產(負債)損失", 非經常性項目, "7162"));
		childAccounts.add(new Account("減損損失", 非經常性項目, "721"));

		AccountSubtype taxExpense = accountSubtypeRepo.findById((long) 34)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 34"));
		Account 賦稅費用 = new Account("賦稅費用", taxExpense, "821");
		topLevelAccounts.add(賦稅費用);
		childAccounts.add(new Account("營業稅金", 賦稅費用));
		childAccounts.add(new Account("營所稅金", 賦稅費用, "8211"));

		AccountSubtype incomeFromFinancing = accountSubtypeRepo.findById((long) 26)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 26"));
		Account 金融活動之收入 = new Account("金融活動之收入", incomeFromFinancing, "711, 718");
		topLevelAccounts.add(金融活動之收入);
		childAccounts.add(new Account("兌換利益", 金融活動之收入, "7181"));
		childAccounts.add(new Account("利息收入", 金融活動之收入, "7111"));

		AccountSubtype incomeFromInvesting = accountSubtypeRepo.findById((long) 25)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 25"));
		Account 投資活動之收入 = new Account("投資活動之收入", incomeFromInvesting, "714, 719");
		topLevelAccounts.add(投資活動之收入);
		childAccounts.add(new Account("處分投資利益", 投資活動之收入, "7193"));
		childAccounts.add(new Account("股利收入", 投資活動之收入, "7141"));
		childAccounts.add(new Account("處分投資性不動產利益", 投資活動之收入, "7191"));

		AccountSubtype revenue = accountSubtypeRepo.findById((long) 24)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 24"));
		Account 銷貨收入 = new Account ("銷貨收入", revenue, "411");
		topLevelAccounts.add(銷貨收入);
		Account 工程收入 = new Account ("工程收入", revenue, "413 - 423");
		topLevelAccounts.add(工程收入);
		Account 其他營業收入 = new Account ("其他營業收入", revenue, "414");
		topLevelAccounts.add(其他營業收入);
		Account 勞務收入 = new Account ("勞務收入", revenue, "412");
		topLevelAccounts.add(勞務收入);
		Account 營業外收益 = new Account ("營業外收益", revenue, "71, 72");
		topLevelAccounts.add(營業外收益);

		childAccounts.add(new Account("工程收入退回及折讓", 工程收入, "4232"));
		childAccounts.add(new Account("工程收入", 工程收入, "4131"));
		
		childAccounts.add(new Account("採權益法認列之投資利益", 營業外收益, "7171"));
		childAccounts.add(new Account("權利金收入", 營業外收益, "7131"));
		childAccounts.add(new Account("處分不動產、廠房及設 備利益", 營業外收益, "7201"));
		childAccounts.add(new Account("減損迴轉利益", 營業外收益, "722"));
		childAccounts.add(new Account("其他營業外收益", 營業外收益, "723"));
		childAccounts.add(new Account("租金收入", 營業外收益, "7121"));
		childAccounts.add(new Account("透過損益按公允價值衡量之金融資產(負債)利益", 營業外收益, "7161"));

		childAccounts.add(new Account("銷貨退回", 銷貨收入, "4113"));
		childAccounts.add(new Account("銷貨收入", 銷貨收入, "4111"));
		childAccounts.add(new Account("銷貨折讓", 銷貨收入, "4114"));
		childAccounts.add(new Account("分期付款銷貨收入", 銷貨收入, "4112"));

		AccountSubtype currentPayables = accountSubtypeRepo.findById((long) 11)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 11"));
		Account 應付票據短期 = new Account("應付票據 - 短期", currentPayables, "216");
		topLevelAccounts.add(應付票據短期);
		Account 應付短期票券 = new Account("應付短期票券", currentPayables, "212");
		topLevelAccounts.add(應付短期票券);
		Account 流動應付帳款 = new Account("流動應付帳款", currentPayables, "217");
		topLevelAccounts.add(流動應付帳款);
		
		childAccounts.add(new Account("應付商業本票", 應付短期票券, "2121"));
		childAccounts.add(new Account("應付短期票券折價", 應付短期票券, "2124"));
		childAccounts.add(new Account("銀行承兌匯票", 應付短期票券, "2122"));
		childAccounts.add(new Account("其他應付短期票券", 應付短期票券, "2123"));
		
		childAccounts.add(new Account("短期應付票據 - 關係人", 應付票據短期, "2162"));
		childAccounts.add(new Account("其他短期應付票據", 應付票據短期, "2163"));
		childAccounts.add(new Account("短期應付票據", 應付票據短期, "2161"));

		childAccounts.add(new Account("應付帳款", 流動應付帳款, "2171"));
		childAccounts.add(new Account("應付帳款 - 關係人", 流動應付帳款, "2173"));
		childAccounts.add(new Account("應付租賃款 - 流動", 流動應付帳款, "2172"));

		AccountSubtype deferredTax = accountSubtypeRepo.findById((long) 15)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 15"));
		Account 遞延所得稅 = new Account("遞延所得稅", deferredTax, "238");
		topLevelAccounts.add(遞延所得稅);
		childAccounts.add(new Account("遞延所得稅負債 - 土地增值稅", 遞延所得稅, "2381"));
		childAccounts.add(new Account("遞延所得稅負債  所得稅", 遞延所得稅, "2382"));

		AccountSubtype longTermDebt = accountSubtypeRepo.findById((long) 17)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 17"));
		Account 應付公司債 = new Account("應付公司債", longTermDebt, "234");
		topLevelAccounts.add(應付公司債);
		Account 長期借款 = new Account("長期借款", longTermDebt, "235");
		topLevelAccounts.add(長期借款);
		childAccounts.add(new Account("應付公司債溢(折)價", 應付公司債, "2342"));
		childAccounts.add(new Account("應付公司債 - 長期", 應付公司債, "2341"));
		
		childAccounts.add(new Account("長期借款 - 員工", 長期借款, "2353"));
		childAccounts.add(new Account("長期銀行借款", 長期借款, "2351"));
		childAccounts.add(new Account("長期借款 - 業主", 長期借款, "2352"));
		childAccounts.add(new Account("長期借款 - 關係人", 長期借款, "2354"));
		childAccounts.add(new Account("長期借款 - 其他", 長期借款, "2355"));

		AccountSubtype longTermPayables = accountSubtypeRepo.findById((long) 18)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 18"));
		Account 長期應付票據及款項 = new Account("長期應付票據及款項", longTermPayables, "236");
		topLevelAccounts.add(長期應付票據及款項);
		childAccounts.add(new Account("其他長期應付款項", 長期應付票據及款項, "2365"));
		childAccounts.add(new Account("長期應付帳款", 長期應付票據及款項, "2362"));
		childAccounts.add(new Account("長期應付票據", 長期應付票據及款項, "2361"));
		childAccounts.add(new Account("長期應付票據及款項 - 關係人", 長期應付票據及款項, "2364"));
		childAccounts.add(new Account("應付租賃款 - 非流動", 長期應付票據及款項, "2363"));

		AccountSubtype otherCurrentLiabilities = accountSubtypeRepo.findById((long) 16)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 16"));
		Account 其他應付款 = new Account("其他應付款", otherCurrentLiabilities, "218 - 221");
		topLevelAccounts.add(其他應付款);
		Account 其他流動負債 = new Account("其他流動負債", otherCurrentLiabilities, "225");
		topLevelAccounts.add(其他流動負債);
		Account 負債準備流動 = new Account("負債準備 - 流動", otherCurrentLiabilities, "224");
		topLevelAccounts.add(負債準備流動);
		
		childAccounts.add(new Account("其他應付款 - 其他", 其他應付款, "2206"));
		childAccounts.add(new Account("其他應付費用", 其他應付款, "2197"));
		childAccounts.add(new Account("其他應付款 - 關係人", 其他應付款, "2200"));
		childAccounts.add(new Account("應付董監事酬勞", 其他應付款, "2203"));
		childAccounts.add(new Account("應付薪資", 其他應付款, "2191"));
		childAccounts.add(new Account("應付建造合約款", 其他應付款, "218"));
		childAccounts.add(new Account("本期所得稅負債", 其他應付款, "2211"));
		childAccounts.add(new Account("應付利息", 其他應付款, "2193"));
		childAccounts.add(new Account("其他應付款 - 股份基礎給付", 其他應付款, "2205"));
		childAccounts.add(new Account("應付租金", 其他應付款, "2192"));
		childAccounts.add(new Account("應付退休金費用", 其他應付款, "2196"));
		childAccounts.add(new Account("應付土地房屋款", 其他應付款, "2198"));
		childAccounts.add(new Account("應付股利", 其他應付款, "2201"));
		childAccounts.add(new Account("應付設備款", 其他應付款, "2199"));
		childAccounts.add(new Account("應付稅捐 - 其他", 其他應付款, "2195"));
		childAccounts.add(new Account("應付營業稅", 其他應付款, "2194"));
		childAccounts.add(new Account("應付員工酬勞", 其他應付款, "2202"));
		childAccounts.add(new Account("銷項稅額", 其他應付款, "2204"));

		childAccounts.add(new Account("預收收入 - 流動", 其他流動負債, "2222"));
		childAccounts.add(new Account("透過損益按公允價值衡量之金融負債 - 流動", 其他流動負債, "213"));
		childAccounts.add(new Account("暫收款", 其他流動負債, "2251"));
		childAccounts.add(new Account("避險之衍生金融負債 - 流動", 其他流動負債, "214"));
		childAccounts.add(new Account("以成本衡量之金融負債 - 流動", 其他流動負債, "215"));
		childAccounts.add(new Account("其他預收款 - 流動", 其他流動負債, "2223"));
		childAccounts.add(new Account("代收款", 其他流動負債, "2252"));
		childAccounts.add(new Account("預收貨款 - 流動", 其他流動負債, "2221"));

		childAccounts.add(new Account("除役、復原及修復成本之短期負債準備", 負債準備流動, "2243"));
		childAccounts.add(new Account("虧損性合約之短期負債準備", 負債準備流動, "2242"));
		childAccounts.add(new Account("其他短期負債準備", 負債準備流動, "2246"));
		childAccounts.add(new Account("保證合約之短期負債準備", 負債準備流動, "2244"));
		childAccounts.add(new Account("銷貨退回及折讓之短期負債準備", 負債準備流動, "2245"));
		childAccounts.add(new Account("保固之短期負債準備", 負債準備流動, "2241"));

		AccountSubtype otherNonCurrentLiabilities = accountSubtypeRepo.findById((long) 19)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 19"));
		Account 負債準備非流動 = new Account("負債準備 - 非流動", otherNonCurrentLiabilities, "237");
		topLevelAccounts.add(負債準備非流動);
		Account 其他非流動負債 = new Account("其他非流動負債", otherNonCurrentLiabilities, "239");
		topLevelAccounts.add(其他非流動負債);
		
		childAccounts.add(new Account("遞延收入", 其他非流動負債, "2391"));
		childAccounts.add(new Account("同業往來", 其他非流動負債, "2394"));
		childAccounts.add(new Account("存入保證金", 其他非流動負債, "2392"));
		childAccounts.add(new Account("業主(股東)往來", 其他非流動負債, "2393"));
		childAccounts.add(new Account("以成本衡量之金融負債 - 非流動", 其他非流動負債, "233"));
		childAccounts.add(new Account("避險之衍生金融負債 - 非流動", 其他非流動負債, "232"));
		childAccounts.add(new Account("其他非流動負債 - 股份基礎給付", 其他非流動負債, "2395"));
		childAccounts.add(new Account("透過損益按公允價值 衡量之金融負債 - 非流動", 其他非流動負債, "231"));

		childAccounts.add(new Account("除役、復原及修復成本之長期負債準備", 負債準備非流動, "2372"));
		childAccounts.add(new Account("保固之長期負債準備", 負債準備非流動, "2374"));
		childAccounts.add(new Account("保證合約之長期負債準備", 負債準備非流動, "2373"));
		childAccounts.add(new Account("虧損性合約之長期負債準備", 負債準備非流動, "2371"));

		AccountSubtype shortTermDebt = accountSubtypeRepo.findById((long) 14)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 14"));
		Account 一年內到期長期負債 = new Account("一年內到期長期負債", shortTermDebt, "223");
		topLevelAccounts.add(一年內到期長期負債);
		Account 短期借款 = new Account("短期借款", shortTermDebt, "211");
		topLevelAccounts.add(短期借款);
		childAccounts.add(new Account("一年內到期其他長期負債", 一年內到期長期負債, "2235"));
		childAccounts.add(new Account("一年內到期應付公司債", 一年內到期長期負債, "2231"));
		childAccounts.add(new Account("一年內到期長期借款", 一年內到期長期負債, "2232"));
		childAccounts.add(new Account("一年內到期長期應付票據及款項 - 關係人", 一年內到期長期負債, "2234"));
		childAccounts.add(new Account("一年內到期長期應付票據及款項", 一年內到期長期負債, "2233"));

		childAccounts.add(new Account("銀行透支", 短期借款, "2111"));
		childAccounts.add(new Account("銀行借款", 短期借款, "2112"));
		childAccounts.add(new Account("短期借款 - 員工", 短期借款, "2114"));
		childAccounts.add(new Account("短期借款 - 業主", 短期借款, "2113"));
		childAccounts.add(new Account("短期借款 - 其他", 短期借款, "2116"));
		childAccounts.add(new Account("短期借款 - 關係人", 短期借款, "2115"));

		AccountSubtype otherEquityItems = accountSubtypeRepo.findById((long) 23)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 23"));
		Account 其他權益 = new Account("其他權益", otherEquityItems, "341");
		topLevelAccounts.add(其他權益);
		Account 資本公積 = new Account("資本公積", otherEquityItems, "321");
		topLevelAccounts.add(資本公積);
		Account 庫藏股票 = new Account("庫藏股票", otherEquityItems, "351");
		topLevelAccounts.add(庫藏股票);
		
		childAccounts.add(new Account("未實現重估增值", 其他權益, "3414"));
		childAccounts.add(new Account("現金流量避險中屬有效避險部分之避險工具損益", 其他權益, "3412"));
		childAccounts.add(new Account("其他權益 - 其他", 其他權益, "3415"));
		childAccounts.add(new Account("國外營運機構財務報表換算之兌換差額", 其他權益, "3413"));
		childAccounts.add(new Account("備供出售金融資產未實現損益", 其他權益, "3411"));

		childAccounts.add(new Account("資本公積 - 特別股股票溢價", 資本公積, "3212"));
		childAccounts.add(new Account("資本公積 - 庫藏股票交易", 資本公積, "3213"));
		childAccounts.add(new Account("資本公積 - 普通股股票溢價", 資本公積, "3211"));
		childAccounts.add(new Account("資本公積 - 其他", 資本公積, "3220"));
		childAccounts.add(new Account("資本公積 - 認列對子公司所有權權益變動數", 資本公積, "3218"));
		childAccounts.add(new Account("資本公積 - 認股權", 資本公積, "3219"));
		childAccounts.add(new Account("資本公積 - 採用權益法認列關聯企業及合資股權淨值變動數", 資本公積, "3216"));
		childAccounts.add(new Account("資本公積 - 實際取得或處分子公司股權價格與帳面價值差額", 資本公積, "3217"));
		childAccounts.add(new Account("資本公積 - 受贈資產", 資本公積, "3215"));
		childAccounts.add(new Account("資本公積 - 股份基礎給付", 資本公積, "3214"));

		AccountSubtype paidInCapital = accountSubtypeRepo.findById((long) 20)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 20"));
		Account 資本或股本 = new Account("資本(或股本)", paidInCapital, "311");
		topLevelAccounts.add(資本或股本);
		
		childAccounts.add(new Account("普通股股本", 資本或股本, "3111"));
		childAccounts.add(new Account("特別股股本", 資本或股本, "3112"));
		childAccounts.add(new Account("預收股本", 資本或股本, "3113"));
		childAccounts.add(new Account("待分配股票股利", 資本或股本, "3114"));
		/* end creation of COA*/
		
		//save accounts
		for (Account account : topLevelAccounts) {
			account.setOrganization(organization);
		}
		for (Account account : childAccounts) {
			account.setOrganization(organization);
		}
		accountRepo.saveAll(topLevelAccounts);
		accountRepo.saveAll(childAccounts);
	}
	
	private void autoPopulatePersonal(Organization organization, String locale) throws ResourceNotFoundException {
		switch (locale) {
			case "zh-TW": {
				autoPopulatePersonalZhTW(organization);
				break;
			}
			case "en-US":
			default: {
				autoPopulatePersonalEnUS(organization);
				break;
			}
		}
	}
	
	private void autoPopulatePersonalZhTW(Organization organization) throws ResourceNotFoundException {
		AccountSubtype otherCurrentAssets = accountSubtypeRepo.findById((long) 5)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
		AccountSubtype otherCurrentLiabilities = accountSubtypeRepo.findById((long) 16)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 16"));
		AccountSubtype revenue = accountSubtypeRepo.findById((long) 24)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 24"));
		AccountSubtype costOfSales = accountSubtypeRepo.findById((long) 27)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 27"));
		ArrayList<Account> topLevelAccounts = new ArrayList<Account>();
		ArrayList<Account> childAccounts = new ArrayList<Account>();
		
		Account 現金 = new Account("現金", otherCurrentAssets, "00");
		topLevelAccounts.add(現金);
		Account 活期存款 = new Account("活期存款", otherCurrentAssets, "01");
		topLevelAccounts.add(活期存款);
		Account 定期存款 = new Account("定期存款", otherCurrentAssets, "02");
		topLevelAccounts.add(定期存款);
		childAccounts.add(new Account("XX銀行 - 定存帳戶", 定期存款, "021"));
		childAccounts.add(new Account("XX銀行 - 活存帳戶", 活期存款, "011"));
		
		Account 醫 = new Account("醫", costOfSales, "07");
		topLevelAccounts.add(醫);
		Account 行 = new Account("行", costOfSales, "04");
		topLevelAccounts.add(行);
		Account 住 = new Account("住", costOfSales, "03");
		topLevelAccounts.add(住);
		Account 稅 = new Account("稅", costOfSales, "09");
		topLevelAccounts.add(稅);
		Account 食 = new Account("食", costOfSales, "01");
		topLevelAccounts.add(食);
		Account 未分類支出 = new Account("未分類支出", costOfSales);
		topLevelAccounts.add(未分類支出);
		Account 樂 = new Account("樂", costOfSales, "06");
		topLevelAccounts.add(樂);
		Account 孝 = new Account("孝", costOfSales, "08");
		topLevelAccounts.add(孝);
		Account 育 = new Account("育", costOfSales, "05");
		topLevelAccounts.add(育);
		Account 衣 = new Account("衣", costOfSales, "02");
		topLevelAccounts.add(衣);

		childAccounts.add(new Account("住 - 房貸利息", 住, "033"));
		childAccounts.add(new Account("住 - 修繕", 住, "034"));
		childAccounts.add(new Account("住 - 其他", 住, "039"));
		childAccounts.add(new Account("住 - 居家用品", 住, "031"));
		childAccounts.add(new Account("住 - 房租", 住, "032"));

		childAccounts.add(new Account("育 - 書", 育, "053"));
		childAccounts.add(new Account("育 - 其他", 育, "059"));
		childAccounts.add(new Account("育 - 學費", 育, "051"));
		childAccounts.add(new Account("育 - 補習費", 育, "052"));

		childAccounts.add(new Account("行 - 停車費", 行, "043"));
		childAccounts.add(new Account("行 - 油費", 行, "042"));
		childAccounts.add(new Account("行 - 其他", 行, "049"));
		childAccounts.add(new Account("行 - 維修保養", 行, "044"));
		childAccounts.add(new Account("行 - 交通費", 行, "041"));

		childAccounts.add(new Account("食 - 買菜", 食, "011"));
		childAccounts.add(new Account("食 - 其他", 食, "019"));
		childAccounts.add(new Account("食 - 外食", 食, "012"));

		Account 其它收入 = new Account("其它收入", revenue);
		topLevelAccounts.add(其它收入);
		Account 工作 = new Account("工作", revenue, "01");
		topLevelAccounts.add(工作);
		Account 投資 = new Account("投資", revenue, "02");
		topLevelAccounts.add(投資);
		
		childAccounts.add(new Account("薪水（XX公司）", 工作, "011"));
		childAccounts.add(new Account("奬金（XX公司）", 工作, "012"));

		childAccounts.add(new Account("資本利得", 投資, "0201"));
		childAccounts.add(new Account("利息收入", 投資, "0299"));
		
		Account 信用卡 = new Account("信用卡", otherCurrentLiabilities, "01");
		topLevelAccounts.add(信用卡);
		Account 貸款 = new Account("貸款", otherCurrentLiabilities, "02");
		topLevelAccounts.add(貸款);

		childAccounts.add(new Account("XX現金回饋卡", 信用卡, "011"));
		childAccounts.add(new Account("XX銀行車貸", 貸款, "022"));
		childAccounts.add(new Account("XX銀行房貸", 貸款, "021"));

		for (Account account : topLevelAccounts) {
			account.setOrganization(organization);
		}
		accountRepo.saveAll(topLevelAccounts);
		for (Account account : childAccounts) {
			account.setOrganization(organization);
		}
		accountRepo.saveAll(childAccounts);
	}

	private void autoPopulatePersonalEnUS(Organization organization) throws ResourceNotFoundException {
		AccountSubtype otherCurrentAssets = accountSubtypeRepo.findById((long) 5)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 5"));
		AccountSubtype otherCurrentLiabilities = accountSubtypeRepo.findById((long) 16)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 16"));
		AccountSubtype revenue = accountSubtypeRepo.findById((long) 24)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 24"));
		AccountSubtype costOfSales = accountSubtypeRepo.findById((long) 27)
				.orElseThrow(() -> new ResourceNotFoundException("Cannot find an account subtype for this id: 27"));
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
