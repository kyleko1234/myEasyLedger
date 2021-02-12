package com.easyledger.api.dto;

import java.math.BigInteger;

import com.easyledger.api.model.Permission;

public class PersonInRosterDTO {
	private Long personId;
	private String firstName;
	private String lastName;
	private String email;
	private String locale;
	private Long permissionTypeId;
	private String permissionTypeName;
	private Long permissionId;
	
	public PersonInRosterDTO(BigInteger personId, String firstName, String lastName, String email, String locale, BigInteger permissionTypeId,
			String permissionTypeName, BigInteger permissionId) {
		this.personId = personId.longValueExact();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.locale = locale;
		this.permissionTypeId = permissionTypeId.longValueExact();
		this.permissionTypeName = permissionTypeName;
		this.permissionId = permissionId.longValueExact();
	}
	
	public PersonInRosterDTO(Permission permission) {
		this.personId = permission.getPerson().getId();
		this.firstName = permission.getPerson().getFirstName();
		this.lastName = permission.getPerson().getLastName();
		this.email = permission.getPerson().getEmail();
		this.locale = permission.getPerson().getLocale();
		this.permissionTypeId =  permission.getPermissionType().getId();
		this.permissionTypeName = permission.getPermissionType().getName();
		this.permissionId = permission.getId();
	}

	public PersonInRosterDTO() {
		
	}
	
	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public Long getPermissionTypeId() {
		return permissionTypeId;
	}

	public void setPermissionTypeId(Long permissionTypeId) {
		this.permissionTypeId = permissionTypeId;
	}

	public String getPermissionTypeName() {
		return permissionTypeName;
	}

	public void setPermissionTypeName(String permissionTypeName) {
		this.permissionTypeName = permissionTypeName;
	}

	public Long getPermissionId() {
		return permissionId;
	}

	public void setPermissionId(Long permissionId) {
		this.permissionId = permissionId;
	}

	@Override
	public String toString() {
		return "PersonInRosterDTO [personId=" + personId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", email=" + email + ", permissionTypeId=" + permissionTypeId + ", permissionTypeName="
				+ permissionTypeName + ", permissionId=" + permissionId + "]";
	}

	
	
}
