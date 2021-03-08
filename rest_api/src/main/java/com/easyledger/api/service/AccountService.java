package com.easyledger.api.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.repository.AccountGroupRepository;
import com.easyledger.api.repository.AccountRepository;

@Service
public class AccountService {
	
	@Autowired
	private AccountGroupRepository accountGroupRepo;
	
	@Autowired
	private AccountRepository accountRepo;
	
	public AccountService(AccountGroupRepository accountGroupRepo, AccountRepository accountRepo) {
		super();
		this.accountGroupRepo = accountGroupRepo;
		this.accountRepo = accountRepo;
	}
	
	//sets debitTotal and creditTotal to initialDebitAmount and initialCreditAmount
	public Account createNewAccountFromDTO(AccountDTO dto) 
			throws ResourceNotFoundException, ConflictException {
		Account product = new Account();
		product.setId(dto.getAccountId());
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
		
		AccountGroup accountGroup = accountGroupRepo.findById(dto.getAccountGroupId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountGroup not found for this id :: " + dto.getAccountGroupId()));
		product.setAccountGroup(accountGroup);
		
		return product;
	}
	
	public Account updateAccountFromDTO(AccountDTO dto) throws ResourceNotFoundException {
		Account account = accountRepo.findById(dto.getAccountId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Account not found for this id :: " + dto.getAccountId()));
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
