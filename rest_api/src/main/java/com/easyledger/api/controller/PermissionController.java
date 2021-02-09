package com.easyledger.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.model.Permission;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PermissionRepository;
import com.easyledger.api.repository.PermissionTypeRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.security.AuthorizationService;

@RestController
@RequestMapping("/v0.2")
public class PermissionController {
	private PermissionRepository permissionRepo;
	private PermissionTypeRepository permissionTypeRepo;
	private OrganizationRepository organizationRepo;
	private PersonRepository personRepo;
	private AuthorizationService authorizationService;
	
	public PermissionController(PermissionRepository permissionRepo, PermissionTypeRepository permissionTypeRepo,
			OrganizationRepository organizationRepo, PersonRepository personRepo,
			AuthorizationService authorizationService) {
		super();
		this.permissionRepo = permissionRepo;
		this.permissionTypeRepo = permissionTypeRepo;
		this.organizationRepo = organizationRepo;
		this.personRepo = personRepo;
		this.authorizationService = authorizationService;
	}
	
}
