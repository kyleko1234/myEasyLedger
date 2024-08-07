package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Date;

import com.easyledger.api.model.LineItem;
import com.easyledger.api.utility.TransactionType;


public class LineItemDTO implements Comparable<LineItemDTO> {
	
	private Long accountId;
	private String accountName;
	private BigDecimal amount;
	private String description;
	private Long journalEntryId;
	private LocalDate journalEntryDate;
	private String journalEntryDescription;
	private boolean isCredit;
	private Long lineItemId;
	private Long accountSubtypeId;
	private Long accountTypeId;

	

	
	public LineItemDTO(LineItem lineItem) {
    	
    	this.lineItemId = lineItem.getId();
    	this.journalEntryId = lineItem.getJournalEntry().getId();
    	this.journalEntryDate = lineItem.getJournalEntry().getJournalEntryDate();
    	this.journalEntryDescription = lineItem.getJournalEntry().getDescription();
    	this.isCredit = lineItem.isIsCredit();
    	this.amount = lineItem.getAmount();
    	this.description = lineItem.getDescription();
    	this.accountId = lineItem.getAccount().getId();
    	this.accountName = lineItem.getAccount().getName();
    	if (lineItem.getAccount().getAccountSubtype() != null) {
    		this.accountSubtypeId = lineItem.getAccount().getAccountSubtype().getId();
    		this.accountTypeId = lineItem.getAccount().getAccountSubtype().getAccountType().getId();
    	} else {
    		this.accountSubtypeId = lineItem.getAccount().getParentAccount().getAccountSubtype().getId();
    		this.accountTypeId = lineItem.getAccount().getParentAccount().getAccountSubtype().getAccountType().getId();
    	}
	}

	public LineItemDTO() {
	}

	public LineItemDTO(BigInteger accountId, String accountName, BigDecimal amount, String description, 
			BigInteger journalEntryId, Date journalEntryDate, String journalEntryDescription, boolean isCredit, BigInteger lineItemId,
			BigInteger accountSubtypeId, BigInteger accountTypeId) {
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.amount = amount;
		this.description = description;
		this.journalEntryId = journalEntryId.longValueExact();
		this.journalEntryDate = LocalDate.parse(journalEntryDate.toString());
		this.journalEntryDescription = journalEntryDescription;
		this.isCredit = isCredit;
		this.lineItemId = lineItemId.longValueExact();
		this.accountSubtypeId = accountSubtypeId.longValueExact();
		this.accountTypeId = accountTypeId.longValueExact();
	}

	public LineItemDTO(TransactionLineItemDTO lineItem) {
		this.accountId = lineItem.getAccountId();
		this.accountName = lineItem.getAccountName();
		this.amount = lineItem.getAmount();
		this.description = lineItem.getDescription();
		this.journalEntryId = lineItem.getJournalEntryId();
		this.lineItemId = lineItem.getLineItemId();
		for (TransactionType transactionType : TransactionType.values()) {
			if (transactionType.getTransactionTypeId().equals(lineItem.getTransactionTypeId())) {
				this.isCredit = transactionType.isCredit();
			}
		}
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

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getJournalEntryId() {
		return journalEntryId;
	}

	public void setJournalEntryId(Long journalEntryId) {
		this.journalEntryId = journalEntryId;
	}

	public LocalDate getJournalEntryDate() {
		return journalEntryDate;
	}

	public void setJournalEntryDate(LocalDate journalEntryDate) {
		this.journalEntryDate = journalEntryDate;
	}

	public String getJournalEntryDescription() {
		return journalEntryDescription;
	}

	public void setJournalEntryDescription(String journalEntryDescription) {
		this.journalEntryDescription = journalEntryDescription;
	}

	public boolean isIsCredit() {
		return isCredit;
	}

	public void setIsCredit(boolean isCredit) {
		this.isCredit = isCredit;
	}

	public Long getLineItemId() {
		return lineItemId;
	}

	public void setLineItemId(Long lineItemId) {
		this.lineItemId = lineItemId;
	}

	public Long getAccountSubtypeId() {
		return accountSubtypeId;
	}

	public void setAccountSubtypeId(Long accountSubtypeId) {
		this.accountSubtypeId = accountSubtypeId;
	}

	public Long getAccountTypeId() {
		return accountTypeId;
	}

	public void setAccountTypeId(Long accountTypeId) {
		this.accountTypeId = accountTypeId;
	}

	@Override
	public String toString() {
		return "LineItemDTO [accountId=" + accountId + ", accountName=" + accountName + ", amount=" + amount
				+ ", description=" + description + ", journalEntryId=" + journalEntryId + ", journalEntryDate="
				+ journalEntryDate + ", isCredit=" + isCredit + ", lineItemId=" + lineItemId + ", accountSubtypeId="
				+ accountSubtypeId + ", accountTypeId=" + accountTypeId + "]";
	}

	@Override
	public int compareTo(LineItemDTO lineItemDto) {
		long difference = Math.subtractExact(this.getLineItemId(), lineItemDto.getLineItemId());
		if (difference > 0) {
			return 1;
		} else if (difference < 0) {
			return -1;
		} else {
			return 0;
		}
	}




}
