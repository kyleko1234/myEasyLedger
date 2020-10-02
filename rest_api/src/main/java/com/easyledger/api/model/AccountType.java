package com.easyledger.api.model;

import java.util.HashSet;
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
@Table(name = "account_type")
public class AccountType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@OneToMany(mappedBy = "accountType")
	@JsonIgnore
	private Set<AccountSubtype> accountSubtypes;
	
	@OneToMany(mappedBy = "accountType")
	@JsonIgnore
	private Set<Account> accounts;
	
	public AccountType() {
		this.accountSubtypes = new HashSet<AccountSubtype>();
		this.accounts = new HashSet<Account>();
	}
	
	public AccountType(String name) {
		this.name = name;
		this.accountSubtypes = new HashSet<AccountSubtype>();
		this.accounts = new HashSet<Account>();
	}
	
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

	public Set<AccountSubtype> getAccountSubtypes() {
		return accountSubtypes;
	}

	public void setAccountSubtypes(Set<AccountSubtype> accountSubtypes) {
		this.accountSubtypes = accountSubtypes;
	}

	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}



	@Override
	public String toString() {
		return "AccountType [id=" + id + ", name=" + name + ", accountSubtypes=" + accountSubtypes + ", accounts="
				+ accounts + "]";
	}
	
	
	
	
}
