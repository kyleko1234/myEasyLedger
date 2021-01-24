package com.easyledger.api.viewmodel;

import java.time.LocalDate;
import java.util.List;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountGroupBalanceDTO;

public class BalanceSheetViewModel {
	private Long organizationId;
	private LocalDate asOfDate;
	private BalanceSheetAssetsViewModel balanceSheetAssets;
	private BalanceSheetLiabilitiesViewModel balanceSheetLiabilities;
	private BalanceSheetEquityViewModel balanceSheetEquity;
	private List<AccountGroupBalanceDTO> accountGroupBalances;
	private List<AccountBalanceDTO> accountBalances;
	
	public BalanceSheetViewModel(Long organizationId, LocalDate asOfDate,
			BalanceSheetAssetsViewModel balanceSheetAssets, BalanceSheetLiabilitiesViewModel balanceSheetLiabilities,
			BalanceSheetEquityViewModel balanceSheetEquity, List<AccountGroupBalanceDTO> accountGroupBalances,
			List<AccountBalanceDTO> accountBalances) {
		super();
		this.organizationId = organizationId;
		this.asOfDate = asOfDate;
		this.balanceSheetAssets = balanceSheetAssets;
		this.balanceSheetLiabilities = balanceSheetLiabilities;
		this.balanceSheetEquity = balanceSheetEquity;
		this.accountGroupBalances = accountGroupBalances;
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

	public List<AccountGroupBalanceDTO> getAccountGroupBalances() {
		return accountGroupBalances;
	}

	public void setAccountGroupBalances(List<AccountGroupBalanceDTO> accountGroupBalances) {
		this.accountGroupBalances = accountGroupBalances;
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
				+ ", balanceSheetAssets=" + balanceSheetAssets + ", balanceSheetLiabilities=" + balanceSheetLiabilities
				+ ", balanceSheetEquity=" + balanceSheetEquity + ", accountGroupBalances=" + accountGroupBalances
				+ ", accountBalances=" + accountBalances + "]";
	}


	
	
	
}