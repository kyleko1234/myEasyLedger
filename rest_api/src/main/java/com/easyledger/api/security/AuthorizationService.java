package com.easyledger.api.security;

import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Permission;

@Service
public class AuthorizationService {
	
	public AuthorizationService() {
	}
	
	public void authorizeViewPermissionsByOrganizationId(Authentication authentication, Long organizationId) throws UnauthorizedException {
		System.out.println("organizationId: " + organizationId);
		Set<Permission> permissions = ((UserPrincipal) authentication.getPrincipal()).getPermissions();
		for (Permission permission : permissions) {
			System.out.println("Comparing organizationId " + organizationId + " to user's organization " + permission.getOrganization().getId());
			if (permission.getOrganization().getId() == organizationId && permission.getPermissionType().getId() >= 1) {
				System.out.println("Success!");
				return;
			}
		}
		System.out.println("Authentication failed.");
		//throw new UnauthorizedException("User is not authorized to access this resource.");
	}
	
	public void authorizeEditPermissionsByOrganizationId(Authentication authentication, Long organizationId) throws UnauthorizedException {
		Set<Permission> permissions = ((UserPrincipal) authentication.getPrincipal()).getPermissions();
		for (Permission permission : permissions) {
			if (permission.getOrganization().getId() == organizationId && permission.getPermissionType().getId() >= 2) {
				return;
			}
		}
		//throw new UnauthorizedException("User is not authorized to access this resource.");
	}
	
	public void authorizeAdminPermissionsByOrganizationId(Authentication authentication, Long organizationId) throws UnauthorizedException {
		Set<Permission> permissions = ((UserPrincipal) authentication.getPrincipal()).getPermissions();
		for (Permission permission : permissions) {
			if (permission.getOrganization().getId() == organizationId && permission.getPermissionType().getId() >= 3) {
				return;
			}
		}
		//throw new UnauthorizedException("User is not authorized to access this resource.");
	}
	
	public void authorizeOwnPermissionsByOrganizationId(Authentication authentication, Long organizationId) throws UnauthorizedException {
		Set<Permission> permissions = ((UserPrincipal) authentication.getPrincipal()).getPermissions();
		for (Permission permission : permissions) {
			if (permission.getOrganization().getId() == organizationId && permission.getPermissionType().getId() >= 4) {
				return;
			}
		}
		//throw new UnauthorizedException("User is not authorized to access this resource.");
	}
	
	public void assertHigherPermissionType(Authentication authentication, Long organizationId, Long permissionType) throws UnauthorizedException {
		Set<Permission> permissions = ((UserPrincipal) authentication.getPrincipal()).getPermissions();
		for (Permission permission : permissions) {
			if (permission.getOrganization().getId() == organizationId && permission.getPermissionType().getId() > permissionType) {
				return;
			}
		}
		throw new UnauthorizedException("User is not authorized to access this resource.");
	}
}
