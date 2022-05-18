package com.easyledger.api.model;

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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "vendor")
public class Vendor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "vendor_name")
	private String vendorName;

	@Column(name = "contact_name")
	private String contactName;

	@Column(name = "email")
	private String email;

	@ManyToOne
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	@OneToMany(mappedBy = "vendor")
	@JsonIgnore
	private Set<JournalEntry> journalEntries = new HashSet<JournalEntry>();

	public Vendor(String vendorName, String contactName, String email, Organization organization) {
		super();
		this.vendorName = vendorName;
		this.contactName = contactName;
		this.email = email;
		this.organization = organization;
	}
	
	public Vendor() {
	}
	
	private static String reduceExcessStringSize(String string, int maxLength) {
		if (string.length() <= maxLength) {
			return string;
		} else {
			return string.substring(0, maxLength);
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = reduceExcessStringSize(vendorName, 64);
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = reduceExcessStringSize(contactName, 64);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = reduceExcessStringSize(email, 64);
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getVendors().add(this);
	}

	public Set<JournalEntry> getJournalEntries() {
		return journalEntries;
	}

	public void setJournalEntries(Set<JournalEntry> journalEntries) {
		this.journalEntries = journalEntries;
	}
	
}
