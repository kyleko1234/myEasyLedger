package com.easyledger.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.JournalEntry;
import com.easyledger.api.viewmodel.JournalEntryViewModel;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {

	/* Returns a page of EntryViewModels. EntryViewModel is a class based on Entry, which is meant
	 * to represent a compressed view of an Entry containing only information on EntryId, Date, Description,
	 * total sum of credit LineItems, and total sum of debit LineItems. Uses a named native query defined 
	 * in JournalEntry.java.*/
	@Query(nativeQuery = true)
	public Page<JournalEntryViewModel> getAllJournalEntryViewModelsForOrganization(Long organizationId, Pageable pageable);
	
	@Query(nativeQuery = true)
	public Page<JournalEntryViewModel> getAllJournalEntryViewModelsForOrganizationAndQuery(Long organizationId, String query, Pageable pageable);

	@Query(
			value = "SELECT CASE EXISTS (SELECT 1 from journal_entry "
					+ "WHERE journal_entry.vendor_id = ? "
					+ "AND journal_entry.deleted = false) "
					+ "WHEN true THEN true ELSE false END",
			nativeQuery = true)
	public boolean vendorContainsJournalEntries(Long vendorId);

	@Query(
			value = "SELECT CASE EXISTS (SELECT 1 from journal_entry "
					+ "WHERE journal_entry.customer_id = ? "
					+ "AND journal_entry.deleted = false) "
					+ "WHEN true THEN true ELSE false END",
			nativeQuery = true)
	public boolean customerContainsJournalEntries(Long customerId);

}
