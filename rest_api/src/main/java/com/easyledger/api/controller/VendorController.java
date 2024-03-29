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

import com.easyledger.api.dto.VendorDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Vendor;
import com.easyledger.api.repository.JournalEntryRepository;
import com.easyledger.api.repository.VendorRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.VendorService;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class VendorController {
	
	private VendorRepository vendorRepo;
	
	private JournalEntryRepository journalEntryRepo;
	
	private VendorService vendorService;
	
	private AuthorizationService authorizationService;

	public VendorController(VendorRepository vendorRepo, JournalEntryRepository journalEntryRepo,
			VendorService vendorService, AuthorizationService authorizationService) {
		super();
		this.vendorRepo = vendorRepo;
		this.vendorService = vendorService;
		this.authorizationService = authorizationService;
		this.journalEntryRepo = journalEntryRepo;
	}
	
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<VendorDTO> getVendorById(@PathVariable(value = "vendorId") Long vendorId, Authentication authentication) 
    		throws UnauthorizedException, ResourceNotFoundException {
    	Vendor vendor = vendorRepo.findById(vendorId)
        		.orElseThrow(() -> new ResourceNotFoundException("Vendor not found for this id :: " + vendorId)); 
    	VendorDTO dto = new VendorDTO(vendor);
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, dto.getOrganizationId());
        return ResponseEntity.ok().body(dto);
    }	

    @GetMapping("/organization/{organizationId}/vendor")
    public List<VendorDTO> getAllVendorsForOrganization(@PathVariable(value = "organizationId") Long organizationId, 
    		Authentication authentication) throws UnauthorizedException {
    	authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
    	return vendorRepo.getAllVendorsForOrganization(organizationId);
    }
    
    @PostMapping("/vendor")
    @ResponseStatus(HttpStatus.CREATED)
    public VendorDTO createVendor(@RequestBody VendorDTO dto, Authentication authentication) 
    		throws ConflictException, UnauthorizedException, ResourceNotFoundException {
    	if (dto.getVendorId() != null) {
    		throw new ConflictException("Please do not attempt to manually create a vendorId.");
    	}
    	authorizationService.authorizeEditPermissionsByOrganizationId(authentication, dto.getOrganizationId());
    	Vendor updatedVendor = vendorService.createVendorFromDTO(dto);
    	vendorRepo.save(updatedVendor);
    	return new VendorDTO(updatedVendor);
    }
    
    @PutMapping("/vendor/{vendorId}")
    public ResponseEntity<VendorDTO> updateVendor(@PathVariable(value = "vendorId") Long vendorId,
    		@RequestBody VendorDTO dto, Authentication authentication) 
    		throws ConflictException, UnauthorizedException, ResourceNotFoundException {
        if (!vendorId.equals(dto.getVendorId())) {
        	throw new ConflictException("Vendor ID in request body does not match URI.");
        }
    	Vendor updatedVendor = vendorService.updateVendorFromDTO(dto, authentication);
        return ResponseEntity.ok(new VendorDTO(updatedVendor));
    }
    
    @DeleteMapping("/vendor/{vendorId}")
    public Map<String, Boolean> deleteVendor(@PathVariable(value = "vendorId") Long vendorId, Authentication authentication) 
    		throws ResourceNotFoundException, UnauthorizedException, ConflictException {
    	Vendor vendor = vendorRepo.findById(vendorId)
            	.orElseThrow(() -> new ResourceNotFoundException("Vendor not found for this id :: " + vendorId));
        authorizationService.authorizeEditPermissionsByOrganizationId(authentication, vendor.getOrganization().getId());
        boolean vendorContainsJournalEntries = journalEntryRepo.vendorContainsJournalEntries(vendorId);
        if (vendorContainsJournalEntries) {
        	throw new ConflictException("Cannot delete a vendor with one or more journal entries.");
        }
        vendorRepo.deleteById(vendorId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
