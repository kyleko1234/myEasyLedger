package com.easyledger.api.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.repository.AccountTypeRepository;

@RestController
@RequestMapping("/v0.1")
public class AccountTypeController {

	private AccountTypeRepository accountTypeRepo;

    public AccountTypeController(AccountTypeRepository accountTypeRepo) {
		super();
		this.accountTypeRepo = accountTypeRepo;
	}

	@GetMapping("/accountType")
    public List<AccountType> getAllCategories() {
        return accountTypeRepo.findAll();
    }

    @GetMapping("/accountType/{id}")
    public ResponseEntity<AccountType> getAccountTypeById(@PathVariable(value = "id") Long accountTypeId)
        throws ResourceNotFoundException {
        AccountType accountType = accountTypeRepo.findById(accountTypeId)
          .orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + accountTypeId));
        return ResponseEntity.ok().body(accountType);
    }

    
}
