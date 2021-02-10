package com.easyledger.api.dto;

import java.math.BigInteger;

public class PersonInRosterDTO {
	private Long personId;
	private String firstName;
	private String lastName;
	private String email;
	private Long permissionTypeId;
	private String permissionTypeName;
	
	public PersonInRosterDTO(BigInteger personId, String firstName, String lastName, String email, BigInteger permissionTypeId,
			String permissionTypeName) {
		this.personId = personId.longValueExact();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.permissionTypeId = permissionTypeId.longValueExact();
		this.permissionTypeName = permissionTypeName;
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

	@Override
	public String toString() {
		return "PersonInRosterDTO [personId=" + personId + ", firstName=" + firstName + ", lastName=" + lastName
				+ ", email=" + email + ", permissionTypeId=" + permissionTypeId + ", permissionTypeName="
				+ permissionTypeName + "]";
	}
	
	
}
