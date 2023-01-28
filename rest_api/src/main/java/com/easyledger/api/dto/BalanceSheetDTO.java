package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class BalanceSheetDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	private List<AccountInReportDTO> currentAssets = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalCurrentAssets = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> nonCurrentAssets = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalNonCurrentAssets = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalAssets = new ArrayList<BigDecimal>();
	
	private List<AccountInReportDTO> currentLiabilities = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalCurrentLiabilities = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> nonCurrentLiabilities = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalNonCurrentLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalLiabilities = new ArrayList<BigDecimal>();
	
	private List<AccountInReportDTO> paidInCapital = new ArrayList<AccountInReportDTO>();
	private List<AccountInReportDTO> shareBasedCompensation = new ArrayList<AccountInReportDTO>();
	private List<AccountInReportDTO> otherEquityItems = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> retainedEarningsBeginningBalances = new ArrayList<BigDecimal>();
	private List<BigDecimal> netIncomeForCurrentPeriod = new ArrayList<BigDecimal>();
	private List <AccountInReportDTO> dividendsAndEquivalents = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> retainedEarningsEndingBalances = new ArrayList<BigDecimal>();

	public BalanceSheetDTO() {
	}

	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}

	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}

	public List<AccountInReportDTO> getCurrentAssets() {
		return currentAssets;
	}

	public void setCurrentAssets(List<AccountInReportDTO> currentAssets) {
		this.currentAssets = currentAssets;
	}

	public List<BigDecimal> getTotalCurrentAssets() {
		return totalCurrentAssets;
	}

	public void setTotalCurrentAssets(List<BigDecimal> totalCurrentAssets) {
		this.totalCurrentAssets = totalCurrentAssets;
	}

	public List<AccountInReportDTO> getNonCurrentAssets() {
		return nonCurrentAssets;
	}

	public void setNonCurrentAssets(List<AccountInReportDTO> nonCurrentAssets) {
		this.nonCurrentAssets = nonCurrentAssets;
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

	public List<AccountInReportDTO> getCurrentLiabilities() {
		return currentLiabilities;
	}

	public void setCurrentLiabilities(List<AccountInReportDTO> currentLiabilities) {
		this.currentLiabilities = currentLiabilities;
	}

	public List<BigDecimal> getTotalCurrentLiabilities() {
		return totalCurrentLiabilities;
	}

	public void setTotalCurrentLiabilities(List<BigDecimal> totalCurrentLiabilities) {
		this.totalCurrentLiabilities = totalCurrentLiabilities;
	}

	public List<AccountInReportDTO> getNonCurrentLiabilities() {
		return nonCurrentLiabilities;
	}

	public void setNonCurrentLiabilities(List<AccountInReportDTO> nonCurrentLiabilities) {
		this.nonCurrentLiabilities = nonCurrentLiabilities;
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

	public List<AccountInReportDTO> getPaidInCapital() {
		return paidInCapital;
	}

	public void setPaidInCapital(List<AccountInReportDTO> paidInCapital) {
		this.paidInCapital = paidInCapital;
	}

	public List<AccountInReportDTO> getShareBasedCompensation() {
		return shareBasedCompensation;
	}

	public void setShareBasedCompensation(List<AccountInReportDTO> shareBasedCompensation) {
		this.shareBasedCompensation = shareBasedCompensation;
	}

	public List<AccountInReportDTO> getOtherEquityItems() {
		return otherEquityItems;
	}

	public void setOtherEquityItems(List<AccountInReportDTO> otherEquityItems) {
		this.otherEquityItems = otherEquityItems;
	}

	public List<BigDecimal> getRetainedEarningsBeginningBalances() {
		return retainedEarningsBeginningBalances;
	}

	public void setRetainedEarningsBeginningBalances(List<BigDecimal> retainedEarningsBeginningBalances) {
		this.retainedEarningsBeginningBalances = retainedEarningsBeginningBalances;
	}

	public List<BigDecimal> getNetIncomeForCurrentPeriod() {
		return netIncomeForCurrentPeriod;
	}

	public void setNetIncomeForCurrentPeriod(List<BigDecimal> netIncomeForCurrentPeriod) {
		this.netIncomeForCurrentPeriod = netIncomeForCurrentPeriod;
	}

	public List<AccountInReportDTO> getDividendsAndEquivalents() {
		return dividendsAndEquivalents;
	}

	public void setDividendsAndEquivalents(List<AccountInReportDTO> dividendsAndEquivalents) {
		this.dividendsAndEquivalents = dividendsAndEquivalents;
	}

	public List<BigDecimal> getRetainedEarningsEndingBalances() {
		return retainedEarningsEndingBalances;
	}

	public void setRetainedEarningsEndingBalances(List<BigDecimal> retainedEarningsEndingBalances) {
		this.retainedEarningsEndingBalances = retainedEarningsEndingBalances;
	}
	
}
