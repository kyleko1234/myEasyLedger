package com.easyledger.api.security;

import java.util.Set;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.Organization;

@Service
public class AuthorizationService {
	
	public AuthorizationService( ) {
		
	}
	
	public void authorizeByOrganizationId(Authentication authentication, Long organizationId) throws UnauthorizedException {
		Set<Organization> organizations = ((UserPrincipal) authentication.getPrincipal()).getOrganizations();
		for (Organization organization : organizations) {
			if (organizationId == organization.getId()) {
				return;
			} 
		}
		throw new UnauthorizedException("User is not authorized to access this resource.");
	}
}
