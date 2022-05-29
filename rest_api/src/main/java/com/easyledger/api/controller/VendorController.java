package com.easyledger.api.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.repository.VendorRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class VendorController {
	
	private VendorRepository vendorRepo;

	public VendorController(VendorRepository vendorRepo) {
		super();
		this.vendorRepo = vendorRepo;
	}
	

}
