package com.easyledger.api.controller;

import java.net.URI;
import java.util.Collections;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.easyledger.api.exception.AppException;
import com.easyledger.api.exception.ResourceNotFoundException;
import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.easyledger.api.model.Role;
import com.easyledger.api.payload.ApiResponse;
import com.easyledger.api.payload.JwtAuthenticationResponse;
import com.easyledger.api.payload.LoginRequest;
import com.easyledger.api.payload.SignUpRequest;
import com.easyledger.api.repository.OrganizationRepository;
import com.easyledger.api.repository.PersonRepository;
import com.easyledger.api.repository.RoleRepository;
import com.easyledger.api.security.JwtTokenProvider;

@RestController
@RequestMapping("/v0.1")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PersonRepository personRepository;
    
    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;
    
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
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    	if(personRepository.existsByEmail(signUpRequest.getEmail())) {
    		return new ResponseEntity(new ApiResponse(false, "Email is already taken!"), HttpStatus.BAD_REQUEST);
    	}
    	
    	Organization organization = new Organization(signUpRequest.getOrganizationName());
    	organizationRepository.save(organization);
    	
    	Person person = new Person(signUpRequest.getFirstName(), signUpRequest.getLastName(), signUpRequest.getEmail(), signUpRequest.getPassword());
    	person.setPassword(passwordEncoder.encode(person.getPassword()));
    	person.addOrganization(organization);
    	
    	Role userRole = roleRepository.findByName("ROLE_USER")
    			.orElseThrow(() -> new AppException("ROLE_USER does not exist."));
    	person.setRoles(Collections.singleton(userRole));
    	Person result = personRepository.save(person);
    	
    	
    	
    	URI location = ServletUriComponentsBuilder
    			.fromCurrentContextPath().path("/v0.1/person/{id}")
    			.buildAndExpand(result.getEmail())
    			.toUri();
    	
    	return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully!"));
    	
    }
    
    //call when access token needs to be refreshed. use refresh token to authorize.
    @GetMapping("/auth/refresh")
    public ResponseEntity<?> refreshJwtToken() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	String accessToken = tokenProvider.generateAccessToken(authentication);
    	String refreshToken = tokenProvider.generateRefreshToken(authentication);
    	return ResponseEntity.ok(new JwtAuthenticationResponse(accessToken, refreshToken));
    }

}
