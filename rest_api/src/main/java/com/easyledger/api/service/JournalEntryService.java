package com.easyledger.api.service;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.easyledger.api.dto.JournalEntryDTO;
import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PersonRepository;

@Service
public class JournalEntryService {
	
	@Autowired
	private PersonRepository personRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	private LineItemService lineItemService;
	
	public JournalEntryService(PersonRepository personRepo, LineItemService lineItemService, OrganizationRepository organizationRepo) {
		super();
		this.personRepo = personRepo;
		this.lineItemService = lineItemService;
		this.organizationRepo = organizationRepo;
	}

	// Creates new Entry entity object from EntryDTO. Does not save the entity to the database.
	// Will ignore any lineItemId in the EntryDTO that is passed in. LineItemIds will be automatically generated when objects are saved to database.
	public JournalEntry createJournalEntryFromDTO (JournalEntryDTO dto) 
		throws ResourceNotFoundException {
		JournalEntry product = new JournalEntry();
		product.setJournalEntryDate(dto.getJournalEntryDate());
		product.setDescription(dto.getDescription());
		product.setId(dto.getJournalEntryId());
		if (dto.getPersonId() != null) {
			Person person = personRepo.findById(dto.getPersonId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + dto.getPersonId())); 
			product.setPerson(person);
		}
		if (dto.getOrganizationId() != null) {
			Organization organization = organizationRepo.findById(dto.getOrganizationId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
			product.setOrganization(organization);
		}
		
		//Create Iterator to iterate through the Set<LineItemDTO> contained in dto
		Iterator<LineItemDTO> lineItemDtoIterator = dto.getLineItems().iterator();
		//Create LineItem for each LineItemDTO, and insert into set of LineItems
    	while (lineItemDtoIterator.hasNext()) {
    		lineItemService.createLineItemFromDTO(lineItemDtoIterator.next(), product);
    	}
    	
		return product;
	}

	// Ensures that the total amounts of Credit LineItems in an Entry are equal to the total amounts of Debit LineItems.
	// Makes a deep copy of the Set of LineItems in an entry, computes total credits and debits, and returns true if equal and false if not.
	public boolean assertAccountingBalance (JournalEntry journalEntry) {
		Set<LineItem> lineItems = new HashSet<LineItem>(journalEntry.getLineItems());
		Iterator<LineItem> lineItemIterator = lineItems.iterator();
		
		BigDecimal creditBalance =  new BigDecimal(0);
		BigDecimal debitBalance = new BigDecimal(0);
		
		while (lineItemIterator.hasNext()) {
			LineItem currentLineItem = lineItemIterator.next();
			BigDecimal currentAmount = currentLineItem.getAmount();
			boolean currentIsCredit = currentLineItem.isIsCredit();
			
			if (currentIsCredit) {
				creditBalance = creditBalance.add(currentAmount);
			} else if (!currentIsCredit) {
				debitBalance = debitBalance.add(currentAmount);
			}
		}
		
		if (creditBalance.compareTo(debitBalance) == 0) {
			return true;
		} else {
			return false;
		}
	}
	
}