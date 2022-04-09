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
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.LineItemRepository;
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
	
	@Autowired
	private LineItemRepository lineItemRepo;
	
	public AccountService(AccountRepository accountRepo, OrganizationRepository organizationRepo, LineItemRepository lineItemRepo,
				AccountSubtypeRepository accountSubtypeRepo, AuthorizationService authorizationService) {
		super();
		this.accountRepo = accountRepo;
		this.organizationRepo = organizationRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.authorizationService = authorizationService;
		this.lineItemRepo = lineItemRepo;
	}
	
	//sets debitTotal and creditTotal to initialDebitAmount and initialCreditAmount
	public Account createNewAccountFromDTO(AccountDTO dto, Authentication authentication) 
			throws ResourceNotFoundException, ConflictException, UnauthorizedException {
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());
		Account product = new Account();
		product.setName(dto.getAccountName());
		
		if (dto.getAccountCode() != null) {
			product.setAccountCode(dto.getAccountCode());
		}
		
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
		product.setHasChildren(false);
		
		if (dto.getParentAccountId() != null) {
			Account parentAccount = accountRepo.findById(dto.getParentAccountId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Parent account not found for this id :: " + dto.getParentAccountId()));
			if (parentAccount.getParentAccount() != null) {
				throw new ConflictException("Child accounts may not contain child accounts of their own.");
			}
			if (!parentAccount.isHasChildren() && !(parentAccount.getInitialDebitAmount().longValueExact() == 0 && parentAccount.getInitialCreditAmount().longValueExact() == 0)) {
				throw new ConflictException("Accounts with initial debit and credit values may not contain children.");
			}
			if (lineItemRepo.accountContainsLineItems(parentAccount.getId())) {
				throw new ConflictException("Accounts with LineItems written to them may not contain children.");
			}
			product.setParentAccount(parentAccount);
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
	
	//There's probably a more elegant way to do this but alas
	public Account updateAccountFromDTO(AccountDTO dto, Authentication authentication) 
			throws ResourceNotFoundException, UnauthorizedException, ConflictException {
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());
		Account oldAccount = accountRepo.findById(dto.getAccountId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId()));
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, oldAccount.getOrganization().getId());
		if (oldAccount.isHasChildren() && dto.getParentAccountId() != null) {
			throw new ConflictException("An account with children may not have a parent account.");
		}
		
		Account updatedAccount = new Account();
		updatedAccount.setId(dto.getAccountId());
		updatedAccount.setName(dto.getAccountName());
		if (dto.getAccountCode() != null) {
			updatedAccount.setAccountCode(dto.getAccountCode());
		}
		
		if (dto.getInitialCreditAmount() != oldAccount.getInitialCreditAmount() || dto.getInitialDebitAmount() != oldAccount.getInitialDebitAmount()) {
			if (lineItemRepo.accountContainsLineItems(oldAccount.getId())) {
				throw new ConflictException("Cannot change the initial value of a non-empty account");
			}
			if (oldAccount.isHasChildren()) {
				throw new ConflictException("Cannot change the initial value of an account with children.");
			}
		}
	
	
		updatedAccount.setDebitTotal(oldAccount.getDebitTotal().subtract(oldAccount.getInitialDebitAmount()));
		updatedAccount.setInitialDebitAmount(dto.getInitialDebitAmount());
		updatedAccount.setDebitTotal(updatedAccount.getDebitTotal().add(updatedAccount.getInitialDebitAmount()));
		
		updatedAccount.setCreditTotal(oldAccount.getCreditTotal().subtract(oldAccount.getInitialCreditAmount()));
		updatedAccount.setInitialCreditAmount(dto.getInitialCreditAmount());
		updatedAccount.setCreditTotal(updatedAccount.getCreditTotal().add(updatedAccount.getInitialCreditAmount()));
		
		
		if (dto.getParentAccountId() != null) {
			Account parentAccount = accountRepo.findById(dto.getParentAccountId())
		    		.orElseThrow(() -> new ResourceNotFoundException("Parent account not found for this id :: " + dto.getParentAccountId()));
			if (parentAccount.getParentAccount() != null) {
				throw new ConflictException("Child accounts may not contain child accounts of their own.");
			}
			if (!parentAccount.isHasChildren() && !(parentAccount.getInitialDebitAmount().longValueExact() == 0 && parentAccount.getInitialCreditAmount().longValueExact() == 0)) {
				throw new ConflictException("Accounts with initial debit and credit values may not contain children.");
			}
			if (lineItemRepo.accountContainsLineItems(parentAccount.getId())) {
				throw new ConflictException("Accounts with LineItems written to them may not contain children.");
			}
			updatedAccount.setParentAccount(parentAccount);
		} else {
			AccountSubtype accountSubtype = accountSubtypeRepo.findById(dto.getAccountSubtypeId())
		    		.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + dto.getAccountSubtypeId()));
			updatedAccount.setAccountSubtype(accountSubtype);
		}
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId()));
		updatedAccount.setOrganization(organization);

		updatedAccount.setHasChildren(oldAccount.isHasChildren());
		Account returnObject = accountRepo.save(updatedAccount);
		return returnObject;
	}
	
	
}
