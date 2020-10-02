package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountTypeRepository;
import com.easyledger.api.repository.OrganizationRepository;

@Service
public class CategoryService {

	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	public CategoryService(AccountRepository accountRepo) {
		super();
		this.accountRepo = accountRepo;
	}
	
	public Category createCategoryFromDTO(CategoryDTO dto) 
			throws ResourceNotFoundException {
		Category product = new Category();
		product.setId(dto.getCategoryId());
		product.setName(dto.getCategoryName());
		Account account = accountRepo.findById(dto.getAccountId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId())); 
		product.setAccount(account);
		return product;
		
	}
	
}
