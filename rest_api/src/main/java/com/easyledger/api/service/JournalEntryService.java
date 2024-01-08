package com.easyledger.api.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.JournalEntryDTO;
import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.dto.SearchQueryDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Customer;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.Vendor;
import com.easyledger.api.repository.CustomerRepository;
import com.easyledger.api.repository.JournalEntryRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.repository.VendorRepository;
import com.easyledger.api.security.UserPrincipal;
import com.easyledger.api.viewmodel.JournalEntryViewModel;

@Service
public class JournalEntryService {
	
	@Autowired
	private PersonRepository personRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	@Autowired
	private VendorRepository vendorRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
	
	@Autowired
	private JournalEntryRepository journalEntryRepo;

	private LineItemService lineItemService;
	
	public JournalEntryService(PersonRepository personRepo, LineItemService lineItemService,
			OrganizationRepository organizationRepo, VendorRepository vendorRepo, CustomerRepository customerRepo, JournalEntryRepository journalEntryRepo) {
		super();
		this.personRepo = personRepo;
		this.lineItemService = lineItemService;
		this.organizationRepo = organizationRepo;
		this.vendorRepo = vendorRepo;
		this.customerRepo = customerRepo;
		this.journalEntryRepo = journalEntryRepo;
	}
	
	public Page<JournalEntryViewModel> getAllJournalEntryViewModelsForOrganizationAndSearchQuery(Long organizationId, SearchQueryDTO searchQuery, Pageable pageable) {
		String query = searchQuery.getQuery();
		if (query == null || query.trim().isEmpty()) {
			return journalEntryRepo.getAllJournalEntryViewModelsForOrganization(organizationId, pageable);
		} else {
			return journalEntryRepo.getAllJournalEntryViewModelsForOrganizationAndQuery(organizationId, query, pageable);
		}
	}

	// Creates new Entry entity object from EntryDTO. Does not save the entity to the database.
	// Will ignore any lineItemId in the EntryDTO that is passed in. LineItemIds will be automatically generated when objects are saved to database.
	public JournalEntry createJournalEntryFromDTO (JournalEntryDTO dto, UserPrincipal userPrincipal) 
		throws ResourceNotFoundException, ConflictException {
		JournalEntry product = new JournalEntry();
		product.setJournalEntryDate(dto.getJournalEntryDate());
		product.setDescription(dto.getDescription());
		product.setId(dto.getJournalEntryId());
		Person person = personRepo.findById(userPrincipal.getId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + dto.getPersonId())); 
		product.setPerson(person);
		if (dto.getOrganizationId() != null) {
			Organization organization = organizationRepo.findById(dto.getOrganizationId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
			product.setOrganization(organization);
		}
		if (dto.getVendorId() != null) {
			Vendor vendor = vendorRepo.findById(dto.getVendorId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Vendor not found for this id :: " + dto.getVendorId())); 
			product.setVendor(vendor);
		}
		if (dto.getCustomerId() != null) {
			Customer customer = customerRepo.findById(dto.getCustomerId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Customer not found for this id :: " + dto.getCustomerId())); 
			product.setCustomer(customer);
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
		List<LineItem> lineItems = new ArrayList<LineItem>(journalEntry.getLineItems());
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