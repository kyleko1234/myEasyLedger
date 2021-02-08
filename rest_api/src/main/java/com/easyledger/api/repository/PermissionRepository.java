package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long>{
	
}
