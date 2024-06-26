package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;


public class JournalEntryDTO {

	private Long journalEntryId;
	private LocalDate journalEntryDate;
	private String description;
	private Long personId;
	private Long organizationId;
	private Long vendorId;
	private Long customerId;
	private List<LineItemDTO> lineItems;
	private boolean deleted;
	

	
	public JournalEntryDTO (JournalEntry journalEntry) {
		
		this.journalEntryId = journalEntry.getId();
		this.journalEntryDate = journalEntry.getJournalEntryDate();
		this.description = journalEntry.getDescription();
		this.lineItems = new ArrayList<LineItemDTO>();
		this.personId = journalEntry.getPerson().getId();
		this.organizationId = journalEntry.getOrganization().getId();
		
		if (journalEntry.getVendor() != null) {
			this.vendorId = journalEntry.getVendor().getId();
		}
		if (journalEntry.getCustomer() != null) {
			this.customerId = journalEntry.getCustomer().getId();
		}

		this.deleted = journalEntry.isDeleted();
		
		/* Iterates over entry.getLineItems(), converting LineItems into LineItemDTOs and adding them to this.LineItemDTOs */
		Iterator<LineItem> lineItemIterator = journalEntry.getLineItems().iterator();
		while (lineItemIterator.hasNext()) {
			LineItemDTO nextLineItemDTO = new LineItemDTO(lineItemIterator.next());
			this.lineItems.add(nextLineItemDTO);
		} 
	}
	
	public JournalEntryDTO(TransactionDTO transaction) {
		this.journalEntryId = transaction.getJournalEntryId();
		this.journalEntryDate = transaction.getJournalEntryDate();
		this.description = transaction.getDescription();
		this.personId = transaction.getPersonId();
		this.organizationId = transaction.getOrganizationId();
		this.lineItems = new ArrayList<LineItemDTO>();
		BigDecimal debitTotal = new BigDecimal(0);
		BigDecimal creditTotal = new BigDecimal(0);
		for (TransactionLineItemDTO transactionLineItem : transaction.getLineItems()) {
			LineItemDTO formattedLineItem = new LineItemDTO(transactionLineItem);
			this.lineItems.add(formattedLineItem);
			if (formattedLineItem.getAmount() != null) {
				if (formattedLineItem.isIsCredit()) {
					creditTotal = creditTotal.add(formattedLineItem.getAmount());
				} else {
					debitTotal = debitTotal.add(formattedLineItem.getAmount());
				}
			}
		}
		LineItemDTO balancerLineItem = new LineItemDTO();
		balancerLineItem.setAccountId(transaction.getFromAccountId());
		balancerLineItem.setDescription(transaction.getDescription());
		if (debitTotal.compareTo(creditTotal) >= 0) {
			balancerLineItem.setIsCredit(true);
			balancerLineItem.setAmount(debitTotal.subtract(creditTotal));
		} else {
			balancerLineItem.setIsCredit(false);
			balancerLineItem.setAmount(creditTotal.subtract(debitTotal));
		}
		this.lineItems.add(0, balancerLineItem);
	}
	
	public JournalEntryDTO () {
		this.lineItems = new ArrayList<LineItemDTO>();
	}

	/* Getters, Setters, ToString */
	
	public Long getJournalEntryId() {
		return journalEntryId;
	}

	public void setJournalEntryId(Long id) {
		this.journalEntryId = id;
	}

	public LocalDate getJournalEntryDate() {
		return journalEntryDate;
	}

	public void setJournalEntryDate(LocalDate entryDate) {
		this.journalEntryDate = entryDate;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
	}

	public List<LineItemDTO> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<LineItemDTO> lineItemDTOs) {
		this.lineItems = lineItemDTOs;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public Long getVendorId() {
		return vendorId;
	}

	public void setVendorId(Long vendorId) {
		this.vendorId = vendorId;
	}
	
	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}


	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "JournalEntryDTO [journalEntryId=" + journalEntryId + ", journalEntryDate=" + journalEntryDate
				+ ", description=" + description + ", personId=" + personId + ", organizationId=" + organizationId
				+ ", lineItems=" + lineItems + ", deleted=" + deleted + "]";
	}
	
}


