package com.easyledger.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.model.LineItem;

@Repository
public interface LineItemRepository extends JpaRepository<LineItem, Long> {

	@Query(nativeQuery = true)
	public Page<LineItemDTO> getAllLineItemsForAccount(Long accountId, Pageable pageable);
	
	@Query(nativeQuery = true)
	public Page<LineItemDTO> getAllLineItemsForCategory(Long categoryId, Pageable pageable);
	
	@Query(nativeQuery = true)
	public Page<LineItemDTO> getAllLineItemsForAccountSubtype(Long accountSubtypeId, Pageable pageable);


	@Query(
		value = "SELECT CASE EXISTS (SELECT 1 from line_item, journal_entry "
				+ "WHERE line_item.journal_entry_id = journal_entry.id "
				+ "AND line_item.account_id = ? AND journal_entry.deleted = false) "
				+ "WHEN true THEN true ELSE false END",
		nativeQuery = true)
	public boolean accountContainsLineItems(Long accountId);
	
	@Query(
		value = "SELECT CASE EXISTS (SELECT 1 from line_item, journal_entry "
				+ "WHERE line_item.journal_entry_id = journal_entry.id "
				+ "AND line_item.category_id = ? AND journal_entry.deleted = false) "
				+ "WHEN true THEN true ELSE false END", 
		nativeQuery = true)
	public boolean categoryContainsLineItems(Long categoryId);
}
