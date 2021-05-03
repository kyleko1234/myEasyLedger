package com.easyledger.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.JournalEntryLog;


@Repository
public interface JournalEntryLogRepository extends JpaRepository<JournalEntryLog, Long> {

}
