package com.easyledger.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.CustomerDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Customer;
import com.easyledger.api.repository.JournalEntryRepository;
import com.easyledger.api.repository.CustomerRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.CustomerService;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class CustomerController {
	
	private CustomerRepository customerRepo;
	
	private JournalEntryRepository journalEntryRepo;
	
	private CustomerService customerService;
	
	private AuthorizationService authorizationService;

	public CustomerController(CustomerRepository customerRepo, JournalEntryRepository journalEntryRepo,
			CustomerService customerService, AuthorizationService authorizationService) {
		super();
		this.customerRepo = customerRepo;
		this.customerService = customerService;
		this.authorizationService = authorizationService;
		this.journalEntryRepo = journalEntryRepo;
	}
	
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<CustomerDTO> getCustomerById(@PathVariable(value = "customerId") Long customerId, Authentication authentication) 
    		throws UnauthorizedException, ResourceNotFoundException {
    	Customer customer = customerRepo.findById(customerId)
        		.orElseThrow(() -> new ResourceNotFoundException("Customer not found for this id :: " + customerId)); 
    	CustomerDTO dto = new CustomerDTO(customer);
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, dto.getOrganizationId());
        return ResponseEntity.ok().body(dto);
    }	

    @GetMapping("/organization/{organizationId}/customer")
    public List<CustomerDTO> getAllCustomersForOrganization(@PathVariable(value = "organizationId") Long organizationId, 
    		Authentication authentication) throws UnauthorizedException {
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
    	return customerRepo.getAllCustomersForOrganization(organizationId);
    }
    
    @PostMapping("/customer")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDTO createCustomer(@RequestBody CustomerDTO dto, Authentication authentication) 
    		throws ConflictException, UnauthorizedException, ResourceNotFoundException {
    	if (dto.getCustomerId() != null) {
    		throw new ConflictException("Please do not attempt to manually create a customerId.");
    	}
    	authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());
    	Customer updatedCustomer = customerService.createCustomerFromDTO(dto);
    	customerRepo.save(updatedCustomer);
    	return new CustomerDTO(updatedCustomer);
    }
    
    @PutMapping("/customer/{customerId}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable(value = "customerId") Long customerId,
    		@RequestBody CustomerDTO dto, Authentication authentication) 
    		throws ConflictException, UnauthorizedException, ResourceNotFoundException {
        if (!customerId.equals(dto.getCustomerId())) {
        	throw new ConflictException("Customer ID in request body does not match URI.");
        }
    	Customer updatedCustomer = customerService.updateCustomerFromDTO(dto, authentication);
        return ResponseEntity.ok(new CustomerDTO(updatedCustomer));
    }
    
    @DeleteMapping("/customer/{customerId}")
    public Map<String, Boolean> deleteCustomer(@PathVariable(value = "customerId") Long customerId, Authentication authentication) 
    		throws ResourceNotFoundException, UnauthorizedException, ConflictException {
    	Customer customer = customerRepo.findById(customerId)
            	.orElseThrow(() -> new ResourceNotFoundException("Customer not found for this id :: " + customerId));
        authorizationService.authorizeEditPermissionsByOrganizationId(authentication, customer.getOrganization().getId());
        boolean customerContainsJournalEntries = journalEntryRepo.customerContainsJournalEntries(customerId);
        if (customerContainsJournalEntries) {
        	throw new ConflictException("Cannot delete a customer with one or more journal entries.");
        }
        customerRepo.deleteById(customerId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
