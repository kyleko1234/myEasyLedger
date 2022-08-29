package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.dto.AccountTransactionsReportLineItemDTO;

public class AccountTransactionsReportViewModel {
	private LocalDate startDate;
	private LocalDate endDate;
	private AccountDTO account;
	private BigDecimal beginningBalance;
	private List<AccountTransactionsReportLineItemDTO> lineItems;
	private BigDecimal endingBalance;
	private BigDecimal changeInBalance;
	
	public AccountTransactionsReportViewModel() {
		
	}

	public AccountTransactionsReportViewModel(LocalDate startDate, LocalDate endDate, AccountDTO account,
			BigDecimal beginningBalance, List<AccountTransactionsReportLineItemDTO> lineItems, BigDecimal endingBalance,
			BigDecimal changeInBalance) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.account = account;
		this.beginningBalance = beginningBalance;
		this.lineItems = lineItems;
		this.endingBalance = endingBalance;
		this.changeInBalance = changeInBalance;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public AccountDTO getAccount() {
		return account;
	}

	public void setAccount(AccountDTO account) {
		this.account = account;
	}

	public BigDecimal getBeginningBalance() {
		return beginningBalance;
	}

	public void setBeginningBalance(BigDecimal beginningBalance) {
		this.beginningBalance = beginningBalance;
	}

	public List<AccountTransactionsReportLineItemDTO> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<AccountTransactionsReportLineItemDTO> lineItems) {
		this.lineItems = lineItems;
	}

	public BigDecimal getEndingBalance() {
		return endingBalance;
	}

	public void setEndingBalance(BigDecimal endingBalance) {
		this.endingBalance = endingBalance;
	}

	public BigDecimal getChangeInBalance() {
		return changeInBalance;
	}

	public void setChangeInBalance(BigDecimal changeInBalance) {
		this.changeInBalance = changeInBalance;
	}
}
