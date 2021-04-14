package com.easyledger.api.dto;

public class ForgotPasswordDTO {
	private String email;
	private String token;
	
	public ForgotPasswordDTO(String email, String token) {
		super();
		this.email = email;
		this.token = token;
	}
	
	public ForgotPasswordDTO() {
		
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	@Override
	public String toString() {
		return "ForgotPasswordDTO [email=" + email + ", token=" + token + "]";
	}
	
}
