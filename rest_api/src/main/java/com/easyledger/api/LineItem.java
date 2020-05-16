package com.easyledger.api;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Table(name = "line_item")
public class LineItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "is_credit", nullable = false)
	private boolean isCredit;
	
	@Column(name = "amount", nullable = false)
	private Double amount;
	
	@Column(name = "description", nullable = true)
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "account_id", nullable = false)
	private Account account;
	
	@ManyToOne
	@JoinColumn(name = "category_id", nullable = true)
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "entry_id", nullable = false)
	private Entry entry;
	
	public LineItem(boolean isCredit, Double amount, String description) {
		this.isCredit = isCredit;
		this.amount = amount;
		this.description = description;
	}
	
	public LineItem() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public boolean isIsCredit() {
		return isCredit;
	}
	
	public void setIsCredit(boolean isCredit) {
		this.isCredit = isCredit;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Entry getEntry() {
		return entry;
	}

	public void setEntry(Entry entry) {
		this.entry = entry;
	}

	@Override
	public String toString() {
		return "LineItem [id=" + id + ", isCredit=" + isCredit + ", amount=" + amount + ", description=" + description
				+ ", account=" + account + ", category=" + category + ", entry=" + entry + "]";
	}




	
	
}
