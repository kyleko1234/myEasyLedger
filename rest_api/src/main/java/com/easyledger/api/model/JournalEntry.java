package com.easyledger.api.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
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
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.easyledger.api.dto.JournalEntryDTO;
import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.service.LineItemService;
import com.easyledger.api.utility.Utility;
import com.easyledger.api.viewmodel.JournalEntryViewModel;
import com.fasterxml.jackson.annotation.JsonIgnore;


@SqlResultSetMapping( //maps native SQL query to EntryViewModel class
		name = "journalEntryViewModelMapping",
		classes = {
				@ConstructorResult(
						targetClass = JournalEntryViewModel.class,
						columns = {
								@ColumnResult(name = "journalEntryId"),
								@ColumnResult(name = "journalEntryDate"),
								@ColumnResult(name = "description"),
								@ColumnResult(name = "debitAmount"),
								@ColumnResult(name = "creditAmount")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted entries for the given organization and maps them into EntryViewModels
		name = "JournalEntry.getAllJournalEntryViewModelsForOrganization",
		query = "SELECT  " + 
				"    journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS description,  " + 
				"    SUM(CASE line_item.is_credit WHEN false THEN line_item.amount END) AS debitAmount, " + 
				"    SUM(CASE line_item.is_credit WHEN true THEN line_item.amount END) as creditAmount " + 
				"FROM " + 
				"    journal_entry, line_item " + 
				"WHERE  " + 
				"    journal_entry.id = line_item.journal_entry_id AND  " + 
				"    journal_entry.organization_id = ? AND  " + 
				"    journal_entry.deleted = false " + 
				"GROUP BY journal_entry.id " + 
				"ORDER BY journal_entry.journal_entry_date DESC, journal_entry.id DESC",
		resultSetMapping = "journalEntryViewModelMapping"
)
@NamedNativeQuery( //retrieves all undeleted entries for the given organization that match the search query and maps them into EntryViewModels. journal entry will be returned if search query matches either line item descriptions or journal entry descriptions.
		name = "JournalEntry.getAllJournalEntryViewModelsForOrganizationAndQuery",
		query = "SELECT         "
				+ "	journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS description,         "
				+ "	SUM(CASE line_item.is_credit WHEN false THEN line_item.amount ELSE 0 END) AS debitAmount,        "
				+ "	SUM(CASE line_item.is_credit WHEN true THEN line_item.amount ELSE 0 END) as creditAmount "
				+ "FROM        "
				+ "	journal_entry, line_item "
				+ "WHERE   "
				+ "journal_entry.id = line_item.journal_entry_id AND "
				+ "	journal_entry.organization_id = :organizationId AND         "
				+ "	journal_entry.deleted = false AND    "
				+ "	(journal_entry.description ILIKE '%' || :query || '%' "
				+ "	 	OR EXISTS (SELECT 1 "
				+ "				   FROM line_item "
				+ "				   WHERE line_item.journal_entry_id = journal_entry.id "
				+ "				   AND line_item.description ILIKE '%' || :query || '%')) "
				+ "GROUP BY journal_entry.id "
				+ "ORDER BY journalEntryDate DESC, journalEntryId DESC  ",
		resultSetMapping = "journalEntryViewModelMapping"
)
@SqlResultSetMapping(//sqlresultsetmapping for counting query
		name = "journalEntryViewModelMapping.count",
		columns = @ColumnResult(name = "count"))

@NamedNativeQuery( //query to count number of entries in order to use Pageable on Entry.getAllEntryViewModels
		name = "JournalEntry.getAllJournalEntryViewModelsForOrganization.count",
		query = "SELECT count(*) AS count from journal_entry WHERE journal_entry.organization_id = ? AND journal_entry.deleted = false",
		resultSetMapping = "journalEntryViewModelMapping.count"
)
@NamedNativeQuery( //query to count number of entries in order to use Pageable on Entry.getAllEntryViewModelsForOrganizationAndQuery
		name = "JournalEntry.getAllJournalEntryViewModelsForOrganizationAndQuery.count",
		query = "SELECT count(*) AS count FROM  "
				+ "(SELECT         "
				+ "	journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS description,         "
				+ "	SUM(CASE line_item.is_credit WHEN false THEN line_item.amount ELSE 0 END) AS debitAmount,        "
				+ "	SUM(CASE line_item.is_credit WHEN true THEN line_item.amount ELSE 0 END) as creditAmount "
				+ "FROM        "
				+ "	journal_entry, line_item "
				+ "WHERE   "
				+ "journal_entry.id = line_item.journal_entry_id AND "
				+ "	journal_entry.organization_id = :organizationId AND         "
				+ "	journal_entry.deleted = false AND    "
				+ "	(journal_entry.description ILIKE '%' || :query || '%' "
				+ "	 	OR EXISTS (SELECT 1 "
				+ "				   FROM line_item "
				+ "				   WHERE line_item.journal_entry_id = journal_entry.id "
				+ "				   AND line_item.description ILIKE '%' || :query || '%')) "
				+ "GROUP BY journal_entry.id "
				+ "ORDER BY journalEntryDate DESC, journalEntryId DESC  "
				+ ") AS results",
		resultSetMapping = "journalEntryViewModelMapping.count"
)

@Entity
@Table(name = "journal_entry")
public class JournalEntry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "journal_entry_date")
	private LocalDate journalEntryDate;
	
	@JsonIgnore
	@Column(name = "year_month")
	private Integer yearMonth; //yyyymm format of journalEntryDate. for faster sql queries when grouping monthly
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "deleted")
	private boolean deleted;
	
	@OneToMany(	mappedBy = "journalEntry",
				cascade = CascadeType.REMOVE,
				orphanRemoval = true) //IMPORTANT: do not eagerly fetch lineitems. Due to weird quirk of jpa, attempting eager fetching here will result in duplicate line items - specifically, one set of lineitems for each organization in db.
	private List<LineItem> lineItems;
	
	@JsonIgnore
	@OneToMany(mappedBy = "journalEntry")
	private List<JournalEntryLog> journalEntryLogs;

	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;
	
	@ManyToOne
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	@ManyToOne
	@JoinColumn(name = "vendor_id")
	private Vendor vendor;
	
	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customer;


	public JournalEntry() {
		this.lineItems = new ArrayList<LineItem>();
		this.journalEntryLogs = new ArrayList<JournalEntryLog>();
	}

	public JournalEntry(LocalDate journalEntryDate) {
		this.journalEntryDate = journalEntryDate;
		this.yearMonth = (journalEntryDate.getYear() * 100) + journalEntryDate.getMonthValue();
		this.lineItems = new ArrayList<LineItem>();
		this.journalEntryLogs = new ArrayList<JournalEntryLog>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getJournalEntryDate() {
		return journalEntryDate;
	}


	public void setJournalEntryDate(LocalDate journalEntryDate) {
		this.journalEntryDate = journalEntryDate;
		this.yearMonth = (journalEntryDate.getYear() * 100) + journalEntryDate.getMonthValue();
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = Utility.trimString(description, 255);
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public List<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<LineItem> lineItems) {
		this.lineItems = lineItems;
	}

	public Integer getYearMonth() {
		return yearMonth;
	}

	public void setYearMonth(Integer yearMonth) {
		this.yearMonth = yearMonth;
	}

	public List<JournalEntryLog> getJournalEntryLogs() {
		return journalEntryLogs;
	}

	public void setJournalEntryLogs(List<JournalEntryLog> journalEntryLogs) {
		this.journalEntryLogs = journalEntryLogs;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
		person.getJournalEntries().add(this);
	}
	
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getJournalEntries().add(this);
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
		vendor.getJournalEntries().add(this);
	}
	
	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
		customer.getJournalEntries().add(this);
	}


	@Override
	public String toString() {
		return "JournalEntry [id=" + id + ", journalEntryDate=" + journalEntryDate + ", yearMonth=" + yearMonth
				+ ", description=" + description + ", deleted=" + deleted + ", lineItems=" + lineItems
				+ ", journalEntryLogs=" + journalEntryLogs + ", person=" + person + ", organization=" + organization
				+ "]";
	}
	
	
	
}
