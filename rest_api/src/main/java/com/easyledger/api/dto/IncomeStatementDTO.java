package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class IncomeStatementDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	private List<AccountInReportDTO> revenueAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalRevenue = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> costOfSalesAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalCostOfSales = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalGrossProfit = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> operatingExpensesSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalOperatingExpenses = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalOperatingIncome = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> nonOperatingIncomeAndExpenseSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalNonOperatingIncomeAndExpenseSubtypesNet = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalEbit = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> interestAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalInterest = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalEarningsBeforeTax = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> taxAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalTaxes = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> nonRecurringAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalNonRecurringNet = new ArrayList<BigDecimal>();
	private List<BigDecimal> netIncome = new ArrayList<BigDecimal>();

	public IncomeStatementDTO() {
		
	}

	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}

	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}

	public List<AccountInReportDTO> getRevenueAccounts() {
		return revenueAccounts;
	}

	public void setRevenueAccounts(List<AccountInReportDTO> revenueAccounts) {
		this.revenueAccounts = revenueAccounts;
	}

	public List<BigDecimal> getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(List<BigDecimal> totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

	public List<AccountInReportDTO> getCostOfSalesAccounts() {
		return costOfSalesAccounts;
	}

	public void setCostOfSalesAccounts(List<AccountInReportDTO> costOfSalesAccounts) {
		this.costOfSalesAccounts = costOfSalesAccounts;
	}

	public List<BigDecimal> getTotalCostOfSales() {
		return totalCostOfSales;
	}

	public void setTotalCostOfSales(List<BigDecimal> totalCostOfSales) {
		this.totalCostOfSales = totalCostOfSales;
	}

	public List<BigDecimal> getTotalGrossProfit() {
		return totalGrossProfit;
	}

	public void setTotalGrossProfit(List<BigDecimal> totalGrossProfit) {
		this.totalGrossProfit = totalGrossProfit;
	}

	public List<AccountSubtypeInReportDTO> getOperatingExpensesSubtypes() {
		return operatingExpensesSubtypes;
	}

	public void setOperatingExpensesSubtypes(List<AccountSubtypeInReportDTO> operatingExpensesSubtypes) {
		this.operatingExpensesSubtypes = operatingExpensesSubtypes;
	}

	public List<BigDecimal> getTotalOperatingIncome() {
		return totalOperatingIncome;
	}

	public void setTotalOperatingIncome(List<BigDecimal> totalOperatingIncome) {
		this.totalOperatingIncome = totalOperatingIncome;
	}

	public List<AccountSubtypeInReportDTO> getNonOperatingIncomeAndExpenseSubtypes() {
		return nonOperatingIncomeAndExpenseSubtypes;
	}

	public void setNonOperatingIncomeAndExpenseSubtypes(
			List<AccountSubtypeInReportDTO> nonOperatingIncomeAndExpenseSubtypes) {
		this.nonOperatingIncomeAndExpenseSubtypes = nonOperatingIncomeAndExpenseSubtypes;
	}

	public List<BigDecimal> getTotalEbit() {
		return totalEbit;
	}

	public void setTotalEbit(List<BigDecimal> totalEbit) {
		this.totalEbit = totalEbit;
	}

	public List<AccountInReportDTO> getInterestAccounts() {
		return interestAccounts;
	}

	public void setInterestAccounts(List<AccountInReportDTO> interestAccounts) {
		this.interestAccounts = interestAccounts;
	}

	public List<BigDecimal> getTotalInterest() {
		return totalInterest;
	}

	public void setTotalInterest(List<BigDecimal> totalInterest) {
		this.totalInterest = totalInterest;
	}

	public List<AccountInReportDTO> getTaxAccounts() {
		return taxAccounts;
	}

	public void setTaxAccounts(List<AccountInReportDTO> taxAccounts) {
		this.taxAccounts = taxAccounts;
	}

	public List<BigDecimal> getTotalTaxes() {
		return totalTaxes;
	}

	public void setTotalTaxes(List<BigDecimal> totalTaxes) {
		this.totalTaxes = totalTaxes;
	}

	public List<AccountInReportDTO> getNonRecurringAccounts() {
		return nonRecurringAccounts;
	}

	public void setNonRecurringAccounts(List<AccountInReportDTO> nonRecurringAccounts) {
		this.nonRecurringAccounts = nonRecurringAccounts;
	}

	public List<BigDecimal> getTotalNonRecurringNet() {
		return totalNonRecurringNet;
	}

	public void setTotalNonRecurringNet(List<BigDecimal> totalNonRecurringNet) {
		this.totalNonRecurringNet = totalNonRecurringNet;
	}

	public List<BigDecimal> getNetIncome() {
		return netIncome;
	}

	public void setNetIncome(List<BigDecimal> netIncome) {
		this.netIncome = netIncome;
	}

	public List<BigDecimal> getTotalOperatingExpenses() {
		return totalOperatingExpenses;
	}

	public void setTotalOperatingExpenses(List<BigDecimal> totalOperatingExpenses) {
		this.totalOperatingExpenses = totalOperatingExpenses;
	}

	public List<BigDecimal> getTotalNonOperatingIncomeAndExpenseSubtypesNet() {
		return totalNonOperatingIncomeAndExpenseSubtypesNet;
	}

	public void setTotalNonOperatingIncomeAndExpenseSubtypesNet(
			List<BigDecimal> totalNonOperatingIncomeAndExpenseSubtypesNet) {
		this.totalNonOperatingIncomeAndExpenseSubtypesNet = totalNonOperatingIncomeAndExpenseSubtypesNet;
	}

	public List<BigDecimal> getTotalEarningsBeforeTax() {
		return totalEarningsBeforeTax;
	}

	public void setTotalEarningsBeforeTax(List<BigDecimal> totalEarningsBeforeTax) {
		this.totalEarningsBeforeTax = totalEarningsBeforeTax;
	}


}
