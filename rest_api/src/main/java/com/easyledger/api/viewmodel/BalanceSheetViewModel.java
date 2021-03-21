package com.easyledger.api.viewmodel;

import java.time.LocalDate;
import java.util.List;

import com.easyledger.api.dto.AccountBalanceDTO;

public class BalanceSheetViewModel {
	private Long organizationId;
	private LocalDate asOfDate;
	private LocalDate prevPeriodEndDate;
	private LocalDate currPeriodStartDate;
	private BalanceSheetAssetsViewModel balanceSheetAssets;
	private BalanceSheetLiabilitiesViewModel balanceSheetLiabilities;
	private BalanceSheetEquityViewModel balanceSheetEquity;
	private List<AccountBalanceDTO> accountBalances;

	public BalanceSheetViewModel(Long organizationId, LocalDate asOfDate, LocalDate prevPeriodEndDate,
			LocalDate currPeriodStartDate, BalanceSheetAssetsViewModel balanceSheetAssets,
			BalanceSheetLiabilitiesViewModel balanceSheetLiabilities, BalanceSheetEquityViewModel balanceSheetEquity,
			List<AccountBalanceDTO> accountBalances) {
		super();
		this.organizationId = organizationId;
		this.asOfDate = asOfDate;
		this.prevPeriodEndDate = prevPeriodEndDate;
		this.currPeriodStartDate = currPeriodStartDate;
		this.balanceSheetAssets = balanceSheetAssets;
		this.balanceSheetLiabilities = balanceSheetLiabilities;
		this.balanceSheetEquity = balanceSheetEquity;
		this.accountBalances = accountBalances;
	}

	public BalanceSheetViewModel() {
		
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public LocalDate getAsOfDate() {
		return asOfDate;
	}

	public void setAsOfDate(LocalDate asOfDate) {
		this.asOfDate = asOfDate;
	}

	public LocalDate getPrevPeriodEndDate() {
		return prevPeriodEndDate;
	}

	public void setPrevPeriodEndDate(LocalDate prevPeriodEndDate) {
		this.prevPeriodEndDate = prevPeriodEndDate;
	}

	public LocalDate getCurrPeriodStartDate() {
		return currPeriodStartDate;
	}

	public void setCurrPeriodStartDate(LocalDate currPeriodStartDate) {
		this.currPeriodStartDate = currPeriodStartDate;
	}

	public BalanceSheetAssetsViewModel getBalanceSheetAssets() {
		return balanceSheetAssets;
	}

	public void setBalanceSheetAssets(BalanceSheetAssetsViewModel balanceSheetAssets) {
		this.balanceSheetAssets = balanceSheetAssets;
	}

	public BalanceSheetLiabilitiesViewModel getBalanceSheetLiabilities() {
		return balanceSheetLiabilities;
	}

	public void setBalanceSheetLiabilities(BalanceSheetLiabilitiesViewModel balanceSheetLiabilities) {
		this.balanceSheetLiabilities = balanceSheetLiabilities;
	}

	public BalanceSheetEquityViewModel getBalanceSheetEquity() {
		return balanceSheetEquity;
	}

	public void setBalanceSheetEquity(BalanceSheetEquityViewModel balanceSheetEquity) {
		this.balanceSheetEquity = balanceSheetEquity;
	}

	public List<AccountBalanceDTO> getAccountBalances() {
		return accountBalances;
	}

	public void setAccountBalances(List<AccountBalanceDTO> accountBalances) {
		this.accountBalances = accountBalances;
	}

	@Override
	public String toString() {
		return "BalanceSheetViewModel [organizationId=" + organizationId + ", asOfDate=" + asOfDate
				+ ", prevPeriodEndDate=" + prevPeriodEndDate + ", currPeriodStartDate=" + currPeriodStartDate
				+ ", balanceSheetAssets=" + balanceSheetAssets + ", balanceSheetLiabilities=" + balanceSheetLiabilities
				+ ", balanceSheetEquity=" + balanceSheetEquity + ", accountBalances=" + accountBalances + "]";
	}

	
}