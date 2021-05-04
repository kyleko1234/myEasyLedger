package com.easyledger.api.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.JournalEntryLog;


@Repository
public interface JournalEntryLogRepository extends JpaRepository<JournalEntryLog, Long> {
	
	@Query(nativeQuery = true)
	List<JournalEntryLog> getAllJournalEntryLogsForJournalEntryId(Long journalEntryId);
}
