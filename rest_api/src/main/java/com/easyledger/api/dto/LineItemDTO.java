package com.easyledger.api.dto;

import java.math.BigDecimal;

import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.Category;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;



public class LineItemDTO {

	@JsonIgnore
	private Account account;
	@JsonIgnore
	private AccountSubtype accountSubtype;
	@JsonIgnore
	private AccountType accountType;
	@JsonIgnore
	private Category category;
	@JsonIgnore
	private JournalEntry journalEntry;
	@JsonIgnore
	private LineItem lineItem;
	
	private Long accountId;
	private String accountName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	private BigDecimal amount;
	private Long categoryId;
	private String categoryName;
	private String description;
	private Long journalEntryId;
	private boolean isCredit;
	private Long lineItemId;

	

	
	public LineItemDTO(LineItem lineItem) {
		this.lineItem = lineItem;
    	this.account = this.lineItem.getAccount();
    	this.accountSubtype = account.getAccountSubtype();
    	this.accountType = account.getAccountType();
    	this.category = lineItem.getCategory();
    	this.journalEntry = lineItem.getJournalEntry();
    	
    	this.lineItemId = this.lineItem.getId();
    	this.journalEntryId = this.journalEntry.getId();
    	this.accountId = this.account.getId();
    	this.isCredit = this.lineItem.isIsCredit();
    	this.amount = this.lineItem.getAmount();
    	this.description = this.lineItem.getDescription();
    	if (this.category != null) {
    		this.categoryId = this.category.getId();
    		this.categoryName = this.category.getName();
    	}
    	this.accountName = this.account.getName();
    	this.accountTypeId = this.accountType.getId();
    	this.accountTypeName = this.accountType.getName();
    	if (this.accountSubtype != null) {
    		this.accountSubtypeId = this.accountSubtype.getId();
    		this.accountSubtypeName = this.accountSubtype.getName();
    	}
	}

	public LineItemDTO() {
	}
	
	/** GETTERS AND SETTERS **/

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

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public boolean isIsCredit() {
		return isCredit;
	}

	public void setIsCredit(boolean isCredit) {
		this.isCredit = isCredit;
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

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Long getAccountTypeId() {
		return accountTypeId;
	}

	public void setAccountTypeId(Long accountTypeId) {
		this.accountTypeId = accountTypeId;
	}

	public String getAccountTypeName() {
		return accountTypeName;
	}

	public void setAccountTypeName(String accountTypeName) {
		this.accountTypeName = accountTypeName;
	}

	public Long getAccountSubtypeId() {
		return accountSubtypeId;
	}

	public void setAccountSubtypeId(Long accountSubtypeId) {
		this.accountSubtypeId = accountSubtypeId;
	}

	public String getAccountSubtypeName() {
		return accountSubtypeName;
	}

	public void setAccountSubtypeName(String accountSubtypeName) {
		this.accountSubtypeName = accountSubtypeName;
	}

	public LineItem getLineItem() {
		return lineItem;
	}

	public void setLineItem(LineItem lineItem) {
		this.lineItem = lineItem;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public AccountSubtype getAccountSubtype() {
		return accountSubtype;
	}

	public void setAccountSubtype(AccountSubtype accountSubtype) {
		this.accountSubtype = accountSubtype;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public JournalEntry getJournalEntry() {
		return journalEntry;
	}

	public void setEntry(JournalEntry journalEntry) {
		this.journalEntry = journalEntry;
	}
	
	@Override
	public String toString() {
		return "LineItemDTO [account=" + account + ", accountSubtype=" + accountSubtype + ", accountType=" + accountType
				+ ", category=" + category + ", journalEntry=" + journalEntry + ", lineItem=" + lineItem
				+ ", accountId=" + accountId + ", accountName=" + accountName + ", accountSubtypeId=" + accountSubtypeId
				+ ", accountSubtypeName=" + accountSubtypeName + ", accountTypeId=" + accountTypeId
				+ ", accountTypeName=" + accountTypeName + ", amount=" + amount + ", categoryId=" + categoryId
				+ ", categoryName=" + categoryName + ", description=" + description + ", journalEntryId="
				+ journalEntryId + ", isCredit=" + isCredit + ", lineItemId=" + lineItemId + "]";
	}
	
	
	


}
