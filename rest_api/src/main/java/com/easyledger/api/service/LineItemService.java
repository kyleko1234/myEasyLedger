package com.easyledger.api.service;


import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.CategoryRepository;
import com.easyledger.api.repository.JournalEntryRepository;

@Service
public class LineItemService {
	
	@Autowired
	private JournalEntryRepository journalEntryRepo;
	
	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private CategoryRepository categoryRepo;
	
	
	
	
	public LineItemService(JournalEntryRepository journalEntryRepo, AccountRepository accountRepo, CategoryRepository categoryRepo) {
		this.journalEntryRepo = journalEntryRepo;
		this.accountRepo = accountRepo;
		this.categoryRepo = categoryRepo;
	}

	// Creates new LineItem entity object from a LineItemDTO.
	// A LineItem entity object cannot be created without a parent Entry entity object. The parent Entry should be passed as input along with the LineItemDTO.
	// Ignores the lineItemId field in the input LineItemDTO, and automatically generates a new ID when saved to the database.
	// Requires that accountId and categoryId point to valid entities within the database.
	public LineItem createLineItemFromDTO (LineItemDTO dto, JournalEntry journalEntry) 
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
		
		product.setJournalEntry(journalEntry);
		
		return product;
	}
	
}