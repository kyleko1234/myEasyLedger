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

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Account;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.LineItemRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.AccountService;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class AccountController {

	private AccountRepository accountRepo;
	private LineItemRepository lineItemRepo;
	private AccountService accountService;
	private AuthorizationService authorizationService;
	
    public AccountController (AccountRepository accountRepo, AccountService accountService, 
    		LineItemRepository lineItemRepo, AuthorizationService authorizationService) {
		super();
		this.accountRepo = accountRepo;
		this.accountService = accountService;
		this.lineItemRepo = lineItemRepo;
		this.authorizationService = authorizationService;
	}

    @Secured("ROLE_ADMIN")
	@GetMapping("/account")
    public ArrayList<AccountDTO> getAllAccounts() {
        List<Account> accounts = accountRepo.findAll();
        ArrayList<AccountDTO> accountDtos = new ArrayList<AccountDTO>();
        for (Account account : accounts) {
        	accountDtos.add(new AccountDTO(account));
        }
        return accountDtos;
        
    }

    
    @GetMapping("/account/{id}")
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable(value = "id") Long accountId, Authentication authentication)
        throws ResourceNotFoundException, UnauthorizedException {
        Account account = accountRepo.findById(accountId)
          .orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
        AccountDTO dto = new AccountDTO(account);
        authorizationService.authorizeViewPermissionsByOrganizationId(authentication, dto.getOrganizationId());
        return ResponseEntity.ok().body(dto);
    }
    
    @GetMapping("/organization/{id}/account")
    public List<AccountDTO> getAllAccountsForOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
    	return accountRepo.getAllAccountsForOrganization(organizationId);
    }
    
    @GetMapping("/organization/{id}/accountBalance/{startDate}/{endDate}")
    public List<AccountDTO> getAllAccountBalancesForOrganizationBetweenDates(@PathVariable(value = "id") Long organizationId, 
    		@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate, 
    		@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
    	//because this is a date range, our totals should ignore initial amounts for debits and credits.
    	return accountRepo.getAllAccountBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
    }
    
    @GetMapping("/organization/{id}/accountBalance/{endDate}")
    public List<AccountBalanceDTO> getAllAccountBalancesForOrganizationUpToDate(@PathVariable(value = "id") Long organizationId, 
    		@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
    	return accountRepo.getAllAccountBalancesForOrganizationUpToDate(organizationId, endDate);
    }

    @PostMapping("/account")
    @ResponseStatus(HttpStatus.CREATED)
    public AccountDTO createAccount(@Valid @RequestBody AccountDTO dto, Authentication authentication) 
    	throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	if (dto.getAccountId() != null) {
    		throw new ConflictException("Please do not attempt to manually create an account id.");
    	}
    	Account updatedAccount = accountService.createNewAccountFromDTO(dto, authentication);
    	return new AccountDTO(updatedAccount);
    	}

    @PutMapping("/account/{id}")
    public ResponseEntity<AccountDTO> updateAccount(@PathVariable(value = "id") Long accountId,
        @Valid @RequestBody AccountDTO dto, Authentication authentication) 
        		throws ResourceNotFoundException, ConflictException, UnauthorizedException {
        if (!accountId.equals(dto.getAccountId())) {
        	throw new ConflictException("Account ID in request body does not match URI.");
        }
    	Account updatedAccount = accountService.updateAccountFromDTO(dto, authentication);

    	AccountDTO updatedDto = new AccountDTO(updatedAccount);
        return ResponseEntity.ok(updatedDto);
    }

    @DeleteMapping("/account/{id}")
    public Map<String, Boolean> deleteAccount(@PathVariable(value = "id") Long accountId, Authentication authentication)
        throws ResourceNotFoundException, ConflictException, UnauthorizedException {
        Account account = accountRepo.findById(accountId)
        	.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
        authorizationService.authorizeEditPermissionsByOrganizationId(authentication, account.getOrganization().getId());

        boolean accountContainsLineItems = lineItemRepo.accountContainsLineItems(accountId);
        if (accountContainsLineItems) {
        	throw new ConflictException("Please remove all line items from this account before deleting the account.");
        }
        if (account.isHasChildren()) {
        	throw new ConflictException("Cannot delete an account that contains child accounts.");
        }
        account.setDeleted(true);
        accountRepo.save(account);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}
