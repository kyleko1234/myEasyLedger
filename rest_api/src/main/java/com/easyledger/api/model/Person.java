package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

import com.easyledger.api.dto.AccountTypeSummaryDTO;
import com.easyledger.api.dto.PersonInRosterDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


@SqlResultSetMapping( 
		name = "personInRosterDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = PersonInRosterDTO.class,
						columns = {
								@ColumnResult(name = "personId"),
								@ColumnResult(name = "firstName"),
								@ColumnResult(name = "lastName"),
								@ColumnResult(name = "email"),
								@ColumnResult(name = "locale"),
								@ColumnResult(name = "permissionTypeId"),
								@ColumnResult(name = "permissionTypeName"),
								@ColumnResult(name = "permissionId")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted entries for the given organization and maps them into EntryViewModels
		name = "Person.getAllPersonsInOrganization",
		query = "SELECT  " + 
				"    person.id AS personId, person.first_name AS firstName, person.last_name AS lastName, person.email AS email, person.locale AS locale, " + 
				"    permission_type.id AS permissionTypeId, permission_type.name AS permissionTypeName, " + 
				"    permission.id AS permissionId " + 
				"FROM person, permission_type, permission, organization " + 
				"WHERE " + 
				"    permission.person_id = person.id AND " + 
				"    permission.organization_id = organization.id AND " + 
				"    permission.permission_type_id = permission_type.id AND  " + 
				"    organization.id = :organizationId " + 
				"ORDER BY person.last_name",
		resultSetMapping = "personInRosterDTOMapping"
)

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
	@JsonIgnore
	private String password;
	
	@Column(name = "enabled")
	@JsonIgnore
	private boolean enabled;
	
	@Column(name = "locale")
	private String locale;
	
	@Column(name = "current_organization_id")
	private Long currentOrganizationId;
	
	@OneToMany(mappedBy = "person")
	@JsonIgnore
	private Set<JournalEntry> journalEntries;
	
	@OneToMany(mappedBy = "person", fetch = FetchType.EAGER)
	private Set<Permission> permissions;
	
    @ManyToMany(cascade = { CascadeType.MERGE, CascadeType.PERSIST },
    			fetch = FetchType.EAGER)
    @JoinTable(
			name = "person_role",
			joinColumns = @JoinColumn(name = "person_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	private Set<Role> roles;


	public Person() {
		this.permissions = new HashSet<Permission>();
		this.roles = new HashSet<Role>();
	}
	
	public Person(String firstName, String lastName, String email, String password, boolean enabled, String locale) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email.toLowerCase().trim();
		this.password = password;
		this.permissions = new HashSet<Permission>();
		this.enabled = enabled;
		this.locale = locale;
	}
	
	
	//Add and Remove roles
	public void addRole(Role role) {
		this.roles.add(role);
		role.getPersons().add(this);
	}
	
	public void removeRole(Role role) {
		this.roles.remove(role);
		role.getPersons().remove(this);
	}
	
	public void removeRoles() {
		for (Role role : new HashSet<>(roles)) {
			removeRole(role);
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
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getLocale() {
		return locale;
	}

	public void setLocale(String locale) {
		this.locale = locale;
	}

	public Long getCurrentOrganizationId() {
		return currentOrganizationId;
	}

	public void setCurrentOrganizationId(Long currentOrganizationId) {
		this.currentOrganizationId = currentOrganizationId;
	}

	public Set<JournalEntry> getJournalEntries() {
		return journalEntries;
	}

	public void setJournalEntries(Set<JournalEntry> journalEntries) {
		this.journalEntries = journalEntries;
	}
	
	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "Person [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", password=" + password + ", enabled=" + enabled + ", locale=" + locale + ", currentOrganizationId="
				+ currentOrganizationId + ", journalEntries=" + journalEntries + ", permissions=" + permissions
				+ ", roles=" + roles + "]";
	}
	
	
}

