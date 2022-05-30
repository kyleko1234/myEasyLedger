package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.VendorDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Vendor;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.VendorRepository;

@Service
public class VendorService {

	@Autowired
	VendorRepository vendorRepo;
	
	@Autowired
	OrganizationRepository organizationRepo;

	public VendorService(VendorRepository vendorRepo, OrganizationRepository organizationRepo) {
		super();
		this.vendorRepo = vendorRepo;
		this.organizationRepo = organizationRepo;
	}
	
	public Vendor createVendorFromDTO(VendorDTO dto) throws ResourceNotFoundException {
		Vendor product = new Vendor();
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
		product.setOrganization(organization);
		if (dto.getVendorName() != null) {
			product.setVendorName(dto.getVendorName());
		}
		if (dto.getContactName() != null) {
			product.setContactName(dto.getContactName());
		}
		if (dto.getEmail() != null) {
			product.setEmail(dto.getEmail());
		}
		return product;
	}
}
