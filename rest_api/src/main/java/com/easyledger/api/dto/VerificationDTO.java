package com.easyledger.api.dto;

public class VerificationDTO {
	private String firstName = "";
	private String lastName = "";
	private String verificationResult = ""; //verificationResult should be one of three: "success" "failure" "expired"
	
	public VerificationDTO() {
		
	}

	public VerificationDTO(String firstName, String lastName, String verificationResult) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.verificationResult = verificationResult;
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

	public String getVerificationResult() {
		return verificationResult;
	}

	public void setVerificationResult(String verificationResult) {
		this.verificationResult = verificationResult;
	}

	@Override
	public String toString() {
		return "VerificationDTO [firstName=" + firstName + ", lastName=" + lastName + ", verificationResult="
				+ verificationResult + "]";
	}
	
	
	
}
