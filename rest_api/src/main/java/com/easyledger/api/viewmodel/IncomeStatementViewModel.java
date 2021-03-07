package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.dto.AccountGroupBalanceDTO;
import com.easyledger.api.dto.AccountSubtypeBalanceDTO;


public class IncomeStatementViewModel {
	
	static final Long REVENUE_SUBTYPE_ID = (long) 21;
	static final Long OTHER_INCOME_SUBTYPE_ID = (long) 22;
	static final Long COST_OF_SALES_SUBTYPE_ID = (long) 23;
	static final Long RESEARCH_AND_DEVELOPMENT_SUBTYPE_ID = (long) 24;
	static final Long SGA_SUBTYPE_ID = (long) 25;
	static final Long DEPRECIATION_SUBTYPE_ID = (long) 26;
	static final Long AMORTIZATION_SUBTYPE_ID = (long) 27;
	static final Long OTHER_EXPENSES_SUBTYPE_ID = (long) 28;
	static final Long INCOME_TAX_SUBTYPE_ID = (long) 29;
	
	private LocalDate startDate;
	private LocalDate endDate;
	
	private BigDecimal totalRevenue = new BigDecimal(0); //positive value
	private BigDecimal totalCostOfSales = new BigDecimal(0); //positive value
	private BigDecimal grossProfit = new BigDecimal(0); // revenue - cost of sales
	
	private BigDecimal totalResearchAndDevelopment = new BigDecimal(0); //positive value
	private BigDecimal totalSalesGeneralAndAdministration = new BigDecimal(0); //positive value
	private BigDecimal totalDepreciation = new BigDecimal(0); //positive value
	private BigDecimal totalAmortization = new BigDecimal(0); //positive value
	private BigDecimal totalOperatingExpenses = new BigDecimal(0); //positive value, previous four added together
	
	private BigDecimal operatingIncome = new BigDecimal(0); //gross margin - operating expenses
	private BigDecimal otherIncomeExpense = new BigDecimal(0); //net of other income - other expense
	private BigDecimal incomeBeforeTax = new BigDecimal(0); //sum of two previous lines
	private BigDecimal incomeTax = new BigDecimal(0); //positive value
	
	private BigDecimal netIncome = new BigDecimal(0); // incomeBeforeTax - incomeTax
	
	private List<AccountGroupBalanceDTO> accountGroupBalances;
	private List<AccountDTO> accountBalances;
	
	public IncomeStatementViewModel(List<AccountSubtypeBalanceDTO> accountSubtypeBalances, List<AccountGroupBalanceDTO> accountGroupBalances,
			List<AccountDTO> accountBalances, LocalDate startDate, LocalDate endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.accountGroupBalances = accountGroupBalances;
		this.accountBalances = accountBalances;
		for (AccountSubtypeBalanceDTO subtypeBalance : accountSubtypeBalances) {
			if (subtypeBalance.getAccountSubtypeId() == REVENUE_SUBTYPE_ID) {
				totalRevenue = totalRevenue.subtract(subtypeBalance.getDebitsMinusCredits());
			}
			if (subtypeBalance.getAccountSubtypeId() == OTHER_INCOME_SUBTYPE_ID || subtypeBalance.getAccountSubtypeId() == OTHER_EXPENSES_SUBTYPE_ID) {
				otherIncomeExpense = otherIncomeExpense.subtract(subtypeBalance.getDebitsMinusCredits());
			}
			if (subtypeBalance.getAccountSubtypeId() == COST_OF_SALES_SUBTYPE_ID) {
				totalCostOfSales = totalCostOfSales.add(subtypeBalance.getDebitsMinusCredits());
			}
			if (subtypeBalance.getAccountSubtypeId() == RESEARCH_AND_DEVELOPMENT_SUBTYPE_ID) {
				totalResearchAndDevelopment = totalResearchAndDevelopment.add(subtypeBalance.getDebitsMinusCredits());
			}
			if (subtypeBalance.getAccountSubtypeId() == SGA_SUBTYPE_ID) {
				totalSalesGeneralAndAdministration = totalSalesGeneralAndAdministration.add(subtypeBalance.getDebitsMinusCredits());
			}
			if (subtypeBalance.getAccountSubtypeId() == DEPRECIATION_SUBTYPE_ID) {
				totalDepreciation = totalDepreciation.add(subtypeBalance.getDebitsMinusCredits());
			}
			if (subtypeBalance.getAccountSubtypeId() == AMORTIZATION_SUBTYPE_ID) {
				totalAmortization = totalAmortization.add(subtypeBalance.getDebitsMinusCredits());
			}
			if (subtypeBalance.getAccountSubtypeId() == INCOME_TAX_SUBTYPE_ID) {
				incomeTax = incomeTax.add(subtypeBalance.getDebitsMinusCredits());
			}
		}
		grossProfit = totalRevenue.subtract(totalCostOfSales);
		totalOperatingExpenses = totalResearchAndDevelopment.add(totalSalesGeneralAndAdministration.add(totalDepreciation.add(totalAmortization)));
		operatingIncome = grossProfit.subtract(totalOperatingExpenses);
		incomeBeforeTax = operatingIncome.add(otherIncomeExpense);
		netIncome = incomeBeforeTax.subtract(incomeTax);
	}

