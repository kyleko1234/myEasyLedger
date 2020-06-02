package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.LineItem;

@Repository
public interface LineItemRepository extends JpaRepository<LineItem, Long> {

	
}
