package com.easyledger.api.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.MonthlyNetAssetsDTO;
import com.easyledger.api.model.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
	
	@Query(nativeQuery = true)
	public MonthlyNetAssetsDTO getMonthlyNetAssetsDTO(Long organizationId, int yearMonth);
	
	@Query(value = "SELECT journal_entry_date AS firstJournalEntryDate  "
			+ "FROM journal_entry "
			+ "WHERE journal_entry.organization_id = ? "
			+ "ORDER BY journal_entry_date ASC LIMIT 1",
			nativeQuery = true)
	public LocalDate getDateOfFirstJournalEntryForOrganization(Long organizationId);
}
