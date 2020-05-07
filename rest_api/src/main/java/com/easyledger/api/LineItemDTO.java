package com.easyledger.api;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LineItemDTO {
	private Long lineItemId;
	private Long entryId;
	private Long accountId;
	private boolean isCredit;
	private Double amount;
	private String description;
	private Long categoryId;
	private String categoryName;
	private String accountName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	
	@JsonIgnore
	private LineItem lineItem;
	@JsonIgnore
	private Account account;
	@JsonIgnore
	private AccountSubtype accountSubtype;
	@JsonIgnore
	private AccountType accountType;
	@JsonIgnore
	private Category category;
	@JsonIgnore
	private Entry entry;
	
	public LineItemDTO(LineItem lineItem) {
		this.lineItem = lineItem;
    	this.account = this.lineItem.getAccount();
    	this.accountSubtype = account.getAccountSubtype();
    	this.accountType = account.getAccountType();
    	this.category = lineItem.getCategory();
    	this.entry = lineItem.getEntry();
    	
    	this.lineItemId = this.lineItem.getId();
    	this.entryId = this.entry.getId();
    	this.accountId = this.account.getId();
    	this.isCredit = this.lineItem.isCredit();
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

	
	/** GETTERS AND SETTERS **/

	@JsonProperty(value = "line_item_id")
	public Long getLineItemId() {
		return lineItemId;
	}

	public void setLineItemId(Long lineItemId) {
		this.lineItemId = lineItemId;
	}

	@JsonProperty(value = "entry_id")
	public Long getEntryId() {
		return entryId;
	}

	public void setEntryId(Long entryId) {
		this.entryId = entryId;
	}

	@JsonProperty(value = "account_id")
	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	@JsonProperty(value = "is_credit")
	public boolean isCredit() {
		return isCredit;
	}

	public void setCredit(boolean isCredit) {
		this.isCredit = isCredit;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@JsonProperty(value = "category_id")
	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	@JsonProperty(value = "category_name")
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	@JsonProperty(value = "account_name")
	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	@JsonProperty(value = "account_type_id")
	public Long getAccountTypeId() {
		return accountTypeId;
	}

	public void setAccountTypeId(Long accountTypeId) {
		this.accountTypeId = accountTypeId;
	}

	@JsonProperty(value = "account_type_name")
	public String getAccountTypeName() {
		return accountTypeName;
	}

	public void setAccountTypeName(String accountTypeName) {
		this.accountTypeName = accountTypeName;
	}

	@JsonProperty(value = "account_subtype_id")
	public Long getAccountSubtypeId() {
		return accountSubtypeId;
	}

	public void setAccountSubtypeId(Long accountSubtypeId) {
		this.accountSubtypeId = accountSubtypeId;
	}

	@JsonProperty(value = "account_subtype_name")
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

	public Entry getEntry() {
		return entry;
	}

	public void setEntry(Entry entry) {
		this.entry = entry;
	}


	@Override
	public String toString() {
		return "LineItemDTO [lineItemId=" + lineItemId + ", entryId=" + entryId + ", accountId=" + accountId
				+ ", isCredit=" + isCredit + ", amount=" + amount + ", description=" + description + ", categoryId="
				+ categoryId + ", categoryName=" + categoryName + ", accountName=" + accountName + ", accountTypeId="
				+ accountTypeId + ", accountTypeName=" + accountTypeName + ", accountSubtypeId=" + accountSubtypeId
				+ ", accountSubtypeName=" + accountSubtypeName + ", lineItem=" + lineItem + ", account=" + account
				+ ", accountSubtype=" + accountSubtype + ", accountType=" + accountType + ", category=" + category
				+ ", entry=" + entry + "]";
	}
	
	
	


}
