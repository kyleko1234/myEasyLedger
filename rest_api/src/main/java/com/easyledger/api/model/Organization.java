package com.easyledger.api.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
@Table(name = "organization")
public class Organization {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "currency")
	private String currency;
	
	@Column(name = "is_enterprise")
	private boolean isEnterprise;

	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private Set<Permission> permissions = new HashSet<Permission>();

	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private Set<JournalEntry> journalEntries = new HashSet<JournalEntry>();
	
	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private Set<Account> accounts = new HashSet<Account>();
	
	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private List<JournalEntryLog> journalEntryLogs = new ArrayList<JournalEntryLog>();
	
	public Organization(String name, String currency, boolean isEnterprise) {
		this.name = name;
		this.currency = currency;
		this.isEnterprise = isEnterprise;
	}
	
	public Organization() {
	}
	
	
	//Getters, Setters, toString
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public boolean isIsEnterprise() {
		return isEnterprise;
	}

	public void setIsEnterprise(boolean isEnterprise) {
		this.isEnterprise = isEnterprise;
	}

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}
	

	public Set<JournalEntry> getJournalEntries() {
		return journalEntries;
	}

	public void setJournalEntries(Set<JournalEntry> journalEntries) {
		this.journalEntries = journalEntries;
	}

	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	public List<JournalEntryLog> getJournalEntryLogs() {
		return journalEntryLogs;
	}

	public void setJournalEntryLogs(List<JournalEntryLog> journalEntryLogs) {
		this.journalEntryLogs = journalEntryLogs;
	}

	@Override
	public String toString() {
		return "Organization [id=" + id + ", name=" + name + ", currency=" + currency + ", isEnterprise=" + isEnterprise
				+ ", permissions=" + permissions + ", journalEntries=" + journalEntries + ", accounts=" + accounts
				+ ", journalEntryLogs=" + journalEntryLogs + "]";
	}
	

}
