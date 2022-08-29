package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountTransactionsReportLineItemDTO;

public class AccountTransactionsReportViewModel {
	private LocalDate startDate;
	private LocalDate endDate;
	private AccountBalanceDTO account;
	private BigDecimal initialDebitValue;
	private BigDecimal initialCreditValue;
	private BigDecimal initialDebitsMinusCredits;
	private List<AccountTransactionsReportLineItemDTO> lineItems;
	private BigDecimal endingDebitValue;
	private BigDecimal endingCreditValue;
	private BigDecimal endingDebitsMinusCredits;
	private BigDecimal changeInDebitValue;
	private BigDecimal changeInCreditValue;
	private BigDecimal changeInDebitsMinusCredits;

	public AccountTransactionsReportViewModel(LocalDate startDate, LocalDate endDate, AccountBalanceDTO account,
			BigDecimal initialDebitValue, BigDecimal initialCreditValue,
			List<AccountTransactionsReportLineItemDTO> lineItems, BigDecimal endingDebitValue,
			BigDecimal endingCreditValue) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.account = account;
		this.initialDebitValue = initialDebitValue;
		this.initialCreditValue = initialCreditValue;
		this.initialDebitsMinusCredits = this.initialDebitValue.subtract(this.initialCreditValue);
		this.lineItems = lineItems;
		this.endingDebitValue = endingDebitValue;
		this.endingCreditValue = endingCreditValue;
		this.endingDebitsMinusCredits = this.endingDebitValue.subtract(this.endingCreditValue);
		this.changeInDebitValue = this.endingDebitValue.subtract(this.initialDebitValue);
		this.changeInCreditValue = this.endingCreditValue.subtract(this.initialCreditValue);
		this.changeInDebitsMinusCredits = this.endingDebitsMinusCredits.subtract(this.initialDebitsMinusCredits);
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

	public AccountBalanceDTO getAccount() {
		return account;
	}

	public void setAccount(AccountBalanceDTO account) {
		this.account = account;
	}

	public BigDecimal getInitialDebitValue() {
		return initialDebitValue;
	}

	public void setInitialDebitValue(BigDecimal initialDebitValue) {
		this.initialDebitValue = initialDebitValue;
	}

	public BigDecimal getInitialCreditValue() {
		return initialCreditValue;
	}

	public void setInitialCreditValue(BigDecimal initialCreditValue) {
		this.initialCreditValue = initialCreditValue;
	}

	public BigDecimal getInitialDebitsMinusCredits() {
		return initialDebitsMinusCredits;
	}

	public void setInitialDebitsMinusCredits(BigDecimal initialDebitsMinusCredits) {
		this.initialDebitsMinusCredits = initialDebitsMinusCredits;
	}

	public List<AccountTransactionsReportLineItemDTO> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<AccountTransactionsReportLineItemDTO> lineItems) {
		this.lineItems = lineItems;
	}

	public BigDecimal getEndingDebitValue() {
		return endingDebitValue;
	}

	public void setEndingDebitValue(BigDecimal endingDebitValue) {
		this.endingDebitValue = endingDebitValue;
	}

	public BigDecimal getEndingCreditValue() {
		return endingCreditValue;
	}

	public void setEndingCreditValue(BigDecimal endingCreditValue) {
		this.endingCreditValue = endingCreditValue;
	}

	public BigDecimal getEndingDebitsMinusCredits() {
		return endingDebitsMinusCredits;
	}

	public void setEndingDebitsMinusCredits(BigDecimal endingDebitsMinusCredits) {
		this.endingDebitsMinusCredits = endingDebitsMinusCredits;
	}

	public BigDecimal getChangeInDebitValue() {
		return changeInDebitValue;
	}

	public void setChangeInDebitValue(BigDecimal changeInDebitValue) {
		this.changeInDebitValue = changeInDebitValue;
	}

	public BigDecimal getChangeInCreditValue() {
		return changeInCreditValue;
	}

	public void setChangeInCreditValue(BigDecimal changeInCreditValue) {
		this.changeInCreditValue = changeInCreditValue;
	}

	public BigDecimal getChangeInDebitsMinusCredits() {
		return changeInDebitsMinusCredits;
	}

	public void setChangeInDebitsMinusCredits(BigDecimal changeInDebitsMinusCredits) {
		this.changeInDebitsMinusCredits = changeInDebitsMinusCredits;
	}
}

