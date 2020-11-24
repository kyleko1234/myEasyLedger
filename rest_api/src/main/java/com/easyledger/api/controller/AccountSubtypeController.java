package com.easyledger.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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

import com.easyledger.api.dto.AccountDTO;
import com.easyledger.api.dto.AccountSubtypeDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.exception.UnauthorizedException;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountRepository;
import com.easyledger.api.repository.AccountSubtypeRepository;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.security.AuthorizationService;
import com.easyledger.api.service.AccountSubtypeService;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.1")
public class AccountSubtypeController {

	private AccountSubtypeRepository accountSubtypeRepo;
	private AccountSubtypeService accountSubtypeService;
	private AccountRepository accountRepo;
	private OrganizationRepository organizationRepo;
	private AuthorizationService authorizationService;

    public AccountSubtypeController(AccountSubtypeRepository accountSubtypeRepo, AccountSubtypeService accountSubtypeService, 
    		AccountRepository accountRepo, OrganizationRepository organizationRepo, AuthorizationService authorizationService) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
		this.accountSubtypeService = accountSubtypeService;
		this.accountRepo = accountRepo;
		this.organizationRepo = organizationRepo;
		this.authorizationService = authorizationService;
	}
    
    @Secured("ROLE_ADMIN")
	@GetMapping("/accountSubtype")
    public ArrayList<AccountSubtypeDTO> getAllCategories() {
        List<AccountSubtype> categories = accountSubtypeRepo.findAll();
        ArrayList<AccountSubtypeDTO> accountSubtypeDtos = new ArrayList<AccountSubtypeDTO>();
        for (AccountSubtype accountSubtype : categories) {
        	accountSubtypeDtos.add(new AccountSubtypeDTO(accountSubtype));
        }
        return accountSubtypeDtos;
    }

    
    @GetMapping("/accountSubtype/{id}")
    public ResponseEntity<AccountSubtypeDTO> getAccountSubtypeById(@PathVariable(value = "id") Long accountSubtypeId, Authentication authentication)
        throws ResourceNotFoundException, UnauthorizedException {
        AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
          .orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
        authorizationService.authorizeByOrganizationId(authentication, accountSubtype.getOrganization().getId());
        AccountSubtypeDTO dto = new AccountSubtypeDTO(accountSubtype);
        return ResponseEntity.ok().body(dto);
    }
    
    @GetMapping("/organization/{id}/accountSubtype")
    public List<AccountSubtypeDTO> getAllAccountSubtypesForOrganization(@PathVariable(value = "id") Long organizationId, Authentication authentication)
    	throws UnauthorizedException {
    	authorizationService.authorizeByOrganizationId(authentication, organizationId);
    	return accountSubtypeRepo.getAllAccountSubtypesForOrganization(organizationId);
    }
    
    @PostMapping("/accountSubtype")
    @ResponseStatus(HttpStatus.CREATED)
    public AccountSubtypeDTO createAccountSubtype(@Valid @RequestBody AccountSubtypeDTO dto, Authentication authentication) 
    	throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	if (dto.getAccountSubtypeId() != null) {
    		throw new ConflictException("Please do not attempt to manually create an accountSubtypeId.");
    	}
    	authorizationService.authorizeByOrganizationId(authentication, dto.getOrganizationId());
    	AccountSubtype accountSubtype = accountSubtypeService.createAccountSubtypeFromDTO(dto);
    	final AccountSubtype updatedAccountSubtype = accountSubtypeRepo.save(accountSubtype);
    	return new AccountSubtypeDTO(updatedAccountSubtype);
    	}

    @PutMapping("/accountSubtype/{id}")
    public ResponseEntity<AccountSubtypeDTO> updateAccountSubtype(@PathVariable(value = "id") Long accountSubtypeId,
        @Valid @RequestBody AccountSubtypeDTO dto, Authentication authentication) throws ResourceNotFoundException, ConflictException, UnauthorizedException {
    	AccountSubtype accountSubtypeDetails = accountSubtypeService.createAccountSubtypeFromDTO(dto);
        if (!accountSubtypeId.equals(accountSubtypeDetails.getId())) {
        	throw new ConflictException("AccountSubtype ID in request body does not match URI.");
        }
    	AccountSubtype oldAccountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
    	authorizationService.authorizeByOrganizationId(authentication, dto.getOrganizationId());
    	authorizationService.authorizeByOrganizationId(authentication, oldAccountSubtype.getOrganization().getId());
    	final AccountSubtype updatedAccountSubtype = accountSubtypeRepo.save(accountSubtypeDetails);
    	AccountSubtypeDTO newDto = new AccountSubtypeDTO(updatedAccountSubtype);
        return ResponseEntity.ok(newDto);
    }

    @DeleteMapping("/accountSubtype/{id}")
    public Map<String, Boolean> deleteAccountSubtype(@PathVariable(value = "id") Long accountSubtypeId, Authentication authentication)
        throws ResourceNotFoundException, ConflictException, UnauthorizedException {
        AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
        	.orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
        authorizationService.authorizeByOrganizationId(authentication, accountSubtype.getOrganization().getId());
        boolean accountSubtypeContainsAccounts = accountRepo.accountSubtypeContainsAccounts(accountSubtypeId);
        if (accountSubtypeContainsAccounts) {
        	throw new ConflictException("Please remove all accounts from this AccountSubtype before deleting the AccountSubtype.");
        }
        accountSubtype.setDeleted(true);
        accountSubtypeRepo.save(accountSubtype);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
    
}
