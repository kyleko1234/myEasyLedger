package com.easyledger.api.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SignUpRequest {
	
	@NotBlank
	@Size(max = 25)
	private String firstName;
	
	@NotBlank
	@Size(max = 25)
	private String lastName;
	
	@NotBlank
	@Email
	@Size(max = 255)
	private String email;
	
	@NotBlank
	@Size(max = 64)
	private String password;
	
	@NotBlank
	@Size(max = 50)
	private String organizationName;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}
	
	
	
	
}
