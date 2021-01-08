package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;

public class AccountTypeSummaryDTO {
	private Long accountTypeId;
	private String accountTypeName;
	private BigDecimal debitAmount;
	private BigDecimal creditAmount;
	private Integer yearMonth;
	
	public AccountTypeSummaryDTO(BigInteger accountTypeId, String accountTypeName, BigDecimal debitAmount,
			BigDecimal creditAmount, Integer yearMonth) {
		this.accountTypeId = accountTypeId.longValueExact();
		this.accountTypeName = accountTypeName;
		if (debitAmount == null) {
			this.debitAmount = new BigDecimal(0);
		} else {
			this.debitAmount = debitAmount;
		}
		if (creditAmount == null) {
			this.creditAmount = new BigDecimal(0);
		} else {
			this.creditAmount = creditAmount;
		}
		this.yearMonth = yearMonth;
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
	
	public BigDecimal getDebitAmount() {
		return debitAmount;
	}
	
	public void setDebitAmount(BigDecimal debitAmount) {
		this.debitAmount = debitAmount;
	}
	
	public BigDecimal getCreditAmount() {
		return creditAmount;
	}
	
	public void setCreditAmount(BigDecimal creditAmount) {
		this.creditAmount = creditAmount;
	}
	
	public Integer getYearMonth() {
		return yearMonth;
	}
	
	public void setYearMonth(Integer yearMonth) {
		this.yearMonth = yearMonth;
	}

	@Override
	public String toString() {
		return "AccountTypeSummaryDTO [accountTypeId=" + accountTypeId + ", accountTypeName=" + accountTypeName
				+ ", debitAmount=" + debitAmount + ", creditAmount=" + creditAmount + ", yearMonth=" + yearMonth + "]";
	}
	

	
	
}
