package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.easyledger.api.model.Account;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.CategoryRepository;
import com.easyledger.api.repository.LineItemRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.service.AccountService;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.1")
public class AccountController {

	private AccountRepository accountRepo;
	private LineItemRepository lineItemRepo;
	private AccountService accountService;
	private OrganizationRepository organizationRepo;
	private CategoryRepository categoryRepo;
	
    public AccountController (AccountRepository accountRepo, AccountService accountService, 
    		OrganizationRepository organizationRepo, LineItemRepository lineItemRepo, CategoryRepository categoryRepo) {
		super();
		this.accountRepo = accountRepo;
		this.accountService = accountService;
		this.organizationRepo = organizationRepo;
		this.lineItemRepo = lineItemRepo;
		this.categoryRepo = categoryRepo;
	}

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
    public ResponseEntity<AccountDTO> getAccountById(@PathVariable(value = "id") Long accountId)
        throws ResourceNotFoundException {
        Account account = accountRepo.findById(accountId)
          .orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
        AccountDTO dto = new AccountDTO(account);
        return ResponseEntity.ok().body(dto);
    }
    
    @GetMapping("/account/{id}/accountBalance")
    public AccountBalanceDTO getAccountBalanceById(@PathVariable(value = "id") Long accountId)
        throws ResourceNotFoundException {
        AccountBalanceDTO result = accountRepo.getAccountBalanceById(accountId);
        if (result == null) {
        	throw new ResourceNotFoundException("Account not found for this id :: " + accountId);
        }
        return result;
    }
    
    @GetMapping("/organization/{id}/account")
    public List<AccountDTO> getAllAccountsForOrganization(@PathVariable(value = "id") Long organizationId)
    	throws ResourceNotFoundException {
    	organizationRepo.findById(organizationId)
    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
    	return accountRepo.getAllAccountsForOrganization(organizationId);
    }
    
    @GetMapping("/organization/{id}/accountBalance")
    public List<AccountBalanceDTO> getAllAccountBalancesForOrganization(@PathVariable(value = "id") Long organizationId)
    	throws ResourceNotFoundException {
    	organizationRepo.findById(organizationId)
    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
    	return accountRepo.getAllAccountBalancesForOrganization(organizationId);
    }

    
    @PostMapping("/account")
    @ResponseStatus(HttpStatus.CREATED)
    public AccountDTO createAccount(@Valid @RequestBody AccountDTO dto) 
    	throws ResourceNotFoundException, ConflictException {
    	if (dto.getAccountId() != null) {
    		throw new ConflictException("Please do not attempt to manually create an account id.");
    	}
    	Account account = accountService.createAccountFromDTO(dto);
    	final Account updatedAccount = accountRepo.save(account);
    	return new AccountDTO(updatedAccount);
    	}

    @PutMapping("/account/{id}")
    public ResponseEntity<AccountDTO> updateAccount(@PathVariable(value = "id") Long accountId,
        @Valid @RequestBody AccountDTO dto) throws ResourceNotFoundException, ConflictException {
    	Account accountDetails = accountService.createAccountFromDTO(dto);
        if (!accountId.equals(accountDetails.getId())) {
        	throw new ConflictException("Account ID in request body does not match URI.");
        }
    	accountRepo.findById(accountId)
        	.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
    	
    	final Account updatedAccount = accountRepo.save(accountDetails);
    	AccountDTO updatedDto = new AccountDTO(updatedAccount);
        return ResponseEntity.ok(updatedDto);
    }

    @DeleteMapping("/account/{id}")
    public Map<String, Boolean> deleteAccount(@PathVariable(value = "id") Long accountId)
        throws ResourceNotFoundException, ConflictException {
        Account account = accountRepo.findById(accountId)
        	.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
        boolean accountContainsCategories = categoryRepo.accountContainsCategories(accountId);
        if (accountContainsCategories) {
        	throw new ConflictException("Please remove all categories from this account before deleting the account.");
        }
        boolean accountContainsLineItems = lineItemRepo.accountContainsLineItems(accountId);
        if (accountContainsLineItems) {
        	throw new ConflictException("Please remove all line items from this account before deleting the account.");
        }
        account.setDeleted(true);
        accountRepo.save(account);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}
