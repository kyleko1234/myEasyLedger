package com.easyledger.api.controller;

import java.lang.reflect.Field;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.EntryDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Entry;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.repository.EntryRepository;
import com.easyledger.api.repository.LineItemRepository;
import com.easyledger.api.service.EntryService;
import com.easyledger.api.service.LineItemService;

@RestController
@RequestMapping("/v0.1")
public class EntryController {
	private EntryRepository entryRepo;
	private EntryService entryService;
	private LineItemService lineItemService;
	private LineItemRepository lineItemRepo;

	public EntryController(EntryRepository entryRepo, EntryService entryService, 
			LineItemService lineItemService, LineItemRepository lineItemRepo) {
		super();
		this.entryRepo = entryRepo;
		this.entryService = entryService;
		this.lineItemService = lineItemService;
		this.lineItemRepo = lineItemRepo;
	}


	@GetMapping("/entry")
    public List<Entry> getAllEntries() {
        return entryRepo.findAll();
    }

	
    @GetMapping("/entry/{id}")
    public ResponseEntity<EntryDTO> getEntryById(@PathVariable(value = "id") Long entryId)
        throws ResourceNotFoundException {
    	Entry entry = entryRepo.findById(entryId)
    		.orElseThrow(() -> new ResourceNotFoundException("Entry not found for this id :: " + entryId)); 
    	EntryDTO entryDTO = new EntryDTO(entry);
        return ResponseEntity.ok().body(entryDTO);
    }
    
    /** PUT functions by deleting an old Entry and its LineItems from the database, and replacing them with a new Entry and LineItems
      * created from the EntryDTO contained in the request body, rather than attempting to use DTO data to edit an existing Entry.
      * This means an Entry that has been edited using PUT will have a different ID than before, and its LineItems will also have different IDs than before.
      * PUT will ignore any IDs that are passed in via the DTO, and will automatically generate new IDs instead.
      * Strictly speaking, this implementation of PUT is not idempotent because the ID of the objects will change every time PUT is called. **/ 		
    @Transactional(rollbackFor=Exception.class)
    @PutMapping("/entry/{id}")
    public ResponseEntity<EntryDTO> replaceEntryById(@PathVariable(value = "id") Long id, @RequestBody EntryDTO dto) 
    	throws ConflictException, ResourceNotFoundException {
    	// Assert URI id is the same as id in the request body.
    	if (!dto.getEntryId().equals(id)) {
    		throw new ConflictException("Entry ID in request body does not match URI.");
    	}
    	
    	//Assert that an entry for this id exists
    	entryRepo.findById(id)
        	.orElseThrow(() -> new ResourceNotFoundException("Entry not found for this id :: " + id)); 
    	
    	//Delete entry. Should cascade, so that lineItems within the entry are also deleted.
    	entryRepo.deleteById(id);
    	
    	//Replace entry with data from the request body.
    	Entry entry = entryService.createEntryFromDTO(dto);
    	
    	//Save Entry and its LineItems. Must save in this order, otherwise will violate not-nullable property.
    	Iterator<LineItem> lineItems = entry.getLineItems().iterator();
    	entryRepo.save(entry);
    	while (lineItems.hasNext()) {
    		lineItemRepo.save(lineItems.next());
    	}
    	
    	    
    	//Return updated entry
    	EntryDTO newEntryDTO = new EntryDTO(entry);
    	return ResponseEntity.ok().body(newEntryDTO);

    }


}

