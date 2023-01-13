package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class BalanceSheetDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	private List<AccountInReportDTO> currentAssets;
	private List<BigDecimal> totalCurrentAssets;
	private List<AccountInReportDTO> nonCurrentAssets;
	private List<BigDecimal> totalNonCurrentAssets;
	private List<BigDecimal> totalAssets;
	
	private List<AccountInReportDTO> currentLiabilities;
	private List<BigDecimal> totalCurrentLiabilities;
	private List<AccountInReportDTO> nonCurrentLiabilities;
	private List<BigDecimal> totalNonCurrentLiabilities;
	private List<BigDecimal> totalLiabilities;
	
	private List<AccountInReportDTO> paidInCapital;
	private List<AccountInReportDTO> shareBasedCompensation;
	private List<AccountInReportDTO> otherEquityItems;
	private List<BigDecimal> retainedEarningsBeginningBalances;
	private List<BigDecimal> netIncomeForCurrentPeriod;
	private List <AccountInReportDTO> dividendsAndEquivalents;
	private List<BigDecimal> retainedEarningsEndingBalances;

}
