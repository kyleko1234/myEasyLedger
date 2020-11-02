package com.easyledger.api.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	private PersonRepository personRepo;
	
	@Autowired
	public UserDetailsServiceImpl(PersonRepository personRepo) {    
		this.personRepo = personRepo;    
    }    
	
	@Override 
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {    
		Person user = personRepo.findByEmail(userName)
				.orElseThrow(() -> new UsernameNotFoundException("User: " + userName + " not found"));    
	    return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),    
	    		Arrays.asList(new SimpleGrantedAuthority("user")));    
	    }    


}
