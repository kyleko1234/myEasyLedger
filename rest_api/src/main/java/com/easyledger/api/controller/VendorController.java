package com.easyledger.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.VendorDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Vendor;
import com.easyledger.api.repository.VendorRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.VendorService;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class VendorController {
	
	private VendorRepository vendorRepo;
	
	private VendorService vendorService;
	
	private AuthorizationService authorizationService;

	public VendorController(VendorRepository vendorRepo, VendorService vendorService, AuthorizationService authorizationService) {
		super();
		this.vendorRepo = vendorRepo;
		this.vendorService = vendorService;
		this.authorizationService = authorizationService;
	}
	
    @GetMapping("/vendor/{id}")
    public ResponseEntity<VendorDTO> getVendorById(@PathVariable(value = "id") Long vendorId, Authentication authentication) 
    		throws UnauthorizedException, ResourceNotFoundException {
    	Vendor vendor = vendorRepo.findById(vendorId)
        		.orElseThrow(() -> new ResourceNotFoundException("Journal Entry not found for this id :: " + vendorId)); 
    	VendorDTO dto = new VendorDTO(vendor);
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, dto.getOrganizationId());
        return ResponseEntity.ok().body(dto);
    }	

}
