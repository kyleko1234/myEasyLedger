package com.easyledger.api.dto;

public class ForgotPasswordDTO {
	private String email;
	private String token;
	private String newPassword;
	
	public ForgotPasswordDTO(String email, String token, String newPassword) {
		super();
		this.email = email;
		this.token = token;
		this.newPassword = newPassword;
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

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	@Override
	public String toString() {
		return "ForgotPasswordDTO [email=" + email + ", token=" + token + ", newPassword=" + newPassword + "]";
	}

}
