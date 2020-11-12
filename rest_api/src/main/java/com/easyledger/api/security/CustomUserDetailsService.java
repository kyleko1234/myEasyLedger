package com.easyledger.api.security;

import javax.transaction.Transactional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.easyledger.api.model.Person;
import com.easyledger.api.repository.PersonRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	PersonRepository personRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Person user = personRepository.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("User not found with email :: " + email));
		return UserPrincipal.create(user);
	}
	
	//This method is used by JWTAuthenticationFilter
	@Transactional
	public UserDetails loadUserById(Long id) {
		Person user = personRepository.findById(id).orElseThrow(
				() -> new UsernameNotFoundException("User not found with id :: " + id)
		);
		return UserPrincipal.create(user);
	}
}
