package com.easyledger.api.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.DateRangeDTO;
import com.easyledger.api.dto.MonthlyNetAssetsDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.repository.OrganizationRepository;

@Service
public class OrganizationService {
	
	@Autowired
	private OrganizationRepository organizationRepo;

	public OrganizationService(OrganizationRepository organizationRepo) {
		super();
		this.organizationRepo = organizationRepo;
	}

	public List<MonthlyNetAssetsDTO> getMonthlyNetAssetsDTOsForOrganization(Long organizationId, int numberOfMonths) {
		List<MonthlyNetAssetsDTO> returnedList = new ArrayList<MonthlyNetAssetsDTO>(numberOfMonths);
		List<Integer> yearMonthsToQuery = new ArrayList<Integer>(numberOfMonths);
		
    	//get current year and month as ints
    	LocalDate now = LocalDate.now();
    	int year = now.getYear();
    	int month = now.getMonthValue(); 
    	
    	for (int i = 0; i < numberOfMonths; i++) {
    		yearMonthsToQuery.add(0);
    	}
    	
		for (int i = numberOfMonths - 1; i >= 0; i--) {
			yearMonthsToQuery.add(i, ((year * 100) + month));
			yearMonthsToQuery.remove(i + 1);
			month -= 1;
			if (month == 0) {
				year -= 1;
				month = 12;
			}
		}
		
		for (int yearMonth : yearMonthsToQuery) {
			returnedList.add(organizationRepo.getMonthlyNetAssetsDTO(organizationId, yearMonth));
		}
		
		return returnedList;
	}
		
	public List<Object> getDateRangePresetsForOrganizationUpToDate(Long organizationId, LocalDate endDate, String locale) throws ResourceNotFoundException {
		Organization organization = organizationRepo.findById(organizationId)
				.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + organizationId));
		LocalDate dateOfFirstJournalEntry = organizationRepo.getDateOfFirstJournalEntryForOrganization(organizationId);
		if (dateOfFirstJournalEntry == null) {
			dateOfFirstJournalEntry = LocalDate.now();
		}
		LocalDate fiscalYearBeginDate = organization.getFiscalYearBegin();
		Map<String, Object> annualGroup = new HashMap<String, Object>();
		Map<String, Object> quarterlyGroup = new HashMap<String, Object>();
		switch (locale) {
			case "zh-TW":
				annualGroup.put("label", "年度");
				quarterlyGroup.put("label", "季度");
				break;
			case "en-US":
			default:
				annualGroup.put("label", "Annual");
				quarterlyGroup.put("label", "Quarterly");
				break;
		}
		annualGroup.put("options", generateAnnualDateRangePresets(dateOfFirstJournalEntry, fiscalYearBeginDate, endDate));
		quarterlyGroup.put("options", generateQuarterlyDateRangePresets(dateOfFirstJournalEntry, fiscalYearBeginDate, endDate));
		List<Object> returnedList = new ArrayList<Object>();
		returnedList.add(annualGroup);
		returnedList.add(quarterlyGroup);
		return returnedList;
	}
	
	private List<Object> generateAnnualDateRangePresets(LocalDate dateOfFirstJournalEntry, LocalDate fiscalYearBeginDate, LocalDate endDate) {
		int firstFiscalYear;
		int lastFiscalYear;
		List<Object> returnedList = new ArrayList<Object>();
		
		
		//if date of first journal entry is before fiscal year begin date, the first fiscal year is the year before the calendar year of the date of the first journal entry
		if (dateOfFirstJournalEntry.withYear(fiscalYearBeginDate.getYear()).compareTo(fiscalYearBeginDate) < 0) { 
			firstFiscalYear = dateOfFirstJournalEntry.getYear() - 1;
		} else {
			firstFiscalYear = dateOfFirstJournalEntry.getYear();
		}
		
		//if endDate  is before fiscal year begin date, the last fiscal year is the year before the calendar year of endDate
		if (endDate.withYear(fiscalYearBeginDate.getYear()).compareTo(fiscalYearBeginDate) < 0) {
			lastFiscalYear = endDate.getYear() - 1;
		} else {
			lastFiscalYear = endDate.getYear();
		}

		
		for (int yearNumber = lastFiscalYear; yearNumber >= firstFiscalYear; yearNumber--) {
			String name = ((Integer) yearNumber).toString();
			LocalDate startDateOfDateRange = fiscalYearBeginDate.withYear(yearNumber);
			LocalDate endDateOfDateRange = startDateOfDateRange.plusYears(1).minusDays(1);
			HashMap<String, Object> dateRangePreset = new HashMap<String, Object>();
			dateRangePreset.put("value", name);
			dateRangePreset.put("label", name);
			dateRangePreset.put("object", new DateRangeDTO(name, startDateOfDateRange, endDateOfDateRange));
			returnedList.add(dateRangePreset);
		}
		return returnedList;
	}

	private List<Object> generateQuarterlyDateRangePresets(LocalDate dateOfFirstJournalEntry, LocalDate fiscalYearBeginDate, LocalDate endDate) {
		List<Object> returnedList = new ArrayList<Object>();
		int fiscalYearOfLastQuarterToReturn; //the fiscal year that endDate is in
		
		//find the start date of the fiscal year that endDate is in
		if (endDate.withYear(fiscalYearBeginDate.getYear()).compareTo(fiscalYearBeginDate) < 0) {
			fiscalYearOfLastQuarterToReturn = endDate.getYear() - 1;
		} else {
			fiscalYearOfLastQuarterToReturn = endDate.getYear();
		}
		LocalDate beginningOfLastFiscalYear = fiscalYearBeginDate.withYear(fiscalYearOfLastQuarterToReturn);
		
		//find the start date of the quarter that endDate is in
		int zeroIndexedQuarterNumber = 0;
		LocalDate startDateOfLastQuarterToReturn = beginningOfLastFiscalYear;
		while (endDate.compareTo(startDateOfLastQuarterToReturn.plusMonths(3).minusDays(1)) > 0) {
			zeroIndexedQuarterNumber++;
			startDateOfLastQuarterToReturn = startDateOfLastQuarterToReturn.plusMonths(3);
		}
		
		while (startDateOfLastQuarterToReturn.plusMonths(3).compareTo(dateOfFirstJournalEntry) > 0) {
			LocalDate endDateOfDateRange = startDateOfLastQuarterToReturn.plusMonths(3).minusDays(1);
			int quarterNumber = Math.floorMod(zeroIndexedQuarterNumber, 4) + 1; //java's default modulo operator returns a negative result
			String name = fiscalYearOfLastQuarterToReturn + " " + "Q" + quarterNumber;
			HashMap<String, Object> dateRangePreset = new HashMap<String, Object>();
			dateRangePreset.put("value", name);
			dateRangePreset.put("label", name);
			dateRangePreset.put("object", new DateRangeDTO(name, startDateOfLastQuarterToReturn, endDateOfDateRange));
			returnedList.add(dateRangePreset);
			startDateOfLastQuarterToReturn = startDateOfLastQuarterToReturn.minusMonths(3);
			zeroIndexedQuarterNumber--;
			if (Math.floorMod(zeroIndexedQuarterNumber, 4) == 3) {
				fiscalYearOfLastQuarterToReturn--;
			}
		}
		return returnedList;
	}
}
