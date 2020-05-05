package com.easyledger.api;

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
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "name")
    private String name;

	@OneToMany(mappedBy = "account")
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	@ManyToOne
	@JoinColumn(name = "account_subtype_id", nullable = true)
	private AccountSubtype accountSubtype;
	
	@ManyToOne
	@JoinColumn(name = "account_type_id", nullable = false)
	private AccountType accountType;
	
	public Account() {
	}

	public Account(String name) {
		this.name = name;
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

	public Set<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(Set<LineItem> lineItems) {
		this.lineItems = lineItems;
	}

	public AccountSubtype getAccountSubtype() {
		return accountSubtype;
	}

	public void setAccountSubtype(AccountSubtype accountSubtype) {
		this.accountSubtype = accountSubtype;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	@Override
	public String toString() {
		return "Account [id=" + id + ", name=" + name + ", lineItems=" + lineItems + ", accountSubtype="
				+ accountSubtype + ", accountType=" + accountType + "]";
	}


	
	




	
	
}