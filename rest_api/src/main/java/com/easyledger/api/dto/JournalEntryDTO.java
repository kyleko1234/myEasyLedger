package com.easyledger.api.dto;

import java.text.DateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.model.LineItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
//
public class JournalEntryDTO {

	private Long journalEntryId;
	private LocalDate journalEntryDate;
	private String description;
	private Long personId;
	private Long organizationId;
	private List<LineItemDTO> lineItems;

	
	public JournalEntryDTO (JournalEntry journalEntry) {
		
		this.journalEntryId = journalEntry.getId();
		this.journalEntryDate = journalEntry.getJournalEntryDate();
		this.description = journalEntry.getDescription();
		this.lineItems = new ArrayList<LineItemDTO>();
		this.personId = journalEntry.getPerson().getId();
		this.organizationId= journalEntry.getOrganization().getId();
		
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

	public void setEntryDate(LocalDate entryDate) {
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

	@Override
	public String toString() {
		return "JournalEntryDTO [journalEntryId=" + journalEntryId + ", journalEntryDate=" + journalEntryDate
				+ ", description=" + description + ", personId=" + personId + ", organizationId=" + organizationId
				+ ", lineItems=" + lineItems + "]";
	}


	
}


