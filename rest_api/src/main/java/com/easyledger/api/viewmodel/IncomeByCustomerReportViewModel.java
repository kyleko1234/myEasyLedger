package com.easyledger.api.viewmodel;

import java.math.BigDecimal;
import java.util.List;

import com.easyledger.api.dto.CustomerIncomeDTO;


public class IncomeByCustomerReportViewModel {
	private List<CustomerIncomeDTO> customerIncomeDTOs;
	private BigDecimal totalIncome = new BigDecimal(0);
	
	public IncomeByCustomerReportViewModel(List<CustomerIncomeDTO> customerIncomeDTOs, BigDecimal totalIncome) {
		super();
		this.customerIncomeDTOs = customerIncomeDTOs;
		if (totalIncome != null) {
			this.totalIncome = totalIncome;
		}
	}

	public List<CustomerIncomeDTO> getCustomerIncomeDTOs() {
		return customerIncomeDTOs;
	}

	public void setCustomerIncomeDTOs(List<CustomerIncomeDTO> customerIncomeDTOs) {
		this.customerIncomeDTOs = customerIncomeDTOs;
	}

	public BigDecimal getTotalIncome() {
		return totalIncome;
	}

	public void setTotalIncome(BigDecimal totalIncome) {
		this.totalIncome = totalIncome;
	}
}
