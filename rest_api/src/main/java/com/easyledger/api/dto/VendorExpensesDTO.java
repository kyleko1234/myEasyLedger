package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

public class VendorExpensesDTO {
	private Long vendorId;
	private String vendorName;
	private BigDecimal debitTotal = new BigDecimal(0);
	private BigDecimal creditTotal = new BigDecimal(0);
	private BigDecimal debitsMinusCredits;
	
	public VendorExpensesDTO(BigInteger vendorId, String vendorName, BigDecimal debitTotal, BigDecimal creditTotal) {

		this.vendorId = vendorId.longValueExact();;
		this.vendorName = vendorName;
		if (debitTotal != null) {
			this.debitTotal = debitTotal;
		}
		if (creditTotal != null) {
			this.creditTotal = creditTotal;
		}
		this.debitsMinusCredits = this.debitTotal.subtract(this.creditTotal);
	}
	
	public VendorExpensesDTO() {
	}

	public Long getVendorId() {
		return vendorId;
	}

	public void setVendorId(Long vendorId) {
		this.vendorId = vendorId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
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

	public BigDecimal getDebitsMinusCredits() {
		return debitsMinusCredits;
	}

	public void setDebitsMinusCredits(BigDecimal debitsMinusCredits) {
		this.debitsMinusCredits = debitsMinusCredits;
	}
	
}
