package com.easyledger.api.dto;

import com.easyledger.api.model.AccountSubtype;

public class AccountSubtypeDTO {
	
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	
	public AccountSubtypeDTO(AccountSubtype accountSubtype) {
		this.accountSubtypeId = accountSubtype.getId();
		this.accountSubtypeName = accountSubtype.getName();
		this.accountTypeId = accountSubtype.getAccountType().getId();
		this.accountTypeName = accountSubtype.getAccountType().getName();
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

	@Override
	public String toString() {
		return "AccountSubtypeDTO [accountSubtypeId=" + accountSubtypeId + ", accountSubtypeName=" + accountSubtypeName + ", accountTypeId="
				+ accountTypeId + ", accountTypeName=" + accountTypeName + "]";
	}
	
	

}
