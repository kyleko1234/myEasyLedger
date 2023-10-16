package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

public class AccountSubtypeBalanceDTO {
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
	
	private Long incomeStatementFormatPositionId;
	private String incomeStatementFormatPositionName;
	private Long cashFlowFormatPositionId;
	private String cashFlowFormatPositionName;
	private Long balanceSheetFormatPositionId;
	private String balanceSheetFormatPositionName;
	private boolean cashItem;
	private boolean relevantToTaxesPaid;
	private boolean relevantToInterestPaid;
	private boolean relevantToDividendsPaid;
	private boolean relevantToDepreciationAmortization;

	public AccountSubtypeBalanceDTO(BigInteger accountSubtypeId, String accountSubtypeName, BigInteger accountTypeId,
			String accountTypeName, BigInteger organizationId, String organizationName, BigDecimal debitTotal,
			BigDecimal creditTotal, BigInteger incomeStatementFormatPositionId, String incomeStatementFormatPositionName, BigInteger cashFlowFormatPositionId,
			String cashFlowFormatPositionName, BigInteger balanceSheetFormatPositionId, String balanceSheetFormatPositionName,
			boolean cashItem, boolean relevantToTaxesPaid, boolean relevantToInterestPaid, boolean relevantToDividendsPaid,
			boolean relevantToDepreciationAmortization) {
		super();
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
		this.incomeStatementFormatPositionId = incomeStatementFormatPositionId.longValueExact();
		this.incomeStatementFormatPositionName = incomeStatementFormatPositionName;
		this.cashFlowFormatPositionId = cashFlowFormatPositionId.longValueExact();
		this.cashFlowFormatPositionName = cashFlowFormatPositionName;
		this.balanceSheetFormatPositionId = balanceSheetFormatPositionId.longValueExact();
		this.balanceSheetFormatPositionName = balanceSheetFormatPositionName;
		this.cashItem = cashItem;
		this.relevantToTaxesPaid = relevantToTaxesPaid;
		this.relevantToInterestPaid = relevantToInterestPaid;
		this.relevantToDividendsPaid = relevantToDividendsPaid;
		this.relevantToDepreciationAmortization = relevantToDepreciationAmortization;

	}

