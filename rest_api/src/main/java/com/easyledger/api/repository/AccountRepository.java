package com.easyledger.api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	@Query(nativeQuery = true)
	public List<AccountDTO> getAllAccountsForOrganization(Long organizationId);
		
	@Query(nativeQuery = true)
	public List<AccountDTO> getAllAccountBalancesForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate);
	
	@Query(nativeQuery = true)
	public List<AccountBalanceDTO> getAllAccountBalancesForOrganizationUpToDate(Long organizationId, LocalDate endDate);
	
	@Query(nativeQuery = true)
	public AccountBalanceDTO getAccountBalanceUpToDateExclusive(Long accountId, LocalDate endDate);
	
	@Query(nativeQuery = true)
	public List<AccountDTO> getLeafAccountsWithEntriesForOrganization(Long organizationId);
	
	@Query(
			value = "SELECT CASE EXISTS (SELECT 1 FROM account WHERE account.parent_account_id = ? AND account.deleted = false) " +
				"WHEN true THEN true ELSE false END",
			nativeQuery = true)
	public boolean accountContainsChildAccounts(Long accountId);
}
