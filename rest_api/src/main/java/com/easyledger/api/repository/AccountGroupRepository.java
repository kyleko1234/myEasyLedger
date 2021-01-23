package com.easyledger.api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.AccountGroupBalanceDTO;
import com.easyledger.api.dto.AccountGroupDTO;
import com.easyledger.api.model.AccountGroup;

@Repository
public interface AccountGroupRepository extends JpaRepository<AccountGroup, Long> {

	@Query(nativeQuery = true)
	public List<AccountGroupDTO> getAllAccountGroupsForOrganization(Long organizationId);
	
	@Query(nativeQuery = true)
	public List<AccountGroupBalanceDTO> getAllAccountGroupBalancesForOrganization(Long organizationId);
	
	@Query(nativeQuery = true)
	public List<AccountGroupBalanceDTO> getAllAccountGroupBalancesForOrganizationUpToDate(Long organizationId, LocalDate endDate);

	@Query(nativeQuery = true)
	public List<AccountGroupBalanceDTO> getAllAccountGroupBalancesForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate);

}
