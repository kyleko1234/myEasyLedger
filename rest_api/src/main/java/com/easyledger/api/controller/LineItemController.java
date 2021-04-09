package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.LineItemRepository;
import com.easyledger.api.security.AuthorizationService;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class LineItemController {
	private LineItemRepository lineItemRepo;
	private AccountRepository accountRepo;
	private AuthorizationService authorizationService;

	public LineItemController(LineItemRepository lineItemRepo, AccountRepository accountRepo, AuthorizationService authorizationService) {
		super();
		this.lineItemRepo = lineItemRepo;
		this.accountRepo = accountRepo;
		this.authorizationService = authorizationService;
	}

	@Secured("ROLE_ADMIN")
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
    public ResponseEntity<LineItemDTO> getLineItemById(@PathVariable(value = "id") Long lineItemId, Authentication authentication)
        throws ResourceNotFoundException, UnauthorizedException {
    	LineItem lineItem = lineItemRepo.findById(lineItemId)
    		.orElseThrow(() -> new ResourceNotFoundException("Line-item not found for this id :: " + lineItemId)); 
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, lineItem.getJournalEntry().getOrganization().getId());
    	LineItemDTO lineItemDTO = new LineItemDTO(lineItem);
        return ResponseEntity.ok().body(lineItemDTO);
    }
    
    @GetMapping("/account/{id}/lineItem")
    public Page<LineItemDTO> getAllLineItemsForAccount(@PathVariable(value="id") Long accountId, Pageable pageable, Authentication authentication)
    	throws ResourceNotFoundException, UnauthorizedException {
	    Account account = accountRepo.findById(accountId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
	    authorizationService.authorizeViewPermissionsByOrganizationId(authentication, account.getOrganization().getId());
	    return lineItemRepo.getAllLineItemsForAccount(accountId, pageable);
    }
    

}

