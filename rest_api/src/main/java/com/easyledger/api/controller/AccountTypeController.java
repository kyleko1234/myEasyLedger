package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.AccountSubtypeDTO;
import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.repository.AccountTypeRepository;
import com.easyledger.api.model.Category;

@RestController
@CrossOrigin("*")
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

    @GetMapping("/accountType/{id}/category")
    public HashSet<CategoryDTO> getAllCategoriesForAccountType(@PathVariable(value = "id") Long accountTypeId) 
    	throws ResourceNotFoundException {
        AccountType accountType = accountTypeRepo.findById(accountTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + accountTypeId));
        HashSet<Category> categories = new HashSet<Category>(accountType.getCategories());
        HashSet<CategoryDTO> dtos = new HashSet<CategoryDTO>();
        for (Category category : categories) {
        	dtos.add(new CategoryDTO(category));
        }
        return dtos;
    }
   
    @GetMapping("/accountType/{id}/accountSubtype")
    public HashSet<AccountSubtypeDTO> getAllSubtypesForAccountType(@PathVariable(value = "id") Long accountTypeId) 
    	throws ResourceNotFoundException {
        AccountType accountType = accountTypeRepo.findById(accountTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + accountTypeId));
        HashSet<AccountSubtype> subtypes = new HashSet<AccountSubtype>(accountType.getAccountSubtypes());
        HashSet<AccountSubtypeDTO> dtos = new HashSet<AccountSubtypeDTO>();
        for (AccountSubtype subtype : subtypes) {
        	dtos.add(new AccountSubtypeDTO(subtype));
        }
        return dtos;
    }
}
