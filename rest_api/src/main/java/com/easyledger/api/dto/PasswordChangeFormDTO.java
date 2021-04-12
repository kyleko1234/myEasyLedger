package com.easyledger.api.dto;

public class PasswordChangeFormDTO {
	private String currentPassword;
	private String newPassword;
	private String confirmNewPassword;
	
	public PasswordChangeFormDTO(String currentPassword, String newPassword, String confirmNewPassword) {
		super();
		this.currentPassword = currentPassword;
		this.newPassword = newPassword;
		this.confirmNewPassword = confirmNewPassword;
	}
	
	public PasswordChangeFormDTO() {
		
	}
	
	public String getCurrentPassword() {
		return currentPassword;
	}
	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getConfirmNewPassword() {
		return confirmNewPassword;
	}
	public void setConfirmNewPassword(String confirmNewPassword) {
		this.confirmNewPassword = confirmNewPassword;
	}

	@Override
	public String toString() {
		return "PasswordChangeFormDTO [currentPassword=" + currentPassword + ", newPassword=" + newPassword
				+ ", confirmNewPassword=" + confirmNewPassword + "]";
	}
	
}
