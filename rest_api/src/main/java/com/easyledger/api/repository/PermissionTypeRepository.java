package com.easyledger.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.PermissionType;

@Repository
public interface PermissionTypeRepository extends JpaRepository<PermissionType, Long>{
	Optional<PermissionType> findByName(String name);
}
