package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.AccountTypeRepository;
import com.easyledger.api.repository.CategoryRepository;
import com.easyledger.api.repository.OrganizationRepository;

@Service
public class AccountService {

	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	@Autowired
	private AccountTypeRepository accountTypeRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	@Autowired
	private CategoryRepository categoryRepo;

	public AccountService(AccountSubtypeRepository accountSubtypeRepo, AccountTypeRepository accountTypeRepo,
			OrganizationRepository organizationRepo, CategoryRepository categoryRepo) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.accountTypeRepo = accountTypeRepo;
		this.organizationRepo = organizationRepo;
	}
	
	public Account createAccountFromDTO(AccountDTO dto) 
			throws ResourceNotFoundException, ConflictException {
		Account product = new Account();
		product.setId(dto.getAccountId());
		product.setName(dto.getAccountName());
		product.setDeleted(dto.isDeleted());
		
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

		Organization organization = organizationRepo.findById(dto.getOrganizationId())
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId()));
		product.setOrganization(organization);
		
		
		return product;
		
	}
	
}
