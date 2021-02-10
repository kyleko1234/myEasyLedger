package com.easyledger.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.PersonInRosterDTO;
import com.easyledger.api.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

	public Optional<Person> findByEmail(String email);

	public Boolean existsByEmail(String email);
	
	@Query(nativeQuery = true)
	public List<PersonInRosterDTO> getAllPersonsInOrganization(Long organizationId);
}
