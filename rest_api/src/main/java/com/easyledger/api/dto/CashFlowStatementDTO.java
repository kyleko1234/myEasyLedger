package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class CashFlowStatementDTO {
	private List<AccountInReportDTO> cashAndCashEquivalentsAccountsBeginning = new ArrayList<AccountInReportDTO>();//
	private List<BigDecimal> totalCashAndCashEquivalentsBeginning = new ArrayList<BigDecimal>();//
	
	private List<BigDecimal> totalNetIncome = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInNonCashOperatingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInNonCashOperatingIncomeExpense = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalAdjustmentForNonOperatingIncomeExpenseNet = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalAdjustmentsToIncome = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInOperatingAssetsLiabilitiesAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInOperatingAssetsLiabilities = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInOperatingEquityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInOperatingEquity = new ArrayList<BigDecimal>();
	private List<BigDecimal> cashFlowFromOperations = new ArrayList<BigDecimal>();
	
	private List<AccountInReportDTO> incomeExpenseFromInvestingAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalIncomeExpenseFromInvestingNet = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInNonCashInvestingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInNonCashInvestingIncomeExpense = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInInvestingAssetsLiabilitiesAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInInvestingAssetsLiabilities = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInInvestingEquityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInInvestingEquity = new ArrayList<BigDecimal>();
	private List<BigDecimal> cashFlowFromInvesting = new ArrayList<BigDecimal>();
	
	private List<AccountInReportDTO> incomeExpenseFromFinancingAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalIncomeExpenseFromFinancingNet = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInNonCashFinancingIncomeExpenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInNonCashFinancingIncomeExpense = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInNonDividendEquityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInNonDividendEquity = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> changesInNonDividendAssetLiabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalChangesInNonDividendAssetLiabilities = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> dividendEquityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalDividendEquity = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> dividendLiabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalDividendLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalDividendsPaid = new ArrayList<BigDecimal>();
	private List<BigDecimal> cashFlowFromFinancing = new ArrayList<BigDecimal>();
	
	private List<AccountInReportDTO> cashAndCashEquivalentsAccountsEnding = new ArrayList<AccountInReportDTO>();//
	private List<BigDecimal> totalCashAndCashEquivalentsEnding = new ArrayList<BigDecimal>();//
	
	private List<AccountInReportDTO> interestExpenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalInterestExpense = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> interestLiabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalInterestLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalInterestPaid = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> taxExpenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalTaxExpense = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> taxLiabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalTaxLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalPaymentsForTaxesPaid = new ArrayList<BigDecimal>();

	
	public CashFlowStatementDTO() {
		
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


	public List<BigDecimal> getTotalNetIncome() {
		return totalNetIncome;
	}


	public void setTotalNetIncome(List<BigDecimal> totalNetIncome) {
		this.totalNetIncome = totalNetIncome;
	}


	public List<AccountInReportDTO> getChangesInNonCashOperatingIncomeExpenseAccounts() {
		return changesInNonCashOperatingIncomeExpenseAccounts;
	}


	public void setChangesInNonCashOperatingIncomeExpenseAccounts(
			List<AccountInReportDTO> changesInNonCashOperatingIncomeExpenseAccounts) {
		this.changesInNonCashOperatingIncomeExpenseAccounts = changesInNonCashOperatingIncomeExpenseAccounts;
	}


	public List<BigDecimal> getTotalChangesInNonCashOperatingIncomeExpense() {
		return totalChangesInNonCashOperatingIncomeExpense;
	}


	public void setTotalChangesInNonCashOperatingIncomeExpense(
			List<BigDecimal> totalChangesInNonCashOperatingIncomeExpense) {
		this.totalChangesInNonCashOperatingIncomeExpense = totalChangesInNonCashOperatingIncomeExpense;
	}


	public List<BigDecimal> getTotalAdjustmentForNonOperatingIncomeExpenseNet() {
		return totalAdjustmentForNonOperatingIncomeExpenseNet;
	}


	public void setTotalAdjustmentForNonOperatingIncomeExpenseNet(
			List<BigDecimal> totalAdjustmentForNonOperatingIncomeExpenseNet) {
		this.totalAdjustmentForNonOperatingIncomeExpenseNet = totalAdjustmentForNonOperatingIncomeExpenseNet;
	}


	public List<BigDecimal> getTotalAdjustmentsToIncome() {
		return totalAdjustmentsToIncome;
	}


	public void setTotalAdjustmentsToIncome(List<BigDecimal> totalAdjustmentsToIncome) {
		this.totalAdjustmentsToIncome = totalAdjustmentsToIncome;
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


	public List<AccountInReportDTO> getChangesInNonCashInvestingIncomeExpenseAccounts() {
		return changesInNonCashInvestingIncomeExpenseAccounts;
	}


	public void setChangesInNonCashInvestingIncomeExpenseAccounts(
			List<AccountInReportDTO> changesInNonCashInvestingIncomeExpenseAccounts) {
		this.changesInNonCashInvestingIncomeExpenseAccounts = changesInNonCashInvestingIncomeExpenseAccounts;
	}


	public List<BigDecimal> getTotalChangesInNonCashInvestingIncomeExpense() {
		return totalChangesInNonCashInvestingIncomeExpense;
	}


	public void setTotalChangesInNonCashInvestingIncomeExpense(
			List<BigDecimal> totalChangesInNonCashInvestingIncomeExpense) {
		this.totalChangesInNonCashInvestingIncomeExpense = totalChangesInNonCashInvestingIncomeExpense;
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


	public List<AccountInReportDTO> getChangesInNonCashFinancingIncomeExpenseAccounts() {
		return changesInNonCashFinancingIncomeExpenseAccounts;
	}


	public void setChangesInNonCashFinancingIncomeExpenseAccounts(
			List<AccountInReportDTO> changesInNonCashFinancingIncomeExpenseAccounts) {
		this.changesInNonCashFinancingIncomeExpenseAccounts = changesInNonCashFinancingIncomeExpenseAccounts;
	}


	public List<BigDecimal> getTotalChangesInNonCashFinancingIncomeExpense() {
		return totalChangesInNonCashFinancingIncomeExpense;
	}


	public void setTotalChangesInNonCashFinancingIncomeExpense(
			List<BigDecimal> totalChangesInNonCashFinancingIncomeExpense) {
		this.totalChangesInNonCashFinancingIncomeExpense = totalChangesInNonCashFinancingIncomeExpense;
	}


	public List<AccountInReportDTO> getChangesInNonDividendEquityAccounts() {
		return changesInNonDividendEquityAccounts;
	}


	public void setChangesInNonDividendEquityAccounts(List<AccountInReportDTO> changesInNonDividendEquityAccounts) {
		this.changesInNonDividendEquityAccounts = changesInNonDividendEquityAccounts;
	}


	public List<BigDecimal> getTotalChangesInNonDividendEquity() {
		return totalChangesInNonDividendEquity;
	}


	public void setTotalChangesInNonDividendEquity(List<BigDecimal> totalChangesInNonDividendEquity) {
		this.totalChangesInNonDividendEquity = totalChangesInNonDividendEquity;
	}


	public List<AccountInReportDTO> getChangesInNonDividendAssetLiabilityAccounts() {
		return changesInNonDividendAssetLiabilityAccounts;
	}


	public void setChangesInNonDividendAssetLiabilityAccounts(
			List<AccountInReportDTO> changesInNonDividendAssetLiabilityAccounts) {
		this.changesInNonDividendAssetLiabilityAccounts = changesInNonDividendAssetLiabilityAccounts;
	}


	public List<BigDecimal> getTotalChangesInNonDividendAssetLiabilities() {
		return totalChangesInNonDividendAssetLiabilities;
	}


	public void setTotalChangesInNonDividendAssetLiabilities(List<BigDecimal> totalChangesInNonDividendAssetLiabilities) {
		this.totalChangesInNonDividendAssetLiabilities = totalChangesInNonDividendAssetLiabilities;
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


	public List<BigDecimal> getTotalPaymentsForTaxesPaid() {
		return totalPaymentsForTaxesPaid;
	}


	public void setTotalPaymentsForTaxesPaid(List<BigDecimal> totalPaymentsForTaxesPaid) {
		this.totalPaymentsForTaxesPaid = totalPaymentsForTaxesPaid;
	}
	
}
