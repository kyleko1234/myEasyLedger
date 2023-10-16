package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/*
 * Note: Amounts for accounts will always be debits minus credits, but totals should be as they would be on a cash flow statement.
 * Cash and equivalents should be represented as net debits
 * Net income is net credits.
 * adjustments for non-cash income/expense are net debits (non-cash expenses are added back, income is subtracted), as is adjustment for non-operating income/expense.
 * Adjustments for changes in assets/liabilities/equity are net credits.
 * Dividends paid will be represented as a positive number, therefore dividend equity and liability will be represented as net debit numbers.
 * Same goes for tax and interest paid calculations: expenses and liabilities will be expressed as net debits.
 */
public class CashFlowStatementDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();

	private List<AccountInReportDTO> cashAndCashEquivalentsAccountsBeginning = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalCashAndCashEquivalentsBeginning = new ArrayList<BigDecimal>(); 
	
	private List<AccountInReportDTO> incomeExpenseAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalNetIncome = new ArrayList<BigDecimal>(); 
	private List<BigDecimal> totalAdjustmentForNonOperatingIncomeExpenseNet = new ArrayList<BigDecimal>(); 
	private List<BigDecimal> totalIncomeExpenseFromOperatingNet = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> nonCashOperatingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalNonCashOperatingIncomeExpense = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> changesInOperatingAssetsLiabilitiesAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalChangesInOperatingAssetsLiabilities = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> changesInOperatingEquityAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalChangesInOperatingEquity = new ArrayList<BigDecimal>(); 
	private List<BigDecimal> cashFlowFromOperations = new ArrayList<BigDecimal>(); 
	
	private List<AccountInReportDTO> incomeExpenseFromInvestingAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalIncomeExpenseFromInvestingNet = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> nonCashInvestingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalNonCashInvestingIncomeExpense = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> changesInInvestingAssetsLiabilitiesAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalChangesInInvestingAssetsLiabilities = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> depreciationAdjustmentAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalAdjustmentForDepreciationAmortization = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInInvestingEquityAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalChangesInInvestingEquity = new ArrayList<BigDecimal>(); 
	private List<BigDecimal> cashFlowFromInvesting = new ArrayList<BigDecimal>(); 
	
	private List<AccountInReportDTO> incomeExpenseFromFinancingAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalIncomeExpenseFromFinancingNet = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> nonCashFinancingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalNonCashFinancingIncomeExpense = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> changesInNonDividendFinancingEquityAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalChangesInNonDividendFinancingEquity = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> changesInNonDividendFinancingAssetLiabilityAccounts = new ArrayList<AccountInReportDTO>(); 
	private List<BigDecimal> totalChangesInNonDividendFinancingAssetLiabilities = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> dividendEquityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalDividendEquity = new ArrayList<BigDecimal>(); 
	private List<AccountInReportDTO> dividendLiabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalDividendLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalDividendsPaid = new ArrayList<BigDecimal>();
	private List<BigDecimal> cashFlowFromFinancing = new ArrayList<BigDecimal>();
	
	private List<AccountInReportDTO> cashAndCashEquivalentsAccountsEnding = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalCashAndCashEquivalentsEnding = new ArrayList<BigDecimal>();
	
	private List<AccountInReportDTO> interestExpenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalInterestExpense = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> interestLiabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalInterestLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalInterestPaid = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> taxExpenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalTaxExpense = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> taxLiabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalTaxLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalTaxesPaid = new ArrayList<BigDecimal>();

	
	public CashFlowStatementDTO() {
		
	}

	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}


	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}


	public List<AccountInReportDTO> getCashAndCashEquivalentsAccountsBeginning() {
		return cashAndCashEquivalentsAccountsBeginning;
	}


	public void setCashAndCashEquivalentsAccountsBeginning(
			List<AccountInReportDTO> cashAndCashEquivalentsAccountsBeginning) {
		this.cashAndCashEquivalentsAccountsBeginning = cashAndCashEquivalentsAccountsBeginning;
	}


	public List<BigDecimal> getTotalCashAndCashEquivalentsBeginning() {
		return totalCashAndCashEquivalentsBeginning;
	}


	public void setTotalCashAndCashEquivalentsBeginning(List<BigDecimal> totalCashAndCashEquivalentsBeginning) {
		this.totalCashAndCashEquivalentsBeginning = totalCashAndCashEquivalentsBeginning;
	}


	public List<AccountInReportDTO> getIncomeExpenseAccounts() {
		return incomeExpenseAccounts;
	}


	public void setIncomeExpenseAccounts(List<AccountInReportDTO> incomeExpenseAccounts) {
		this.incomeExpenseAccounts = incomeExpenseAccounts;
	}


	public List<BigDecimal> getTotalNetIncome() {
		return totalNetIncome;
	}


	public void setTotalNetIncome(List<BigDecimal> totalNetIncome) {
		this.totalNetIncome = totalNetIncome;
	}


	public List<AccountInReportDTO> getNonCashOperatingIncomeExpenseAccounts() {
		return nonCashOperatingIncomeExpenseAccounts;
	}


	public void setNonCashOperatingIncomeExpenseAccounts(List<AccountInReportDTO> nonCashOperatingIncomeExpenseAccounts) {
		this.nonCashOperatingIncomeExpenseAccounts = nonCashOperatingIncomeExpenseAccounts;
	}


	public List<BigDecimal> getTotalNonCashOperatingIncomeExpense() {
		return totalNonCashOperatingIncomeExpense;
	}


	public void setTotalNonCashOperatingIncomeExpense(List<BigDecimal> totalNonCashOperatingIncomeExpense) {
		this.totalNonCashOperatingIncomeExpense = totalNonCashOperatingIncomeExpense;
	}


	public List<BigDecimal> getTotalAdjustmentForNonOperatingIncomeExpenseNet() {
		return totalAdjustmentForNonOperatingIncomeExpenseNet;
	}


	public void setTotalAdjustmentForNonOperatingIncomeExpenseNet(
			List<BigDecimal> totalAdjustmentForNonOperatingIncomeExpenseNet) {
		this.totalAdjustmentForNonOperatingIncomeExpenseNet = totalAdjustmentForNonOperatingIncomeExpenseNet;
	}


	public List<AccountInReportDTO> getChangesInOperatingAssetsLiabilitiesAccounts() {
		return changesInOperatingAssetsLiabilitiesAccounts;
	}


	public void setChangesInOperatingAssetsLiabilitiesAccounts(
			List<AccountInReportDTO> changesInOperatingAssetsLiabilitiesAccounts) {
		this.changesInOperatingAssetsLiabilitiesAccounts = changesInOperatingAssetsLiabilitiesAccounts;
	}


	public List<BigDecimal> getTotalChangesInOperatingAssetsLiabilities() {
		return totalChangesInOperatingAssetsLiabilities;
	}


	public void setTotalChangesInOperatingAssetsLiabilities(List<BigDecimal> totalChangesInOperatingAssetsLiabilities) {
		this.totalChangesInOperatingAssetsLiabilities = totalChangesInOperatingAssetsLiabilities;
	}


	public List<AccountInReportDTO> getChangesInOperatingEquityAccounts() {
		return changesInOperatingEquityAccounts;
	}


	public void setChangesInOperatingEquityAccounts(List<AccountInReportDTO> changesInOperatingEquityAccounts) {
		this.changesInOperatingEquityAccounts = changesInOperatingEquityAccounts;
	}


	public List<BigDecimal> getTotalChangesInOperatingEquity() {
		return totalChangesInOperatingEquity;
	}


	public void setTotalChangesInOperatingEquity(List<BigDecimal> totalChangesInOperatingEquity) {
		this.totalChangesInOperatingEquity = totalChangesInOperatingEquity;
	}


	public List<BigDecimal> getCashFlowFromOperations() {
		return cashFlowFromOperations;
	}


	public void setCashFlowFromOperations(List<BigDecimal> cashFlowFromOperations) {
		this.cashFlowFromOperations = cashFlowFromOperations;
	}


	public List<AccountInReportDTO> getIncomeExpenseFromInvestingAccounts() {
		return incomeExpenseFromInvestingAccounts;
	}


	public void setIncomeExpenseFromInvestingAccounts(List<AccountInReportDTO> incomeExpenseFromInvestingAccounts) {
		this.incomeExpenseFromInvestingAccounts = incomeExpenseFromInvestingAccounts;
	}


	public List<BigDecimal> getTotalIncomeExpenseFromInvestingNet() {
		return totalIncomeExpenseFromInvestingNet;
	}


	public void setTotalIncomeExpenseFromInvestingNet(List<BigDecimal> totalIncomeExpenseFromInvestingNet) {
		this.totalIncomeExpenseFromInvestingNet = totalIncomeExpenseFromInvestingNet;
	}


	public List<AccountInReportDTO> getNonCashInvestingIncomeExpenseAccounts() {
		return nonCashInvestingIncomeExpenseAccounts;
	}


	public void setNonCashInvestingIncomeExpenseAccounts(List<AccountInReportDTO> nonCashInvestingIncomeExpenseAccounts) {
		this.nonCashInvestingIncomeExpenseAccounts = nonCashInvestingIncomeExpenseAccounts;
	}


	public List<BigDecimal> getTotalNonCashInvestingIncomeExpense() {
		return totalNonCashInvestingIncomeExpense;
	}


	public void setTotalNonCashInvestingIncomeExpense(List<BigDecimal> totalNonCashInvestingIncomeExpense) {
		this.totalNonCashInvestingIncomeExpense = totalNonCashInvestingIncomeExpense;
	}


	public List<AccountInReportDTO> getChangesInInvestingAssetsLiabilitiesAccounts() {
		return changesInInvestingAssetsLiabilitiesAccounts;
	}


	public void setChangesInInvestingAssetsLiabilitiesAccounts(
			List<AccountInReportDTO> changesInInvestingAssetsLiabilitiesAccounts) {
		this.changesInInvestingAssetsLiabilitiesAccounts = changesInInvestingAssetsLiabilitiesAccounts;
	}


	public List<BigDecimal> getTotalChangesInInvestingAssetsLiabilities() {
		return totalChangesInInvestingAssetsLiabilities;
	}


	public void setTotalChangesInInvestingAssetsLiabilities(List<BigDecimal> totalChangesInInvestingAssetsLiabilities) {
		this.totalChangesInInvestingAssetsLiabilities = totalChangesInInvestingAssetsLiabilities;
	}


	public List<AccountInReportDTO> getChangesInInvestingEquityAccounts() {
		return changesInInvestingEquityAccounts;
	}


	public void setChangesInInvestingEquityAccounts(List<AccountInReportDTO> changesInInvestingEquityAccounts) {
		this.changesInInvestingEquityAccounts = changesInInvestingEquityAccounts;
	}


	public List<BigDecimal> getTotalChangesInInvestingEquity() {
		return totalChangesInInvestingEquity;
	}


	public void setTotalChangesInInvestingEquity(List<BigDecimal> totalChangesInInvestingEquity) {
		this.totalChangesInInvestingEquity = totalChangesInInvestingEquity;
	}


	public List<BigDecimal> getCashFlowFromInvesting() {
		return cashFlowFromInvesting;
	}


	public void setCashFlowFromInvesting(List<BigDecimal> cashFlowFromInvesting) {
		this.cashFlowFromInvesting = cashFlowFromInvesting;
	}


	public List<AccountInReportDTO> getIncomeExpenseFromFinancingAccounts() {
		return incomeExpenseFromFinancingAccounts;
	}


	public void setIncomeExpenseFromFinancingAccounts(List<AccountInReportDTO> incomeExpenseFromFinancingAccounts) {
		this.incomeExpenseFromFinancingAccounts = incomeExpenseFromFinancingAccounts;
	}


	public List<BigDecimal> getTotalIncomeExpenseFromFinancingNet() {
		return totalIncomeExpenseFromFinancingNet;
	}


	public void setTotalIncomeExpenseFromFinancingNet(List<BigDecimal> totalIncomeExpenseFromFinancingNet) {
		this.totalIncomeExpenseFromFinancingNet = totalIncomeExpenseFromFinancingNet;
	}


	public List<AccountInReportDTO> getNonCashFinancingIncomeExpenseAccounts() {
		return nonCashFinancingIncomeExpenseAccounts;
	}


	public void setNonCashFinancingIncomeExpenseAccounts(List<AccountInReportDTO> nonCashFinancingIncomeExpenseAccounts) {
		this.nonCashFinancingIncomeExpenseAccounts = nonCashFinancingIncomeExpenseAccounts;
	}


	public List<BigDecimal> getTotalNonCashFinancingIncomeExpense() {
		return totalNonCashFinancingIncomeExpense;
	}


	public void setTotalNonCashFinancingIncomeExpense(List<BigDecimal> totalNonCashFinancingIncomeExpense) {
		this.totalNonCashFinancingIncomeExpense = totalNonCashFinancingIncomeExpense;
	}


	public List<AccountInReportDTO> getChangesInNonDividendFinancingEquityAccounts() {
		return changesInNonDividendFinancingEquityAccounts;
	}


	public void setChangesInNonDividendFinancingEquityAccounts(
			List<AccountInReportDTO> changesInNonDividendFinancingEquityAccounts) {
		this.changesInNonDividendFinancingEquityAccounts = changesInNonDividendFinancingEquityAccounts;
	}


	public List<BigDecimal> getTotalChangesInNonDividendFinancingEquity() {
		return totalChangesInNonDividendFinancingEquity;
	}


	public void setTotalChangesInNonDividendFinancingEquity(List<BigDecimal> totalChangesInNonDividendFinancingEquity) {
		this.totalChangesInNonDividendFinancingEquity = totalChangesInNonDividendFinancingEquity;
	}


	public List<AccountInReportDTO> getChangesInNonDividendFinancingAssetLiabilityAccounts() {
		return changesInNonDividendFinancingAssetLiabilityAccounts;
	}


	public void setChangesInNonDividendFinancingAssetLiabilityAccounts(
			List<AccountInReportDTO> changesInNonDividendFinancingAssetLiabilityAccounts) {
		this.changesInNonDividendFinancingAssetLiabilityAccounts = changesInNonDividendFinancingAssetLiabilityAccounts;
	}


	public List<BigDecimal> getTotalChangesInNonDividendFinancingAssetLiabilities() {
		return totalChangesInNonDividendFinancingAssetLiabilities;
	}


	public void setTotalChangesInNonDividendFinancingAssetLiabilities(
			List<BigDecimal> totalChangesInNonDividendFinancingAssetLiabilities) {
		this.totalChangesInNonDividendFinancingAssetLiabilities = totalChangesInNonDividendFinancingAssetLiabilities;
	}


	public List<AccountInReportDTO> getDividendEquityAccounts() {
		return dividendEquityAccounts;
	}


	public void setDividendEquityAccounts(List<AccountInReportDTO> dividendEquityAccounts) {
		this.dividendEquityAccounts = dividendEquityAccounts;
	}


	public List<BigDecimal> getTotalDividendEquity() {
		return totalDividendEquity;
	}


	public void setTotalDividendEquity(List<BigDecimal> totalDividendEquity) {
		this.totalDividendEquity = totalDividendEquity;
	}


	public List<AccountInReportDTO> getDividendLiabilityAccounts() {
		return dividendLiabilityAccounts;
	}


	public void setDividendLiabilityAccounts(List<AccountInReportDTO> dividendLiabilityAccounts) {
		this.dividendLiabilityAccounts = dividendLiabilityAccounts;
	}


	public List<BigDecimal> getTotalDividendLiabilities() {
		return totalDividendLiabilities;
	}


	public void setTotalDividendLiabilities(List<BigDecimal> totalDividendLiabilities) {
		this.totalDividendLiabilities = totalDividendLiabilities;
	}


	public List<BigDecimal> getTotalDividendsPaid() {
		return totalDividendsPaid;
	}


	public void setTotalDividendsPaid(List<BigDecimal> totalDividendsPaid) {
		this.totalDividendsPaid = totalDividendsPaid;
	}


	public List<BigDecimal> getCashFlowFromFinancing() {
		return cashFlowFromFinancing;
	}


	public void setCashFlowFromFinancing(List<BigDecimal> cashFlowFromFinancing) {
		this.cashFlowFromFinancing = cashFlowFromFinancing;
	}


	public List<AccountInReportDTO> getCashAndCashEquivalentsAccountsEnding() {
		return cashAndCashEquivalentsAccountsEnding;
	}


	public void setCashAndCashEquivalentsAccountsEnding(List<AccountInReportDTO> cashAndCashEquivalentsAccountsEnding) {
		this.cashAndCashEquivalentsAccountsEnding = cashAndCashEquivalentsAccountsEnding;
	}


	public List<BigDecimal> getTotalCashAndCashEquivalentsEnding() {
		return totalCashAndCashEquivalentsEnding;
	}


	public void setTotalCashAndCashEquivalentsEnding(List<BigDecimal> totalCashAndCashEquivalentsEnding) {
		this.totalCashAndCashEquivalentsEnding = totalCashAndCashEquivalentsEnding;
	}


	public List<AccountInReportDTO> getInterestExpenseAccounts() {
		return interestExpenseAccounts;
	}


	public void setInterestExpenseAccounts(List<AccountInReportDTO> interestExpenseAccounts) {
		this.interestExpenseAccounts = interestExpenseAccounts;
	}


	public List<BigDecimal> getTotalInterestExpense() {
		return totalInterestExpense;
	}


	public void setTotalInterestExpense(List<BigDecimal> totalInterestExpense) {
		this.totalInterestExpense = totalInterestExpense;
	}


	public List<AccountInReportDTO> getInterestLiabilityAccounts() {
		return interestLiabilityAccounts;
	}


	public void setInterestLiabilityAccounts(List<AccountInReportDTO> interestLiabilityAccounts) {
		this.interestLiabilityAccounts = interestLiabilityAccounts;
	}


	public List<BigDecimal> getTotalInterestLiabilities() {
		return totalInterestLiabilities;
	}


	public void setTotalInterestLiabilities(List<BigDecimal> totalInterestLiabilities) {
		this.totalInterestLiabilities = totalInterestLiabilities;
	}


	public List<BigDecimal> getTotalInterestPaid() {
		return totalInterestPaid;
	}


	public void setTotalInterestPaid(List<BigDecimal> totalInterestPaid) {
		this.totalInterestPaid = totalInterestPaid;
	}


	public List<AccountInReportDTO> getTaxExpenseAccounts() {
		return taxExpenseAccounts;
	}


	public void setTaxExpenseAccounts(List<AccountInReportDTO> taxExpenseAccounts) {
		this.taxExpenseAccounts = taxExpenseAccounts;
	}


	public List<BigDecimal> getTotalTaxExpense() {
		return totalTaxExpense;
	}


	public void setTotalTaxExpense(List<BigDecimal> totalTaxExpense) {
		this.totalTaxExpense = totalTaxExpense;
	}


	public List<AccountInReportDTO> getTaxLiabilityAccounts() {
		return taxLiabilityAccounts;
	}


	public void setTaxLiabilityAccounts(List<AccountInReportDTO> taxLiabilityAccounts) {
		this.taxLiabilityAccounts = taxLiabilityAccounts;
	}


	public List<BigDecimal> getTotalTaxLiabilities() {
		return totalTaxLiabilities;
	}


	public void setTotalTaxLiabilities(List<BigDecimal> totalTaxLiabilities) {
		this.totalTaxLiabilities = totalTaxLiabilities;
	}


	public List<BigDecimal> getTotalTaxesPaid() {
		return totalTaxesPaid;
	}


	public void setTotalTaxesPaid(List<BigDecimal> totalTaxesPaid) {
		this.totalTaxesPaid = totalTaxesPaid;
	}

	public List<BigDecimal> getTotalIncomeExpenseFromOperatingNet() {
		return totalIncomeExpenseFromOperatingNet;
	}

	public void setTotalIncomeExpenseFromOperatingNet(List<BigDecimal> totalIncomeExpenseFromOperatingNet) {
		this.totalIncomeExpenseFromOperatingNet = totalIncomeExpenseFromOperatingNet;
	}

	public List<AccountInReportDTO> getDepreciationAdjustmentAccounts() {
		return depreciationAdjustmentAccounts;
	}

	public void setDepreciationAdjustmentAccounts(List<AccountInReportDTO> depreciationAdjustmentAccounts) {
		this.depreciationAdjustmentAccounts = depreciationAdjustmentAccounts;
	}

	public List<BigDecimal> getTotalAdjustmentForDepreciationAmortization() {
		return totalAdjustmentForDepreciationAmortization;
	}

	public void setTotalAdjustmentForDepreciationAmortization(List<BigDecimal> totalAdjustmentForDepreciationAmortization) {
		this.totalAdjustmentForDepreciationAmortization = totalAdjustmentForDepreciationAmortization;
	}
	
}
