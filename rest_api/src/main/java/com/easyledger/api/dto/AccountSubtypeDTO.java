package com.easyledger.api.dto;

import com.easyledger.api.model.AccountSubtype;

public class AccountSubtypeDTO {
	
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long organizationId;
	private String organizationName;
	private boolean deleted;
	
	public AccountSubtypeDTO(AccountSubtype accountSubtype) {
		this.accountSubtypeId = accountSubtype.getId();
		this.accountSubtypeName = accountSubtype.getName();
		this.accountTypeId = accountSubtype.getAccountType().getId();
		this.accountTypeName = accountSubtype.getAccountType().getName();
		this.organizationId = accountSubtype.getOrganization().getId();
		this.organizationName = accountSubtype.getOrganization().getName();
		this.deleted = accountSubtype.isDeleted();
	}
	
	public AccountSubtypeDTO() {
	}

	//Getters, Setters, toString
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

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "AccountSubtypeDTO [accountSubtypeId=" + accountSubtypeId + ", accountSubtypeName=" + accountSubtypeName
				+ ", accountTypeId=" + accountTypeId + ", accountTypeName=" + accountTypeName + ", organizationId="
				+ organizationId + ", organizationName=" + organizationName + ", deleted=" + deleted + "]";
	}
	
	

}
