package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;

public class BalanceSheetEquityViewModel {
	static final ArrayList<Long> EQUITY_ITEMS_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 19, (long) 20, (long) 22));
	static final ArrayList<Long> DIVIDENDS_AND_EQUIVALENTS_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 21));
	static final ArrayList<Long> INCOME_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 23, (long) 24, (long) 25, (long) 26));
	static final ArrayList<Long> EXPENSES_SUBTYPE_IDS = new ArrayList<>(Arrays.asList((long) 27, (long) 28, (long) 29, (long) 30, (long) 31, (long) 32, (long) 33, (long) 34));

	private BigDecimal totalEquityItems = new BigDecimal(0);
	private BigDecimal prevPeriodRetainedEarnings = new BigDecimal(0);
	private BigDecimal currPeriodNetIncome = new BigDecimal(0);
	private BigDecimal currPeriodDividendsAndEquivalents = new BigDecimal(0); //since dividends are usually recorded as debits, this is likely to be a negative number, and should be ADDED to net income to derive retained earnings.
	private BigDecimal totalRetainedEarnings = new BigDecimal(0);
	private BigDecimal totalEquity = new BigDecimal(0);
	
	private ArrayList<AccountSubtypeBalanceDTO> equityItemsSubtypeBalances = new ArrayList<AccountSubtypeBalanceDTO>();

	
	public BalanceSheetEquityViewModel(List<AccountSubtypeBalanceDTO> prevPeriodSubtypeBalances, 
			List<AccountSubtypeBalanceDTO> currPeriodSubtypeBalances, List<AccountSubtypeBalanceDTO> totalSubtypeBalances) {
		for (AccountSubtypeBalanceDTO subtypeBalance : totalSubtypeBalances) {
			if (EQUITY_ITEMS_SUBTYPE_IDS.contains(subtypeBalance.getAccountSubtypeId())) {
				equityItemsSubtypeBalances.add(subtypeBalance);
				totalEquityItems = totalEquityItems.subtract(subtypeBalance.getDebitsMinusCredits()); //use BigDecimal.subtract since equity is increased by credits and decreased by debits; i.e. equity amount = debitsMinusCredits * -1
			}
		}
		for (AccountSubtypeBalanceDTO subtypeBalance : prevPeriodSubtypeBalances) {
			if (DIVIDENDS_AND_EQUIVALENTS_SUBTYPE_IDS.contains(subtypeBalance.getAccountSubtypeId())) {
				prevPeriodRetainedEarnings = prevPeriodRetainedEarnings.subtract(subtypeBalance.getDebitsMinusCredits());
			} else if (INCOME_SUBTYPE_IDS.contains(subtypeBalance.getAccountSubtypeId())) {
				prevPeriodRetainedEarnings = prevPeriodRetainedEarnings.subtract(subtypeBalance.getDebitsMinusCredits());
			} else if (EXPENSES_SUBTYPE_IDS.contains(subtypeBalance.getAccountSubtypeId())) {
				prevPeriodRetainedEarnings = prevPeriodRetainedEarnings.subtract(subtypeBalance.getDebitsMinusCredits());
			}
		}
		for (AccountSubtypeBalanceDTO subtypeBalance : currPeriodSubtypeBalances) {
			if (DIVIDENDS_AND_EQUIVALENTS_SUBTYPE_IDS.contains(subtypeBalance.getAccountSubtypeId())) {
				currPeriodDividendsAndEquivalents = currPeriodDividendsAndEquivalents.subtract(subtypeBalance.getDebitsMinusCredits());
			} else if (INCOME_SUBTYPE_IDS.contains(subtypeBalance.getAccountSubtypeId()) || EXPENSES_SUBTYPE_IDS.contains(subtypeBalance.getAccountSubtypeId())) {
				currPeriodNetIncome = currPeriodNetIncome.subtract(subtypeBalance.getDebitsMinusCredits());
			}
		}
		totalRetainedEarnings = prevPeriodRetainedEarnings.add(currPeriodNetIncome.add(currPeriodDividendsAndEquivalents));
		totalEquity = totalEquityItems.add(totalRetainedEarnings);
	}


	public ArrayList<Long> getEquityItemsSubtypeIds() {
		return EQUITY_ITEMS_SUBTYPE_IDS;
	}


	public ArrayList<Long> getDividendsAndEquivalentsSubtypeIds() {
		return DIVIDENDS_AND_EQUIVALENTS_SUBTYPE_IDS;
	}


	public ArrayList<Long> getIncomeSubtypeIds() {
		return INCOME_SUBTYPE_IDS;
	}


	public ArrayList<Long> getExpensesSubtypeIds() {
		return EXPENSES_SUBTYPE_IDS;
	}


	public BigDecimal getTotalEquityItems() {
		return totalEquityItems;
	}


	public BigDecimal getPrevPeriodRetainedEarnings() {
		return prevPeriodRetainedEarnings;
	}


	public BigDecimal getCurrPeriodNetIncome() {
		return currPeriodNetIncome;
	}


	public BigDecimal getCurrPeriodDividendsAndEquivalents() {
		return currPeriodDividendsAndEquivalents;
	}


	public BigDecimal getTotalRetainedEarnings() {
		return totalRetainedEarnings;
	}


	public BigDecimal getTotalEquity() {
		return totalEquity;
	}


	public ArrayList<AccountSubtypeBalanceDTO> getEquityItemsSubtypeBalances() {
		return equityItemsSubtypeBalances;
	}


	@Override
	public String toString() {
		return "BalanceSheetEquityViewModel [totalEquityItems=" + totalEquityItems + ", prevPeriodRetainedEarnings="
				+ prevPeriodRetainedEarnings + ", currPeriodNetIncome=" + currPeriodNetIncome
				+ ", currPeriodDividendsAndEquivalents=" + currPeriodDividendsAndEquivalents
				+ ", totalRetainedEarnings=" + totalRetainedEarnings + ", totalEquity=" + totalEquity
				+ ", equityItemsSubtypeBalances=" + equityItemsSubtypeBalances + "]";
	}
	
	
}
