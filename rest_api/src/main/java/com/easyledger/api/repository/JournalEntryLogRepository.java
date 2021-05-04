package com.easyledger.api.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.JournalEntryLogDTO;
import com.easyledger.api.model.JournalEntryLog;


@Repository
public interface JournalEntryLogRepository extends JpaRepository<JournalEntryLog, Long> {
	
	@Query(nativeQuery = true)
	List<JournalEntryLogDTO> getAllJournalEntryLogsForJournalEntryId(Long journalEntryId);
	
	@Query(nativeQuery = true)
	List<JournalEntryLogDTO> getAllJournalEntryLogsForOrganizationId(Long organizationId);

}
