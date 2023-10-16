package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class IncomeExpenseReportDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	private List<AccountInReportDTO> incomeAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalIncome = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> expenseAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalExpenses = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalIncomeMinusExpenses = new ArrayList<BigDecimal>();

	public IncomeExpenseReportDTO() {
		
	}

	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}

	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}

	public List<AccountInReportDTO> getIncomeAccounts() {
		return incomeAccounts;
	}

	public void setIncomeAccounts(List<AccountInReportDTO> incomeAccounts) {
		this.incomeAccounts = incomeAccounts;
	}

	public List<BigDecimal> getTotalIncome() {
		return totalIncome;
	}

	public void setTotalIncome(List<BigDecimal> totalIncome) {
		this.totalIncome = totalIncome;
	}

	public List<AccountInReportDTO> getExpenseAccounts() {
		return expenseAccounts;
	}

	public void setExpenseAccounts(List<AccountInReportDTO> expenseAccounts) {
		this.expenseAccounts = expenseAccounts;
	}

	public List<BigDecimal> getTotalExpenses() {
		return totalExpenses;
	}

	public void setTotalExpenses(List<BigDecimal> totalExpenses) {
		this.totalExpenses = totalExpenses;
	}

	public List<BigDecimal> getTotalIncomeMinusExpenses() {
		return totalIncomeMinusExpenses;
	}

	public void setTotalIncomeMinusExpenses(List<BigDecimal> totalIncomeMinusExpenses) {
		this.totalIncomeMinusExpenses = totalIncomeMinusExpenses;
	}
	
	
}
