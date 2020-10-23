package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;


public class CategoryBalanceDTO {
	private Long categoryId;
	private String categoryName;
	private Long accountId;
	private Long accountTypeId;
	private BigDecimal debitTotal;
	private BigDecimal creditTotal;


	public CategoryBalanceDTO(BigInteger categoryId, String categoryName, BigInteger accountId, BigInteger accountTypeId, BigDecimal debitTotal,
			BigDecimal creditTotal) {
		this.categoryId = categoryId.longValueExact();
		this.categoryName = categoryName;
		this.accountId = accountId.longValueExact();
		this.accountTypeId = accountTypeId.longValueExact();
		if (debitTotal != null) {
			this.debitTotal = debitTotal;
		} else {
			this.debitTotal = new BigDecimal(0);
		}
		if (creditTotal != null) {
			this.creditTotal = creditTotal;
		} else {
			this.creditTotal = new BigDecimal(0);
		}
	}

	public CategoryBalanceDTO() {
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public Long getAccountTypeId() {
		return accountTypeId;
	}

	public void setAccountTypeId(Long accountTypeId) {
		this.accountTypeId = accountTypeId;
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

	@Override
	public String toString() {
		return "CategoryBalanceDTO [categoryId=" + categoryId + ", categoryName=" + categoryName + ", accountId="
				+ accountId + ", accountTypeId=" + accountTypeId + ", debitTotal=" + debitTotal + ", creditTotal="
				+ creditTotal + "]";
	}
	

}
