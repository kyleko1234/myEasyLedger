package com.easyledger.api.dto;

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
	private List<LineItemDTO> lineItems;
	private boolean deleted;
	

	
	public JournalEntryDTO (JournalEntry journalEntry) {
		
		this.journalEntryId = journalEntry.getId();
		this.journalEntryDate = journalEntry.getJournalEntryDate();
		this.description = journalEntry.getDescription();
		this.lineItems = new ArrayList<LineItemDTO>();
		this.personId = journalEntry.getPerson().getId();
		this.organizationId = journalEntry.getOrganization().getId();
		this.vendorId = journalEntry.getVendor().getId();
		this.deleted = journalEntry.isDeleted();
		
		/* Iterates over entry.getLineItems(), converting LineItems into LineItemDTOs and adding them to this.LineItemDTOs */
		Iterator<LineItem> lineItemIterator = journalEntry.getLineItems().iterator();
		while (lineItemIterator.hasNext()) {
			LineItemDTO nextLineItemDTO = new LineItemDTO(lineItemIterator.next());
			this.lineItems.add(nextLineItemDTO);
		} 
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