	public Long getRevenueSubtypeId() {
		return REVENUE_SUBTYPE_ID;
	}

	public Long getOtherIncomeSubtypeId() {
		return OTHER_INCOME_SUBTYPE_ID;
	}

	public Long getCostOfSalesSubtypeId() {
		return COST_OF_SALES_SUBTYPE_ID;
	}

	public Long getResearchAndDevelopmentSubtypeId() {
		return RESEARCH_AND_DEVELOPMENT_SUBTYPE_ID;
	}

	public Long getSgaSubtypeId() {
		return SGA_SUBTYPE_ID;
	}

	public Long getDepreciationSubtypeId() {
		return DEPRECIATION_SUBTYPE_ID;
	}

	public Long getAmortizationSubtypeId() {
		return AMORTIZATION_SUBTYPE_ID;
	}

	public Long getOtherExpensesSubtypeId() {
		return OTHER_EXPENSES_SUBTYPE_ID;
	}

	public Long getIncomeTaxSubtypeId() {
		return INCOME_TAX_SUBTYPE_ID;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public BigDecimal getTotalRevenue() {
		return totalRevenue;
	}

	public BigDecimal getTotalCostOfSales() {
		return totalCostOfSales;
	}

	public BigDecimal getGrossProfit() {
		return grossProfit;
	}

	public BigDecimal getTotalResearchAndDevelopment() {
		return totalResearchAndDevelopment;
	}

	public BigDecimal getTotalSalesGeneralAndAdministration() {
		return totalSalesGeneralAndAdministration;
	}

	public BigDecimal getTotalDepreciation() {
		return totalDepreciation;
	}

	public BigDecimal getTotalAmortization() {
		return totalAmortization;
	}

	public BigDecimal getTotalOperatingExpenses() {
		return totalOperatingExpenses;
	}

	public BigDecimal getOperatingIncome() {
		return operatingIncome;
	}

	public BigDecimal getOtherIncomeExpense() {
		return otherIncomeExpense;
	}

	public BigDecimal getIncomeBeforeTax() {
		return incomeBeforeTax;
	}

	public BigDecimal getIncomeTax() {
		return incomeTax;
	}

	public BigDecimal getNetIncome() {
		return netIncome;
	}

	public List<AccountGroupBalanceDTO> getAccountGroupBalances() {
		return accountGroupBalances;
	}

	public List<AccountDTO> getAccountBalances() {
		return accountBalances;
	}

	@Override
	public String toString() {
		return "IncomeStatementViewModel [startDate=" + startDate + ", endDate=" + endDate + ", totalRevenue="
				+ totalRevenue + ", totalCostOfSales=" + totalCostOfSales + ", grossProfit=" + grossProfit
				+ ", totalResearchAndDevelopment=" + totalResearchAndDevelopment
				+ ", totalSalesGeneralAndAdministration=" + totalSalesGeneralAndAdministration + ", totalDepreciation="
				+ totalDepreciation + ", totalAmortization=" + totalAmortization + ", totalOperatingExpenses="
				+ totalOperatingExpenses + ", operatingIncome=" + operatingIncome + ", otherIncomeExpense="
				+ otherIncomeExpense + ", incomeBeforeTax=" + incomeBeforeTax + ", incomeTax=" + incomeTax
				+ ", netIncome=" + netIncome + ", accountGroupBalances=" + accountGroupBalances + ", accountBalances="
				+ accountBalances + "]";
	}

	
	
	
}
