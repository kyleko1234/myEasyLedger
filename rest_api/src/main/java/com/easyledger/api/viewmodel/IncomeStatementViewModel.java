package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.dto.AccountSubtypeBalanceDTO;


public class IncomeStatementViewModel {
	
	static final Long REVENUE_SUBTYPE_ID = (long) 24;
	static final Long INCOME_FROM_INVESTING_SUBTYPE_ID = (long) 25;
	static final Long INCOME_FROM_FINANCING_SUBTYPE_ID = (long) 26;
	static final Long COST_OF_SALES_SUBTYPE_ID = (long) 27;
	static final Long RESEARCH_AND_DEVELOPMENT_SUBTYPE_ID = (long) 28;
	static final Long SGA_SUBTYPE_ID = (long) 29;
	static final Long DEPRECIATION_AMORTIZATION_SUBTYPE_ID = (long) 30;
	static final Long EXPENSE_FROM_INVESTING_SUBTYPE_ID = (long) 31;
	static final Long EXPENSE_FROM_FINANCING_SUBTYPE_ID = (long) 32;
	static final Long INTEREST_EXPENSE_SUBTYPE_ID = (long) 33;
	static final Long TAX_EXPENSE_SUBTYPE_ID = (long) 34;
	static final Long NON_RECURRING_SUBTYPE_ID = (long) 35;
	
	private LocalDate startDate;
	private LocalDate endDate;
	
	private BigDecimal totalRevenue = new BigDecimal(0); //positive value
	private BigDecimal totalCostOfSales = new BigDecimal(0); //positive value
	private BigDecimal grossProfit = new BigDecimal(0); // revenue - cost of sales
	
	private BigDecimal totalResearchAndDevelopment = new BigDecimal(0); //positive value
	private BigDecimal totalSalesGeneralAndAdministration = new BigDecimal(0); //positive value
	private BigDecimal totalDepreciationAndAmortization = new BigDecimal(0); //positive value
	private BigDecimal totalOperatingExpenses = new BigDecimal(0); //positive value, previous three added together
	
	private BigDecimal operatingIncome = new BigDecimal(0); //gross profit - operating expenses
	
	private BigDecimal incomeFromInvesting = new BigDecimal(0);
	private BigDecimal incomeFromFinancing = new BigDecimal(0);
	private BigDecimal expenseFromInvesting = new BigDecimal(0);
	private BigDecimal expenseFromFinancing = new BigDecimal(0);
	private BigDecimal totalOtherIncomeExpense = new BigDecimal(0); //income from investing + income from financing + other income - other expenses
	
	private BigDecimal ebit = new BigDecimal(0); //operating income + total other income/expense
	private BigDecimal interestExpense = new BigDecimal(0);
	private BigDecimal earningsBeforeTax = new BigDecimal(0); //ebit - interest expense
	private BigDecimal taxExpense = new BigDecimal(0); //positive value
	private BigDecimal nonRecurringAndExtraordinaryItems = new BigDecimal(0); //positive value
	
	private BigDecimal netIncome = new BigDecimal(0); // earningsBeforeTax - tax expense - nonRecurringAndExtraordinaryItems
	
	private List<AccountDTO> accountBalances;
	
