package com.easyledger.api.dto;

import java.text.DateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.Iterator;
import java.util.Set;
import java.util.HashSet;

import com.easyledger.api.model.Entry;
import com.easyledger.api.model.LineItem;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
//
public class EntryDTO {

	private Long entryId;
	private LocalDate entryDate;
	private String description;
	private Long personId;
	private Long organizationId;
	private Set<LineItemDTO> lineItems;

	
	public EntryDTO (Entry entry) {
		
		this.entryId = entry.getId();
		this.entryDate = entry.getEntryDate();
		this.description = entry.getDescription();
		this.lineItems = new HashSet<LineItemDTO>();
		this.personId = entry.getPerson().getId();
		this.organizationId= entry.getOrganization().getId();
		
		/* Iterates over entry.getLineItems(), converting LineItems into LineItemDTOs and adding them to this.LineItemDTOs */
		Iterator<LineItem> lineItemIterator = entry.getLineItems().iterator();
		while (lineItemIterator.hasNext()) {
			LineItemDTO nextLineItemDTO = new LineItemDTO(lineItemIterator.next());
			this.lineItems.add(nextLineItemDTO);
		} 
	}
	
	public EntryDTO () {
		this.lineItems = new HashSet<LineItemDTO>();
	}

	/* Getters, Setters, ToString */
	
	public Long getEntryId() {
		return entryId;
	}

	public void setEntryId(Long id) {
		this.entryId = id;
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
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

	public Set<LineItemDTO> getLineItems() {
		return lineItems;
	}

	public void setLineItems(Set<LineItemDTO> lineItemDTOs) {
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
		return "EntryDTO [entryId=" + entryId + ", entryDate=" + entryDate + ", description=" + description
				+ ", personId=" + personId + ", organizationId=" + organizationId + ", lineItems=" + lineItems + "]";
	}


	
}


