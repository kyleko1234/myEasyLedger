package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class BalanceSheetDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	//list of all assets with BalanceSheetFormatPositionId 1
	private List<AccountSubtypeInReportDTO> currentAssetsSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalCurrentAssets = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> nonCurrentAssetsSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalNonCurrentAssets = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> currentLiabilitiesSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalCurrentLiabilities = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> nonCurrentLiabilitiesSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> tptalNonCurrentLiabilities = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> paidInCapitalAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalPaidInCapital = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> shareBasedCompensationAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalShareBasedCompensation = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> otherEquityItemsAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalOtherEquityItems = new ArrayList<BigDecimal>();
	private List<BigDecimal> retainedEarningsBeginningBalances = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> dividendsAndEquivalentsAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalDividendsAndEquivalents = new ArrayList<BigDecimal>();
	private List<BigDecimal> retainedEarningsEndingBalances = new ArrayList<BigDecimal>();
	
	
	public BalanceSheetDTO() {
	}

	
}
