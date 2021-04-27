package com.easyledger.api.controller;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.easyledger.api.dto.ForgotPasswordDTO;
import com.easyledger.api.exception.ConflictException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.mail.EmailServiceImpl;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.VerificationToken;
import com.easyledger.api.payload.JwtAuthenticationResponse;
import com.easyledger.api.payload.LoginRequest;
import com.easyledger.api.payload.SignUpRequest;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.repository.RoleRepository;
import com.easyledger.api.security.JwtTokenProvider;
import com.easyledger.api.service.PersonService;
import com.easyledger.api.service.VerificationService;

@RestController
@RequestMapping("/${app.apiVersion}")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PersonRepository personRepository;
    
    @Autowired
    PersonService personService;
    
    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;
    
    @Autowired 
    EmailServiceImpl emailService;
    
    @Autowired
    VerificationService verificationService;
    
    
    @PostMapping("/auth/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    	Authentication authentication = authenticationManager.authenticate(
    			new UsernamePasswordAuthenticationToken(
    					loginRequest.getEmail(),
    					loginRequest.getPassword()
    					)
    	);
    	
    	SecurityContextHolder.getContext().setAuthentication(authentication);
    	String accessToken = tokenProvider.generateAccessToken(authentication);
    	String refreshToken = tokenProvider.generateRefreshToken(authentication);
    	return ResponseEntity.ok(new JwtAuthenticationResponse(accessToken, refreshToken));
    }
    
    @PostMapping("/auth/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public String registerUser(@Valid @RequestBody SignUpRequest signUpRequest) throws ConflictException, MessagingException, ResourceNotFoundException {
    	//validate fields on the signUpRequest Form, asserting that confirmEmail and confirmPassword fields match and that the user has agreed to terms and conditions.
    	signUpRequest.validateRequest();
    	
    	//this method creates and persists a person, an organization for that person, and a verification token for the person, and returns the verification token.
    	VerificationToken verificationToken = personService.createPersonFromSignUpRequest(signUpRequest);
    	
    	return verificationService.sendVerificationMail(signUpRequest.getEmail(), signUpRequest.getFirstName(), verificationToken.getToken());
    	
    }
        
    //call when access token needs to be refreshed. use refresh token to authorize.
    @GetMapping("/auth/refresh")
    public ResponseEntity<?> refreshJwtToken() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	String accessToken = tokenProvider.generateAccessToken(authentication);
    	String refreshToken = tokenProvider.generateRefreshToken(authentication);
    	return ResponseEntity.ok(new JwtAuthenticationResponse(accessToken, refreshToken));
    }
    
    @PostMapping("/auth/forgotPassword")
    public Map<String, Boolean> generateAndSendResetPasswordCode(@RequestBody ForgotPasswordDTO dto) throws ResourceNotFoundException, MessagingException {
    	Person person = personRepository.findByEmail(dto.getEmail())
    			.orElseThrow(() -> new ResourceNotFoundException("Person cannot be found for this email:: " + dto.getEmail()));
    	VerificationToken token = verificationService.createTwoFactorCodeForPerson(person);
    	verificationService.sendPasswordResetEmail(person.getEmail(), person.getFirstName(), token.getToken());
    	Map<String, Boolean> returnObject = new HashMap<>();
    	returnObject.put("Code generated", true);
    	return returnObject;
    }
    
    @PostMapping("/auth/verifyResetPasswordCode")
    public Map<String, Boolean> verifyResetPasswordCode(@RequestBody ForgotPasswordDTO dto) throws ResourceNotFoundException, ConflictException {
    	Person person = personRepository.findByEmail(dto.getEmail())
    			.orElseThrow(() -> new ResourceNotFoundException("Person cannot be found for this email:: " + dto.getEmail()));
    	VerificationToken validToken = person.getVerificationToken();
    	if (!validToken.getToken().equals(dto.getToken())) {
    		throw new ConflictException("Incorrect password reset code.");
    	}
		Calendar cal = Calendar.getInstance();
		if (validToken.getExpiryDate().getTime() - cal.getTime().getTime() <= 0) { // if expired token
			throw new ConflictException("Expired code.");
		}
       	Map<String, Boolean> returnObject = new HashMap<>();
    	returnObject.put("verified", true);
    	return returnObject;
    }
    
    @PostMapping("/auth/resetPassword")
    public Map<String, Boolean> resetPassword(@RequestBody ForgotPasswordDTO dto) throws ResourceNotFoundException, ConflictException {
    	Person person = personRepository.findByEmail(dto.getEmail())
    			.orElseThrow(() -> new ResourceNotFoundException("Person cannot be found for this email:: " + dto.getEmail()));
    	VerificationToken validToken = person.getVerificationToken();
    	if (!validToken.getToken().equals(dto.getToken())) {
    		throw new ConflictException("Incorrect password reset code.");
    	}
		Calendar cal = Calendar.getInstance();
		if (validToken.getExpiryDate().getTime() - cal.getTime().getTime() <= 0) { // if expired token
			throw new ConflictException("Expired code.");
		}
		person.setPassword(passwordEncoder.encode(dto.getNewPassword()));
		personRepository.save(person);
       	Map<String, Boolean> returnObject = new HashMap<>();
    	returnObject.put("password changed", true);
    	return returnObject;
    }
    
    @PostMapping("/auth/checkForAvailableEmail")
    public Map<String, Boolean> checkForAvailableEmail(@RequestBody SignUpRequest request) throws MessagingException, ConflictException{
    	if (personRepository.existsByEmail(request.getEmail().toLowerCase().trim())) {
        	throw new ConflictException("Person already registered with this email :: " + request.getEmail().trim());
    	}
       	Map<String, Boolean> returnObject = new HashMap<>();
    	returnObject.put("email available", true);
    	return returnObject;
    }
    

}
