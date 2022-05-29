package com.easyledger.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	
}
