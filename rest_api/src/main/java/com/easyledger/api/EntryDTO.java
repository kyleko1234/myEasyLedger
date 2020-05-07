package com.easyledger.api;

import java.util.Date;
import java.util.Iterator;
import java.util.Set;
import java.util.HashSet;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EntryDTO {

	private Long id;
	private Date entryDate;
	private Set<LineItemDTO> lineItemDTOs;

	@JsonIgnore
	private Entry entry;
	
	public EntryDTO (Entry entry) {
		this.entry = entry;
		
		this.id = this.entry.getId();
		this.entryDate = this.entry.getEntryDate();
		this.lineItemDTOs = new HashSet<LineItemDTO>();
		
		/* Iterates over entry.getLineItems(), converting LineItems into LineItemDTOs and adding them to this.LineItemDTOs */
		Iterator<LineItem> lineItemIterator = entry.getLineItems().iterator();
		while (lineItemIterator.hasNext()) {
			LineItemDTO nextLineItemDTO = new LineItemDTO(lineItemIterator.next());
			this.lineItemDTOs.add(nextLineItemDTO);
		}
	}

	@JsonProperty(value = "entry_id")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@JsonIgnore
	public Date getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}

	@JsonProperty(value = "line_item")
	public Set<LineItemDTO> getLineItemDTOs() {
		return lineItemDTOs;
	}

	public void setLineItemDTOs(Set<LineItemDTO> lineItemDTOs) {
		this.lineItemDTOs = lineItemDTOs;
	}

	public Entry getEntry() {
		return entry;
	}

	public void setEntry(Entry entry) {
		this.entry = entry;
	}

	@Override
	public String toString() {
		return "EntryDTO [id=" + id + ", entryDate=" + entryDate + ", lineItemDTOs=" + lineItemDTOs + ", entry=" + entry
				+ "]";
	}
	
	
}


