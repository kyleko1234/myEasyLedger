package com.easyledger.api.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "entry")
public class Entry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "entry_date")
	private LocalDate entryDate;
	
	@OneToMany(mappedBy = "entry", cascade = CascadeType.REMOVE, orphanRemoval = true)
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;
	
	@ManyToOne
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	public Entry() {
		this.lineItems = new HashSet<LineItem>();
	}

	public Entry(LocalDate entryDate) {
		this.entryDate = entryDate;
		this.lineItems = new HashSet<LineItem>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}

	public Set<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(Set<LineItem> lineItems) {
		this.lineItems = lineItems;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
		person.getEntries().add(this);
	}

	
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getEntries().add(this);
	}

	@Override
	public String toString() {
		return "Entry [id=" + id + ", entryDate=" + entryDate + ", lineItems=" + lineItems + ", person=" + person
				+ ", organization=" + organization + "]";
	}
	
	
	
}
