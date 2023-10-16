package com.easyledger.api.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.easyledger.api.model.Vendor;

public class VendorExpensesInReportDTO {
	private Long vendorId;
	private String vendorName;
	private List<BigDecimal> amounts = new ArrayList<BigDecimal>();
	
	public VendorExpensesInReportDTO() {
		
	}

	public VendorExpensesInReportDTO(Vendor vendor) {
		this.vendorId = vendor.getId();
		this.vendorName = vendor.getVendorName();
	}
	
	public VendorExpensesInReportDTO(VendorExpensesDTO vendor) {
		this.vendorId = vendor.getVendorId();
		this.vendorName = vendor.getVendorName();
	}

	public Long getVendorId() {
		return vendorId;
	}

	public void setVendorId(Long vendorId) {
		this.vendorId = vendorId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public List<BigDecimal> getAmounts() {
		return amounts;
	}

	public void setAmounts(List<BigDecimal> amounts) {
		this.amounts = amounts;
	}
	
}
