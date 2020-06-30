package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

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
@Table(name = "account_subtype")
public class AccountSubtype {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@OneToMany (mappedBy = "accountSubtype")
	@JsonIgnore
	private Set<Account> accounts;
	
	@ManyToOne
	@JoinColumn(name = "account_type_id", nullable = false)
	private AccountType accountType;
	
	public AccountSubtype() {
		this.accounts = new HashSet<Account>();
	}

	public AccountSubtype(String name) {
		this.name = name;
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
	

	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
	}

	@Override
	public String toString() {
		return "AccountSubtype [id=" + id + ", name=" + name + ", accounts=" + accounts + ", accountType=" + accountType
				+ "]";
	}




}
