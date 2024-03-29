package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.CashFlowFormatPosition;

@Repository
public interface CashFlowFormatPositionRepository extends JpaRepository<CashFlowFormatPosition, Long> {
}
