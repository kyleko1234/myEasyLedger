package com.easyledger.api.repository;

import java.math.BigDecimal;
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
	
	@Query(nativeQuery = true, value = "SELECT  "
			+ "    CASE EXISTS  "
			+ "        (SELECT 1  "
			+ "            FROM  "
			+ "                journal_entry "
			+ "            WHERE  "
			+ "                journal_entry.organization_id = ? AND  "
			+ "                journal_entry.deleted = false)  "
			+ "    WHEN true THEN true ELSE false END")
	public boolean organizationContainsJournalEntries(Long organizationId);
	
	@Query(value = "SELECT  "
			+ "    SUM( "
			+ "        CASE WHEN "
			+ "            line_item.is_credit = false  "
			+ "            AND journal_entry.deleted = false  "
			+ "            AND journal_entry.journal_entry_date >= :startDate  "
			+ "            AND journal_entry.journal_entry_date <= :endDate "
			+ "            AND account_type.id = 5 "
			+ "        THEN line_item.amount END "
			+ "    ) - SUM( "
			+ "        CASE WHEN  "
			+ "            line_item.is_credit = true  "
			+ "            AND journal_entry.deleted = false  "
			+ "            AND journal_entry.journal_entry_date >= :startDate  "
			+ "            AND journal_entry.journal_entry_date <= :endDate  "
			+ "            AND account_type.id = 5 "
			+ "        THEN line_item.amount END "
			+ "    )  "
			+ "    AS debitsMinusCredits "
			+ "FROM "
			+ "    organization  "
			+ "        LEFT JOIN journal_entry ON journal_entry.organization_id = organization.id "
			+ "        LEFT JOIN line_item ON line_item.journal_entry_id = journal_entry.id "
			+ "        LEFT JOIN account AS account ON line_item.account_id = account.id "
			+ "        LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id "
			+ "        LEFT JOIN account_subtype ON (account.account_subtype_id = account_subtype.id OR parent_account.account_subtype_id = account_subtype.id) "
			+ "        LEFT JOIN account_type ON account_subtype.account_type_id = account_type.id "
			+ "WHERE "
			+ "    organization.id = :organizationId",
			nativeQuery = true)
	public BigDecimal getTotalExpensesForOrganizationBetweenDates(Long organizationId, LocalDate startDate, LocalDate endDate);
}
