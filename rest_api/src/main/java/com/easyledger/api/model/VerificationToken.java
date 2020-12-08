package com.easyledger.api.model;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

//VerificationToken represents a token for verifying a new user's email.
@Entity
public class VerificationToken {
	private static final int EXPIRATION = 60 * 24; //24-hour expiration
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "token", unique=true)
	private String token;
	
	@OneToOne(targetEntity = Person.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = false, name = "person_id", unique = true)
	private Person person;
	
	@Column(name = "expiry_date")
	private Date expiryDate;
	
	private Date calculateExpiryDate(int expiryTimeInMinutes) {
			Calendar cal = Calendar.getInstance();
			cal.setTime(new Timestamp(cal.getTime().getTime()));
			cal.add(Calendar.MINUTE, expiryTimeInMinutes);
			return new Date(cal.getTime().getTime());
	}

	
	public VerificationToken(String token) {
		super();
		this.token = token;
		this.expiryDate = calculateExpiryDate(EXPIRATION);
	}
	
	public VerificationToken() {
		
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public static int getExpiration() {
		return EXPIRATION;
	}
	
}
