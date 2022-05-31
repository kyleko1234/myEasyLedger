package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.VendorDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Vendor;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.VendorRepository;
import com.easyledger.api.security.AuthorizationService;

@Service
public class VendorService {

	@Autowired
	VendorRepository vendorRepo;
	
	@Autowired
	OrganizationRepository organizationRepo;
	
	@Autowired
	AuthorizationService authorizationService;

	public VendorService(VendorRepository vendorRepo, OrganizationRepository organizationRepo, AuthorizationService authorizationService) {
		super();
		this.vendorRepo = vendorRepo;
		this.organizationRepo = organizationRepo;
		this.authorizationService = authorizationService;
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
	
	public Vendor updateVendorFromDTO(VendorDTO dto, Authentication authentication) 
			throws ResourceNotFoundException, UnauthorizedException {
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());
		Vendor vendor = vendorRepo.findById(dto.getVendorId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Vendor not found for this id :: " + dto.getVendorId())); 
		authorizationService.authorizeEditPermissionsByOrganizationId(authentication, vendor.getOrganization().getId());
		Organization organization = organizationRepo.findById(dto.getOrganizationId())
	    		.orElseThrow(() -> new ResourceNotFoundException("Organization not found for this id :: " + dto.getOrganizationId())); 
		vendor.setOrganization(organization);
		if (dto.getVendorName() != null) {
			vendor.setVendorName(dto.getVendorName());
		}
		if (dto.getContactName() != null) {
			vendor.setContactName(dto.getContactName());
		}
		if (dto.getEmail() != null) {
			vendor.setEmail(dto.getEmail());
		}
		return vendorRepo.save(vendor);
	}
}
