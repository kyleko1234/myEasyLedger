package com.easyledger.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.easyledger.api.dto.CustomerDTO;
import com.easyledger.api.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	@Query(nativeQuery = true)
	public List<CustomerDTO> getAllCustomersForOrganization(Long organizationId);

	@Query(
			value = "SELECT CASE EXISTS( "
					+ "	SELECT 1 FROM customer "
					+ "	WHERE lower(customer_name) = lower(:name) "
					+ "		AND customer.organization_id = (:organizationId) "
					+ ") "
					+ "WHEN true THEN true ELSE false END", 
			nativeQuery=true)
	public boolean isDuplicateCustomerName(Long organizationId, String name);
}
