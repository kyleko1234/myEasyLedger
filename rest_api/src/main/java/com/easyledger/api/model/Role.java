package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "role")
public class Role {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@ManyToMany(mappedBy = "roles")
	@JsonIgnore
	private Set<Person> persons;

	public Role(String name) {
		this.name = reduceExcessStringSize(name, 25);
		this.persons = new HashSet<Person>();
	}
	
	public Role() {
		this.persons = new HashSet<Person>();
	}

	private static String reduceExcessStringSize(String string, int maxLength) {
		if (string.length() <= maxLength) {
			return string;
		} else {
			return string.substring(0, maxLength);
		}
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
		this.name = reduceExcessStringSize(name, 25);
	}

	public Set<Person> getPersons() {
		return persons;
	}

	public void setPersons(Set<Person> persons) {
		this.persons = persons;
	}

	@Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + ", persons=" + persons + "]";
	}
	
	
	



}
