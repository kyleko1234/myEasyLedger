package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;

public class BalanceSheetAssetsViewModel {
	static final ArrayList<Long> CURRENT_ASSETS_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 1, (long) 2, (long) 3, (long) 4, (long) 5));
	static final ArrayList<Long> NON_CURRENT_ASSETS_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 6, (long) 7, (long) 8, (long) 9));

	private BigDecimal totalCurrentAssets = new BigDecimal(0);
	private BigDecimal totalNonCurrentAssets = new BigDecimal(0);
	private BigDecimal totalAssets = new BigDecimal(0);
	
	private ArrayList<AccountSubtypeBalanceDTO> currentAssetsSubtypeBalances = new ArrayList<AccountSubtypeBalanceDTO>();
	private ArrayList<AccountSubtypeBalanceDTO> nonCurrentAssetsSubtypeBalances = new ArrayList<AccountSubtypeBalanceDTO>();

	
	public BalanceSheetAssetsViewModel(List<AccountSubtypeBalanceDTO> subtypeBalances) {
		for (AccountSubtypeBalanceDTO subtype : subtypeBalances) {
			if (CURRENT_ASSETS_SUBTYPE_IDS.contains(subtype.getAccountSubtypeId())) {
				totalCurrentAssets = totalCurrentAssets.add(subtype.getDebitsMinusCredits());
				totalAssets = totalAssets.add(subtype.getDebitsMinusCredits());
				currentAssetsSubtypeBalances.add(subtype);
			} else if (NON_CURRENT_ASSETS_SUBTYPE_IDS.contains(subtype.getAccountSubtypeId())) {
				totalNonCurrentAssets = totalNonCurrentAssets.add(subtype.getDebitsMinusCredits());
				totalAssets = totalAssets.add(subtype.getDebitsMinusCredits());
				nonCurrentAssetsSubtypeBalances.add(subtype);
			}
		}
	}


	public ArrayList<Long> getCurrentAssetsSubtypeIds() {
		return CURRENT_ASSETS_SUBTYPE_IDS;
	}


	public ArrayList<Long> getNonCurrentAssetsSubtypeIds() {
		return NON_CURRENT_ASSETS_SUBTYPE_IDS;
	}


	public BigDecimal getTotalCurrentAssets() {
		return totalCurrentAssets;
	}


	public BigDecimal getTotalNonCurrentAssets() {
		return totalNonCurrentAssets;
	}


	public BigDecimal getTotalAssets() {
		return totalAssets;
	}


	public ArrayList<AccountSubtypeBalanceDTO> getCurrentAssetsSubtypeBalances() {
		return currentAssetsSubtypeBalances;
	}


	public ArrayList<AccountSubtypeBalanceDTO> getNonCurrentAssetsSubtypeBalances() {
		return nonCurrentAssetsSubtypeBalances;
	}


	@Override
	public String toString() {
		return "BalanceSheetAssetsViewModel [totalCurrentAssets=" + totalCurrentAssets + ", totalNonCurrentAssets="
				+ totalNonCurrentAssets + ", totalAssets=" + totalAssets + ", currentAssetsSubtypeBalances="
				+ currentAssetsSubtypeBalances + ", nonCurrentAssetsSubtypeBalances=" + nonCurrentAssetsSubtypeBalances
				+ "]";
	}



}