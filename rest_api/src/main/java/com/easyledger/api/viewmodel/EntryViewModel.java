package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

public class EntryViewModel {
	
	private Integer entryId;
	private Date entryDate;
	private String description;
	private BigDecimal debitAmount;
	private BigDecimal creditAmount;
	
	public EntryViewModel(Integer entryId, Date entryDate, String description, BigDecimal debitAmount,
			BigDecimal creditAmount) {
		this.entryId = entryId;
		this.entryDate = entryDate;
		this.description = description;
		this.debitAmount = debitAmount;
		this.creditAmount = creditAmount;
	}
	
	public EntryViewModel() {
		
	}

	public Integer getEntryId() {
		return entryId;
	}

	public void setEntryId(Integer entryId) {
		this.entryId = entryId;
	}

	public Date getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getDebitAmount() {
		return debitAmount;
	}

	public void setDebitAmount(BigDecimal debitAmount) {
		this.debitAmount = debitAmount;
	}

	public BigDecimal getCreditAmount() {
		return creditAmount;
	}

	public void setCreditAmount(BigDecimal creditAmount) {
		this.creditAmount = creditAmount;
	}

	@Override
	public String toString() {
		return "EntryViewModel [entryId=" + entryId + ", entryDate=" + entryDate + ", description=" + description
				+ ", debitAmount=" + debitAmount + ", creditAmount=" + creditAmount + "]";
	}
	
	
}
