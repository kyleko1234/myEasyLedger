package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountTypeRepository;
import com.easyledger.api.repository.OrganizationRepository;

@Service
public class CategoryService {

	@Autowired
	private AccountTypeRepository accountTypeRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	public CategoryService(AccountTypeRepository accountTypeRepo, OrganizationRepository organizationRepo) {
		super();
		this.accountTypeRepo = accountTypeRepo;
		this.organizationRepo = organizationRepo;
	}
	
	public Category createCategoryFromDTO(CategoryDTO dto) 
			throws ResourceNotFoundException {
		Category product = new Category();
		product.setId(dto.getCategoryId());
		product.setName(dto.getCategoryName());
		AccountType accountType = accountTypeRepo.findById(dto.getAccountTypeId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + dto.getAccountTypeId())); 
		product.setAccountType(accountType);
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
		product.setOrganization(organization);
		return product;
		
	}
	
}
