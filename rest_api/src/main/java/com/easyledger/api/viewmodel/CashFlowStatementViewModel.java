package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;

public class CashFlowStatementViewModel {
	
	static final Long DEPRECIATION_AMORTIZATION_SUBTYPE_ID = (long) 31;
	static final Long DEFERRED_TAX_SUBTYPE_ID = (long) 15;
	static final Long SHARE_BASED_COMPENSATION_SUBTYPE_ID = (long) 21;
	static final Long INCOME_FROM_INVESTING_SUBTYPE_ID = (long) 25;
	static final Long INCOME_FROM_FINANCING_SUBTYPE_ID = (long) 26;
	static final Long EXPENSE_FROM_INVESTING_SUBTYPE_ID = (long) 31;
	static final Long EXPENSE_FROM_FINANCING_SUBTYPE_ID = (long) 32;
	static final ArrayList<Long> NON_OPERATING_INCOME_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 25, (long) 26, (long) 31, (long) 32));
	static final ArrayList<Long> RECEIVABLES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 3, (long) 7));
	static final ArrayList<Long> PAYABLES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 11, (long) 18));
	static final Long INVENTORY_SUBTYPE_ID = (long) 4;
	static final Long DEFERRED_REVENUE_SUBTYPE_ID = (long) 13;
	static final ArrayList<Long> OTHER_ASSETS_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 5, (long) 10));
	static final ArrayList<Long> OTHER_LIABILITIES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 16, (long) 19));
	static final ArrayList<Long> MARKETABLE_SECURITIES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 2, (long) 6));
	static final Long PPE_SUBTYPE_ID = (long) 8;
	static final Long PAID_IN_CAPITAL_SUBTYPE_ID = (long) 20;
	static final Long DIVIDENDS_PAYABLE_SUBTYPE_ID = (long) 12;
	static final Long DIVIDENDS_DECLARED_SUBTYPE_ID = (long) 22;
	static final Long OTHER_EQUITY_SUBTYPE_ID = (long) 23;
	static final ArrayList<Long> DEBT_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 14, (long) 17));
	
	static final ArrayList<Long> INCOME_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 24, (long) 25, (long) 26, (long) 27));
	static final ArrayList<Long> EXPENSE_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 28, (long) 29, (long) 30, (long) 31, (long) 32, (long) 33, (long) 34, (long) 35));

	private BigDecimal netIncome = new BigDecimal(0);
	private BigDecimal depreciationAndAmortization = new BigDecimal(0);
	private BigDecimal deferredTax = new BigDecimal(0);
	private BigDecimal shareBasedCompensation = new BigDecimal(0);
	private BigDecimal nonOperatingIncome = new BigDecimal(0);
	private BigDecimal receivables = new BigDecimal(0);
	private BigDecimal payables = new BigDecimal(0);
	private BigDecimal inventory = new BigDecimal(0);
	private BigDecimal deferredRevenue = new BigDecimal(0);
	private BigDecimal otherAssets = new BigDecimal(0);
	private BigDecimal otherLiabilities = new BigDecimal(0);
	private BigDecimal cashFlowFromOperations = new BigDecimal(0);
	
	private BigDecimal netIncomeFromInvesting = new BigDecimal(0);
	private BigDecimal marketableSecurities = new BigDecimal(0);
	private BigDecimal propertyPlantAndEquipment = new BigDecimal(0);
	private BigDecimal cashFlowFromInvesting = new BigDecimal(0);
	
	private BigDecimal paidInCapital = new BigDecimal(0);
	private BigDecimal dividendPayments = new BigDecimal(0);
	private BigDecimal otherEquity = new BigDecimal(0);
	private BigDecimal netIncomeFromFinancing = new BigDecimal(0);
	private BigDecimal debt = new BigDecimal(0);
	private BigDecimal cashFlowFromFinancing = new BigDecimal(0);
	private BigDecimal cashFlow = new BigDecimal(0);
	
	
	public CashFlowStatementViewModel(List<AccountSubtypeBalanceDTO> currPeriodAccountSubtypeBalances) {
		for (AccountSubtypeBalanceDTO accountSubtype : currPeriodAccountSubtypeBalances) {
			Long id = accountSubtype.getAccountSubtypeId();
			BigDecimal amount = accountSubtype.getDebitsMinusCredits();
			if (INCOME_SUBTYPE_IDS.contains(id) || EXPENSE_SUBTYPE_IDS.contains(id)) {
				netIncome = netIncome.subtract(amount);
			}
			if (DEPRECIATION_AMORTIZATION_SUBTYPE_ID == id) {
				depreciationAndAmortization = depreciationAndAmortization.add(amount);
			}
			if (DEFERRED_TAX_SUBTYPE_ID == id) {
				deferredTax = deferredTax.subtract(amount);
			}
			if (SHARE_BASED_COMPENSATION_SUBTYPE_ID == id) {
				shareBasedCompensation = shareBasedCompensation.subtract(amount);
			}
			if (NON_OPERATING_INCOME_SUBTYPE_IDS.contains(id)) {
				nonOperatingIncome = nonOperatingIncome.subtract(amount);
			}
			if (RECEIVABLES_SUBTYPE_IDS.contains(id)) {
				receivables = receivables.add(amount);
			}
			if (PAYABLES_SUBTYPE_IDS.contains(id)) {
				payables = payables.subtract(amount);
			}
			if (INVENTORY_SUBTYPE_ID == id) {
				inventory = inventory.add(amount);
			}
			if (DEFERRED_REVENUE_SUBTYPE_ID == id) {
				deferredRevenue = deferredRevenue.subtract(amount);
			}
			if (OTHER_ASSETS_SUBTYPE_IDS.contains(id)) {
				otherAssets = otherAssets.add(amount);
			}
			if (OTHER_LIABILITIES_SUBTYPE_IDS.contains(id)) {
				otherLiabilities = otherLiabilities.subtract(amount);
			}
			if (INCOME_FROM_INVESTING_SUBTYPE_ID == id || EXPENSE_FROM_INVESTING_SUBTYPE_ID == id) {
				netIncomeFromInvesting = netIncomeFromInvesting.subtract(amount);
			}
			if (MARKETABLE_SECURITIES_SUBTYPE_IDS.contains(id)) {
				marketableSecurities = marketableSecurities.add(amount);
			}
			if (PPE_SUBTYPE_ID == id) {
				propertyPlantAndEquipment = propertyPlantAndEquipment.add(amount);
			}
			if (PAID_IN_CAPITAL_SUBTYPE_ID == id) {
				paidInCapital = paidInCapital.subtract(amount);
			}
			if (DIVIDENDS_PAYABLE_SUBTYPE_ID == id) {
				dividendPayments = dividendPayments.add(amount);
			}
			if (DIVIDENDS_DECLARED_SUBTYPE_ID == id) {
				dividendPayments = dividendPayments.subtract(amount);
			}
			if (OTHER_EQUITY_SUBTYPE_ID == id) {
				otherEquity = otherEquity.subtract(amount);
			}
			if (INCOME_FROM_FINANCING_SUBTYPE_ID == id || EXPENSE_FROM_FINANCING_SUBTYPE_ID == id) {
				netIncomeFromFinancing = netIncomeFromFinancing.subtract(amount);
			}
			if (DEBT_SUBTYPE_IDS.contains(id)) {
				debt = debt.subtract(amount);
			}
		}
		cashFlowFromOperations = netIncome
				.add(depreciationAndAmortization
				.add(deferredTax
				.add(shareBasedCompensation
				.subtract(nonOperatingIncome
				.subtract(receivables
				.add(payables
				.subtract(inventory
				.add(deferredRevenue
				.subtract(otherAssets
				.add(otherLiabilities))))))))));
		
		cashFlowFromInvesting = netIncomeFromInvesting
				.subtract(marketableSecurities
				.subtract(propertyPlantAndEquipment));
		
		cashFlowFromFinancing = paidInCapital
				.add(otherEquity
				.subtract(dividendPayments
				.add(netIncomeFromFinancing
				.add(debt))));
		cashFlow = cashFlowFromOperations.add(cashFlowFromInvesting.add(cashFlowFromFinancing));
		
	}


	public Long getDepreciationAmortizationSubtypeId() {
		return DEPRECIATION_AMORTIZATION_SUBTYPE_ID;
	}


	public Long getDeferredTaxSubtypeId() {
		return DEFERRED_TAX_SUBTYPE_ID;
	}


	public Long getShareBasedCompensationSubtypeId() {
		return SHARE_BASED_COMPENSATION_SUBTYPE_ID;
	}


	public Long getIncomeFromInvestingSubtypeId() {
		return INCOME_FROM_INVESTING_SUBTYPE_ID;
	}


	public Long getIncomeFromFinancingSubtypeId() {
		return INCOME_FROM_FINANCING_SUBTYPE_ID;
	}


	public Long getExpenseFromInvestingSubtypeId() {
		return EXPENSE_FROM_INVESTING_SUBTYPE_ID;
	}


	public Long getExpenseFromFinancingSubtypeId() {
		return EXPENSE_FROM_FINANCING_SUBTYPE_ID;
	}


	public ArrayList<Long> getNonOperatingIncomeSubtypeIds() {
		return NON_OPERATING_INCOME_SUBTYPE_IDS;
	}


	public ArrayList<Long> getReceivablesSubtypeIds() {
		return RECEIVABLES_SUBTYPE_IDS;
	}


	public ArrayList<Long> getPayablesSubtypeIds() {
		return PAYABLES_SUBTYPE_IDS;
	}


	public Long getInventorySubtypeId() {
		return INVENTORY_SUBTYPE_ID;
	}


	public Long getDeferredRevenueSubtypeId() {
		return DEFERRED_REVENUE_SUBTYPE_ID;
	}


	public ArrayList<Long> getOtherAssetsSubtypeIds() {
		return OTHER_ASSETS_SUBTYPE_IDS;
	}


	public ArrayList<Long> getOtherLiabilitiesSubtypeIds() {
		return OTHER_LIABILITIES_SUBTYPE_IDS;
	}


	public ArrayList<Long> getMarketableSecuritiesSubtypeIds() {
		return MARKETABLE_SECURITIES_SUBTYPE_IDS;
	}


	public Long getPpeSubtypeId() {
		return PPE_SUBTYPE_ID;
	}


	public Long getPaidInCapitalSubtypeId() {
		return PAID_IN_CAPITAL_SUBTYPE_ID;
	}


	public Long getDividendsPayableSubtypeId() {
		return DIVIDENDS_PAYABLE_SUBTYPE_ID;
	}


	public Long getDividendsDeclaredSubtypeId() {
		return DIVIDENDS_DECLARED_SUBTYPE_ID;
	}


	public Long getOtherEquitySubtypeId() {
		return OTHER_EQUITY_SUBTYPE_ID;
	}


	public ArrayList<Long> getDebtSubtypeIds() {
		return DEBT_SUBTYPE_IDS;
	}


	public ArrayList<Long> getIncomeSubtypeIds() {
		return INCOME_SUBTYPE_IDS;
	}


	public ArrayList<Long> getExpenseSubtypeIds() {
		return EXPENSE_SUBTYPE_IDS;
	}


	public BigDecimal getNetIncome() {
		return netIncome;
	}


	public BigDecimal getDepreciationAndAmortization() {
		return depreciationAndAmortization;
	}


	public BigDecimal getDeferredTax() {
		return deferredTax;
	}


	public BigDecimal getShareBasedCompensation() {
		return shareBasedCompensation;
	}


	public BigDecimal getNonOperatingIncome() {
		return nonOperatingIncome;
	}


	public BigDecimal getReceivables() {
		return receivables;
	}


	public BigDecimal getPayables() {
		return payables;
	}


	public BigDecimal getInventory() {
		return inventory;
	}


	public BigDecimal getDeferredRevenue() {
		return deferredRevenue;
	}


	public BigDecimal getOtherAssets() {
		return otherAssets;
	}


	public BigDecimal getOtherLiabilities() {
		return otherLiabilities;
	}


	public BigDecimal getCashFlowFromOperations() {
		return cashFlowFromOperations;
	}


	public BigDecimal getNetIncomeFromInvesting() {
		return netIncomeFromInvesting;
	}


	public BigDecimal getMarketableSecurities() {
		return marketableSecurities;
	}


	public BigDecimal getPropertyPlantAndEquipment() {
		return propertyPlantAndEquipment;
	}


	public BigDecimal getCashFlowFromInvesting() {
		return cashFlowFromInvesting;
	}


	public BigDecimal getPaidInCapital() {
		return paidInCapital;
	}


	public BigDecimal getDividendPayments() {
		return dividendPayments;
	}


	public BigDecimal getOtherEquity() {
		return otherEquity;
	}


	public BigDecimal getNetIncomeFromFinancing() {
		return netIncomeFromFinancing;
	}


	public BigDecimal getDebt() {
		return debt;
	}


	public BigDecimal getCashFlowFromFinancing() {
		return cashFlowFromFinancing;
	}


	public BigDecimal getCashFlow() {
		return cashFlow;
	}


	@Override
	public String toString() {
		return "CashFlowStatementViewModel [netIncome=" + netIncome + ", depreciationAndAmortization="
				+ depreciationAndAmortization + ", deferredTax=" + deferredTax + ", shareBasedCompensation="
				+ shareBasedCompensation + ", nonOperatingIncome=" + nonOperatingIncome + ", receivables=" + receivables
				+ ", payables=" + payables + ", inventory=" + inventory + ", deferredRevenue=" + deferredRevenue
				+ ", otherAssets=" + otherAssets + ", otherLiabilities=" + otherLiabilities
				+ ", cashFlowFromOperations=" + cashFlowFromOperations + ", netIncomeFromInvesting="
				+ netIncomeFromInvesting + ", marketableSecurities=" + marketableSecurities
				+ ", propertyPlantAndEquipment=" + propertyPlantAndEquipment + ", cashFlowFromInvesting="
				+ cashFlowFromInvesting + ", paidInCapital=" + paidInCapital + ", dividendPayments=" + dividendPayments
				+ ", otherEquity=" + otherEquity + ", netIncomeFromFinancing=" + netIncomeFromFinancing + ", debt="
				+ debt + ", cashFlowFromFinancing=" + cashFlowFromFinancing + ", cashFlow=" + cashFlow + "]";
	}
	
	
}
