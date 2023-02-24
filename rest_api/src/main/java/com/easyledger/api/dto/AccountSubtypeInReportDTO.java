package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AccountSubtypeInReportDTO {
	private Long accountSubtypeId;
	private String accountSubtypeName;
	private List<AccountInReportDTO> accounts = new ArrayList<AccountInReportDTO>();
	private List<BigDecimal> totalDebitsMinusCredits = new ArrayList<BigDecimal>();
	
	public AccountSubtypeInReportDTO(Long accountSubtypeId, String accountSubtypeName) {
		super();
		this.accountSubtypeId = accountSubtypeId;
		this.accountSubtypeName = accountSubtypeName;
	}

	public static List<BigDecimal> sumSubtypes(Collection<AccountSubtypeInReportDTO> subtypes) {
		List<List<BigDecimal>> listOfSubtypeSums = new ArrayList<List<BigDecimal>>();
		for (AccountSubtypeInReportDTO subtype : subtypes) {
			listOfSubtypeSums.add(AccountInReportDTO.sumAmountsOfAccounts(subtype.getAccounts()));
		}
		List<BigDecimal> returnedList = new ArrayList<BigDecimal>();
		for (List<BigDecimal> list : listOfSubtypeSums) {
			while (returnedList.size() < list.size()) {
				returnedList.add(new BigDecimal(0));
			}
			for (int i = 0; i < list.size(); i++) {
				BigDecimal newSum = returnedList.get(i).add(list.get(i));
				returnedList.set(i, newSum);
			}
		}
		return returnedList;
	}
	
	public Long getAccountSubtypeId() {
		return accountSubtypeId;
	}

	public void setAccountSubtypeId(Long accountSubtypeId) {
		this.accountSubtypeId = accountSubtypeId;
	}

	public String getAccountSubtypeName() {
		return accountSubtypeName;
	}

	public void setAccountSubtypeName(String accountSubtypeName) {
		this.accountSubtypeName = accountSubtypeName;
	}

	public List<AccountInReportDTO> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<AccountInReportDTO> accounts) {
		this.accounts = accounts;
	}

	public List<BigDecimal> getTotalDebitsMinusCredits() {
		return totalDebitsMinusCredits;
	}

	public void setTotalDebitsMinusCredits(List<BigDecimal> totalDebitsMinusCredits) {
		this.totalDebitsMinusCredits = totalDebitsMinusCredits;
	}
	
}
