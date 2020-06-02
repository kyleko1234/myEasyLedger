package com.easyledger.api.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.Entry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.CategoryRepository;
import com.easyledger.api.repository.EntryRepository;

@Service
public class LineItemService {
	
	@Autowired
	private EntryRepository entryRepo;
	
	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private CategoryRepository categoryRepo;
	
	
	
	
	public LineItemService(EntryRepository entryRepo, AccountRepository accountRepo, CategoryRepository categoryRepo) {
		this.entryRepo = entryRepo;
		this.accountRepo = accountRepo;
		this.categoryRepo = categoryRepo;
	}

	// Creates new LineItem entity object from a LineItemDTO.
	// A LineItem entity object cannot be created without a parent Entry entity object. The parent Entry should be passed as input along with the LineItemDTO.
	// Ignores the lineItemId field in the input LineItemDTO, and automatically generates a new ID when saved to the database.
	// Requires that accountId and categoryId point to valid entities within the database.
	public LineItem createLineItemFromDTO (LineItemDTO dto, Entry entry) 
			throws ResourceNotFoundException {
		System.out.println(dto);
		LineItem product = new LineItem();
		product.setIsCredit(dto.isIsCredit());
		product.setAmount(dto.getAmount());
		product.setDescription(dto.getDescription());
		
		
		Account account = accountRepo.findById(dto.getAccountId())
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId()));
		product.setAccount(account);
		
		if (dto.getCategoryId() != null) {
			Category category = categoryRepo.findById(dto.getCategoryId())
				.orElseThrow(() -> new ResourceNotFoundException("Category not found for this id :: " + dto.getAccountId()));
			product.setCategory(category);
		}
		
		product.setEntry(entry);
		
		return product;
	}
	
}