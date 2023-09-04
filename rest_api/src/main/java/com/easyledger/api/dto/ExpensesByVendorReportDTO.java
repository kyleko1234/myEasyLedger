package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ExpensesByVendorReportDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	private List<VendorExpensesInReportDTO> vendors = new ArrayList<VendorExpensesInReportDTO>();
	private List<BigDecimal> totalExpenses = new ArrayList<BigDecimal>();
	
	public ExpensesByVendorReportDTO() {
	}

	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}

	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}

	public List<VendorExpensesInReportDTO> getVendors() {
		return vendors;
	}

	public void setVendors(List<VendorExpensesInReportDTO> vendors) {
		this.vendors = vendors;
	}

	public List<BigDecimal> getTotalExpenses() {
		return totalExpenses;
	}

	public void setTotalExpenses(List<BigDecimal> totalExpenses) {
		this.totalExpenses = totalExpenses;
	}
	
}
