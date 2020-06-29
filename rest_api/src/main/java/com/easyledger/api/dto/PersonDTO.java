package com.easyledger.api.dto;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import com.easyledger.api.model.Organization;
import com.easyledger.api.model.Person;

//This DTO should only be used to respond to a GET request. Attempting to use this
//DTO to insert information into the database will result in the database storing the password as "*******".
public class PersonDTO {

	private Long personId;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Set<Long> organizationIds;
	
	public PersonDTO (Person person) {
		this.personId = person.getId();
		this.firstName = person.getFirstName();
		this.lastName = person.getLastName();
		this.email = person.getEmail();
		this.password = person.getPassword();
		
		HashSet<Long> setOfIds = new HashSet<Long>();
		Iterator<Organization> organizationIterator = person.getOrganizations().iterator();
		while (organizationIterator.hasNext()) {
			Organization organization = organizationIterator.next();
			setOfIds.add(organization.getId());
		}
		this.organizationIds = setOfIds;
	}
	
	public PersonDTO() {
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
		this.email = email.toLowerCase().trim();
	}

	public String getPassword() {
		return "*******";
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Long> getOrganizationIds() {
		return organizationIds;
	}

	public void setOrganizationIds(Set<Long> organizationIds) {
		this.organizationIds = organizationIds;
	}

	@Override
	public String toString() {
		return "PersonDTO [personId=" + personId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", password=" + password + ", organizationIds=" + organizationIds + "]";
	}
	
	
}
