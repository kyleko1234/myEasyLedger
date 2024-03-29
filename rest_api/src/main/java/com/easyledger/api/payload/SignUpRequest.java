package com.easyledger.api.payload;

import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.easyledger.api.exception.ConflictException;

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
	
	private String reEnterEmail;
	
	@NotBlank
	@Size(max = 64)
	private String password;
	
	private String reEnterPassword;
	
	private boolean agree;
	
	private String locale;
	
	@NotBlank
	@Size(max = 64)
	private String organizationName;
	
	private String currency;
	
	private BigDecimal initialRetainedEarnings;
	
	private boolean isEnterprise;

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

	public String getReEnterEmail() {
		return reEnterEmail;
	}

	public void setReEnterEmail(String reEnterEmail) {
		this.reEnterEmail = reEnterEmail;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getReEnterPassword() {
		return reEnterPassword;
	}

	public void setReEnterPassword(String reEnterPassword) {
		this.reEnterPassword = reEnterPassword;
	}

	public boolean isAgree() {
		return agree;
	}

	public void setAgree(boolean agree) {
		this.agree = agree;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public boolean isIsEnterprise() {
		return isEnterprise;
	}

	public void setIsEnterprise(boolean isEnterprise) {
		this.isEnterprise = isEnterprise;
	}

	public BigDecimal getInitialRetainedEarnings() {
		return initialRetainedEarnings;
	}

	public void setInitialRetainedEarnings(BigDecimal initialRetainedEarnings) {
		this.initialRetainedEarnings = initialRetainedEarnings;
	}

	//TODO: write confirmValidEmail to perform a regex check for a properly formatted email
	private boolean confirmMatchingEmail() throws ConflictException{ 
		if (!email.equals(reEnterEmail)) {
			throw new ConflictException("Email does not match.");
		}
		return true;
	}
	
	//TODO: write confirmValidPassword() to perform a regex check for a properly formatted password
	private boolean confirmMatchingPassword() throws ConflictException {
		if (!password.equals(reEnterPassword)) {
			throw new ConflictException("Password does not match.");
		}
		return true;
	}
	
	private boolean confirmAgree() throws ConflictException {
		if (!agree) {
			throw new ConflictException("Please agree to the terms and conditions.");
		}
		return true;
	}
	
	public boolean validateRequest() throws ConflictException {
		return (confirmMatchingEmail() && confirmMatchingPassword() && confirmAgree());
	}
	
	
	
}