	public IncomeStatementViewModel(List<AccountSubtypeBalanceDTO> accountSubtypeBalances,
			List<AccountDTO> accountBalances, LocalDate startDate, LocalDate endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.accountBalances = accountBalances;
		for (AccountSubtypeBalanceDTO subtypeBalance : accountSubtypeBalances) {
			if (subtypeBalance.getAccountSubtypeId() == REVENUE_SUBTYPE_ID) {
				totalRevenue = totalRevenue.subtract(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == INCOME_FROM_INVESTING_SUBTYPE_ID) {
				incomeFromInvesting = incomeFromInvesting.subtract(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == INCOME_FROM_FINANCING_SUBTYPE_ID) {
				incomeFromFinancing = incomeFromFinancing.subtract(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == COST_OF_SALES_SUBTYPE_ID) {
				totalCostOfSales = totalCostOfSales.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == RESEARCH_AND_DEVELOPMENT_SUBTYPE_ID) {
				totalResearchAndDevelopment = totalResearchAndDevelopment.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == SGA_SUBTYPE_ID) {
				totalSalesGeneralAndAdministration = totalSalesGeneralAndAdministration.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == DEPRECIATION_AMORTIZATION_SUBTYPE_ID) {
				totalDepreciationAndAmortization = totalDepreciationAndAmortization.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == EXPENSE_FROM_INVESTING_SUBTYPE_ID) {
				expenseFromInvesting = expenseFromInvesting.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == EXPENSE_FROM_FINANCING_SUBTYPE_ID) {
				expenseFromFinancing = expenseFromFinancing.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == INTEREST_EXPENSE_SUBTYPE_ID) {
				interestExpense = interestExpense.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == TAX_EXPENSE_SUBTYPE_ID) {
				taxExpense = taxExpense.add(subtypeBalance.getDebitsMinusCredits());
			} else if (subtypeBalance.getAccountSubtypeId() == NON_RECURRING_SUBTYPE_ID) {
				nonRecurringAndExtraordinaryItems = nonRecurringAndExtraordinaryItems.add(subtypeBalance.getDebitsMinusCredits());
			}
		}
		grossProfit = totalRevenue.subtract(totalCostOfSales);
		totalOperatingExpenses = totalResearchAndDevelopment.add(totalSalesGeneralAndAdministration.add(totalDepreciationAndAmortization));
		operatingIncome = grossProfit.subtract(totalOperatingExpenses);
		totalOtherIncomeExpense = incomeFromInvesting
				.add(incomeFromFinancing
				.add(expenseFromInvesting.negate()
				.add(expenseFromFinancing.negate())));
		
		ebit = operatingIncome.add(totalOtherIncomeExpense);
		earningsBeforeTax = ebit.subtract(interestExpense);
	
		netIncome = earningsBeforeTax
				.add(taxExpense.negate()
				.add(nonRecurringAndExtraordinaryItems.negate()));
	}

	public Long getRevenueSubtypeId() {
		return REVENUE_SUBTYPE_ID;
	}

	public Long getIncomeFromInvestingSubtypeId() {
		return INCOME_FROM_INVESTING_SUBTYPE_ID;
	}

	public Long getIncomeFromFinancingSubtypeId() {
		return INCOME_FROM_FINANCING_SUBTYPE_ID;
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

	public Long getDepreciationAmortizationSubtypeId() {
		return DEPRECIATION_AMORTIZATION_SUBTYPE_ID;
	}

	public Long getExpenseFromInvestingSubtypeId() {
		return EXPENSE_FROM_INVESTING_SUBTYPE_ID;
	}

	public Long getExpenseFromFinancingSubtypeId() {
		return EXPENSE_FROM_FINANCING_SUBTYPE_ID;
	}

	public Long getInterestExpenseSubtypeId() {
		return INTEREST_EXPENSE_SUBTYPE_ID;
	}

	public Long getTaxExpenseSubtypeId() {
		return TAX_EXPENSE_SUBTYPE_ID;
	}

	public Long getNonRecurringSubtypeId() {
		return NON_RECURRING_SUBTYPE_ID;
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

	public BigDecimal getTotalDepreciationAndAmortization() {
		return totalDepreciationAndAmortization;
	}

	public BigDecimal getTotalOperatingExpenses() {
		return totalOperatingExpenses;
	}

	public BigDecimal getOperatingIncome() {
		return operatingIncome;
	}

	public BigDecimal getIncomeFromInvesting() {
		return incomeFromInvesting;
	}

	public BigDecimal getIncomeFromFinancing() {
		return incomeFromFinancing;
	}

	public BigDecimal getExpenseFromInvesting() {
		return expenseFromInvesting;
	}

	public BigDecimal getExpenseFromFinancing() {
		return expenseFromFinancing;
	}

	public BigDecimal getTotalOtherIncomeExpense() {
		return totalOtherIncomeExpense;
	}

	public BigDecimal getEbit() {
		return ebit;
	}

	public BigDecimal getInterestExpense() {
		return interestExpense;
	}

	public BigDecimal getEarningsBeforeTax() {
		return earningsBeforeTax;
	}

	public BigDecimal getTaxExpense() {
		return taxExpense;
	}

	public BigDecimal getNonRecurringAndExtraordinaryItems() {
		return nonRecurringAndExtraordinaryItems;
	}

	public BigDecimal getNetIncome() {
		return netIncome;
	}

	public List<AccountDTO> getAccountBalances() {
		return accountBalances;
	}

	@Override
	public String toString() {
		return "IncomeStatementViewModel [startDate=" + startDate + ", endDate=" + endDate + ", totalRevenue="
				+ totalRevenue + ", totalCostOfSales=" + totalCostOfSales + ", grossProfit=" + grossProfit
				+ ", totalResearchAndDevelopment=" + totalResearchAndDevelopment
				+ ", totalSalesGeneralAndAdministration=" + totalSalesGeneralAndAdministration
				+ ", totalDepreciationAndAmortization=" + totalDepreciationAndAmortization + ", totalOperatingExpenses="
				+ totalOperatingExpenses + ", operatingIncome=" + operatingIncome + ", incomeFromInvesting="
				+ incomeFromInvesting + ", incomeFromFinancing=" + incomeFromFinancing + ", expenseFromInvesting="
				+ expenseFromInvesting + ", expenseFromFinancing=" + expenseFromFinancing + ", totalOtherIncomeExpense="
				+ totalOtherIncomeExpense + ", ebit=" + ebit + ", interestExpense=" + interestExpense
				+ ", earningsBeforeTax=" + earningsBeforeTax + ", taxExpense=" + taxExpense
				+ ", nonRecurringAndExtraordinaryItems=" + nonRecurringAndExtraordinaryItems + ", netIncome="
				+ netIncome + ", accountBalances=" + accountBalances + "]";
	}


	
}
