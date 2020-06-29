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
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "organization")
public class Organization {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;

	@ManyToMany(mappedBy = "organizations")
	@JsonIgnore
	private Set<Person> persons;

	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private Set<Entry> entries;
	
	public Organization(String name) {
		this.name = name;
	}
	
	public Organization() {
	}
	
	
	//Getters, Setters, toString
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
		this.name = name;
	}

	public Set<Person> getPersons() {
		return persons;
	}

	public void setPersons(Set<Person> persons) {
		this.persons = persons;
	}
	

	public Set<Entry> getEntries() {
		return entries;
	}

	public void setEntries(Set<Entry> entries) {
		this.entries = entries;
	}

	@Override
	public String toString() {
		return "Organization [id=" + id + ", name=" + name + ", persons=" + persons + ", entries=" + entries + "]";
	}
	

}
