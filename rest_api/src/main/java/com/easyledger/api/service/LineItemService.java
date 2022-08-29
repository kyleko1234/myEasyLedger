package com.easyledger.api.service;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.LineItemRepository;

@Service
public class LineItemService {
		
	@Autowired
	private AccountRepository accountRepo;	
	
	@Autowired
	private LineItemRepository lineItemRepo;
	
	public LineItemService(AccountRepository accountRepo, LineItemRepository lineItemRepo) {
		this.accountRepo = accountRepo;
		this.lineItemRepo = lineItemRepo;
	}

	// Creates new LineItem entity object from a LineItemDTO.
	// A LineItem entity object cannot be created without a parent Entry entity object. The parent Entry should be passed as input along with the LineItemDTO.
	// Ignores the lineItemId field in the input LineItemDTO, and automatically generates a new ID when saved to the database.
	// Requires that accountId points to valid entities within the database.
	public LineItem createLineItemFromDTO (LineItemDTO dto, JournalEntry journalEntry) 
			throws ResourceNotFoundException, ConflictException {
		LineItem product = new LineItem();
		product.setIsCredit(dto.isIsCredit());
		product.setAmount(dto.getAmount());
		product.setDescription(dto.getDescription());
		
		//TODO: check if account actually belongs to the person editing this lineItem
		Account account = accountRepo.findById(dto.getAccountId())
				.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId()));
		if (account.isHasChildren()) {
			throw new ConflictException("Cannot insert LineItems into an account with child accounts.");
		}
		product.setAccount(account);
				
		product.setJournalEntry(journalEntry);
		
		return product;
	}
	
	public List<LineItemDTO> getLineItemsForAccountBetweenDates(Long accountId, LocalDate startDate, LocalDate endDate) {
		return lineItemRepo.getLineItemsForAccountBetweenDates(accountId, startDate, endDate);
	}
	
}