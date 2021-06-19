package com.easyledger.api.dto;

import java.math.BigDecimal;

public class MonthlyNetAssetsDTO {
	private BigDecimal netAssets;
	private Integer yearMonth;
	
	public MonthlyNetAssetsDTO(BigDecimal netAssets, Integer yearMonth) {
		super();
		if (netAssets != null) {
			this.netAssets = netAssets;
		} else {
			this.netAssets = new BigDecimal(0);
		}
		this.yearMonth = yearMonth;
	}
	
	public BigDecimal getNetAssets() {
		return netAssets;
	}
	
	public void setNetAssets(BigDecimal netAssets) {
		this.netAssets = netAssets;
	}
	
	public Integer getYearMonth() {
		return yearMonth;
	}
	
	public void setYearMonth(Integer yearMonth) {
		this.yearMonth = yearMonth;
	}
	
	@Override
	public String toString() {
		return "MonthlyNetAssetsDTO [netAssets=" + netAssets + ", yearMonth=" + yearMonth + "]";
	}

	
	
}
