package com.easyledger.api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.AccountSubtype;
import com.easyledger.api.repository.AccountSubtypeRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/v0.2")
public class AccountSubtypeController {
	
	private AccountSubtypeRepository accountSubtypeRepo;
	
	public AccountSubtypeController(AccountSubtypeRepository accountSubtypeRepo) {
		super();
		this.accountSubtypeRepo = accountSubtypeRepo;
	}
	
	@GetMapping("/accountSubtype")
	public List<AccountSubtype> getAllAccountSubtypes() {
		return accountSubtypeRepo.findAll();
	}
	
	@GetMapping("/accountSubtype/{id}")
	public AccountSubtype getAccountSubtypeById(@PathVariable(value = "id") Long accountSubtypeId) throws ResourceNotFoundException {
		AccountSubtype accountSubtype = accountSubtypeRepo.findById(accountSubtypeId)
		          .orElseThrow(() -> new ResourceNotFoundException("AccountSubtype not found for this id :: " + accountSubtypeId));
		return accountSubtype;
	}
}
