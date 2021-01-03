package com.easyledger.api.dto;

import java.math.BigInteger;

import com.easyledger.api.model.AccountGroup;
import com.easyledger.api.model.AccountSubtype;

public class AccountGroupDTO {
	
	private Long accountGroupId;
	private String accountGroupName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long organizationId;
	private String organizationName;
	private boolean deleted;
	
	public AccountGroupDTO(AccountGroup accountGroup) {
		this.accountGroupId = accountGroup.getId();
		this.accountGroupName = accountGroup.getName();
		this.accountSubtypeId = accountGroup.getAccountSubtype().getId();
		this.accountSubtypeName = accountGroup.getAccountSubtype().getName();
		this.accountTypeId = accountGroup.getAccountSubtype().getAccountType().getId();
		this.accountTypeName = accountGroup.getAccountSubtype().getAccountType().getName();
		this.organizationId = accountGroup.getOrganization().getId();
		this.organizationName = accountGroup.getOrganization().getName();
		this.deleted = accountGroup.isDeleted();
	}
	
	public AccountGroupDTO(BigInteger accountGroupId, String accountGroupName, BigInteger accountSubtypeId,
			String accountSubtypeName, BigInteger accountTypeId, String accountTypeName, BigInteger organizationId,
			String organizationName, boolean deleted) {
		this.accountGroupId = accountGroupId.longValueExact();
		this.accountGroupName = accountGroupName;
		this.accountSubtypeId = accountSubtypeId.longValueExact();
		this.accountSubtypeName = accountSubtypeName;
		this.accountTypeId = accountTypeId.longValueExact();
		this.accountTypeName = accountTypeName;
		this.organizationId = organizationId.longValueExact();
		this.organizationName = organizationName;
		this.deleted = deleted;
	}

	public AccountGroupDTO() {
	}

	//Getters, Setters, toString

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
		return "AccountGroupDTO [accountGroupId=" + accountGroupId + ", accountGroupName=" + accountGroupName
				+ ", accountSubtypeId=" + accountSubtypeId + ", accountSubtypeName=" + accountSubtypeName
				+ ", accountTypeId=" + accountTypeId + ", accountTypeName=" + accountTypeName + ", organizationId="
				+ organizationId + ", organizationName=" + organizationName + ", deleted=" + deleted + "]";
	}


	

}
