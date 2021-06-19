package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.MonthlyNetAssetsDTO;
import com.easyledger.api.model.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
	
	@Query(nativeQuery = true)
	public MonthlyNetAssetsDTO getMonthlyNetAssetsDTO(Long organizationId, int yearMonth);
	
}
