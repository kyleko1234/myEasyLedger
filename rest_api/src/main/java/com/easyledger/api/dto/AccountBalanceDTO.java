package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.math.BigInteger;


public class AccountBalanceDTO {
	private Long accountId;
	private String accountName;
	private Long accountTypeId;
	private Long accountSubtypeId;
	private BigDecimal debitTotal;
	private BigDecimal creditTotal;

	public AccountBalanceDTO(BigInteger accountId, String accountName, BigInteger accountTypeId, BigInteger accountSubtypeId,
			BigDecimal debitTotal, BigDecimal creditTotal) {
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.accountTypeId = accountTypeId.longValueExact();
		if (accountSubtypeId != null) {
			this.accountSubtypeId = accountSubtypeId.longValueExact();
		}
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

	public AccountBalanceDTO() {
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

	public Long getAccountSubtypeId() {
		return accountSubtypeId;
	}

	public void setAccountSubtypeId(Long accountSubtypeId) {
		this.accountSubtypeId = accountSubtypeId;
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
		return "AccountBalanceDTO [accountId=" + accountId + ", accountName=" + accountName + ", accountTypeId="
				+ accountTypeId + ", accountSubtypeId=" + accountSubtypeId + ", debitTotal=" + debitTotal
				+ ", creditTotal=" + creditTotal + "]";
	}


	
}
