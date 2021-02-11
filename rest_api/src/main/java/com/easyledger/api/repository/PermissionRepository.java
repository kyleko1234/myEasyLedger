package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Permission;
import com.easyledger.api.model.Person;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long>{
	
}
