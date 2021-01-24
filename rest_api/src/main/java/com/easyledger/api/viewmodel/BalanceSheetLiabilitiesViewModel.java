package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;

public class BalanceSheetLiabilitiesViewModel {
	static final ArrayList<Long> CURRENT_LIABILITIES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 10, (long) 11, (long) 12, (long) 13, (long) 14, (long) 15));
	static final ArrayList<Long> NON_CURRENT_LIABILITIES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 16, (long) 17));

	private BigDecimal totalCurrentLiabilities = new BigDecimal(0);
	private BigDecimal totalNonCurrentLiabilities = new BigDecimal(0);
	private BigDecimal totalLiabilities = new BigDecimal(0);
	
	private ArrayList<AccountSubtypeBalanceDTO> currentLiabilitiesSubtypeBalances = new ArrayList<AccountSubtypeBalanceDTO>();
	private ArrayList<AccountSubtypeBalanceDTO> nonCurrentLiabilitiesSubtypeBalances = new ArrayList<AccountSubtypeBalanceDTO>();

	
	public BalanceSheetLiabilitiesViewModel(List<AccountSubtypeBalanceDTO> subtypeBalances) {
		for (AccountSubtypeBalanceDTO subtype : subtypeBalances) {
			if (CURRENT_LIABILITIES_SUBTYPE_IDS.contains(subtype.getAccountSubtypeId())) {
				totalCurrentLiabilities = totalCurrentLiabilities.subtract(subtype.getDebitsMinusCredits()); //use BigDecimal.subtract because liabilities are increased by credits and decreased by debits; i.e. total liabilities balance = debitsMinusCredits * -1
				totalLiabilities = totalLiabilities.subtract(subtype.getDebitsMinusCredits());
				currentLiabilitiesSubtypeBalances.add(subtype);
			} else if (NON_CURRENT_LIABILITIES_SUBTYPE_IDS.contains(subtype.getAccountSubtypeId())) {
				totalNonCurrentLiabilities = totalNonCurrentLiabilities.subtract(subtype.getDebitsMinusCredits());
				totalLiabilities = totalLiabilities.subtract(subtype.getDebitsMinusCredits());
				nonCurrentLiabilitiesSubtypeBalances.add(subtype);
			}
		}
	}


	public static ArrayList<Long> getCurrentLiabilitiesSubtypeIds() {
		return CURRENT_LIABILITIES_SUBTYPE_IDS;
	}


	public static ArrayList<Long> getNonCurrentLiabilitiesSubtypeIds() {
		return NON_CURRENT_LIABILITIES_SUBTYPE_IDS;
	}


	public BigDecimal getTotalCurrentLiabilities() {
		return totalCurrentLiabilities;
	}


	public BigDecimal getTotalNonCurrentLiabilities() {
		return totalNonCurrentLiabilities;
	}


	public BigDecimal getTotalLiabilities() {
		return totalLiabilities;
	}


	public ArrayList<AccountSubtypeBalanceDTO> getCurrentLiabilitiesSubtypeBalances() {
		return currentLiabilitiesSubtypeBalances;
	}


	public ArrayList<AccountSubtypeBalanceDTO> getNonCurrentLiabilitiesSubtypeBalances() {
		return nonCurrentLiabilitiesSubtypeBalances;
	}


	@Override
	public String toString() {
		return "BalanceSheetLiabilitiesViewModel [totalCurrentLiabilities=" + totalCurrentLiabilities
				+ ", totalNonCurrentLiabilities=" + totalNonCurrentLiabilities + ", totalLiabilities="
				+ totalLiabilities + ", currentLiabilitiesSubtypeBalances=" + currentLiabilitiesSubtypeBalances
				+ ", nonCurrentLiabilitiesSubtypeBalances=" + nonCurrentLiabilitiesSubtypeBalances + "]";
	}


	
	

}
