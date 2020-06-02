package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

	
}
