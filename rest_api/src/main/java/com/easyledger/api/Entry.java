package com.easyledger.api;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "entry")
public class Entry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "entry_date")
	private Date entryDate;
	
	@OneToMany(mappedBy = "entry")
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	public Entry() {
	}

	public Entry(Date entryDate) {
		this.entryDate = entryDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}

	public Set<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(Set<LineItem> lineItems) {
		this.lineItems = lineItems;
	}

	@Override
	public String toString() {
		return "Entry [id=" + id + ", entryDate=" + entryDate + ", lineItems=" + lineItems + "]";
	}
	
	
	
}
