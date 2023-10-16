package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class IncomeByCustomerReportDTO {
	private List<DateRangeDTO> dateRanges = new ArrayList<DateRangeDTO>();
	private List<CustomerIncomeInReportDTO> customers = new ArrayList<CustomerIncomeInReportDTO>();
	private List<BigDecimal> totalIncome = new ArrayList<BigDecimal>();
	
	public IncomeByCustomerReportDTO() {
	}
	
	public List<DateRangeDTO> getDateRanges() {
		return dateRanges;
	}
	
	public void setDateRanges(List<DateRangeDTO> dateRanges) {
		this.dateRanges = dateRanges;
	}
	
	public List<CustomerIncomeInReportDTO> getCustomers() {
		return customers;
	}
	
	public void setCustomers(List<CustomerIncomeInReportDTO> customers) {
		this.customers = customers;
	}
	
	public List<BigDecimal> getTotalIncome() {
		return totalIncome;
	}
	
	public void setTotalIncome(List<BigDecimal> totalIncome) {
		this.totalIncome = totalIncome;
	}

	
}
