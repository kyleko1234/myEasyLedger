package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Entry;
import com.easyledger.api.viewmodel.EntryViewModel;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {

	/* Returns a list of EntryViewModels. EntryViewModel is a class based on Entry, which is meant
	 * to represent a compressed view of an Entry containing only information on EntryId, Date, Description,
	 * total sum of credit LineItems, and total sum of debit LineItems. */
	@Query(nativeQuery = true)
	public List<EntryViewModel> getAllEntryViewModels(@Param("offset") Integer offset, @Param("limit") Integer limit);
	
}
