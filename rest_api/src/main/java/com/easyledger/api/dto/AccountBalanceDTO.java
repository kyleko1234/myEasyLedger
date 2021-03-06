package com.easyledger.api.dto;

import java.math.BigDecimal;

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
	private BigDecimal sumOfDebitLineItems;
	private BigDecimal sumOfCreditLineItems;
	private BigDecimal initialDebitAmount;
	private BigDecimal initialCreditAmount;
	private BigDecimal debitTotal;
	private BigDecimal creditTotal;
	private BigDecimal totalDebitsMinusCredits;
	
	public AccountBalanceDTO(Long accountId, String accountName, Long accountGroupId, String accountGroupName,
			Long accountSubtypeId, String accountSubtypeName, Long accountTypeId, String accountTypeName,
			Long organizationId, String organizationName, BigDecimal sumOfDebitLineItems,
			BigDecimal sumOfCreditLineItems, BigDecimal initialDebitAmount, BigDecimal initialCreditAmount) {
		this.accountId = accountId;
		this.accountName = accountName;
		this.accountGroupId = accountGroupId;
		this.accountGroupName = accountGroupName;
		this.accountSubtypeId = accountSubtypeId;
		this.accountSubtypeName = accountSubtypeName;
		this.accountTypeId = accountTypeId;
		this.accountTypeName = accountTypeName;
		this.organizationId = organizationId;
		this.organizationName = organizationName;
		if (sumOfDebitLineItems != null) {
			this.sumOfDebitLineItems = sumOfDebitLineItems;
		} else {
			this.sumOfDebitLineItems = new BigDecimal(0);
		}
		if (sumOfCreditLineItems != null) {
			this.sumOfCreditLineItems = sumOfCreditLineItems;
		} else {
			this.sumOfCreditLineItems = new BigDecimal(0);
		}
		this.initialDebitAmount = initialDebitAmount;
		this.initialCreditAmount = initialCreditAmount;
		this.debitTotal = this.sumOfDebitLineItems.add(initialDebitAmount);
		this.creditTotal = this.sumOfCreditLineItems.add(initialCreditAmount);
		this.totalDebitsMinusCredits = debitTotal.subtract(creditTotal);
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

	public BigDecimal getSumOfDebitLineItems() {
		return sumOfDebitLineItems;
	}

	public void setSumOfDebitLineItems(BigDecimal sumOfDebitLineItems) {
		this.sumOfDebitLineItems = sumOfDebitLineItems;
	}

	public BigDecimal getSumOfCreditLineItems() {
		return sumOfCreditLineItems;
	}

	public void setSumOfCreditLineItems(BigDecimal sumOfCreditLineItems) {
		this.sumOfCreditLineItems = sumOfCreditLineItems;
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

	public BigDecimal getTotalDebitsMinusCredits() {
		return totalDebitsMinusCredits;
	}

	public void setTotalDebitsMinusCredits(BigDecimal totalDebitsMinusCredits) {
		this.totalDebitsMinusCredits = totalDebitsMinusCredits;
	}

	@Override
	public String toString() {
		return "AccountBalanceDTO [accountId=" + accountId + ", accountName=" + accountName + ", accountGroupId="
				+ accountGroupId + ", accountGroupName=" + accountGroupName + ", accountSubtypeId=" + accountSubtypeId
				+ ", accountSubtypeName=" + accountSubtypeName + ", accountTypeId=" + accountTypeId
				+ ", accountTypeName=" + accountTypeName + ", organizationId=" + organizationId + ", organizationName="
				+ organizationName + ", sumOfDebitLineItems=" + sumOfDebitLineItems + ", sumOfCreditLineItems="
				+ sumOfCreditLineItems + ", initialDebitAmount=" + initialDebitAmount + ", initialCreditAmount="
				+ initialCreditAmount + ", debitTotal=" + debitTotal + ", creditTotal=" + creditTotal
				+ ", totalDebitsMinusCredits=" + totalDebitsMinusCredits + "]";
	}

	
}

