package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.AccountType;
import com.easyledger.api.viewmodel.AccountTypeSummaryViewModel;

@Repository
public interface AccountTypeRepository extends JpaRepository<AccountType, Long> {
	
	
	//organizationId: the organization for which we retrieve account type summaries
	//yearmonth: this method will only retrieve summaries on or after yyyymm year and month 
	@Query(nativeQuery = true)
	public List<AccountTypeSummaryViewModel> getMonthlyAccountTypeSummaries(Long organizationId, Integer yearMonth); 
	
}
