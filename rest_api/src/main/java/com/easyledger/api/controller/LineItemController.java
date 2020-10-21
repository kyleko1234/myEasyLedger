package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.LineItemRepository;
import com.easyledger.api.repository.OrganizationRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.1")
public class LineItemController {
	private LineItemRepository lineItemRepo;
	private AccountRepository accountRepo;
	private AccountSubtypeRepository accountSubtypeRepo;

	public LineItemController(LineItemRepository lineItemRepo, AccountRepository accountRepo,
			AccountSubtypeRepository accountSubtypeRepo) {
		super();
		this.lineItemRepo = lineItemRepo;
		this.accountRepo = accountRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
	}


	@GetMapping("/lineItem")
    public ArrayList<LineItemDTO> getAllLineItems() {
		List<LineItem> lineItems = lineItemRepo.findAll();
		ArrayList<LineItemDTO> lineItemDtos = new ArrayList<LineItemDTO>();
		for (LineItem lineItem : lineItems) {
			lineItemDtos.add(new LineItemDTO(lineItem));
		}
        return lineItemDtos;
    }

	
    @GetMapping("/lineItem/{id}")
    public ResponseEntity<LineItemDTO> getLineItemById(@PathVariable(value = "id") Long lineItemId)
        throws ResourceNotFoundException {
    	LineItem lineItem = lineItemRepo.findById(lineItemId)
    		.orElseThrow(() -> new ResourceNotFoundException("Line-item not found for this id :: " + lineItemId)); 
    	LineItemDTO lineItemDTO = new LineItemDTO(lineItem);
        return ResponseEntity.ok().body(lineItemDTO);
    }
    
    @GetMapping("/account/{id}/lineItem")
    public Page<LineItemDTO> getAllLineItemsForAccount(@PathVariable(value="id") Long accountId, Pageable pageable)
    	throws ResourceNotFoundException {
	    Account account = accountRepo.findById(accountId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
	    return lineItemRepo.getAllLineItemsForAccount(accountId, pageable);
    }
    
    @GetMapping("/accountSubtype/{id}/lineItem")
    public Page<LineItemDTO> getAllLineItemsForAccountSubtype(@PathVariable(value="id") Long accountSubtypeId, Pageable pageable)
    	throws ResourceNotFoundException {
	    AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Account subtype not found for this id :: " + accountSubtypeId));
	    return lineItemRepo.getAllLineItemsForAccountSubtype(accountSubtypeId, pageable);
    }
    
    @GetMapping("/category/{id}/lineItem")
    public Page<LineItemDTO> getAllLineItemsForCategory(@PathVariable(value="id") Long categoryId, Pageable pageable)
    	throws ResourceNotFoundException {
	    Account account = accountRepo.findById(categoryId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + categoryId));
	    return lineItemRepo.getAllLineItemsForCategory(categoryId, pageable);
    }
}

