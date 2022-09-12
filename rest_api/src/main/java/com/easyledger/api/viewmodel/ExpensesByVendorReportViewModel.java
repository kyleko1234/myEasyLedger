package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.util.List;

import com.easyledger.api.dto.VendorExpensesDTO;

public class ExpensesByVendorReportViewModel {
	private List<VendorExpensesDTO> vendorExpensesDTOs;
	private BigDecimal totalExpenses = new BigDecimal(0);
	
	public ExpensesByVendorReportViewModel(List<VendorExpensesDTO> vendorExpensesDTOs, BigDecimal totalExpenses) {
		super();
		this.vendorExpensesDTOs = vendorExpensesDTOs;
		if (totalExpenses != null) {
			this.totalExpenses = totalExpenses;
		}
	}
	public List<VendorExpensesDTO> getVendorExpensesDTOs() {
		return vendorExpensesDTOs;
	}
	public void setVendorExpensesDTOs(List<VendorExpensesDTO> vendorExpensesDTOs) {
		this.vendorExpensesDTOs = vendorExpensesDTOs;
	}
	public BigDecimal getTotalExpenses() {
		return totalExpenses;
	}
	public void setTotalExpenses(BigDecimal totalExpenses) {
		this.totalExpenses = totalExpenses;
	}
	
	
}
