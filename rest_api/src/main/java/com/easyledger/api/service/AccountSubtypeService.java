package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountSubtypeDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.AccountSubtypeMetadata;
import com.easyledger.api.repository.AccountTypeRepository;
import com.easyledger.api.repository.OrganizationRepository;

@Service
public class AccountSubtypeService {

	@Autowired
	private AccountTypeRepository accountTypeRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;

	public AccountSubtypeService(AccountTypeRepository accountTypeRepo, OrganizationRepository organizationRepo) {
		super();
		this.accountTypeRepo = accountTypeRepo;
		this.organizationRepo = organizationRepo;
	}
	
	public AccountSubtypeMetadata createAccountSubtypeFromDTO(AccountSubtypeDTO dto) 
			throws ResourceNotFoundException {
		AccountSubtypeMetadata product = new AccountSubtypeMetadata();
		product.setId(dto.getAccountSubtypeId());
		product.setName(dto.getAccountSubtypeName());
		AccountType accountType = accountTypeRepo.findById(dto.getAccountTypeId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + dto.getAccountTypeId())); 
		product.setAccountType(accountType);
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
		product.setOrganization(organization);
		product.setAffectsRetainedEarnings(dto.isAffectsRetainedEarnings());
		return product;
		
	}
	
}
