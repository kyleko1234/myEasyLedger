package com.easyledger.api.service;


import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.repository.AccountRepository;

@Service
public class LineItemService {
		
	@Autowired
	private AccountRepository accountRepo;	
	
	public LineItemService(AccountRepository accountRepo) {
		this.accountRepo = accountRepo;
	}

	// Creates new LineItem entity object from a LineItemDTO.
	// A LineItem entity object cannot be created without a parent Entry entity object. The parent Entry should be passed as input along with the LineItemDTO.
	// Ignores the lineItemId field in the input LineItemDTO, and automatically generates a new ID when saved to the database.
	// Requires that accountId points to valid entities within the database.
	public LineItem createLineItemFromDTO (LineItemDTO dto, JournalEntry journalEntry) 
			throws ResourceNotFoundException {
		LineItem product = new LineItem();
		product.setIsCredit(dto.isIsCredit());
		product.setAmount(dto.getAmount());
		product.setDescription(dto.getDescription());
		
		
		Account account = accountRepo.findById(dto.getAccountId())
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId()));
		product.setAccount(account);
				
		product.setJournalEntry(journalEntry);
		
		return product;
	}
	
}