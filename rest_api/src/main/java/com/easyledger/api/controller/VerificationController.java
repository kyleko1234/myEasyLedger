package com.easyledger.api.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.VerificationToken;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.repository.VerificationTokenRepository;
import com.easyledger.api.service.VerificationService;

@RestController
@RequestMapping("/${app.apiVersion}")
public class VerificationController {

	@Autowired
	VerificationService verificationService;
	
	@Autowired
	VerificationTokenRepository verificationTokenRepo;
	
	@Autowired
	PersonRepository personRepo;
	
	@Autowired
	private SpringTemplateEngine thymeleafTemplateEngine;

	
	@GetMapping(value="/verification/{token}", produces = MediaType.TEXT_HTML_VALUE)
	public String verifyUser(@PathVariable(value = "token") String token) throws MessagingException {
		//verificationService.verifyUserByToken(token) searches the database for existence of the token, checks if the token is expired, enables the verified User if the token is valid, and returns:
		// [0]: the first name of the user associated with the given token. If the token is expired, a new one is sent to the email of the user. If the token is invalid, this field is "firstName".
		// [1]: the name+extension of the html file that is to be displayed to the user.
		String[] thymeleafParameters = verificationService.verifyUserByToken(token);
		Context thymeleafContext = new Context();
		thymeleafContext.setVariable("greeting", "Hello " + thymeleafParameters[0] + ".");
		String htmlBody = thymeleafTemplateEngine.process(thymeleafParameters[1], thymeleafContext);
		return htmlBody;
	}
	
	@GetMapping(value="/verification/resend/{email}")
	public void resendVerification(@PathVariable(value = "email") String email) throws ResourceNotFoundException, MessagingException {
		Person person = personRepo.findByEmail(email)
	    		.orElseThrow(() -> new ResourceNotFoundException("Person not found for this id :: " + email)); 
		verificationService.renewVerificationToken(person);
	}
}
