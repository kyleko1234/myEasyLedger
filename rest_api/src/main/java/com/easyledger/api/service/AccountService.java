package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.AccountTypeRepository;

@Service
public class AccountService {

	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	@Autowired
	private AccountTypeRepository accountTypeRepo;

	public AccountService(AccountSubtypeRepository accountSubtypeRepo, AccountTypeRepository accountTypeRepo) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.accountTypeRepo = accountTypeRepo;
	}
	
	public Account createAccountFromDTO(AccountDTO dto) 
			throws ResourceNotFoundException, ConflictException {
		Account product = new Account();
		product.setId(dto.getAccountId());
		product.setName(dto.getAccountName());
		
		AccountType accountType = accountTypeRepo.findById(dto.getAccountTypeId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + dto.getAccountTypeId()));
		product.setAccountType(accountType);
		
		if (dto.getAccountSubtypeId() != null) {
			AccountSubtype accountSubtype = accountSubtypeRepo.findById(dto.getAccountSubtypeId())
		    		.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + dto.getAccountSubtypeId()));
			product.setAccountSubtype(accountSubtype);
			
			Long accountSubtypeTypeId = product.getAccountSubtype().getAccountType().getId();
			if (!accountSubtypeTypeId.equals(product.getAccountType().getId())) {
				throw new ConflictException("Account Subtype " + accountSubtypeTypeId + " is not of Account Type " + product.getAccountType().getId() + ".");
			}
		}
		
		return product;
		
	}
	
}
