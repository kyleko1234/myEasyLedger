package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountGroupDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.OrganizationRepository;

@Service
public class AccountGroupService {

	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;

	public AccountGroupService(AccountSubtypeRepository accountSubtypeRepo, OrganizationRepository organizationRepo) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.organizationRepo = organizationRepo;
	}
	
	public AccountGroup createAccountGroupFromDTO(AccountGroupDTO dto) 
			throws ResourceNotFoundException {
		AccountGroup product = new AccountGroup();
		product.setId(dto.getAccountGroupId());
		product.setName(dto.getAccountGroupName());
		AccountSubtype accountSubtype = accountSubtypeRepo.findById(dto.getAccountSubtypeId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + dto.getAccountSubtypeId())); 
		product.setAccountSubtype(accountSubtype);
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
		product.setOrganization(organization);
		return product;
		
	}
	
}
