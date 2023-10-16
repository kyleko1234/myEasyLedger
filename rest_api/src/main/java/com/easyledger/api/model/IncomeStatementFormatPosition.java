package com.easyledger.api.model;

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
@Table(name = "income_statement_format_position")
public class IncomeStatementFormatPosition {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "name")
    private String name;
	
	@OneToMany(mappedBy = "incomeStatementFormatPosition")
	@JsonIgnore
	private Set<AccountSubtype> accountSubtypes;

	@OneToMany(mappedBy = "incomeStatementFormatPosition")
	@JsonIgnore
	private Set<Account> accounts;


	public IncomeStatementFormatPosition() {
	}
	
	public IncomeStatementFormatPosition(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
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
	
}
