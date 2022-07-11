package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.CustomerDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Customer;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.CustomerRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.utility.Utility;

@Service
public class CustomerService {

	@Autowired
	CustomerRepository customerRepo;
	
	@Autowired
	OrganizationRepository organizationRepo;
	
	@Autowired
	AuthorizationService authorizationService;

	public CustomerService(CustomerRepository customerRepo, OrganizationRepository organizationRepo, AuthorizationService authorizationService) {
		super();
		this.customerRepo = customerRepo;
		this.organizationRepo = organizationRepo;
		this.authorizationService = authorizationService;
	}
	
	public Customer createCustomerFromDTO(CustomerDTO dto) throws ResourceNotFoundException, ConflictException {
		Customer product = new Customer();
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
		if (isDuplicateCustomerName(organization.getId(), dto.getCustomerName())) {
			throw new ConflictException("Duplicate customer name.");
		}
		product.setOrganization(organization);
		if (dto.getCustomerName() != null) {
			product.setCustomerName(dto.getCustomerName());
		}
		if (dto.getContactName() != null) {
			product.setContactName(dto.getContactName());
		}
		if (dto.getEmail() != null) {
			product.setEmail(dto.getEmail());
		}
		return product;
	}
	
	public Customer updateCustomerFromDTO(CustomerDTO dto, Authentication authentication) 
			throws ResourceNotFoundException, UnauthorizedException, ConflictException {
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());

		Customer customer = customerRepo.findById(dto.getCustomerId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Customer not found for this id :: " + dto.getCustomerId())); 
		
		if (isDuplicateCustomerName(dto.getOrganizationId(), dto.getCustomerName()) 
				&& !(customer.getCustomerName().equalsIgnoreCase(dto.getCustomerName().trim()))) {
			throw new ConflictException("Duplicate customer name.");
		}
		
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, customer.getOrganization().getId());
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
		customer.setOrganization(organization);
		if (dto.getCustomerName() != null) {
			customer.setCustomerName(dto.getCustomerName());
		}
		if (dto.getContactName() != null) {
			customer.setContactName(dto.getContactName());
		}
		if (dto.getEmail() != null) {
			customer.setEmail(dto.getEmail());
		}
		return customerRepo.save(customer);
	}
	
	private boolean isDuplicateCustomerName(Long organizationId, String name) {
		return customerRepo.isDuplicateCustomerName(organizationId, Utility.trimString(name.toLowerCase(), 64));
	}
}
