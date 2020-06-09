package com.easyledger.api.service;

import java.lang.reflect.Field;
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

import com.easyledger.api.dto.EntryDTO;
import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Entry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;

@Service
public class EntryService {
	
	@Autowired
	private PersonRepository personRepo;
	
	private LineItemService lineItemService;
	
	public EntryService(PersonRepository personRepo, LineItemService lineItemService) {
		super();
		this.personRepo = personRepo;
		this.lineItemService = lineItemService;
	}

	// Creates new Entry entity object from EntryDTO. Does not save the entity to the database.
	// Will ignore any lineItemId in the EntryDTO that is passed in. LineItemIds will be automatically generated when objects are saved to database.
	public Entry createEntryFromDTO (EntryDTO dto) 
		throws ResourceNotFoundException {
		Entry product = new Entry();
		product.setEntryDate(dto.getEntryDate());
		product.setId(dto.getEntryId());
		if (dto.getPersonId() != null) {
			Person person = personRepo.findById(dto.getPersonId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + dto.getPersonId())); 
			product.setPerson(person);
		}
		
    	//Create set of LineItems to insert into this Entry
		HashSet<LineItem> lineItems = new HashSet<LineItem>();
		//Create Iterator to iterate through the Set<LineItemDTO> contained in dto
		Iterator<LineItemDTO> lineItemDtoIterator = dto.getLineItems().iterator();
		//Create LineItem for each LineItemDTO, and insert into set of LineItems
    	while (lineItemDtoIterator.hasNext()) {
    		LineItem lineItem = lineItemService.createLineItemFromDTO(lineItemDtoIterator.next(), product);
    		lineItems.add(lineItem);
    	}
    	//Insert set of LineItems into Entry
    	product.setLineItems(lineItems);
    	
		return product;
	}

}