package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.http.parser.Authorization;
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
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.LineItem;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.CategoryRepository;
import com.easyledger.api.repository.LineItemRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.security.AuthorizationService;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.1")
public class LineItemController {
	private LineItemRepository lineItemRepo;
	private AccountRepository accountRepo;
	private AccountSubtypeRepository accountSubtypeRepo;
	private CategoryRepository categoryRepo;
	private AuthorizationService authorizationService;

	public LineItemController(LineItemRepository lineItemRepo, AccountRepository accountRepo,
			AccountSubtypeRepository accountSubtypeRepo, AuthorizationService authorizationService, CategoryRepository categoryRepo) {
		super();
		this.lineItemRepo = lineItemRepo;
		this.accountRepo = accountRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.authorizationService = authorizationService;
		this.categoryRepo = categoryRepo;
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
    	authorizationService.authorizeByOrganizationId(authentication, lineItem.getJournalEntry().getOrganization().getId());
    	LineItemDTO lineItemDTO = new LineItemDTO(lineItem);
        return ResponseEntity.ok().body(lineItemDTO);
    }
    
    @GetMapping("/account/{id}/lineItem")
    public Page<LineItemDTO> getAllLineItemsForAccount(@PathVariable(value="id") Long accountId, Pageable pageable, Authentication authentication)
    	throws ResourceNotFoundException, UnauthorizedException {
	    Account account = accountRepo.findById(accountId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + accountId));
	    authorizationService.authorizeByOrganizationId(authentication, account.getOrganization().getId());
	    return lineItemRepo.getAllLineItemsForAccount(accountId, pageable);
    }
    
    @GetMapping("/accountSubtype/{id}/lineItem")
    public Page<LineItemDTO> getAllLineItemsForAccountSubtype(@PathVariable(value="id") Long accountSubtypeId, Pageable pageable, Authentication authentication)
    	throws ResourceNotFoundException, UnauthorizedException {
	    AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Account subtype not found for this id :: " + accountSubtypeId));
	    authorizationService.authorizeByOrganizationId(authentication, accountSubtype.getOrganization().getId());
	    return lineItemRepo.getAllLineItemsForAccountSubtype(accountSubtypeId, pageable);
    }
    
    @GetMapping("/category/{id}/lineItem")
    public Page<LineItemDTO> getAllLineItemsForCategory(@PathVariable(value="id") Long categoryId, Pageable pageable, Authentication authentication)
    	throws ResourceNotFoundException, UnauthorizedException {
	    Category category = categoryRepo.findById(categoryId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + categoryId));
	    authorizationService.authorizeByOrganizationId(authentication, category.getAccount().getOrganization().getId());
	    return lineItemRepo.getAllLineItemsForCategory(categoryId, pageable);
    }
}

