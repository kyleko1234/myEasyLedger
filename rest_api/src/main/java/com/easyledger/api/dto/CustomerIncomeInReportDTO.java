package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.easyledger.api.model.Customer;

public class CustomerIncomeInReportDTO {
	private Long customerId;
	private String customerName;
	private List<BigDecimal> amounts = new ArrayList<BigDecimal>();
	
	public CustomerIncomeInReportDTO() {
	}
	
	public CustomerIncomeInReportDTO(Customer customer) {
		this.customerId = customer.getId();
		this.customerName = customer.getCustomerName();
	}
	
	public CustomerIncomeInReportDTO(CustomerIncomeDTO customer) {
		this.customerId = customer.getCustomerId();
		this.customerName = customer.getCustomerName();
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

	public List<BigDecimal> getAmounts() {
		return amounts;
	}

	public void setAmounts(List<BigDecimal> amounts) {
		this.amounts = amounts;
	}

}
