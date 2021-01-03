package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "account_type_id", nullable = false)
	private AccountType accountType;
	
	@OneToMany(mappedBy = "accountSubtype")
	@JsonIgnore
	private Set<AccountGroup> accountGroups;
	
	public AccountSubtype() {
		this.accountGroups = new HashSet<AccountGroup>();
	}

	public AccountSubtype(String name) {
		this.name = name;
		this.accountGroups = new HashSet<AccountGroup>();
	}
	
	public AccountSubtype(String name, AccountType accountType) {
		this.name = name;
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
		this.accountGroups = new HashSet<AccountGroup>();
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

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
	}
	
	public Set<AccountGroup> getAccountGroups() {
		return accountGroups;
	}

	public void setAccountGroups(Set<AccountGroup> accountGroups) {
		this.accountGroups = accountGroups;
	}

	@Override
	public String toString() {
		return "AccountSubtype [id=" + id + ", name=" + name + ", accountType=" + accountType + ", accountGroups="
				+ accountGroups + "]";
	}


	
}
