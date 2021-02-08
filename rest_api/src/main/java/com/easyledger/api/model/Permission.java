package com.easyledger.api.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "permission")
public class Permission {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "permission_type_id")
	private PermissionType permissionType;

	public Permission(Person person, Organization organization, PermissionType permissionType) {
		super();
		this.person = person;
		this.organization = organization;
		this.permissionType = permissionType;
	}
	
	public Permission() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
		person.getPermissions().add(this);
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getPermissions().add(this);
	}

	public PermissionType getPermissionType() {
		return permissionType;
	}

	public void setPermissionType(PermissionType permissionType) {
		this.permissionType = permissionType;
		permissionType.getPermissions().add(this);
	}

	@Override
	public String toString() {
		return "Permission [id=" + id + ", person=" + person + ", organization=" + organization + ", permissionType="
				+ permissionType + "]";
	}
	
	
	
}
