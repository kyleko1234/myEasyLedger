package com.easyledger.api.service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.easyledger.api.dto.VerificationDTO;
import com.easyledger.api.mail.EmailServiceImpl;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.VerificationToken;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.repository.VerificationTokenRepository;

@Service
public class VerificationService {
	
	@Autowired
	private VerificationTokenRepository verificationTokenRepo;
	
	@Autowired
	private PersonRepository personRepo;
	
    @Autowired 
    EmailServiceImpl emailService;
	
    @Autowired
    EmailDispatchService emailDispatchService;
    
	@Value("${app.frontendUrl}")
	private String frontendUrl;

	
	public VerificationService(VerificationTokenRepository verificationTokenRepo, PersonRepository personRepo, EmailServiceImpl emailService, EmailDispatchService emailDispatchService) {
		this.verificationTokenRepo = verificationTokenRepo;
		this.personRepo = personRepo;
		this.emailService = emailService;
		this.emailDispatchService = emailDispatchService;
	}
	
	public VerificationToken createVerificationTokenForPerson(Person person) {
		String token = UUID.randomUUID().toString();
		VerificationToken verificationToken = new VerificationToken(token);
		verificationToken.setPerson(person);
		return verificationTokenRepo.save(verificationToken);
	}
	
	public VerificationToken createTwoFactorCodeForPerson(Person person) {
		VerificationToken oldToken = verificationTokenRepo.findByPersonId(person.getId());
		if (oldToken != null) {
			verificationTokenRepo.delete(oldToken);
		}
	    Random rnd = new Random();
	    int number = rnd.nextInt(999999);
	    String twoFactorCode = String.format("%06d", number);
		VerificationToken verificationToken = new VerificationToken(twoFactorCode, 15);
		verificationToken.setPerson(person);
		return verificationTokenRepo.save(verificationToken);
	}
	
	public VerificationDTO verifyUserByToken(String token) throws MessagingException {
		VerificationDTO returnedDTO = new VerificationDTO();
		String[] result = {"firstName", "filetype.html"}; //result is an array of two strings. result[1] is the firstName of the user being verified. result[2] is the filename+extension of the html document to be served
		VerificationToken verificationToken = verificationTokenRepo.findByToken(token);
		if (verificationToken == null) { //if invalid verification token
			returnedDTO.setVerificationResult("failure");
			return returnedDTO;
		}
		Person person = verificationToken.getPerson();
		returnedDTO.setFirstName(person.getFirstName());
		returnedDTO.setLastName(person.getLastName());
		Calendar cal = Calendar.getInstance();
		if (verificationToken.getExpiryDate().getTime() - cal.getTime().getTime() <= 0) { // if expired token
			renewVerificationToken(person);
			returnedDTO.setVerificationResult("expired");
			return returnedDTO;
		}
		person.setEnabled(true); //if valid token, enable this Person
		personRepo.save(person);
		returnedDTO.setVerificationResult("success");
		return returnedDTO;
		
	}
	
	public String sendPasswordResetEmail(String to, String firstName, String lastName, String token, String locale) throws MessagingException {
    	//send verification email to recipient
    	emailDispatchService.sendPasswordResetEmail(to, firstName, lastName, token, locale);
    	return "Email sent successfully!";
	}
	
	public void renewVerificationToken(Person person) throws MessagingException {
		VerificationToken oldToken = verificationTokenRepo.findByPersonId(person.getId());
		if (oldToken != null) {
			verificationTokenRepo.delete(oldToken);
		}
		VerificationToken newToken = createVerificationTokenForPerson(person);
		sendVerificationMail(person.getEmail(), person.getFirstName(), person.getLastName(), newToken.getToken(), person.getLocale());
	}
	
	public String sendVerificationMail(String to, String firstName, String lastName, String token, String locale) throws MessagingException {
    	//send verification email to recipient
    	emailDispatchService.sendVerificationMail(to, firstName, lastName, token, locale);
    	return "User registered successfully!";
	}
}
