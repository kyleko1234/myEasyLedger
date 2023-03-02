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
	private List<BigDecimal> totalNonCurrentLiabilities = new ArrayList<BigDecimal>();
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


	public void setTotalNonCurrentLiabilities(List<BigDecimal> tptalNonCurrentLiabilities) {
		this.totalNonCurrentLiabilities = tptalNonCurrentLiabilities;
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


	public List<BigDecimal> getRetainedEarningsBeginningBalances() {
		return retainedEarningsBeginningBalances;
	}


	public void setRetainedEarningsBeginningBalances(List<BigDecimal> retainedEarningsBeginningBalances) {
		this.retainedEarningsBeginningBalances = retainedEarningsBeginningBalances;
	}


	public List<AccountInReportDTO> getDividendsAndEquivalentsAccounts() {
		return dividendsAndEquivalentsAccounts;
	}


	public void setDividendsAndEquivalentsAccounts(List<AccountInReportDTO> dividendsAndEquivalentsAccounts) {
		this.dividendsAndEquivalentsAccounts = dividendsAndEquivalentsAccounts;
	}


	public List<BigDecimal> getTotalDividendsAndEquivalents() {
		return totalDividendsAndEquivalents;
	}


	public void setTotalDividendsAndEquivalents(List<BigDecimal> totalDividendsAndEquivalents) {
		this.totalDividendsAndEquivalents = totalDividendsAndEquivalents;
	}


	public List<BigDecimal> getRetainedEarningsEndingBalances() {
		return retainedEarningsEndingBalances;
	}


	public void setRetainedEarningsEndingBalances(List<BigDecimal> retainedEarningsEndingBalances) {
		this.retainedEarningsEndingBalances = retainedEarningsEndingBalances;
	}
	

	
}
