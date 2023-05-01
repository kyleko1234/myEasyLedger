package com.easyledger.api.dto;

import java.time.LocalDate;

public class DateRangeDTO {
	private String name;
	private LocalDate prevPeriodEndDate;
	private LocalDate startDate;
	private LocalDate endDate;
	
	public DateRangeDTO(String name, LocalDate startDate, LocalDate endDate) {
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.prevPeriodEndDate = startDate.minusDays(1);
	}
	
	public DateRangeDTO(LocalDate startDate, LocalDate endDate) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.prevPeriodEndDate = startDate.minusDays(1);
	}
	
	public DateRangeDTO() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getPrevPeriodEndDate() {
		return prevPeriodEndDate;
	}

	public void setPrevPeriodEndDate(LocalDate prevPeriodEndDate) {
		this.prevPeriodEndDate = prevPeriodEndDate;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	@Override
	public String toString() {
		return "DateRangeDTO [name=" + name + ", prevPeriodEndDate=" + prevPeriodEndDate + ", startDate=" + startDate
				+ ", endDate=" + endDate + "]";
	}
}
