package com.easyledger.api.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.VerificationDTO;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.service.VerificationService;

@RestController
@RequestMapping("/${app.apiVersion}")
public class VerificationController {

	@Autowired
	VerificationService verificationService;
		
	@Autowired
	PersonRepository personRepo;
	
	@GetMapping(value="/verification/{token}")
	public VerificationDTO verifyUser(@PathVariable(value = "token") String token) throws MessagingException {
		/*
		 * verificationService.verifyUserByToken(token) searches the database for existence of the token, checks if the token is expired, 
		 * enables the verified User if the token is valid, and returns a VerificationDTO with fields firstName, lastName, and verificationResult.
		 * firstName and lastName are nullable fields that represent the person that is associated with the 'token' argument to this function.
		 * verificationResult is a string that can be one of three possibilities: "success", "failure", and "expired"
		*/
		return verificationService.verifyUserByToken(token);
	}
	
	@GetMapping(value="/verification/resend/{email}")
	public void resendVerification(@PathVariable(value = "email") String email) throws ResourceNotFoundException, MessagingException {
		Person person = personRepo.findByEmail(email)
	    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + email)); 
		verificationService.renewVerificationToken(person);
	}
}
