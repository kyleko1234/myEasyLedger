package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

import com.easyledger.api.model.Account;
import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.model.AccountType;
import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;



public class LineItemDTO {

	@JsonIgnore
	private Account account;
	@JsonIgnore
	private AccountGroup accountGroup;
	@JsonIgnore
	private AccountSubtype accountSubtype;
	@JsonIgnore
	private AccountType accountType;
	@JsonIgnore
	private JournalEntry journalEntry;
	@JsonIgnore
	private LineItem lineItem;
	
	private Long accountId;
	private String accountName;
	private Long accountGroupId;
	private String accountGroupName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	private BigDecimal amount;
	private String description;
	private Long journalEntryId;
	private LocalDate journalEntryDate;
	private boolean isCredit;
	private Long lineItemId;

	

	
	public LineItemDTO(LineItem lineItem) {
		this.lineItem = lineItem;
    	this.account = this.lineItem.getAccount();
    	this.accountGroup = account.getAccountGroup();
    	this.accountSubtype = accountGroup.getAccountSubtype();
    	this.accountType = accountSubtype.getAccountType();
    	this.journalEntry = lineItem.getJournalEntry();
    	
    	this.lineItemId = this.lineItem.getId();
    	this.journalEntryId = this.journalEntry.getId();
    	this.journalEntryDate = this.journalEntry.getJournalEntryDate();
    	this.isCredit = this.lineItem.isIsCredit();
    	this.amount = this.lineItem.getAmount();
    	this.description = this.lineItem.getDescription();
    	this.accountId = this.account.getId();
    	this.accountName = this.account.getName();
    	this.accountGroupId = this.accountGroup.getId();
    	this.accountGroupName = this.accountGroup.getName();
    	this.accountTypeId = this.accountType.getId();
    	this.accountTypeName = this.accountType.getName();
    	this.accountSubtypeId = this.accountSubtype.getId();
    	this.accountSubtypeName = this.accountSubtype.getName();
	}

	public LineItemDTO() {
	}

	public LineItemDTO(BigInteger accountId, String accountName, BigInteger accountGroupId, String accountGroupName,
			BigInteger accountSubtypeId, String accountSubtypeName, BigInteger accountTypeId, String accountTypeName,
			BigDecimal amount, String description, BigInteger journalEntryId, Date journalEntryDate, boolean isCredit,
			BigInteger lineItemId) {
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.accountGroupId = accountGroupId.longValueExact();
		this.accountGroupName = accountGroupName;
		this.accountSubtypeId = accountSubtypeId.longValueExact();
		this.accountSubtypeName = accountSubtypeName;
		this.accountTypeId = accountTypeId.longValueExact();
		this.accountTypeName = accountTypeName;
		this.amount = amount;
		this.description = description;
		this.journalEntryId = journalEntryId.longValueExact();
		this.journalEntryDate = LocalDate.parse(journalEntryDate.toString());
		this.isCredit = isCredit;
		this.lineItemId = lineItemId.longValueExact();
	}

	/** GETTERS AND SETTERS **/
	
	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public AccountGroup getAccountGroup() {
		return accountGroup;
	}

	public void setAccountGroup(AccountGroup accountGroup) {
		this.accountGroup = accountGroup;
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

	public JournalEntry getJournalEntry() {
		return journalEntry;
	}

	public void setJournalEntry(JournalEntry journalEntry) {
		this.journalEntry = journalEntry;
	}

	public LineItem getLineItem() {
		return lineItem;
	}

	public void setLineItem(LineItem lineItem) {
		this.lineItem = lineItem;
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

	public Long getAccountGroupId() {
		return accountGroupId;
	}

	public void setAccountGroupId(Long accountGroupId) {
		this.accountGroupId = accountGroupId;
	}

	public String getAccountGroupName() {
		return accountGroupName;
	}

	public void setAccountGroupName(String accountGroupName) {
		this.accountGroupName = accountGroupName;
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
		return "LineItemDTO [account=" + account + ", accountGroup=" + accountGroup + ", accountSubtype="
				+ accountSubtype + ", accountType=" + accountType + ", journalEntry=" + journalEntry + ", lineItem="
				+ lineItem + ", accountId=" + accountId + ", accountName=" + accountName + ", accountGroupId="
				+ accountGroupId + ", accountGroupName=" + accountGroupName + ", accountSubtypeId=" + accountSubtypeId
				+ ", accountSubtypeName=" + accountSubtypeName + ", accountTypeId=" + accountTypeId
				+ ", accountTypeName=" + accountTypeName + ", amount=" + amount + ", description=" + description
				+ ", journalEntryId=" + journalEntryId + ", journalEntryDate=" + journalEntryDate + ", isCredit="
				+ isCredit + ", lineItemId=" + lineItemId + "]";
	}





}
