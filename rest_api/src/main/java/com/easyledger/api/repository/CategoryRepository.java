package com.easyledger.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.easyledger.api.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

	
}
