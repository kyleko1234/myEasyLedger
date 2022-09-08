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

import com.easyledger.api.dto.VendorDTO;
import com.easyledger.api.dto.VendorExpensesDTO;
import com.easyledger.api.utility.Utility;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to VendorDTO class
		name = "vendorDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = VendorDTO.class,
						columns = {
								@ColumnResult(name = "vendorId"),
								@ColumnResult(name = "vendorName"),
								@ColumnResult(name = "contactName"),
								@ColumnResult(name = "email"),
								@ColumnResult(name = "phoneNumber"),
								@ColumnResult(name = "organizationId")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all vendors for a given organizationId
		name = "Vendor.getAllVendorsForOrganization",
		query = "SELECT  "
				+ "    vendor.id AS vendorId, vendor.vendor_name AS vendorName,  "
				+ "    vendor.contact_name AS contactName, vendor.email AS email, "
				+ "    vendor.phone_number AS phoneNumber, vendor.organization_id AS organizationId "
				+ "FROM vendor "
				+ "WHERE vendor.organization_id = ? "
				+ "ORDER BY vendor.vendor_name ASC",
		resultSetMapping = "vendorDTOMapping"
)

@SqlResultSetMapping( //maps native SQL query to VendorDTO class
		name = "vendorExpensesDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = VendorExpensesDTO.class,
						columns = {
								@ColumnResult(name = "vendorId"),
								@ColumnResult(name = "vendorName"),
								@ColumnResult(name = "debitTotal"),
								@ColumnResult(name = "creditTotal")
						}
				)
		}
)	

@NamedNativeQuery( //retrieves all vendors for a given organizationId
		name = "Vendor.getExpensesByVendorForOrganizationBetweenDates",
		query = "SELECT  "
				+ "    vendor.id AS vendorId,  "
				+ "    vendor.vendor_name AS vendorName, "
				+ "    SUM( "
				+ "        CASE WHEN "
				+ "            line_item.is_credit = false  "
				+ "            AND journal_entry.deleted = false  "
				+ "            AND journal_entry.journal_entry_date >= :startDate  "
				+ "            AND journal_entry.journal_entry_date <= :endDate "
				+ "            AND account_type.id = 5 "
				+ "        THEN line_item.amount END "
				+ "    ) AS debitTotal,                     "
				+ "    SUM( "
				+ "        CASE WHEN  "
				+ "            line_item.is_credit = true  "
				+ "            AND journal_entry.deleted = false  "
				+ "            AND journal_entry.journal_entry_date >= :startDate  "
				+ "            AND journal_entry.journal_entry_date <= :endDate  "
				+ "            AND account_type.id = 5 "
				+ "        THEN line_item.amount END "
				+ "    )  "
				+ "    AS creditTotal "
				+ "FROM "
				+ "    organization, "
				+ "    vendor, "
				+ "        LEFT JOIN journal_entry ON journal_entry.vendor_id = vendor.id "
				+ "        LEFT JOIN line_item ON line_item.journal_entry_id = journal_entry.id "
				+ "        LEFT JOIN account AS account ON line_item.account_id = account.id "
				+ "        LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id "
				+ "        LEFT JOIN account_subtype ON (account.account_subtype_id = account_subtype.id OR parent_account.account_subtype_id = account_subtype.id) "
				+ "        LEFT JOIN account_type ON account_subtype.account_type_id = account_type.id "
				+ "WHERE "
				+ "    vendor.organization_id = organization.id "
				+ "    AND organization.id = :organizationId "
				+ "GROUP BY vendor.id "
				+ "ORDER BY vendor.vendor_name ",
		resultSetMapping = "vendorExpensesDTOMapping"
)

@Entity
@Table(name = "vendor")
public class Vendor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "vendor_name")
	private String vendorName;

	@Column(name = "contact_name")
	private String contactName;

	@Column(name = "email")
	private String email;

	@Column(name = "phone_number")
	private String phoneNumber;
	
	@ManyToOne
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	@OneToMany(mappedBy = "vendor")
	@JsonIgnore
	private Set<JournalEntry> journalEntries = new HashSet<JournalEntry>();

	public Vendor(String vendorName, String contactName, String email, Organization organization, String phoneNumber) {
		super();
		this.vendorName = vendorName;
		this.contactName = contactName;
		this.email = email;
		this.organization = organization;
		this.phoneNumber = phoneNumber;
	}
	
	public Vendor() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = Utility.trimString(vendorName, 64);
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
		organization.getVendors().add(this);
	}

	public Set<JournalEntry> getJournalEntries() {
		return journalEntries;
	}

	public void setJournalEntries(Set<JournalEntry> journalEntries) {
		this.journalEntries = journalEntries;
	}
	
}
