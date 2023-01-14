package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AccountInReportDTO {
	private Long accountId;
	private String accountName;
	private String accountCode;
	private List<BigDecimal> amounts = new ArrayList<BigDecimal>();
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long parentAccountId;
	private String parentAccountName;
	private Long incomeStatementFormatPositionId;
	private Long cashFlowFormatPositionId;
	private Long balanceSheetFormatPositionId;
	private boolean cashItem;
	private boolean relevantToTaxesPaid;
	private boolean relevantToInterestPaid;
	private boolean relevantToDividendsPaid;
	private boolean relevantToDepreciationAmortization;
	private boolean hasChildren;
	private List<AccountInReportDTO> children = new ArrayList<AccountInReportDTO>();
	
	
	public AccountInReportDTO() {
		
	}

	public AccountInReportDTO(AccountBalanceDTO accountBalanceDTO) {
		this.accountId = accountBalanceDTO.getAccountId();
		this.accountName = accountBalanceDTO.getAccountName();
		this.accountCode = accountBalanceDTO.getAccountCode();
		this.accountSubtypeId = accountBalanceDTO.getAccountSubtypeId();
		this.accountSubtypeName = accountBalanceDTO.getAccountSubtypeName();
		this.accountTypeId = accountBalanceDTO.getAccountTypeId();
		this.accountTypeName = accountBalanceDTO.getAccountTypeName();
		this.parentAccountId = accountBalanceDTO.getParentAccountId();
		this.parentAccountName = accountBalanceDTO.getParentAccountName();
		this.incomeStatementFormatPositionId = accountBalanceDTO.getIncomeStatementFormatPositionId();
		this.cashFlowFormatPositionId = accountBalanceDTO.getCashFlowFormatPositionId();
		this.balanceSheetFormatPositionId = accountBalanceDTO.getBalanceSheetFormatPositionId();
		this.cashItem = accountBalanceDTO.isCashItem();
		this.relevantToTaxesPaid = accountBalanceDTO.isRelevantToTaxesPaid();
		this.relevantToInterestPaid = accountBalanceDTO.isRelevantToInterestPaid();
		this.relevantToDividendsPaid = accountBalanceDTO.isRelevantToDividendsPaid();
		this.relevantToDepreciationAmortization = accountBalanceDTO.isRelevantToDepreciationAmortization();
		this.hasChildren = accountBalanceDTO.isHasChildren();
	}
	/*
	 * Takes a collection of AccountInReportDTOs.
	 * Returns a list of the sums of amounts. 
	 * For example, take accounts A and B with amounts {a1, a2} and {b1, b2} respectively.
	 * sumAmountsOfAccounts({A, B}) will return {a1 + b1, a2 + b2}.
	 * Accounts A and B with amounts {a1} and {b1, b2}, respectively:
	 * sumAmountsOfAccounts({A, B}) will return {a1 + b1, b2}.
	 * */
	public static List<BigDecimal> sumAmountsOfAccounts(Collection<AccountInReportDTO> accounts) {
		List<BigDecimal> summedAmounts = new ArrayList<BigDecimal>();
			
		for (AccountInReportDTO account : accounts) {
			while (summedAmounts.size() < account.amounts.size()) {
				summedAmounts.add(new BigDecimal(0));
			}
			for (int i = 0; i < account.amounts.size(); i++) {
				BigDecimal newSum = summedAmounts.get(i).add(account.amounts.get(i));
				summedAmounts.set(i, newSum);
			}
		}
		return summedAmounts;
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

	public String getAccountCode() {
		return accountCode;
	}

	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
	}

	public List<BigDecimal> getAmounts() {
		return amounts;
	}

	public void setAmounts(List<BigDecimal> amounts) {
		this.amounts = amounts;
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

	public Long getIncomeStatementFormatPositionId() {
		return incomeStatementFormatPositionId;
	}

	public void setIncomeStatementFormatPositionId(Long incomeStatementFormatPositionId) {
		this.incomeStatementFormatPositionId = incomeStatementFormatPositionId;
	}

	public Long getCashFlowFormatPositionId() {
		return cashFlowFormatPositionId;
	}

	public void setCashFlowFormatPositionId(Long cashFlowFormatPositionId) {
		this.cashFlowFormatPositionId = cashFlowFormatPositionId;
	}

	public Long getBalanceSheetFormatPositionId() {
		return balanceSheetFormatPositionId;
	}

	public void setBalanceSheetFormatPositionId(Long balanceSheetFormatPositionId) {
		this.balanceSheetFormatPositionId = balanceSheetFormatPositionId;
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

	public boolean isHasChildren() {
		return hasChildren;
	}

	public void setHasChildren(boolean hasChildren) {
		this.hasChildren = hasChildren;
	}

	public List<AccountInReportDTO> getChildren() {
		return children;
	}

	public void setChildren(List<AccountInReportDTO> children) {
		this.children = children;
	}

	
	
}
