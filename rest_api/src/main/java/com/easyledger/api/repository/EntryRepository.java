package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Entry;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {

	
}
