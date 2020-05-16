package com.easyledger.api;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
//
public class EntryDTO {

	private Long entryId;
	private Date entryDate;
	private Long personId;
	private Set<LineItemDTO> lineItem;

	
	public EntryDTO (Entry entry) {
		
		this.entryId = entry.getId();
		this.entryDate = entry.getEntryDate();
		this.lineItem = new HashSet<LineItemDTO>();
		this.personId = entry.getPerson().getId();
		
		/* Iterates over entry.getLineItems(), converting LineItems into LineItemDTOs and adding them to this.LineItemDTOs */
		Iterator<LineItem> lineItemIterator = entry.getLineItems().iterator();
		while (lineItemIterator.hasNext()) {
			LineItemDTO nextLineItemDTO = new LineItemDTO(lineItemIterator.next());
			this.lineItem.add(nextLineItemDTO);
		}
	}

	/* Getters, Setters, ToString */
	
	public Long getEntryId() {
		return entryId;
	}

	public void setEntryId(Long id) {
		this.entryId = id;
	}

	public Date getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	
	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
	}

	public Set<LineItemDTO> getLineItem() {
		return lineItem;
	}

	public void setLineItem(Set<LineItemDTO> lineItemDTOs) {
		this.lineItem = lineItemDTOs;
	}


	@Override
	public String toString() {
		return "EntryDTO [entryId=" + entryId + ", entryDate=" + entryDate + ", lineItem=" + lineItem + ", personId="
				+ personId + "]";
	}


	
}


