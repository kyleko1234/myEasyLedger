package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class BalanceSheetDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	//list of all assets with BalanceSheetFormatPositionId 1
	private List<AccountSubtypeInReportDTO> currentAssetsSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalCurrentAssets = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> nonCurrentAssetsSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalNonCurrentAssets = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalAssets = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> currentLiabilitiesSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalCurrentLiabilities = new ArrayList<BigDecimal>();
	private List<AccountSubtypeInReportDTO> nonCurrentLiabilitiesSubtypes = new ArrayList<AccountSubtypeInReportDTO>();
	private List<BigDecimal> totalNonCurrentLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalLiabilities = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> paidInCapitalAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalPaidInCapital = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> shareBasedCompensationAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalShareBasedCompensation = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> otherEquityItemsAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalOtherEquityItems = new ArrayList<BigDecimal>();
	private List<LocalDate> previousPeriodEndDates = new ArrayList<LocalDate>();
	private List<LocalDate> currentPeriodStartDates = new ArrayList<LocalDate>();
	private List<BigDecimal> retainedEarningsBeginningBalances = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> dividendsAndEquivalentsAccountsPreviousPeriod = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalDividendsAndEquivalentsPreviousPeriod = new ArrayList<BigDecimal>();
	private List<BigDecimal> netIncomePreviousPeriod = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> dividendsAndEquivalentsAccountsCurrentPeriod = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> netIncomeCurrentPeriod = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalDividendsAndEquivalentsCurrentPeriod = new ArrayList<BigDecimal>();
	private List<BigDecimal> retainedEarningsEndingBalances = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalEquity = new ArrayList<BigDecimal>();
	
	
	public BalanceSheetDTO() {
	}


	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}


	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}


	public List<AccountSubtypeInReportDTO> getCurrentAssetsSubtypes() {
		return currentAssetsSubtypes;
	}


	public void setCurrentAssetsSubtypes(List<AccountSubtypeInReportDTO> currentAssetsSubtypes) {
		this.currentAssetsSubtypes = currentAssetsSubtypes;
	}


	public List<BigDecimal> getTotalCurrentAssets() {
		return totalCurrentAssets;
	}


	public void setTotalCurrentAssets(List<BigDecimal> totalCurrentAssets) {
		this.totalCurrentAssets = totalCurrentAssets;
	}


	public List<AccountSubtypeInReportDTO> getNonCurrentAssetsSubtypes() {
		return nonCurrentAssetsSubtypes;
	}


	public void setNonCurrentAssetsSubtypes(List<AccountSubtypeInReportDTO> nonCurrentAssetsSubtypes) {
		this.nonCurrentAssetsSubtypes = nonCurrentAssetsSubtypes;
	}


	public List<BigDecimal> getTotalNonCurrentAssets() {
		return totalNonCurrentAssets;
	}


	public void setTotalNonCurrentAssets(List<BigDecimal> totalNonCurrentAssets) {
		this.totalNonCurrentAssets = totalNonCurrentAssets;
	}


	public List<BigDecimal> getTotalAssets() {
		return totalAssets;
	}


	public void setTotalAssets(List<BigDecimal> totalAssets) {
		this.totalAssets = totalAssets;
	}


	public List<AccountSubtypeInReportDTO> getCurrentLiabilitiesSubtypes() {
		return currentLiabilitiesSubtypes;
	}


	public void setCurrentLiabilitiesSubtypes(List<AccountSubtypeInReportDTO> currentLiabilitiesSubtypes) {
		this.currentLiabilitiesSubtypes = currentLiabilitiesSubtypes;
	}


	public List<BigDecimal> getTotalCurrentLiabilities() {
		return totalCurrentLiabilities;
	}


	public void setTotalCurrentLiabilities(List<BigDecimal> totalCurrentLiabilities) {
		this.totalCurrentLiabilities = totalCurrentLiabilities;
	}


	public List<AccountSubtypeInReportDTO> getNonCurrentLiabilitiesSubtypes() {
		return nonCurrentLiabilitiesSubtypes;
	}


	public void setNonCurrentLiabilitiesSubtypes(List<AccountSubtypeInReportDTO> nonCurrentLiabilitiesSubtypes) {
		this.nonCurrentLiabilitiesSubtypes = nonCurrentLiabilitiesSubtypes;
	}


	public List<BigDecimal> getTotalNonCurrentLiabilities() {
		return totalNonCurrentLiabilities;
	}


	public void setTotalNonCurrentLiabilities(List<BigDecimal> totalNonCurrentLiabilities) {
		this.totalNonCurrentLiabilities = totalNonCurrentLiabilities;
	}


	public List<BigDecimal> getTotalLiabilities() {
		return totalLiabilities;
	}


	public void setTotalLiabilities(List<BigDecimal> totalLiabilities) {
		this.totalLiabilities = totalLiabilities;
	}


	public List<AccountInReportDTO> getPaidInCapitalAccounts() {
		return paidInCapitalAccounts;
	}


	public void setPaidInCapitalAccounts(List<AccountInReportDTO> paidInCapitalAccounts) {
		this.paidInCapitalAccounts = paidInCapitalAccounts;
	}


	public List<BigDecimal> getTotalPaidInCapital() {
		return totalPaidInCapital;
	}


	public void setTotalPaidInCapital(List<BigDecimal> totalPaidInCapital) {
		this.totalPaidInCapital = totalPaidInCapital;
	}


	public List<AccountInReportDTO> getShareBasedCompensationAccounts() {
		return shareBasedCompensationAccounts;
	}


	public void setShareBasedCompensationAccounts(List<AccountInReportDTO> shareBasedCompensationAccounts) {
		this.shareBasedCompensationAccounts = shareBasedCompensationAccounts;
	}


	public List<BigDecimal> getTotalShareBasedCompensation() {
		return totalShareBasedCompensation;
	}


	public void setTotalShareBasedCompensation(List<BigDecimal> totalShareBasedCompensation) {
		this.totalShareBasedCompensation = totalShareBasedCompensation;
	}


	public List<AccountInReportDTO> getOtherEquityItemsAccounts() {
		return otherEquityItemsAccounts;
	}


	public void setOtherEquityItemsAccounts(List<AccountInReportDTO> otherEquityItemsAccounts) {
		this.otherEquityItemsAccounts = otherEquityItemsAccounts;
	}


	public List<BigDecimal> getTotalOtherEquityItems() {
		return totalOtherEquityItems;
	}


	public void setTotalOtherEquityItems(List<BigDecimal> totalOtherEquityItems) {
		this.totalOtherEquityItems = totalOtherEquityItems;
	}


	public List<LocalDate> getPreviousPeriodEndDates() {
		return previousPeriodEndDates;
	}


	public void setPreviousPeriodEndDates(List<LocalDate> previousPeriodEndDates) {
		this.previousPeriodEndDates = previousPeriodEndDates;
	}


	public List<LocalDate> getCurrentPeriodStartDates() {
		return currentPeriodStartDates;
	}


	public void setCurrentPeriodStartDates(List<LocalDate> currentPeriodStartDates) {
		this.currentPeriodStartDates = currentPeriodStartDates;
	}


	public List<BigDecimal> getRetainedEarningsBeginningBalances() {
		return retainedEarningsBeginningBalances;
	}


	public void setRetainedEarningsBeginningBalances(List<BigDecimal> retainedEarningsBeginningBalances) {
		this.retainedEarningsBeginningBalances = retainedEarningsBeginningBalances;
	}


	public List<AccountInReportDTO> getDividendsAndEquivalentsAccountsPreviousPeriod() {
		return dividendsAndEquivalentsAccountsPreviousPeriod;
	}


	public void setDividendsAndEquivalentsAccountsPreviousPeriod(
			List<AccountInReportDTO> dividendsAndEquivalentsAccountsPreviousPeriod) {
		this.dividendsAndEquivalentsAccountsPreviousPeriod = dividendsAndEquivalentsAccountsPreviousPeriod;
	}


	public List<BigDecimal> getTotalDividendsAndEquivalentsPreviousPeriod() {
		return totalDividendsAndEquivalentsPreviousPeriod;
	}


	public void setTotalDividendsAndEquivalentsPreviousPeriod(List<BigDecimal> totalDividendsAndEquivalentsPreviousPeriod) {
		this.totalDividendsAndEquivalentsPreviousPeriod = totalDividendsAndEquivalentsPreviousPeriod;
	}


	public List<BigDecimal> getNetIncomePreviousPeriod() {
		return netIncomePreviousPeriod;
	}


	public void setNetIncomePreviousPeriod(List<BigDecimal> netIncomePreviousPeriod) {
		this.netIncomePreviousPeriod = netIncomePreviousPeriod;
	}


	public List<AccountInReportDTO> getDividendsAndEquivalentsAccountsCurrentPeriod() {
		return dividendsAndEquivalentsAccountsCurrentPeriod;
	}


	public void setDividendsAndEquivalentsAccountsCurrentPeriod(
			List<AccountInReportDTO> dividendsAndEquivalentsAccountsCurrentPeriod) {
		this.dividendsAndEquivalentsAccountsCurrentPeriod = dividendsAndEquivalentsAccountsCurrentPeriod;
	}


	public List<BigDecimal> getNetIncomeCurrentPeriod() {
		return netIncomeCurrentPeriod;
	}


	public void setNetIncomeCurrentPeriod(List<BigDecimal> netIncomeCurrentPeriod) {
		this.netIncomeCurrentPeriod = netIncomeCurrentPeriod;
	}


	public List<BigDecimal> getTotalDividendsAndEquivalentsCurrentPeriod() {
		return totalDividendsAndEquivalentsCurrentPeriod;
	}


	public void setTotalDividendsAndEquivalentsCurrentPeriod(List<BigDecimal> totalDividendsAndEquivalentsCurrentPeriod) {
		this.totalDividendsAndEquivalentsCurrentPeriod = totalDividendsAndEquivalentsCurrentPeriod;
	}


	public List<BigDecimal> getRetainedEarningsEndingBalances() {
		return retainedEarningsEndingBalances;
	}


	public void setRetainedEarningsEndingBalances(List<BigDecimal> retainedEarningsEndingBalances) {
		this.retainedEarningsEndingBalances = retainedEarningsEndingBalances;
	}

	public List<BigDecimal> getTotalEquity() {
		return totalEquity;
	}


	public void setTotalEquity(List<BigDecimal> totalEquity) {
		this.totalEquity = totalEquity;
	}


}
