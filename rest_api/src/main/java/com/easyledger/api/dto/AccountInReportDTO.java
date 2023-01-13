package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AccountInReportDTO {
	private Long accountId;
	private String accountName;
	private List<BigDecimal> amounts = new ArrayList<BigDecimal>();
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private Long parentAccountId;
	private String parentAccountName;
	private boolean hasChildren;
	private List<AccountInReportDTO> children = new ArrayList<AccountInReportDTO>();
	
	public AccountInReportDTO() {
		
	}
	
	/*
	 * Takes a collection of AccountInReportDTOs.
	 * Returns a list of the sums of amounts. 
	 * For example, take accounts A and B with amounts {a1, a2} and {b1, b2} respectively.
	 * sumAmountsOfAccounts({A, B}) will return {a1 + b1, a2 + b2}.
	 * Accounts A and B with amounts {a1} and {b1, b2}, respectively:
	 * sumAmountsOfAccounts({A, B}) will return {a1 + b1, b2}.
	 * */
	public static List<BigDecimal> sumAmountsOfAccounts(Collection<AccountInReportDTO> accounts) {
		List<BigDecimal> summedAmounts = new ArrayList<BigDecimal>();
			
		for (AccountInReportDTO account : accounts) {
			while (summedAmounts.size() < account.amounts.size()) {
				summedAmounts.add(new BigDecimal(0));
			}
			for (int i = 0; i < account.amounts.size(); i++) {
				BigDecimal newSum = summedAmounts.get(i).add(account.amounts.get(i));
				summedAmounts.set(i, newSum);
			}
		}
		return summedAmounts;
	}
	
	
}
