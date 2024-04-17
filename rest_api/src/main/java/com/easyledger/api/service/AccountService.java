package com.easyledger.api.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.BalanceSheetFormatPosition;
import com.easyledger.api.model.CashFlowFormatPosition;
import com.easyledger.api.model.IncomeStatementFormatPosition;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.BalanceSheetFormatPositionRepository;
import com.easyledger.api.repository.CashFlowFormatPositionRepository;
import com.easyledger.api.repository.IncomeStatementFormatPositionRepository;
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
	
	@Autowired
	private IncomeStatementFormatPositionRepository incomeStatementFormatPositionRepo;
	
	@Autowired
	private BalanceSheetFormatPositionRepository balanceSheetFormatPositionRepo;
	
	@Autowired
	private CashFlowFormatPositionRepository cashFlowFormatPositionRepo;

	

	
	public AccountService(OrganizationRepository organizationRepo, AccountRepository accountRepo,
			AccountSubtypeRepository accountSubtypeRepo, AuthorizationService authorizationService,
			LineItemRepository lineItemRepo, IncomeStatementFormatPositionRepository incomeStatementFormatPositionRepo,
			BalanceSheetFormatPositionRepository balanceSheetFormatPositionRepo,
			CashFlowFormatPositionRepository cashFlowFormatPositionRepo) {
		super();
		this.organizationRepo = organizationRepo;
		this.accountRepo = accountRepo;
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.authorizationService = authorizationService;
		this.lineItemRepo = lineItemRepo;
		this.incomeStatementFormatPositionRepo = incomeStatementFormatPositionRepo;
		this.balanceSheetFormatPositionRepo = balanceSheetFormatPositionRepo;
		this.cashFlowFormatPositionRepo = cashFlowFormatPositionRepo;
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
			//if account has parent, it always inherits format position from parents
			product.setIncomeStatementFormatPosition(parentAccount.getIncomeStatementFormatPosition());
			product.setBalanceSheetFormatPosition(parentAccount.getBalanceSheetFormatPosition());
			product.setCashFlowFormatPosition(parentAccount.getCashFlowFormatPosition());
			product.setCashItem(parentAccount.isCashItem());
			product.setRelevantToTaxesPaid(parentAccount.isRelevantToTaxesPaid());
			product.setRelevantToInterestPaid(parentAccount.isRelevantToInterestPaid());
			product.setRelevantToDividendsPaid(parentAccount.isRelevantToDividendsPaid());
			product.setRelevantToDepreciationAmortization(parentAccount.isRelevantToDepreciationAmortization());
		} else {
			AccountSubtype accountSubtype = accountSubtypeRepo.findById(dto.getAccountSubtypeId())
		    		.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + dto.getAccountSubtypeId()));
			product.setAccountSubtype(accountSubtype);
			
			if (dto.getIncomeStatementFormatPositionId() != null) {
				IncomeStatementFormatPosition position = incomeStatementFormatPositionRepo.findById(dto.getIncomeStatementFormatPositionId())
			    		.orElseThrow(() -> new ResourceNotFoundException("Income statement format position not found for this id :: " + dto.getIncomeStatementFormatPositionId()));
				product.setIncomeStatementFormatPosition(position);
			} else {
				product.setIncomeStatementFormatPosition(accountSubtype.getIncomeStatementFormatPosition());
			}
			
			if (dto.getCashFlowFormatPositionId() != null) {
				CashFlowFormatPosition position = cashFlowFormatPositionRepo.findById(dto.getCashFlowFormatPositionId())
			    		.orElseThrow(() -> new ResourceNotFoundException("Cash flow format position not found for this id :: " + dto.getCashFlowFormatPositionId()));
				product.setCashFlowFormatPosition(position);
			} else {
				product.setCashFlowFormatPosition(accountSubtype.getCashFlowFormatPosition());
			}
	 
			if (dto.getBalanceSheetFormatPositionId() != null) {
				BalanceSheetFormatPosition position = balanceSheetFormatPositionRepo.findById(dto.getBalanceSheetFormatPositionId())
			    		.orElseThrow(() -> new ResourceNotFoundException("Balance sheet format position not found for this id :: " + dto.getBalanceSheetFormatPositionId()));
				product.setBalanceSheetFormatPosition(position);
			} else {
				product.setBalanceSheetFormatPosition(accountSubtype.getBalanceSheetFormatPosition());
			}

			if (dto.isCashItem() != null) {
				product.setCashItem(dto.isCashItem());
			} else {
				product.setCashItem(accountSubtype.isCashItem());
			}
			
			if (dto.isRelevantToTaxesPaid() != null) {
				product.setRelevantToTaxesPaid(dto.isRelevantToTaxesPaid());;
			} else {
				product.setRelevantToTaxesPaid(accountSubtype.isRelevantToTaxesPaid());;
			}
			
			if (dto.isRelevantToInterestPaid() != null) {
				product.setRelevantToInterestPaid(dto.isRelevantToInterestPaid());
			} else {
				product.setRelevantToInterestPaid(accountSubtype.isRelevantToInterestPaid());
			}
			
			
			if (dto.isRelevantToDividendsPaid() != null) {
				product.setRelevantToDividendsPaid(dto.isRelevantToDividendsPaid());
			} else {
				product.setRelevantToDividendsPaid(accountSubtype.isRelevantToDividendsPaid());
			}
			
			
			if (dto.isRelevantToDepreciationAmortization() != null) {
				product.setRelevantToDepreciationAmortization(dto.isRelevantToDepreciationAmortization());
			} else {
				product.setRelevantToDepreciationAmortization(accountSubtype.isRelevantToDepreciationAmortization());
			}

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
		
		if (dto.getInitialCreditAmount().compareTo(oldAccount.getInitialCreditAmount()) != 0 || dto.getInitialDebitAmount().compareTo(oldAccount.getInitialDebitAmount()) != 0) {
			if (oldAccount.getOrganization().isLockInitialAccountValues()) {
				throw new ConflictException("Initial account values are locked for this ledger.");
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
			updatedAccount.setIncomeStatementFormatPosition(parentAccount.getIncomeStatementFormatPosition());
			updatedAccount.setBalanceSheetFormatPosition(parentAccount.getBalanceSheetFormatPosition());
			updatedAccount.setCashFlowFormatPosition(parentAccount.getCashFlowFormatPosition());
			updatedAccount.setCashItem(parentAccount.isCashItem());
			updatedAccount.setRelevantToTaxesPaid(parentAccount.isRelevantToTaxesPaid());
			updatedAccount.setRelevantToInterestPaid(parentAccount.isRelevantToInterestPaid());
			updatedAccount.setRelevantToDividendsPaid(parentAccount.isRelevantToDividendsPaid());
			updatedAccount.setRelevantToDepreciationAmortization(parentAccount.isRelevantToDepreciationAmortization());
		} else {
			AccountSubtype accountSubtype = accountSubtypeRepo.findById(dto.getAccountSubtypeId())
		    		.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + dto.getAccountSubtypeId()));
			updatedAccount.setAccountSubtype(accountSubtype);
		
			if (dto.getIncomeStatementFormatPositionId() != null) {
				IncomeStatementFormatPosition position = incomeStatementFormatPositionRepo.findById(dto.getIncomeStatementFormatPositionId())
			    		.orElseThrow(() -> new ResourceNotFoundException("Income statement format position not found for this id :: " + dto.getIncomeStatementFormatPositionId()));
				updatedAccount.setIncomeStatementFormatPosition(position);
			} else {
				updatedAccount.setIncomeStatementFormatPosition(oldAccount.getIncomeStatementFormatPosition());
			}
			
			if (dto.getCashFlowFormatPositionId() != null) {
				CashFlowFormatPosition position = cashFlowFormatPositionRepo.findById(dto.getCashFlowFormatPositionId())
			    		.orElseThrow(() -> new ResourceNotFoundException("Cash flow format position not found for this id :: " + dto.getCashFlowFormatPositionId()));
				updatedAccount.setCashFlowFormatPosition(position);
			} else {
				updatedAccount.setCashFlowFormatPosition(oldAccount.getCashFlowFormatPosition());
			}
	 
			if (dto.getBalanceSheetFormatPositionId() != null) {
				BalanceSheetFormatPosition position = balanceSheetFormatPositionRepo.findById(dto.getBalanceSheetFormatPositionId())
			    		.orElseThrow(() -> new ResourceNotFoundException("Balance sheet format position not found for this id :: " + dto.getBalanceSheetFormatPositionId()));
				updatedAccount.setBalanceSheetFormatPosition(position);
			} else {
				updatedAccount.setBalanceSheetFormatPosition(oldAccount.getBalanceSheetFormatPosition());
			}
			
			if (dto.isCashItem() != null) {
				updatedAccount.setCashItem(dto.isCashItem());
			} else {
				updatedAccount.setCashItem(oldAccount.isCashItem());
			}
			
			if (dto.isRelevantToTaxesPaid() != null) {
				updatedAccount.setRelevantToTaxesPaid(dto.isRelevantToTaxesPaid());;
			} else {
				updatedAccount.setRelevantToTaxesPaid(oldAccount.isRelevantToTaxesPaid());;
			}
			
			if (dto.isRelevantToInterestPaid() != null) {
				updatedAccount.setRelevantToInterestPaid(dto.isRelevantToInterestPaid());
			} else {
				updatedAccount.setRelevantToInterestPaid(oldAccount.isRelevantToInterestPaid());
			}
			
			if (dto.isRelevantToDividendsPaid() != null) {
				updatedAccount.setRelevantToDividendsPaid(dto.isRelevantToDividendsPaid());
			} else {
				updatedAccount.setRelevantToDividendsPaid(oldAccount.isRelevantToDividendsPaid());
			}
			
			if (dto.isRelevantToDepreciationAmortization() != null) {
				updatedAccount.setRelevantToDepreciationAmortization(dto.isRelevantToDepreciationAmortization());
			} else {
				updatedAccount.setRelevantToDepreciationAmortization(oldAccount.isRelevantToDepreciationAmortization());
			}
		}
		
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId()));
		updatedAccount.setOrganization(organization);

		updatedAccount.setHasChildren(oldAccount.isHasChildren());
		Account returnObject = accountRepo.save(updatedAccount);
		List<Account> children = new ArrayList<Account>(oldAccount.getChildAccounts()); //must make a new collection here, otherwise iterating through the list and updating the children will give java.util.ConcurrentModificationException: null 
		for (Account childAccount : children) {
			childAccount.setIncomeStatementFormatPosition(updatedAccount.getIncomeStatementFormatPosition());
			childAccount.setBalanceSheetFormatPosition(updatedAccount.getBalanceSheetFormatPosition());
			childAccount.setCashFlowFormatPosition(updatedAccount.getCashFlowFormatPosition());
			childAccount.setCashItem(updatedAccount.isCashItem());
			childAccount.setRelevantToTaxesPaid(updatedAccount.isRelevantToTaxesPaid());
			childAccount.setRelevantToInterestPaid(updatedAccount.isRelevantToInterestPaid());
			childAccount.setRelevantToDividendsPaid(updatedAccount.isRelevantToDividendsPaid());
			childAccount.setRelevantToDepreciationAmortization(updatedAccount.isRelevantToDepreciationAmortization());
			accountRepo.save(childAccount);
		}
		return returnObject;
	}
	
	public AccountBalanceDTO getAccountBalanceUpToDateExclusive(Long accountId, LocalDate endDate) {
		return accountRepo.getAccountBalanceUpToDateExclusive(accountId, endDate);
	}
	
}
