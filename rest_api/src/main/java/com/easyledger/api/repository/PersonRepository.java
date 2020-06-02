package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {

	List<Person> findByEmail(String email);
}
