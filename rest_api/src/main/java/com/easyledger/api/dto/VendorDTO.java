package com.easyledger.api.dto;

import java.math.BigInteger;

import com.easyledger.api.model.Vendor;

public class VendorDTO {
	private Long vendorId;
	private String vendorName;
	private String contactName;
	private String email;
	private Long organizationId;
	
	public VendorDTO(BigInteger vendorId, String vendorName, String contactName, String email, BigInteger organizationId) {
		this.vendorId = vendorId.longValueExact();
		if (vendorName != null) {
			this.vendorName = vendorName;
		}
		if (contactName != null) {
			this.contactName = contactName;
		}
		if (email != null) {
			this.email = email;
		}
		this.organizationId = organizationId.longValueExact();
	}
	
	public VendorDTO (Vendor vendor) {
		this.vendorId = vendor.getId();
		if (vendor.getVendorName() != null) {
			this.vendorName = vendor.getVendorName();
		}
		if (vendor.getContactName() != null) {
			this.contactName = vendor.getContactName();
		}
		if (vendor.getEmail() != null) {
			this.email = vendor.getEmail();
		}
		this.organizationId = vendor.getOrganization().getId();
	}
	
	public VendorDTO() {
	}

	public Long getVendorId() {
		return vendorId;
	}

	public void setVendorId(Long vendorId) {
		this.vendorId = vendorId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
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
