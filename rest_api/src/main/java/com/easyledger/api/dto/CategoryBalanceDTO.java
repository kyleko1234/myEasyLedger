package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;


public class CategoryBalanceDTO {
	private Long categoryId;
	private String categoryName;
	private Long accountId;
	private String accountName;
	private Long accountTypeId;
	private String accountTypeName;
	private BigDecimal debitTotal;
	private BigDecimal creditTotal;


	public CategoryBalanceDTO(BigInteger categoryId, String categoryName, BigInteger accountId, String accountName, 
			BigInteger accountTypeId, String accountTypeName, BigDecimal debitTotal, BigDecimal creditTotal) {
		this.categoryId = categoryId.longValueExact();
		this.categoryName = categoryName;
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.accountTypeId = accountTypeId.longValueExact();
		this.accountTypeName = accountTypeName;
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

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public Long getAccountTypeId() {
		return accountTypeId;
	}

	public void setAccountTypeId(Long accountTypeId) {
		this.accountTypeId = accountTypeId;
	}

	public String getAccountTypeName() {
		return accountTypeName;
	}

	public void setAccountTypeName(String accountTypeName) {
		this.accountTypeName = accountTypeName;
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
				+ accountId + ", accountName=" + accountName + ", accountTypeId=" + accountTypeId + ", accountTypeName="
				+ accountTypeName + ", debitTotal=" + debitTotal + ", creditTotal=" + creditTotal + "]";
	}
}

