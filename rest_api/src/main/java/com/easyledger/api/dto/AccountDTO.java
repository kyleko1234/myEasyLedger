package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

import com.easyledger.api.model.Account;


public class AccountDTO {
	private Long accountId;
	private String accountCode;
	private String accountName;
	private Long parentAccountId;
	private String parentAccountName;
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long organizationId;
	private String organizationName;
	private BigDecimal debitTotal;
	private BigDecimal creditTotal;
	private BigDecimal initialDebitAmount;
	private BigDecimal initialCreditAmount;
	private BigDecimal debitsMinusCredits;
	private boolean hasChildren;
	
	public AccountDTO(Account account) {
		this.accountId = account.getId();
		this.accountCode = account.getAccountCode();
		this.accountName = account.getName();
		if (account.getParentAccount() != null) {
			this.parentAccountId = account.getParentAccount().getId();
			this.parentAccountName = account.getParentAccount().getName();
			this.accountSubtypeId = account.getParentAccount().getAccountSubtype().getId();
			this.accountSubtypeName = account.getParentAccount().getAccountSubtype().getName();
			this.accountTypeId = account.getParentAccount().getAccountSubtype().getAccountType().getId();
			this.accountTypeName = account.getParentAccount().getAccountSubtype().getAccountType().getName();
		} else {
			this.accountSubtypeId = account.getAccountSubtype().getId();
			this.accountSubtypeName = account.getAccountSubtype().getName();
			this.accountTypeId = account.getAccountSubtype().getAccountType().getId();
			this.accountTypeName = account.getAccountSubtype().getAccountType().getName();
		}
		this.organizationId = account.getOrganization().getId();
		this.organizationName = account.getOrganization().getName();
		this.debitTotal = account.getDebitTotal();
		this.creditTotal = account.getCreditTotal();
		this.initialDebitAmount = account.getInitialDebitAmount();
		this.initialCreditAmount = account.getInitialCreditAmount();
		this.debitsMinusCredits = this.getDebitTotal().subtract(this.getCreditTotal());
		this.hasChildren = account.isHasChildren();
	}
	
	public AccountDTO(BigInteger accountId, String accountCode, String accountName, BigInteger parentAccountId, String parentAccountName,
			BigInteger accountSubtypeId, String accountSubtypeName, BigInteger accountTypeId, String accountTypeName,
			BigInteger organizationId, String organizationName, BigDecimal debitTotal, BigDecimal creditTotal, 
			BigDecimal initialDebitAmount, BigDecimal initialCreditAmount, boolean hasChildren) {
		this.accountId = accountId.longValueExact();
		this.accountCode = accountCode;
		this.accountName = accountName;
		if (parentAccountId != null) {
			this.parentAccountId = parentAccountId.longValueExact();
			this.parentAccountName = parentAccountName;
		}
		if (accountSubtypeId != null) {
			this.accountSubtypeId = accountSubtypeId.longValueExact();
			this.accountSubtypeName = accountSubtypeName;
			this.accountTypeId = accountTypeId.longValueExact();
			this.accountTypeName = accountTypeName;
		}
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
		this.initialDebitAmount = initialDebitAmount;
		this.initialCreditAmount = initialCreditAmount;
		this.debitsMinusCredits = this.debitTotal.subtract(this.creditTotal);
		this.hasChildren = hasChildren;
	}

	public AccountDTO() {
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountCode() {
		return accountCode;
	}

	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Long getParentAccountId() {
		return parentAccountId;
	}

	public void setParentAccountId(Long parentAccountId) {
		this.parentAccountId = parentAccountId;
	}

	public String getParentAccountName() {
		return parentAccountName;
	}

	public void setParentAccountName(String parentAccountName) {
		this.parentAccountName = parentAccountName;
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
	}

	public BigDecimal getCreditTotal() {
		return creditTotal;
	}

	public void setCreditTotal(BigDecimal creditTotal) {
		this.creditTotal = creditTotal;
	}

	public BigDecimal getInitialDebitAmount() {
		return initialDebitAmount;
	}

	public void setInitialDebitAmount(BigDecimal initialDebitAmount) {
		this.initialDebitAmount = initialDebitAmount;
	}

	public BigDecimal getInitialCreditAmount() {
		return initialCreditAmount;
	}

	public void setInitialCreditAmount(BigDecimal initialCreditAmount) {
		this.initialCreditAmount = initialCreditAmount;
	}
	
	public BigDecimal getDebitsMinusCredits() {
		return debitsMinusCredits;
	}

	public void setDebitsMinusCredits(BigDecimal debitsMinusCredits) {
		this.debitsMinusCredits = debitsMinusCredits;
	}

	public boolean isHasChildren() {
		return hasChildren;
	}

	public void setHasChildren(boolean hasChildren) {
		this.hasChildren = hasChildren;
	}

	@Override
	public String toString() {
		return "AccountDTO [accountId=" + accountId + ", accountCode=" + accountCode + ", accountName=" + accountName
				+ ", parentAccountId=" + parentAccountId + ", parentAccountName=" + parentAccountName
				+ ", accountSubtypeId=" + accountSubtypeId + ", accountSubtypeName=" + accountSubtypeName
				+ ", accountTypeId=" + accountTypeId + ", accountTypeName=" + accountTypeName + ", organizationId="
				+ organizationId + ", organizationName=" + organizationName + ", debitTotal=" + debitTotal
				+ ", creditTotal=" + creditTotal + ", initialDebitAmount=" + initialDebitAmount
				+ ", initialCreditAmount=" + initialCreditAmount + ", debitsMinusCredits=" + debitsMinusCredits
				+ ", hasChildren=" + hasChildren + "]";
	}


	
}
