package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountSubtypeDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountTypeRepository;

@Service
public class AccountSubtypeService {

	@Autowired
	private AccountTypeRepository accountTypeRepo;

	public AccountSubtypeService(AccountTypeRepository accountTypeRepo) {
		super();
		this.accountTypeRepo = accountTypeRepo;
	}
	
	public AccountSubtype createAccountSubtypeFromDTO(AccountSubtypeDTO dto) 
			throws ResourceNotFoundException {
		AccountSubtype product = new AccountSubtype();
		product.setId(dto.getAccountSubtypeId());
		product.setName(dto.getAccountSubtypeName());
		AccountType accountType = accountTypeRepo.findById(dto.getAccountTypeId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + dto.getAccountTypeId())); 
		product.setAccountType(accountType);
		return product;
		
	}
	
}
