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
@NamedNativeQuery( //retrieves all entries and maps them into EntryViewModels
		name = "JournalEntry.getAllJournalEntryViewModelsForOrganization",
		query = "SELECT journal_entry_id AS journalEntryId, "
					+ "journal_entry_date AS journalEntryDate, "
					+ "journal_entry.description AS description, "
					+ "sum(CASE line_item.is_credit WHEN false THEN line_item.amount END) AS debitAmount, "
					+ "sum(CASE line_item.is_credit WHEN true THEN line_item.amount END) AS creditAmount "
				+ "FROM journal_entry,line_item "
				+ "WHERE line_item.journal_entry_id = journal_entry.id AND journal_entry.organization_id = ? "
				+ "GROUP BY journal_entry_id, journal_entry_date, journal_entry.description "
				+ "ORDER BY journal_entry_date DESC, journal_entry_id DESC ",
		resultSetMapping = "journalEntryViewModelMapping"
)
@SqlResultSetMapping(//sqlresultsetmapping for counting query
		name = "journalEntryViewModelMapping.count",
		columns = @ColumnResult(name = "count"))

@NamedNativeQuery( //query to count number of entries in order to use Pageable on Entry.getAllEntryViewModels
		name = "JournalEntry.getAllJournalEntryViewModelsForOrganization.count",
		query = "SELECT count(*) AS count from journal_entry WHERE journal_entry.organization_id = ? ",
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
	
	@Column(name= "description")
	private String description;
	
	@OneToMany(	mappedBy = "journalEntry",
				cascade = CascadeType.REMOVE,
				orphanRemoval = true)
	private List<LineItem> lineItems;
	
	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;
	
	@ManyToOne
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	public JournalEntry() {
		this.lineItems = new ArrayList<LineItem>();
	}

	public JournalEntry(LocalDate journalEntryDate) {
		this.journalEntryDate = journalEntryDate;
		this.lineItems = new ArrayList<LineItem>();
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
	}
	

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<LineItem> lineItems) {
		this.lineItems = lineItems;
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

	@Override
	public String toString() {
		return "JournalEntry [id=" + id + ", journalEntryDate=" + journalEntryDate + ", description=" + description
				+ ", lineItems=" + lineItems + ", person=" + person + ", organization=" + organization + "]";
	}
	
	
	
}
