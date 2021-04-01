package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;

public class CashFlowStatementViewModel {
	
	static final Long DEPRECIATION_AMORTIZATION_SUBTYPE_ID = (long) 31;
	static final Long DEFERRED_TAX_SUBTYPE_ID = (long) 15;
	static final Long SHARE_BASED_COMPENSATION_SUBTYPE_ID = (long) 21;
	static final Long INCOME_FROM_INVESTING_SUBTYPE_ID = (long) 25;
	static final Long INCOME_FROM_FINANCING_SUBTYPE_ID = (long) 26;
	
	
	static final ArrayList<Long> INCOME_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 24, (long) 25, (long) 26, (long) 27));
	static final ArrayList<Long> EXPENSES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 28, (long) 29, (long) 30, (long) 31, (long) 32, (long) 33, (long) 34, (long) 35));

	private BigDecimal netIncome = new BigDecimal(0);
	private BigDecimal depreciationAndAmortization = new BigDecimal(0);
	private BigDecimal deferredTax = new BigDecimal(0);
	private BigDecimal shareBasedCompensation = new BigDecimal(0);
	private BigDecimal nonOperatingIncome = new BigDecimal(0);
	private BigDecimal receivables = new BigDecimal(0);
	private BigDecimal payables = new BigDecimal(0);
	private BigDecimal inventory = new BigDecimal(0);
	private BigDecimal deferredRevenue = new BigDecimal(0);
	private BigDecimal cashFlowFromOperations = new BigDecimal(0);
	
	private BigDecimal incomeFromInvesting = new BigDecimal(0);
	private BigDecimal marketableSecurities = new BigDecimal(0);
	private BigDecimal propertyPlantAndEquipment = new BigDecimal(0);
	private BigDecimal cashFlowFromInvesting = new BigDecimal(0);
	
	private BigDecimal paidInCapital = new BigDecimal(0);
	private BigDecimal dividendPayments = new BigDecimal(0);
	private BigDecimal incomeFromFinancing = new BigDecimal(0);
	private BigDecimal debt = new BigDecimal(0);
	private BigDecimal cashFlowFromFinancing = new BigDecimal(0);
	
	
	
}
