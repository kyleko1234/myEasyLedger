package com.easyledger.api.repository;

import java.util.List;

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
	
}