	public AccountSubtypeBalanceDTO(BigInteger accountSubtypeId, String accountSubtypeName, BigInteger accountTypeId,
			String accountTypeName, BigInteger organizationId, String organizationName, BigDecimal sumOfDebitLineItems,
			BigDecimal sumOfCreditLineItems, BigDecimal sumOfInitialDebitAmounts, BigDecimal sumOfInitialCreditAmounts,
			BigInteger incomeStatementFormatPositionId, String incomeStatementFormatPositionName, BigInteger cashFlowFormatPositionId,
			String cashFlowFormatPositionName, BigInteger balanceSheetFormatPositionId, String balanceSheetFormatPositionName,
			boolean cashItem, boolean relevantToTaxesPaid, boolean relevantToInterestPaid, boolean relevantToDividendsPaid,
			boolean relevantToDepreciationAmortization) {
		super();
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
		this.incomeStatementFormatPositionId = incomeStatementFormatPositionId.longValueExact();
		this.incomeStatementFormatPositionName = incomeStatementFormatPositionName;
		this.cashFlowFormatPositionId = cashFlowFormatPositionId.longValueExact();
		this.cashFlowFormatPositionName = cashFlowFormatPositionName;
		this.balanceSheetFormatPositionId = balanceSheetFormatPositionId.longValueExact();
		this.balanceSheetFormatPositionName = balanceSheetFormatPositionName;
		this.cashItem = cashItem;
		this.relevantToTaxesPaid = relevantToTaxesPaid;
		this.relevantToInterestPaid = relevantToInterestPaid;
		this.relevantToDividendsPaid = relevantToDividendsPaid;
		this.relevantToDepreciationAmortization = relevantToDepreciationAmortization;
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

	public BigDecimal getDebitsMinusCredits() {
		return debitsMinusCredits;
	}
	
	public void setDebitsMinusCredits(BigDecimal debitsMinusCredits) {
		this.debitsMinusCredits = debitsMinusCredits;
	}

	public Long getIncomeStatementFormatPositionId() {
		return incomeStatementFormatPositionId;
	}

	public void setIncomeStatementFormatPositionId(Long incomeStatementFormatPositionId) {
		this.incomeStatementFormatPositionId = incomeStatementFormatPositionId;
	}

	public String getIncomeStatementFormatPositionName() {
		return incomeStatementFormatPositionName;
	}

	public void setIncomeStatementFormatPositionName(String incomeStatementFormatPositionName) {
		this.incomeStatementFormatPositionName = incomeStatementFormatPositionName;
	}

	public Long getCashFlowFormatPositionId() {
		return cashFlowFormatPositionId;
	}

	public void setCashFlowFormatPositionId(Long cashFlowFormatPositionId) {
		this.cashFlowFormatPositionId = cashFlowFormatPositionId;
	}

	public String getCashFlowFormatPositionName() {
		return cashFlowFormatPositionName;
	}

	public void setCashFlowFormatPositionName(String cashFlowFormatPositionName) {
		this.cashFlowFormatPositionName = cashFlowFormatPositionName;
	}

	public Long getBalanceSheetFormatPositionId() {
		return balanceSheetFormatPositionId;
	}

	public void setBalanceSheetFormatPositionId(Long balanceSheetFormatPositionId) {
		this.balanceSheetFormatPositionId = balanceSheetFormatPositionId;
	}

	public String getBalanceSheetFormatPositionName() {
		return balanceSheetFormatPositionName;
	}

	public void setBalanceSheetFormatPositionName(String balanceSheetFormatPositionName) {
		this.balanceSheetFormatPositionName = balanceSheetFormatPositionName;
	}

	public boolean isCashItem() {
		return cashItem;
	}

	public void setCashItem(boolean cashItem) {
		this.cashItem = cashItem;
	}

	public boolean isRelevantToTaxesPaid() {
		return relevantToTaxesPaid;
	}

	public void setRelevantToTaxesPaid(boolean relevantToTaxesPaid) {
		this.relevantToTaxesPaid = relevantToTaxesPaid;
	}

	public boolean isRelevantToInterestPaid() {
		return relevantToInterestPaid;
	}

	public void setRelevantToInterestPaid(boolean relevantToInterestPaid) {
		this.relevantToInterestPaid = relevantToInterestPaid;
	}

	public boolean isRelevantToDividendsPaid() {
		return relevantToDividendsPaid;
	}

	public void setRelevantToDividendsPaid(boolean relevantToDividendsPaid) {
		this.relevantToDividendsPaid = relevantToDividendsPaid;
	}

	public boolean isRelevantToDepreciationAmortization() {
		return relevantToDepreciationAmortization;
	}

	public void setRelevantToDepreciationAmortization(boolean relevantToDepreciationAmortization) {
		this.relevantToDepreciationAmortization = relevantToDepreciationAmortization;
	}

	@Override
	public String toString() {
		return "AccountSubtypeBalanceDTO [accountSubtypeId=" + accountSubtypeId + ", accountSubtypeName="
				+ accountSubtypeName + ", accountTypeId=" + accountTypeId + ", accountTypeName=" + accountTypeName
				+ ", organizationId=" + organizationId + ", organizationName=" + organizationName
				+ ", sumOfDebitLineItems=" + sumOfDebitLineItems + ", sumOfCreditLineItems=" + sumOfCreditLineItems
				+ ", sumOfInitialDebitAmounts=" + sumOfInitialDebitAmounts + ", sumOfInitialCreditAmounts=" + sumOfInitialCreditAmounts
				+ ", debitTotal=" + debitTotal + ", creditTotal=" + creditTotal + ", debitsMinusCredits="
				+ debitsMinusCredits + "]";
	}

	
}
