package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

import com.easyledger.api.dto.CustomerDTO;
import com.easyledger.api.utility.Utility;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to CustomerDTO class
		name = "customerDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = CustomerDTO.class,
						columns = {
								@ColumnResult(name = "customerId"),
								@ColumnResult(name = "customerName"),
								@ColumnResult(name = "contactName"),
								@ColumnResult(name = "email"),
								@ColumnResult(name = "phoneNumber"),
								@ColumnResult(name = "organizationId")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all customers for a given organizationId
		name = "Customer.getAllCustomersForOrganization",
		query = "SELECT  "
				+ "    customer.id AS customerId, customer.customer_name AS customerName,  "
				+ "    customer.contact_name AS contactName, customer.email AS email, "
				+ "    customer.phone_number AS phoneNumber, customer.organization_id AS organizationId "
				+ "FROM customer "
				+ "WHERE customer.organization_id = ? "
				+ "ORDER BY customer.customer_name ASC",
		resultSetMapping = "customerDTOMapping"
)


@Entity
@Table(name = "customer")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "customer_name")
	private String customerName;

	@Column(name = "contact_name")
	private String contactName;

	@Column(name = "email")
	private String email;

	@Column(name = "phone_number")
	private String phoneNumber;
	
	@ManyToOne
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	@OneToMany(mappedBy = "customer")
	@JsonIgnore
	private Set<JournalEntry> journalEntries = new HashSet<JournalEntry>();

	public Customer(String customerName, String contactName, String email, Organization organization) {
		super();
		this.customerName = customerName;
		this.contactName = contactName;
		this.email = email;
		this.organization = organization;
	}
	
	public Customer() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = Utility.trimString(customerName, 64);
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = Utility.trimString(contactName, 64);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = Utility.trimString(email, 64);
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = Utility.trimString(phoneNumber, 64);
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getCustomers().add(this);
	}

	public Set<JournalEntry> getJournalEntries() {
		return journalEntries;
	}

	public void setJournalEntries(Set<JournalEntry> journalEntries) {
		this.journalEntries = journalEntries;
	}
	
}
