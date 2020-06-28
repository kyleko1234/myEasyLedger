package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

	
}
