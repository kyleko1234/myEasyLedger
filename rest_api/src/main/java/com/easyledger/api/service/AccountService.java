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

@Service
public class AccountService {
	
	@Autowired
	private AccountGroupRepository accountGroupRepo;
	
	public AccountService(AccountGroupRepository accountGroupRepo) {
		super();
		this.accountGroupRepo = accountGroupRepo;
	}
	
	//ignores attempts to edit debitTotal and creditTotal
	public Account createAccountFromDTO(AccountDTO dto) 
			throws ResourceNotFoundException, ConflictException {
		Account product = new Account();
		product.setId(dto.getAccountId());
		product.setName(dto.getAccountName());
		if (dto.getInitialDebitAmount() != null) {
			product.setInitialDebitAmount(dto.getInitialDebitAmount());
		} else {
			product.setInitialDebitAmount(new BigDecimal(0));
		}
		if (dto.getInitialCreditAmount() != null) {
			product.setInitialCreditAmount(dto.getInitialCreditAmount());
		} else {
			product.setInitialCreditAmount(new BigDecimal(0));
		}
//		product.setDeleted(dto.isDeleted());
		
		AccountGroup accountGroup = accountGroupRepo.findById(dto.getAccountGroupId())
	    		.orElseThrow(() -> new ResourceNotFoundException("AccountGroup not found for this id :: " + dto.getAccountGroupId()));
		product.setAccountGroup(accountGroup);
		
		return product;
		
	}
	
}
