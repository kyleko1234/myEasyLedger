package com.easyledger.api.dto;

public class AcceptInvitationDTO {
	private String firstName;
	private String lastName;
	private String password;
	private String reEnterPassword;
	private String locale;
	private boolean agree;
	
	public AcceptInvitationDTO(String firstName, String lastName, String password, String reEnterPassword,
			String locale, boolean agree) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.reEnterPassword = reEnterPassword;
		this.locale = locale;
		this.agree = agree;
	}
	
	public AcceptInvitationDTO() {
		
	}

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

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public boolean isAgree() {
		return agree;
	}

	public void setAgree(boolean agree) {
		this.agree = agree;
	}

	@Override
	public String toString() {
		return "AcceptInvitationDTO [firstName=" + firstName + ", lastName=" + lastName + ", password=" + password
				+ ", reEnterPassword=" + reEnterPassword + ", locale=" + locale + ", agree=" + agree + "]";
	}
	
}
