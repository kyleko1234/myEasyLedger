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
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.AccountTypeRepository;

@RestController
@RequestMapping("/v0.1")
public class AccountSubtypeController {

	private AccountSubtypeRepository accountSubtypeRepo;
	private AccountTypeRepository accountTypeRepo;

    public AccountSubtypeController (AccountSubtypeRepository accountSubtypeRepo, AccountTypeRepository accountTypeRepo) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.accountTypeRepo = accountTypeRepo;
	}

	@GetMapping("/accountSubtype")
    public List<AccountSubtype> getAllAccountSubtypes() {
        return accountSubtypeRepo.findAll();
    }

    @GetMapping("/accountSubtype/{id}")
    public ResponseEntity<AccountSubtype> getAccountSubtypeById(@PathVariable(value = "id") Long accountSubtypeId)
        throws ResourceNotFoundException {
        AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
          .orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
        return ResponseEntity.ok().body(accountSubtype);
    }
    
    @PostMapping("/accountSubtype")
    @ResponseStatus(HttpStatus.CREATED)
    public AccountSubtype createAccountSubtype(@Valid @RequestBody AccountSubtype accountSubtype) 
    	throws ResourceNotFoundException {
    	assertExistingAccountType(accountSubtype);
    	final AccountSubtype updatedAccountSubtype = accountSubtypeRepo.save(accountSubtype);
    	return updatedAccountSubtype;
    	}

    @PutMapping("/accountSubtype/{id}")
    public ResponseEntity<AccountSubtype> updateAccountSubtype(@PathVariable(value = "id") Long accountSubtypeId,
        @Valid @RequestBody AccountSubtype accountSubtypeDetails) throws ResourceNotFoundException, ConflictException {
        if (!accountSubtypeId.equals(accountSubtypeDetails.getId())) {
        	throw new ConflictException("AccountSubtype ID in request body does not match URI.");
        }
    	
    	accountSubtypeRepo.findById(accountSubtypeId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
    	assertExistingAccountType(accountSubtypeDetails);
    	final AccountSubtype updatedAccountSubtype = accountSubtypeRepo.save(accountSubtypeDetails);
        return ResponseEntity.ok(updatedAccountSubtype);
    }

    @DeleteMapping("/accountSubtype/{id}")
    public Map<String, Boolean> deleteAccountSubtype(@PathVariable(value = "id") Long accountSubtypeId)
        throws ResourceNotFoundException, ConflictException {
        AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));

        if (!accountSubtype.getAccounts().isEmpty()) {
        	throw new ConflictException("Please remove all accounts from this subtype before deleting the subtype.");
        }
        accountSubtypeRepo.delete(accountSubtype);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
    private void assertExistingAccountType (AccountSubtype accountSubtype) throws ResourceNotFoundException {
    	Long accountTypeId = accountSubtype.getAccountType().getId();
    	accountTypeRepo.findById(accountTypeId)
    		.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + accountTypeId));
    }
}
