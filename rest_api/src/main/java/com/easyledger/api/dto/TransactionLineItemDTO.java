package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.Arrays;

import com.easyledger.api.utility.TransactionType;

public class TransactionLineItemDTO {
	private Long lineItemId;
	private Long journalEntryId;
	private Long accountId;
	private String accountName;
	private String description;
	private BigDecimal amount;
	private Long transactionTypeId;
	private String transactionTypeName;
	
	
	public TransactionLineItemDTO() {
	}
	public TransactionLineItemDTO(LineItemDTO lineItem) {
		this.lineItemId = lineItem.getLineItemId();
		this.journalEntryId = lineItem.getJournalEntryId();
		this.accountId = lineItem.getAccountId();
		this.accountName = lineItem.getAccountName();
		this.description = lineItem.getDescription();
		for (TransactionType transactionType : TransactionType.values()) {
			if (Arrays.binarySearch(transactionType.getAccountTypeIds(), lineItem.getAccountTypeId()) >= 0) {
				this.transactionTypeId = transactionType.getTransactionTypeId();
				this.transactionTypeName = transactionType.getTransactionTypeName();
				if (lineItem.isIsCredit() == transactionType.isCredit()) {
					this.amount = lineItem.getAmount();
				} else {
					this.amount = lineItem.getAmount().negate();
				}
			}
		}
	}
	public Long getLineItemId() {
		return lineItemId;
	}
	public void setLineItemId(Long lineItemId) {
		this.lineItemId = lineItemId;
	}
	public Long getJournalEntryId() {
		return journalEntryId;
	}
	public void setJournalEntryId(Long journalEntryId) {
		this.journalEntryId = journalEntryId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public Long getTransactionTypeId() {
		return transactionTypeId;
	}
	public void setTransactionTypeId(Long transactionTypeId) {
		this.transactionTypeId = transactionTypeId;
	}
	public String getTransactionTypeName() {
		return transactionTypeName;
	}
	public void setTransactionTypeName(String transactionTypeName) {
		this.transactionTypeName = transactionTypeName;
	}
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public String getAccountName() {
		return accountName;
	}
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	
	
}
