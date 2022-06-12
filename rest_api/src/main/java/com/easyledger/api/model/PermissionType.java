package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.easyledger.api.utility.Utility;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "permission_type")
public class PermissionType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;
	
	@OneToMany(mappedBy = "permissionType")
	@JsonIgnore
	private Set<Permission> permissions = new HashSet<Permission>();

	public PermissionType(String name) {
		super();
		this.name = Utility.trimString(name, 64);
	}
	
	public PermissionType() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = Utility.trimString(name, 64);
	}

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	@Override
	public String toString() {
		return "PermissionType [id=" + id + ", name=" + name + ", permissions=" + permissions + "]";
	}
	
	
}
