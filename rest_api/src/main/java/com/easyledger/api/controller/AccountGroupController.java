package com.easyledger.api.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.AccountGroupBalanceDTO;
import com.easyledger.api.dto.AccountGroupDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.repository.AccountGroupRepository;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.AccountGroupService;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.2")
public class AccountGroupController {

	private AccountGroupRepository accountGroupRepo;
	private AccountGroupService accountGroupService;
	private AccountRepository accountRepo;
	private AuthorizationService authorizationService;

    public AccountGroupController(AccountGroupRepository accountGroupRepo, AccountGroupService accountGroupService, 
    		AccountRepository accountRepo, AuthorizationService authorizationService) {
		super();
		this.accountGroupRepo = accountGroupRepo;
		this.accountGroupService = accountGroupService;
		this.accountRepo = accountRepo;
		this.authorizationService = authorizationService;
	}
    
    @Secured("ROLE_ADMIN")
	@GetMapping("/accountGroup")
    public ArrayList<AccountGroupDTO> getAllAccountGroups() {
        List<AccountGroup> accountGroups = accountGroupRepo.findAll();
        ArrayList<AccountGroupDTO> accountGroupDtos = new ArrayList<AccountGroupDTO>();
        for (AccountGroup accountGroup : accountGroups) {
        	accountGroupDtos.add(new AccountGroupDTO(accountGroup));
        }
        return accountGroupDtos;
    }

    
    @GetMapping("/accountGroup/{id}")
    public ResponseEntity<AccountGroupDTO> getAccountGroupById(@PathVariable(value = "id") Long accountGroupId, Authentication authentication)
        throws ResourceNotFoundException, UnauthorizedException {
        AccountGroup accountGroup = accountGroupRepo.findById(accountGroupId)
          .orElseThrow(() -> new ResourceNotFoundException("AccountGroup not found for this id :: " + accountGroupId));
        authorizationService.authorizeByOrganizationId(authentication, accountGroup.getOrganization().getId());
        AccountGroupDTO dto = new AccountGroupDTO(accountGroup);
        return ResponseEntity.ok().body(dto);
    }
    
    @GetMapping("/organization/{id}/accountGroup")
    public List<AccountGroupDTO> getAllAccountGroupsForOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeByOrganizationId(authentication, organizationId);
    	return accountGroupRepo.getAllAccountGroupsForOrganization(organizationId);
    }
    
    @GetMapping("/organization/{id}/accountGroupBalance")
    public List<AccountGroupBalanceDTO> getAllAccountGroupBalancesForOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeByOrganizationId(authentication, organizationId);
    	return accountGroupRepo.getAllAccountGroupBalancesForOrganization(organizationId);
    }
    
    @GetMapping("/organization/{id}/accountGroupBalance/{endDate}")
    public List<AccountGroupBalanceDTO> getAllAccountGroupBalancesForOrganizationUpToDate(@PathVariable(value = "id") Long organizationId, 
    		@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeByOrganizationId(authentication, organizationId);
    	return accountGroupRepo.getAllAccountGroupBalancesForOrganizationUpToDate(organizationId, endDate);
    }
    
    @GetMapping("/organization/{id}/accountGroupBalance/{startDate}/{endDate}")
    public List<AccountGroupBalanceDTO> getAllAccountGroupBalancesForOrganizationBetweenDates(@PathVariable(value = "id") Long organizationId, 
    		@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
    		@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeByOrganizationId(authentication, organizationId);
    	return accountGroupRepo.getAllAccountGroupBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
    }

    
    @PostMapping("/accountGroup")
    @ResponseStatus(HttpStatus.CREATED)
    public AccountGroupDTO createAccountSubtype(@Valid @RequestBody AccountGroupDTO dto, Authentication authentication) 
    	throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	if (dto.getAccountGroupId() != null) {
    		throw new ConflictException("Please do not attempt to manually create an accountGroupId.");
    	}
    	authorizationService.authorizeByOrganizationId(authentication, dto.getOrganizationId());
    	if (dto.getAccountSubtypeId() == null) {
    		throw new ConflictException("Each AccountGroup must have an AccountSubtype.");
    	}
    	AccountGroup accountGroup = accountGroupService.createAccountGroupFromDTO(dto);
    	final AccountGroup updatedAccountGroup = accountGroupRepo.save(accountGroup);
    	return new AccountGroupDTO(updatedAccountGroup);
    	}

    @PutMapping("/accountGroup/{id}")
    public ResponseEntity<AccountGroupDTO> updateAccountGroup(@PathVariable(value = "id") Long accountGroupId,
        @Valid @RequestBody AccountGroupDTO dto, Authentication authentication) throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	AccountGroup accountGroupDetails = accountGroupService.createAccountGroupFromDTO(dto);
        if (!accountGroupId.equals(accountGroupDetails.getId())) {
        	throw new ConflictException("AccountGroupId in request body does not match URI.");
        }
    	AccountGroup oldAccountGroup = accountGroupRepo.findById(accountGroupId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountGroup not found for this id :: " + accountGroupId));
    	authorizationService.authorizeByOrganizationId(authentication, dto.getOrganizationId());
    	authorizationService.authorizeByOrganizationId(authentication, oldAccountGroup.getOrganization().getId());
    	final AccountGroup updatedAccountGroup = accountGroupRepo.save(accountGroupDetails);
    	AccountGroupDTO newDto = new AccountGroupDTO(updatedAccountGroup);
        return ResponseEntity.ok(newDto);
    }

    @DeleteMapping("/accountGroup/{id}")
    public Map<String, Boolean> deleteAccountGroup(@PathVariable(value = "id") Long accountGroupId, Authentication authentication)
        throws ResourceNotFoundException, ConflictException, UnauthorizedException {
        AccountGroup accountGroup = accountGroupRepo.findById(accountGroupId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountGroup not found for this id :: " + accountGroupId));
        authorizationService.authorizeByOrganizationId(authentication, accountGroup.getOrganization().getId());
        boolean accountGroupContainsAccounts = accountRepo.accountGroupContainsAccounts(accountGroupId);
        if (accountGroupContainsAccounts) {
        	throw new ConflictException("Please remove all accounts from this AccountGroup before deleting the AccountGroup.");
        }
        accountGroup.setDeleted(true);
        accountGroupRepo.save(accountGroup);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}
