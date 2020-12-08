package com.easyledger.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.VerificationToken;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

	public VerificationToken findByToken(String token);
	
	public VerificationToken findByPersonId(Long personId);
	
}
