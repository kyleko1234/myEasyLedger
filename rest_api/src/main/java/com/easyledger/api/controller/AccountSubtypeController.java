package com.easyledger.api.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.security.AuthorizationService;

@RestController
@CrossOrigin("*")
@RequestMapping("/${app.apiVersion}")
public class AccountSubtypeController {
	
	private AccountSubtypeRepository accountSubtypeRepo;
	private AuthorizationService authorizationService;
	
	public AccountSubtypeController(AccountSubtypeRepository accountSubtypeRepo, AuthorizationService authorizationService) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.authorizationService = authorizationService;
	}
	
	@GetMapping("/accountSubtype")
	public List<AccountSubtype> getAllAccountSubtypes() {
		return accountSubtypeRepo.findAllByOrderByIdAsc();
	}
	
	@GetMapping("/accountSubtype/{id}")
	public AccountSubtype getAccountSubtypeById(@PathVariable(value = "id") Long accountSubtypeId) throws ResourceNotFoundException {
		AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
		          .orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
		return accountSubtype;
	}
	
	@GetMapping("/organization/{id}/accountSubtypeBalance")
	public List<AccountSubtypeBalanceDTO> getAllAccountSubtypeBalancesForOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication)
		throws UnauthorizedException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganization(organizationId);
	}
	
	@GetMapping("/organization/{id}/accountSubtypeBalance/{endDate}")
	public List<AccountSubtypeBalanceDTO> getAllAccountSubtypeBalancesForOrganizationUpToDate(@PathVariable(value = "id") Long organizationId, 
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) 
	throws UnauthorizedException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationUpToDate(organizationId, endDate);
	}
	
	@GetMapping("/organization/{id}/accountSubtypeBalance/{startDate}/{endDate}")
	public List<AccountSubtypeBalanceDTO> getAllAccountSubtypeBalancesForOrganizationBetweenDates(@PathVariable(value = "id") Long organizationId, 
			@PathVariable(value = "startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
			@PathVariable(value = "endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate, Authentication authentication) 
	throws UnauthorizedException {
		authorizationService.authorizeViewPermissionsByOrganizationId(authentication, organizationId);
		return accountSubtypeRepo.getAllAccountSubtypeBalancesForOrganizationBetweenDates(organizationId, startDate, endDate);
	}
}
