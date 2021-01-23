package com.easyledger.api.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.easyledger.api.model.AccountSubtype;

@Repository
public interface AccountSubtypeRepository extends JpaRepository<AccountSubtype, Long> {
	
	@Query(nativeQuery = true)
	public List<AccountSubtypeBalanceDTO> getAllAccountSubtypeBalancesForOrganization(Long organizationId);
}

