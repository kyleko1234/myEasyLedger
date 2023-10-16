package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.BalanceSheetFormatPosition;

@Repository
public interface BalanceSheetFormatPositionRepository extends JpaRepository<BalanceSheetFormatPosition, Long> {
}
