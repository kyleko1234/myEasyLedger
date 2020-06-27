package com.easyledger.api.dto;

import com.easyledger.api.model.Account;

public class AccountDTO {
	private Long accountId;
	private String accountName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	
	public AccountDTO(Account account) {
		this.accountId = account.getId();
		this.accountName = account.getName();
		this.accountTypeId = account.getAccountType().getId();
		this.accountTypeName = account.getAccountType().getName();
		if (account.getAccountSubtype() != null) {
			this.accountSubtypeId = account.getAccountSubtype().getId();
			this.accountSubtypeName = account.getAccountSubtype().getName();
		}
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

	@Override
	public String toString() {
		return "AccountDTO [accountId=" + accountId + ", accountName=" + accountName + ", accountTypeId="
				+ accountTypeId + ", accountTypeName=" + accountTypeName + ", accountSubtypeId=" + accountSubtypeId
				+ ", accountSubtypeName=" + accountSubtypeName + "]";
	}
	
	
}
