package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Category;
import com.easyledger.api.repository.AccountTypeRepository;

@Service
public class CategoryService {

	@Autowired
	private AccountTypeRepository accountTypeRepo;

	public CategoryService(AccountTypeRepository accountTypeRepo) {
		super();
		this.accountTypeRepo = accountTypeRepo;
	}
	
	public Category createCategoryFromDTO(CategoryDTO dto) 
			throws ResourceNotFoundException {
		Category product = new Category();
		product.setId(dto.getCategoryId());
		product.setName(dto.getCategoryName());
		AccountType accountType = accountTypeRepo.findById(dto.getAccountTypeId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountType not found for this id :: " + dto.getAccountTypeId())); 
		product.setAccountType(accountType);
		return product;
		
	}
	
}
