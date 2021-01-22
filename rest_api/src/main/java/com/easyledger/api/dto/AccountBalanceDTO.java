package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;


public class AccountBalanceDTO {
	private Long accountId;
	private String accountName;
	private Long accountGroupId;
	private String accountGroupName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long organizationId;
	private String organizationName;
	private BigDecimal debitTotal;
	private BigDecimal creditTotal;
	private BigDecimal debitsMinusCredits;

	
	public AccountBalanceDTO(BigInteger accountId, String accountName, BigInteger accountGroupId, String accountGroupName,
			BigInteger accountSubtypeId, String accountSubtypeName, BigInteger accountTypeId, String accountTypeName,
			BigInteger organizationId, String organizationName,
			BigDecimal debitTotal, BigDecimal creditTotal) {
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.accountGroupId = accountGroupId.longValueExact();
		this.accountGroupName = accountGroupName;
		this.accountSubtypeId = accountSubtypeId.longValueExact();
		this.accountSubtypeName = accountSubtypeName;
		this.accountTypeId = accountTypeId.longValueExact();
		this.accountTypeName = accountTypeName;
		this.organizationId = organizationId.longValueExact();
		this.organizationName = organizationName;
		if (debitTotal != null) {
			this.debitTotal = debitTotal;
		} else {
			this.debitTotal = new BigDecimal(0);
		}
		if (creditTotal != null) {
			this.creditTotal = creditTotal;
		} else {
			this.creditTotal = new BigDecimal(0);
		}
		
		this.debitsMinusCredits = this.debitTotal.subtract(this.creditTotal);
	}


	public AccountBalanceDTO() {
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


	public BigDecimal getDebitTotal() {
		return debitTotal;
	}


	public void setDebitTotal(BigDecimal debitTotal) {
		this.debitTotal = debitTotal;
		this.debitsMinusCredits = this.debitTotal.subtract(this.creditTotal);
	}


	public BigDecimal getCreditTotal() {
		return creditTotal;
	}


	public void setCreditTotal(BigDecimal creditTotal) {
		this.creditTotal = creditTotal;
		this.debitsMinusCredits = this.debitTotal.subtract(this.creditTotal);
	}


	public BigDecimal getDebitsMinusCredits() {
		return debitsMinusCredits;
	}


	@Override
	public String toString() {
		return "AccountBalanceDTO [accountId=" + accountId + ", accountName=" + accountName + ", accountGroupId="
				+ accountGroupId + ", accountGroupName=" + accountGroupName + ", accountSubtypeId=" + accountSubtypeId
				+ ", accountSubtypeName=" + accountSubtypeName + ", accountTypeId=" + accountTypeId
				+ ", accountTypeName=" + accountTypeName + ", organizationId=" + organizationId + ", organizationName="
				+ organizationName + ", debitTotal=" + debitTotal + ", creditTotal=" + creditTotal + "]";
	}



	
}
