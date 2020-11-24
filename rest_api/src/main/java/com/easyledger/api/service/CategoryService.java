package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountTypeRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.security.AuthorizationService;

@Service
public class CategoryService {

	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	@Autowired
	private AuthorizationService authorizationService;
	
	public CategoryService(AccountRepository accountRepo, AuthorizationService authorizationService) {
		super();
		this.accountRepo = accountRepo;
		this.authorizationService = authorizationService;
	}
	
	public Category createCategoryFromDTO(CategoryDTO dto, Authentication authentication) 
			throws ResourceNotFoundException, UnauthorizedException {
		Category product = new Category();
		product.setId(dto.getCategoryId());
		product.setName(dto.getCategoryName());
		Account account = accountRepo.findById(dto.getAccountId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId()));
		authorizationService.authorizeByOrganizationId(authentication, account.getOrganization().getId());
		product.setAccount(account);
		return product;
		
	}
	
}
