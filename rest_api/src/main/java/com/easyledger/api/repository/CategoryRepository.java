package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	@Query(nativeQuery = true)
	public List<CategoryDTO> getAllCategoriesForOrganization(Long organizationId);
	
	@Query(
		value = "SELECT count(*) FROM category "
				+ "WHERE category.account_id = ? AND category.deleted = false", 
		nativeQuery = true)
	public Long countUndeletedCategoriesForAccount(Long accountId);
}
