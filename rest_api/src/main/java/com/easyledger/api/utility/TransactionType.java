package com.easyledger.api.utility;

public enum TransactionType {
	EXPENSE (1, "Expense", new Long[] {(long) 5}, false),
	INCOME (2, "Income", new Long[] {(long) 4}, true),
	TRANSFER (3, "Transfer", new Long[] {(long) 1, (long) 2}, false);
	
	private final Long transactionTypeId;
	private final String transactionTypeName;
	private final Long[] accountTypeIds;
	private final boolean isCredit;
	
	TransactionType(int transactionTypeId, String transactionTypeName, Long[] accountTypeIds, boolean isCredit) {
		this.transactionTypeId = (long) transactionTypeId;
		this.transactionTypeName = transactionTypeName;
		this.accountTypeIds = accountTypeIds;
		this.isCredit = isCredit;
	}

	public Long getTransactionTypeId() {
		return transactionTypeId;
	}
	
	public String getTransactionTypeName() {
		return transactionTypeName;
	}

	public Long[] getAccountTypeIds() {
		return accountTypeIds;
	}

	public boolean isCredit() {
		return isCredit;
	}
	
	
}
