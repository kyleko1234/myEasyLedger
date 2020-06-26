package com.easyledger.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.AccountTypeRepository;

@RestController
@RequestMapping("/v0.1")
public class AccountController {

	private AccountRepository accountRepo;
	private AccountSubtypeRepository accountSubtypeRepo;
	private AccountTypeRepository accountTypeRepo;

    public AccountController (AccountRepository accountRepo, AccountSubtypeRepository accountSubtypeRepo,
    		AccountTypeRepository accountTypeRepo) {
		super();
		this.accountRepo = accountRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.accountTypeRepo = accountTypeRepo;
	}

	@GetMapping("/account")
    public List<Account> getAllAccounts() {
        return accountRepo.findAll();
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable(value = "id") Long accountId)
        throws ResourceNotFoundException {
        Account account = accountRepo.findById(accountId)
          .orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
        return ResponseEntity.ok().body(account);
    }
    
    @PostMapping("/account")
    @ResponseStatus(HttpStatus.CREATED)
    public Account createAccount(@Valid @RequestBody Account account) 
    	throws ResourceNotFoundException {
    	assertExistingAccountType(account);
    	assertExistingAccountSubtype(account);
    	final Account updatedAccount = accountRepo.save(account);
    	return updatedAccount;
    	}

    @PutMapping("/account/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable(value = "id") Long accountId,
        @Valid @RequestBody Account accountDetails) throws ResourceNotFoundException, ConflictException {
        if (!accountId.equals(accountDetails.getId())) {
        	throw new ConflictException("Account ID in request body does not match URI.");
        }
    	
    	accountSubtypeRepo.findById(accountId)
        	.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
    	assertExistingAccountType(accountDetails);
    	assertExistingAccountSubtype(accountDetails);
    	final Account updatedAccount = accountRepo.save(accountDetails);
        return ResponseEntity.ok(updatedAccount);
    }

    @DeleteMapping("/account/{id}")
    public Map<String, Boolean> deleteAccount(@PathVariable(value = "id") Long accountId)
        throws ResourceNotFoundException, ConflictException {
        Account account = accountRepo.findById(accountId)
        	.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));

        if (!account.getLineItems().isEmpty()) {
        	throw new ConflictException("Please remove all line items from this account before deleting the account.");
        }
        accountRepo.delete(account);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
    private void assertExistingAccountSubtype(Account account) throws ResourceNotFoundException {
    	Long accountSubtypeId = account.getAccountSubtype().getId();
    	if (accountSubtypeId != null) {
    	accountSubtypeRepo.findById(accountSubtypeId)
    		.orElseThrow(() -> new ResourceNotFoundException("Account Subtype not found for this id :: " + accountSubtypeId));
    	}
    }
    
    private void assertExistingAccountType (Account account) throws ResourceNotFoundException {
    	Long accountTypeId = account.getAccountType().getId();
    	accountTypeRepo.findById(accountTypeId)
    		.orElseThrow(() -> new ResourceNotFoundException("Account Type not found for this id :: " + accountTypeId));
    }
}
