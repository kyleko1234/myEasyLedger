package com.easyledger.api.dto;

import java.math.BigInteger;

import com.easyledger.api.model.Customer;

public class CustomerDTO {
	private Long customerId;
	private String customerName;
	private String contactName;
	private String email;
	private Long organizationId;
	
	public CustomerDTO(BigInteger customerId, String customerName, String contactName, String email, BigInteger organizationId) {
		this.customerId = customerId.longValueExact();
		if (customerName != null) {
			this.customerName = customerName;
		}
		if (contactName != null) {
			this.contactName = contactName;
		}
		if (email != null) {
			this.email = email;
		}
		this.organizationId = organizationId.longValueExact();
	}
	
	public CustomerDTO (Customer customer) {
		this.customerId = customer.getId();
		if (customer.getCustomerName() != null) {
			this.customerName = customer.getCustomerName();
		}
		if (customer.getContactName() != null) {
			this.contactName = customer.getContactName();
		}
		if (customer.getEmail() != null) {
			this.email = customer.getEmail();
		}
		this.organizationId = customer.getOrganization().getId();
	}
	
	public CustomerDTO() {
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}
	
}
