package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

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

import com.easyledger.api.dto.AccountSubtypeDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.service.AccountSubtypeService;

@RestController
@RequestMapping("/v0.1")
public class AccountSubtypeController {

	private AccountSubtypeRepository accountSubtypeRepo;
	private AccountSubtypeService accountSubtypeService;
	private AccountRepository accountRepo;

    public AccountSubtypeController(AccountSubtypeRepository accountSubtypeRepo, AccountSubtypeService accountSubtypeService, 
    		AccountRepository accountRepo) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.accountSubtypeService = accountSubtypeService;
		this.accountRepo = accountRepo;
	}

	@GetMapping("/accountSubtype")
    public ArrayList<AccountSubtypeDTO> getAllCategories() {
        List<AccountSubtype> categories = accountSubtypeRepo.findAll();
        ArrayList<AccountSubtypeDTO> accountSubtypeDtos = new ArrayList<AccountSubtypeDTO>();
        for (AccountSubtype accountSubtype : categories) {
        	accountSubtypeDtos.add(new AccountSubtypeDTO(accountSubtype));
        }
        return accountSubtypeDtos;
    }

    @GetMapping("/accountSubtype/{id}")
    public ResponseEntity<AccountSubtypeDTO> getAccountSubtypeById(@PathVariable(value = "id") Long accountSubtypeId)
        throws ResourceNotFoundException {
        AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
          .orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
        AccountSubtypeDTO dto = new AccountSubtypeDTO(accountSubtype);
        return ResponseEntity.ok().body(dto);
    }
    
    @PostMapping("/accountSubtype")
    @ResponseStatus(HttpStatus.CREATED)
    public AccountSubtypeDTO createAccountSubtype(@Valid @RequestBody AccountSubtypeDTO dto) 
    	throws ResourceNotFoundException, ConflictException {
    	if (dto.getAccountSubtypeId() != null) {
    		throw new ConflictException("Please do not attempt to manually create an accountSubtypeId.");
    	}
    	AccountSubtype accountSubtype = accountSubtypeService.createAccountSubtypeFromDTO(dto);
    	final AccountSubtype updatedAccountSubtype = accountSubtypeRepo.save(accountSubtype);
    	return new AccountSubtypeDTO(updatedAccountSubtype);
    	}

    @PutMapping("/accountSubtype/{id}")
    public ResponseEntity<AccountSubtypeDTO> updateAccountSubtype(@PathVariable(value = "id") Long accountSubtypeId,
        @Valid @RequestBody AccountSubtypeDTO dto) throws ResourceNotFoundException, ConflictException {
    	AccountSubtype accountSubtypeDetails = accountSubtypeService.createAccountSubtypeFromDTO(dto);
        if (!accountSubtypeId.equals(accountSubtypeDetails.getId())) {
        	throw new ConflictException("AccountSubtype ID in request body does not match URI.");
        }
    	
    	accountSubtypeRepo.findById(accountSubtypeId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
    	final AccountSubtype updatedAccountSubtype = accountSubtypeRepo.save(accountSubtypeDetails);
    	AccountSubtypeDTO newDto = new AccountSubtypeDTO(updatedAccountSubtype);
        return ResponseEntity.ok(newDto);
    }

    @DeleteMapping("/accountSubtype/{id}")
    public Map<String, Boolean> deleteAccountSubtype(@PathVariable(value = "id") Long accountSubtypeId)
        throws ResourceNotFoundException, ConflictException {
        AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));

        Long undeletedNumberOfAccountsForSubtype = accountRepo.countUndeletedAccountsForSubtype(accountSubtypeId);
        if (undeletedNumberOfAccountsForSubtype != 0) {
        	throw new ConflictException("Please remove all " + undeletedNumberOfAccountsForSubtype + " Accounts from this AccountSubtype before deleting the AccountSubtype.");
        }
        accountSubtype.setDeleted(true);
        accountSubtypeRepo.save(accountSubtype);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}
