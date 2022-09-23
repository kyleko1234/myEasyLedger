package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

public class CustomerIncomeDTO {
	private Long customerId;
	private String customerName;
	private BigDecimal debitTotal = new BigDecimal(0);
	private BigDecimal creditTotal = new BigDecimal(0);
	private BigDecimal creditsMinusDebits;
	
	public CustomerIncomeDTO(BigInteger customerId, String customerName, BigDecimal debitTotal, BigDecimal creditTotal) {

		this.customerId = customerId.longValueExact();;
		this.customerName = customerName;
		if (debitTotal != null) {
			this.debitTotal = debitTotal;
		}
		if (creditTotal != null) {
			this.creditTotal = creditTotal;
		}
		this.creditsMinusDebits = this.creditTotal.subtract(this.debitTotal);
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public BigDecimal getDebitTotal() {
		return debitTotal;
	}

	public void setDebitTotal(BigDecimal debitTotal) {
		this.debitTotal = debitTotal;
	}

	public BigDecimal getCreditTotal() {
		return creditTotal;
	}

	public void setCreditTotal(BigDecimal creditTotal) {
		this.creditTotal = creditTotal;
	}

	public BigDecimal getCreditsMinusDebits() {
		return creditsMinusDebits;
	}

	public void setCreditsMinusDebits(BigDecimal creditsMinusDebits) {
		this.creditsMinusDebits = creditsMinusDebits;
	}
	

}
