package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

public class AccountGroupBalanceDTO {
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
	private BigDecimal sumOfInitialDebitAmounts;
	private BigDecimal sumOfInitialCreditAmounts;
	private BigDecimal debitTotal;
	private BigDecimal creditTotal;
	private BigDecimal debitsMinusCredits;
	
	public AccountGroupBalanceDTO(BigInteger accountGroupId, String accountGroupName, BigInteger accountSubtypeId,
			String accountSubtypeName, BigInteger accountTypeId, String accountTypeName, BigInteger organizationId,
			String organizationName, BigDecimal debitTotal, BigDecimal creditTotal) {
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
	
	public AccountGroupBalanceDTO(BigInteger accountGroupId, String accountGroupName, BigInteger accountSubtypeId,
			String accountSubtypeName, BigInteger accountTypeId, String accountTypeName, BigInteger organizationId,
			String organizationName, BigDecimal sumOfDebitLineItems, BigDecimal sumOfCreditLineItems, 
			BigDecimal sumOfInitialDebitAmounts, BigDecimal sumOfInitialCreditAmounts) {
		this.accountGroupId = accountGroupId.longValueExact();
		this.accountGroupName = accountGroupName;
		this.accountSubtypeId = accountSubtypeId.longValueExact();
		this.accountSubtypeName = accountSubtypeName;
		this.accountTypeId = accountTypeId.longValueExact();
		this.accountTypeName = accountTypeName;
		this.organizationId = organizationId.longValueExact();
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
		if (sumOfInitialDebitAmounts != null) {
			this.sumOfInitialDebitAmounts = sumOfInitialDebitAmounts;
		} else {
			this.sumOfInitialDebitAmounts = new BigDecimal(0);
		}
		if (sumOfInitialCreditAmounts != null) {
			this.sumOfInitialCreditAmounts = sumOfInitialCreditAmounts;
		} else {
			this.sumOfInitialCreditAmounts = new BigDecimal(0);
		}
		this.debitTotal = this.sumOfDebitLineItems.add(this.sumOfInitialDebitAmounts);
		this.creditTotal = this.sumOfCreditLineItems.add(this.sumOfInitialCreditAmounts);
		this.debitsMinusCredits = this.debitTotal.subtract(this.creditTotal);
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

	public BigDecimal getSumOfInitialDebitAmounts() {
		return sumOfInitialDebitAmounts;
	}

	public void setSumOfInitialDebitAmounts(BigDecimal sumOfInitialDebitAmounts) {
		this.sumOfInitialDebitAmounts = sumOfInitialDebitAmounts;
	}

	public BigDecimal getSumOfInitialCreditAmounts() {
		return sumOfInitialCreditAmounts;
	}

	public void setSumOfInitialCreditAmounts(BigDecimal sumOfInitialCreditAmounts) {
		this.sumOfInitialCreditAmounts = sumOfInitialCreditAmounts;
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

	public void setDebitsMinusCredits(BigDecimal debitsMinusCredits) {
		this.debitsMinusCredits = debitsMinusCredits;
	}

	public BigDecimal getDebitsMinusCredits() {
		return debitsMinusCredits;
	}

	@Override
	public String toString() {
		return "AccountGroupBalanceDTO [accountGroupId=" + accountGroupId + ", accountGroupName=" + accountGroupName
				+ ", accountSubtypeId=" + accountSubtypeId + ", accountSubtypeName=" + accountSubtypeName
				+ ", accountTypeId=" + accountTypeId + ", accountTypeName=" + accountTypeName + ", organizationId="
				+ organizationId + ", organizationName=" + organizationName + ", debitTotal=" + debitTotal
				+ ", creditTotal=" + creditTotal + ", debitsMinusCredits=" + debitsMinusCredits + "]";
	}
	
	
}
