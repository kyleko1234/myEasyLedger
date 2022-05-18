package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Vendor;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long>{

}
