package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@Entity
@Table(name = "person")
public class Person {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "first_name", nullable = true)
	private String firstName;
	
	@Column(name = "last_name", nullable = true)
	private String lastName;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "password", nullable = false)
	private String password;
	
	@OneToMany(mappedBy = "person")
	@JsonIgnore
	private Set<JournalEntry> journalEntries;
	
    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(
			name = "organization_person",
			joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "organization_id", referencedColumnName = "id"))
	private Set<Organization> organizations;

	public Person() {
		this.organizations = new HashSet<Organization>();
	}
	
	public Person(String firstName, String lastName, String email, String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email.toLowerCase().trim();
		this.password = password;
		this.organizations = new HashSet<Organization>();
	}
	
	//Add and Remove organizations
	public void addOrganization(Organization organization) {
		this.organizations.add(organization);
		organization.getPersons().add(this);
	}
	
	public void removeOrganization(Organization organization) {
		this.organizations.remove(organization);
		organization.getPersons().remove(this);
	}
	
	public void removeOrganizations() {
		for (Organization organization : new HashSet<>(organizations)) {
			removeOrganization(organization);
		}
	}

	//Getters, Setters, toString
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
		if (password == null) {
			return null;
		}
		return "*******";
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<JournalEntry> getJournalEntries() {
		return journalEntries;
	}

	public void setJournalEntries(Set<JournalEntry> journalEntries) {
		this.journalEntries = journalEntries;
	}
	
	public Set<Organization> getOrganizations() {
		return organizations;
	}

	public void setOrganizations(Set<Organization> organizations) {
		this.organizations = organizations;
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", password=" + password + ", journalEntries=" + journalEntries + ", organizations=" + organizations
				+ "]";
	}
	
	
	
}

