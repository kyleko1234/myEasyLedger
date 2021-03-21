package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Date;

import com.easyledger.api.model.LineItem;


public class LineItemDTO {
	
	private Long accountId;
	private String accountName;
	private BigDecimal amount;
	private String description;
	private Long journalEntryId;
	private LocalDate journalEntryDate;
	private boolean isCredit;
	private Long lineItemId;

	

	
	public LineItemDTO(LineItem lineItem) {
    	
    	this.lineItemId = lineItem.getId();
    	this.journalEntryId = lineItem.getJournalEntry().getId();
    	this.journalEntryDate = lineItem.getJournalEntry().getJournalEntryDate();
    	this.isCredit = lineItem.isIsCredit();
    	this.amount = lineItem.getAmount();
    	this.description = lineItem.getDescription();
    	this.accountId = lineItem.getAccount().getId();
    	this.accountName = lineItem.getAccount().getName();
	}

	public LineItemDTO() {
	}

	public LineItemDTO(BigInteger accountId, String accountName, BigDecimal amount, String description, 
			BigInteger journalEntryId, Date journalEntryDate, boolean isCredit, BigInteger lineItemId) {
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.amount = amount;
		this.description = description;
		this.journalEntryId = journalEntryId.longValueExact();
		this.journalEntryDate = LocalDate.parse(journalEntryDate.toString());
		this.isCredit = isCredit;
		this.lineItemId = lineItemId.longValueExact();
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

	@Override
	public String toString() {
		return "LineItemDTO [accountId=" + accountId + ", accountName=" + accountName + ", amount=" + amount
				+ ", description=" + description + ", journalEntryId=" + journalEntryId + ", journalEntryDate="
				+ journalEntryDate + ", isCredit=" + isCredit + ", lineItemId=" + lineItemId + "]";
	}	





}
