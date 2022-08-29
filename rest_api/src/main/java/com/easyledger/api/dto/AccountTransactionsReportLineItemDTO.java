package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class AccountTransactionsReportLineItemDTO {
	private LocalDate journalEntryDate;
	private String journalEntryDescription;
	private String description;
	private Long accountId;
	private String accountName;
	private BigDecimal amount;
	private boolean isCredit;
	private BigDecimal currentDebitBalance = new BigDecimal(0);
	private BigDecimal currentCreditBalance = new BigDecimal(0);
	private BigDecimal currentDebitsMinusCredits = new BigDecimal(0);
	
	public AccountTransactionsReportLineItemDTO(LocalDate journalEntryDate, String journalEntryDescription,
			String description, Long accountId, String accountName, BigDecimal amount, boolean isCredit,
			BigDecimal currentDebitBalance, BigDecimal currentCreditBalance, BigDecimal currentDebitsMinusCredits) {
		this.journalEntryDate = journalEntryDate;
		this.journalEntryDescription = journalEntryDescription;
		this.description = description;
		this.accountId = accountId;
		this.accountName = accountName;
		this.amount = amount;
		this.isCredit = isCredit;
		this.currentDebitBalance = currentDebitBalance;
		this.currentCreditBalance = currentCreditBalance;
		this.currentDebitsMinusCredits = currentDebitsMinusCredits;
	}
	
	public AccountTransactionsReportLineItemDTO(LineItemDTO lineItem, BigDecimal currentDebitBalance, BigDecimal currentCreditBalance) {
		this.journalEntryDate = lineItem.getJournalEntryDate();
		this.journalEntryDescription = lineItem.getJournalEntryDescription();
		this.description = lineItem.getDescription();
		this.accountId = lineItem.getAccountId();
		this.accountName = lineItem.getAccountName();
		this.amount = lineItem.getAmount();
		this.isCredit = lineItem.isIsCredit();
		if (currentDebitBalance != null) {
			this.currentDebitBalance = currentDebitBalance;
		}
		if (currentCreditBalance != null) {
			this.currentCreditBalance = currentCreditBalance;
		}
		this.currentDebitsMinusCredits = this.currentDebitBalance.subtract(this.currentCreditBalance);
	}

	public LocalDate getJournalEntryDate() {
		return journalEntryDate;
	}

	public void setJournalEntryDate(LocalDate journalEntryDate) {
		this.journalEntryDate = journalEntryDate;
	}

	public String getJournalEntryDescription() {
		return journalEntryDescription;
	}

	public void setJournalEntryDescription(String journalEntryDescription) {
		this.journalEntryDescription = journalEntryDescription;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public boolean isIsCredit() {
		return isCredit;
	}

	public void setIsCredit(boolean isCredit) {
		this.isCredit = isCredit;
	}

	public BigDecimal getCurrentDebitBalance() {
		return currentDebitBalance;
	}

	public void setCurrentDebitBalance(BigDecimal currentDebitBalance) {
		this.currentDebitBalance = currentDebitBalance;
	}

	public BigDecimal getCurrentCreditBalance() {
		return currentCreditBalance;
	}

	public void setCurrentCreditBalance(BigDecimal currentCreditBalance) {
		this.currentCreditBalance = currentCreditBalance;
	}

	public BigDecimal getCurrentDebitsMinusCredits() {
		return currentDebitsMinusCredits;
	}

	public void setCurrentDebitsMinusCredits(BigDecimal currentDebitsMinusCredits) {
		this.currentDebitsMinusCredits = currentDebitsMinusCredits;
	}
	
	
}
