package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TransactionDTO {
	private Long journalEntryId;
	private LocalDate journalEntryDate;
	private Long organizationId;
	private Long personId;
	private String description;
	private Long fromAccountId;
	private String fromAccountName;
	private List<TransactionLineItemDTO> lineItems = new ArrayList<TransactionLineItemDTO>();
	private BigDecimal total;
	private Long balancerLineItemId;

	public TransactionDTO() {

	}
	public TransactionDTO(JournalEntryDTO journalEntry) {
		this.journalEntryId = journalEntry.getJournalEntryId();
		this.journalEntryDate = journalEntry.getJournalEntryDate();
		this.organizationId = journalEntry.getOrganizationId();
		this.personId = journalEntry.getPersonId();
		this.description = journalEntry.getDescription();
		Collections.sort(journalEntry.getLineItems());
		LineItemDTO firstLineItem = journalEntry.getLineItems().remove(0);
		this.fromAccountId = firstLineItem.getAccountId();
		this.fromAccountName = firstLineItem.getAccountName();
		this.balancerLineItemId = firstLineItem.getLineItemId();
		if (firstLineItem.isIsCredit()) {
			this.total = firstLineItem.getAmount().negate();
		} else {
			this.total = firstLineItem.getAmount();
		}
		for (LineItemDTO lineItem : journalEntry.getLineItems()) {
			this.lineItems.add(new TransactionLineItemDTO(lineItem));
		}
	}
	public Long getJournalEntryId() {
		return journalEntryId;
	}
	public void setJournalEntryId(Long journalEntryId) {
		this.journalEntryId = journalEntryId;
	}
	public LocalDate getJournalEntryDate() {
		return journalEntryDate;
	}
	public void setJournalEntryDate(LocalDate journalEntryDate) {
		this.journalEntryDate = journalEntryDate;
	}
	public Long getOrganizationId() {
		return organizationId;
	}
	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}
	public Long getPersonId() {
		return personId;
	}
	public void setPersonId(Long personId) {
		this.personId = personId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getFromAccountId() {
		return fromAccountId;
	}
	public void setFromAccountId(Long fromAccountId) {
		this.fromAccountId = fromAccountId;
	}
	public String getFromAccountName() {
		return fromAccountName;
	}
	public void setFromAccountName(String fromAccountName) {
		this.fromAccountName = fromAccountName;
	}
	public List<TransactionLineItemDTO> getLineItems() {
		return lineItems;
	}
	public void setLineItems(List<TransactionLineItemDTO> lineItems) {
		this.lineItems = lineItems;
	}
	public BigDecimal getTotal() {
		return total;
	}
	public void setTotal(BigDecimal total) {
		this.total = total;
	}
	public Long getBalancerLineItemId() {
		return balancerLineItemId;
	}
	public void setBalancerLineItemId(Long balancerLineItemId) {
		this.balancerLineItemId = balancerLineItemId;
	}
	
	
}
