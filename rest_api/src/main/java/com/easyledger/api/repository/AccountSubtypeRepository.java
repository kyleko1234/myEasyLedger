package com.easyledger.api.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.AccountSubtype;

@Repository
public interface AccountSubtypeRepository extends JpaRepository<AccountSubtype, Long> {
		
}

