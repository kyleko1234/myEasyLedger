package com.easyledger.api.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.MonthlyNetAssetsDTO;
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

}
