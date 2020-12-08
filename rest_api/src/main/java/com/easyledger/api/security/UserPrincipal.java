package com.easyledger.api.security;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserPrincipal implements UserDetails {
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private boolean enabled;
	
	@JsonIgnore 
	private String password;
	
	private Collection<? extends GrantedAuthority> authorities;
	private Set<Organization> organizations;

	public UserPrincipal(Long id, String firstName, String lastName, String email, String password,
			Collection<? extends GrantedAuthority> authorities, Set<Organization> organizations, boolean enabled) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
		this.organizations = organizations;
		this.enabled = enabled;
	}



	public static UserPrincipal create(Person user) {
		List<GrantedAuthority> authorities = user.getRoles().stream().map(role -> 
				new SimpleGrantedAuthority(role.getName())
		).collect(Collectors.toList());
		
		return new UserPrincipal(user.getId(), user.getFirstName(), user.getLastName(), 
				user.getEmail(), user.getPassword(), authorities, user.getOrganizations(), user.isEnabled());
	}



	public Long getId() {
		return id;
	}



	public String getFirstName() {
		return firstName;
	}


	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
	}
	
	public Set<Organization> getOrganizations() {
		return organizations;
	}
	
	@Override
	public String getUsername() {
		return email;
	}


	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return enabled;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		UserPrincipal that = (UserPrincipal) o;
		return Objects.equals(id, that.id);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	
}
