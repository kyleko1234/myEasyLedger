package com.easyledger.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easyledger.api.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findRoleByName(String name);
}
