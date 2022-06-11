package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.VendorDTO;
import com.easyledger.api.model.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
	
	@Query(nativeQuery = true)
	public List<VendorDTO> getAllVendorsForOrganization(Long organizationId);

}
