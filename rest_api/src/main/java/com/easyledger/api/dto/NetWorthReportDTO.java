package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class NetWorthReportDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	private List<AccountInReportDTO> assetAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalAssets = new ArrayList<BigDecimal>();
	private List<AccountInReportDTO> liabilityAccounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalLiabilities = new ArrayList<BigDecimal>();
	private List<BigDecimal> totalNetWorth = new ArrayList<BigDecimal>();
	
	public NetWorthReportDTO() {
		
	}

	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}

	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}

	public List<AccountInReportDTO> getAssetAccounts() {
		return assetAccounts;
	}

	public void setAssetAccounts(List<AccountInReportDTO> assetAccounts) {
		this.assetAccounts = assetAccounts;
	}

	public List<BigDecimal> getTotalAssets() {
		return totalAssets;
	}

	public void setTotalAssets(List<BigDecimal> totalAssets) {
		this.totalAssets = totalAssets;
	}

	public List<AccountInReportDTO> getLiabilityAccounts() {
		return liabilityAccounts;
	}

	public void setLiabilityAccounts(List<AccountInReportDTO> liabilityAccounts) {
		this.liabilityAccounts = liabilityAccounts;
	}

	public List<BigDecimal> getTotalLiabilities() {
		return totalLiabilities;
	}

	public void setTotalLiabilities(List<BigDecimal> totalLiabilities) {
		this.totalLiabilities = totalLiabilities;
	}

	public List<BigDecimal> getTotalNetWorth() {
		return totalNetWorth;
	}

	public void setTotalNetWorth(List<BigDecimal> totalNetWorth) {
		this.totalNetWorth = totalNetWorth;
	}
	
	
}
