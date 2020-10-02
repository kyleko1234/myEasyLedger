package com.easyledger.api.dto;

import java.math.BigInteger;
import java.util.Iterator;
import java.util.List;

import com.easyledger.api.model.Account;
import com.easyledger.api.model.Category;


public class AccountDTO {
	private Long accountId;
	private String accountName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long organizationId;
	private String organizationName;
	private boolean deleted;
	
	public AccountDTO(Account account) {
		this.accountId = account.getId();
		this.accountName = account.getName();
		this.accountTypeId = account.getAccountType().getId();
		this.accountTypeName = account.getAccountType().getName();
		if (account.getAccountSubtype() != null) {
			this.accountSubtypeId = account.getAccountSubtype().getId();
			this.accountSubtypeName = account.getAccountSubtype().getName();
		}
		this.organizationId = account.getOrganization().getId();
		this.organizationName = account.getOrganization().getName();
		
		this.deleted = account.isDeleted();
	}
	
	public AccountDTO(BigInteger accountId, String accountName, BigInteger accountSubtypeId, String accountSubtypeName,
			BigInteger accountTypeId, String accountTypeName, BigInteger organizationId, String organizationName, boolean deleted) {
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.accountTypeId = accountTypeId.longValueExact();
		this.accountTypeName = accountTypeName;
		if (accountSubtypeId != null) {
			this.accountSubtypeId = accountSubtypeId.longValueExact();
			this.accountSubtypeName = accountSubtypeName;
		}
		this.organizationId = organizationId.longValueExact();
		this.organizationName = organizationName;
		this.deleted = deleted;
	}

	public AccountDTO() {
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
		return "AccountDTO [accountId=" + accountId + ", accountName=" + accountName + ", accountTypeId="
				+ accountTypeId + ", accountTypeName=" + accountTypeName + ", accountSubtypeId=" + accountSubtypeId
				+ ", accountSubtypeName=" + accountSubtypeName + ", organizationId=" + organizationId
				+ ", organizationName=" + organizationName + ", deleted=" + deleted + "]";
	}
	
	
}
