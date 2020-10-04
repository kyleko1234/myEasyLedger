package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	@Query(nativeQuery = true)
	public List<AccountDTO> getAllAccountsForOrganization(Long organizationId);
	
	@Query(
		value = "SELECT CASE EXISTS (SELECT 1 from account WHERE account.account_subtype_id = ? AND account.deleted = false) "
				+ "WHEN true THEN true ELSE false END",
		nativeQuery = true)
	public boolean accountSubtypeContainsAccounts(Long accountSubtypeId);
	
}
