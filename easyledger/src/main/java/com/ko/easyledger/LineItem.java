package com.ko.easyledger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.rest.core.annotation.RestResource;


@Entity
@Table(name = "line_item")
@RestResource(rel="line_item", path="line_item")
public class LineItem {
	private long id;
	private boolean isCredit;
	private double amount;
	private String description;
	
	public LineItem(long id, boolean isCredit, double amount, String description) {
		this.id = id;
		this.isCredit = isCredit;
		this.amount = amount;
		this.description = description;
	}
	
	public LineItem() {
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "is_credit", nullable = false)
	public boolean isCredit() {
		return isCredit;
	}

	public void setCredit(boolean isCredit) {
		this.isCredit = isCredit;
	}

	@Column(name = "amount", nullable = false)
	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	@Column(name = "description", nullable = true)
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "LineItem [id=" + id + ", isCredit=" + isCredit + ", amount=" + amount + ", description=" + description
				+ "]";
	}

	
	
}
