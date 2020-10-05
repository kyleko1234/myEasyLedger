package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.CategoryBalanceDTO;
import com.easyledger.api.dto.CategoryDTO;
import com.easyledger.api.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	@Query(nativeQuery = true)
	public List<CategoryDTO> getAllCategoriesForOrganization(Long organizationId);
	
	@Query(nativeQuery = true)
	public List<CategoryBalanceDTO> getAllCategoryBalancesForOrganization(Long organizationId);

	
	@Query(
		value = "SELECT CASE EXISTS (SELECT 1 FROM category "
				+ "WHERE category.account_id = ? AND category.deleted = false) "
				+ "WHEN true THEN true ELSE false END", 
		nativeQuery = true)
	public boolean accountContainsCategories(Long accountId);
}
