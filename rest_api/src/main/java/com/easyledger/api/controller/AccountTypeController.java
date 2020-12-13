package com.easyledger.api.controller;

import java.time.LocalDate;
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
import com.easyledger.api.viewmodel.AccountTypeSummaryViewModel;
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
    
    //get monthly account type summaries for organization with organziationId for the past (int months) months
    @GetMapping("/organization/{id}/accountTypeSummary/monthly/{numberOfMonths}")
    public List<AccountTypeSummaryViewModel> getMonthlyAccountTypeSummaries(@PathVariable(value = "id") Long organizationId, @PathVariable(value = "numberOfMonths") int months) {
    	//get current year and month as ints
    	LocalDate now = LocalDate.now();
    	int year = now.getYear();
    	int month = now.getMonthValue(); 
    	
    	//calculate how the yyyymm for the oldest returned data
    	while (months > 0) {
    		if (months >= month) {
    			months -= month;
    			month = 12;
    			year--;
    		}
    		if (months < month) {
    			month -= months;
    			months = 0;
    		}
    	}
    	
    	int yearMonth = (year * 100) + month;
    	return accountTypeRepo.getMonthlyAccountTypeSummaries(organizationId, yearMonth);
    }
   
/*    @GetMapping("/accountType/{id}/accountSubtype")
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
    }*/
}
