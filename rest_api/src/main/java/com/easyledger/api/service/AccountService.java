package com.easyledger.api.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountGroupRepository;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.security.AuthorizationService;

@Service
public class AccountService {
	
	@Autowired
	private OrganizationRepository organizationRepo;
	
	@Autowired
	private AccountRepository accountRepo;
	
	@Autowired
	private AccountSubtypeRepository accountSubtypeRepo;
	
	@Autowired
	private AuthorizationService authorizationService;
	
	public AccountService(AccountRepository accountRepo, OrganizationRepository organizationRepo,
				AccountSubtypeRepository accountSubtypeRepo, AuthorizationService authorizationService) {
		super();
		this.accountRepo = accountRepo;
		this.organizationRepo = organizationRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.authorizationService = authorizationService;
	}
	
	//sets debitTotal and creditTotal to initialDebitAmount and initialCreditAmount
	public Account createNewAccountFromDTO(AccountDTO dto, Authentication authentication) 
			throws ResourceNotFoundException, ConflictException, UnauthorizedException {
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());
		Account product = new Account();
		product.setName(dto.getAccountName());
		if (dto.getInitialDebitAmount() != null) {
			product.setInitialDebitAmount(dto.getInitialDebitAmount());
			product.setDebitTotal(dto.getInitialDebitAmount());
		} else {
			product.setInitialDebitAmount(new BigDecimal(0));
			product.setDebitTotal(new BigDecimal(0));
		}
		if (dto.getInitialCreditAmount() != null) {
			product.setInitialCreditAmount(dto.getInitialCreditAmount());
			product.setCreditTotal(dto.getInitialCreditAmount());
		} else {
			product.setInitialCreditAmount(new BigDecimal(0));
			product.setCreditTotal(new BigDecimal(0));
		}
//		product.setDeleted(dto.isDeleted());
		product.setHasChildren(false);
		
		if (dto.getParentAccountId() != null) {
			Account parentAccount = accountRepo.findById(dto.getParentAccountId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Parent account not found for this id :: " + dto.getParentAccountId()));
			product.setParentAccount(parentAccount);
			parentAccount.setHasChildren(true);
			accountRepo.save(parentAccount);
		} else {
			AccountSubtype accountSubtype = accountSubtypeRepo.findById(dto.getAccountSubtypeId())
		    		.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + dto.getAccountSubtypeId()));
			product.setAccountSubtype(accountSubtype);
		}
		
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId()));
		product.setOrganization(organization);
		
		return accountRepo.save(product);
	}
	
	public Account updateAccountFromDTO(AccountDTO dto, Authentication authentication) throws ResourceNotFoundException {
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());
		Account account = accountRepo.findById(dto.getAccountId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId()));
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, account.getOrganization().getId());
		account.setName(dto.getAccountName());
		
		account.setDebitTotal(account.getDebitTotal().subtract(account.getInitialDebitAmount()));
		account.setInitialDebitAmount(dto.getInitialDebitAmount());
		account.setDebitTotal(account.getDebitTotal().add(account.getInitialDebitAmount()));
		
		account.setCreditTotal(account.getCreditTotal().subtract(account.getInitialCreditAmount()));
		account.setInitialCreditAmount(dto.getInitialCreditAmount());
		account.setCreditTotal(account.getCreditTotal().add(account.getInitialCreditAmount()));
		
		
		AccountGroup accountGroup = accountGroupRepo.findById(dto.getAccountGroupId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountGroup not found for this id :: " + dto.getAccountGroupId()));
		account.setAccountGroup(accountGroup);
		return account;
	}
	
	
}
