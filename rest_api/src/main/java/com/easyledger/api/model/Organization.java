package com.easyledger.api.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

import com.easyledger.api.dto.MonthlyNetAssetsDTO;
import com.easyledger.api.utility.Utility;
import com.fasterxml.jackson.annotation.JsonIgnore;


@SqlResultSetMapping( //maps native SQL query to LineItemDTO class
		name = "monthlyNetAssetsDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = MonthlyNetAssetsDTO.class,
						columns = {
								@ColumnResult(name = "netAssets"),
								@ColumnResult(name = "yearMonth")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted LineItems in undeleted entries for an account when given an accountId
		name = "Organization.getMonthlyNetAssetsDTO",
		query = "SELECT    "
				+ "    (CASE WHEN SUM(parentInitialDebit) IS NULL THEN 0 ELSE SUM(parentInitialDebit) END) "
				+ "        - (CASE WHEN SUM(parentInitialCredit) IS NULL THEN 0 ELSE SUM(parentInitialCredit) END)    "
				+ "        + (CASE WHEN SUM(childInitialDebit) IS NULL THEN 0 ELSE SUM(childInitialDebit) END) "
				+ "        - (CASE WHEN SUM(childInitialCredit) IS NULL THEN 0 ELSE SUM(childInitialCredit) END)    "
				+ "        + (CASE WHEN SUM(debitAmount) IS NULL THEN 0 ELSE SUM(debitAmount) END)   "
				+ "        - (CASE WHEN SUM(creditAmount) IS NULL THEN 0 ELSE SUM(creditAmount) END)   "
				+ "        AS netAssets,   "
				+ "        :yearMonth AS yearMonth    "
				+ "    FROM        "
				+ "        (SELECT            "
				+ "            (CASE WHEN parent_account.has_children = true THEN 0 ELSE parent_account.initial_debit_amount END) AS parentInitialDebit,     "
				+ "            (CASE WHEN parent_account.has_children = true THEN 0 ELSE parent_account.initial_credit_amount END) AS parentInitialCredit,     "
				+ "            child_account.initial_debit_amount AS childInitialDebit,     "
				+ "            child_account.initial_credit_amount AS childInitialCredit,     "
				+ "            account_type.id AS accountTypeId, account_type.name AS accountTypeName,               "
				+ "            SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.year_month <= :yearMonth THEN line_item.amount END) AS debitAmount,               "
				+ "            SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.year_month <= :yearMonth THEN line_item.amount END) AS creditAmount,               "
				+ "                :yearMonth AS yearMonth               "
				+ "        FROM            "
				+ "            account_type, account_subtype, organization,            "
				+ "            account AS parent_account         "
				+ "                LEFT JOIN account AS child_account ON child_account.parent_account_id = parent_account.id AND child_account.deleted = false      "
				+ "                LEFT JOIN line_item ON line_item.account_id = parent_account.id OR line_item.account_id = child_account.id    "
				+ "                LEFT JOIN journal_entry ON journal_entry.id = line_item.journal_entry_id      "
				+ "        WHERE             "
				+ "            organization.id = :organizationId AND            "
				+ "            account_subtype.account_type_id = account_type.id AND            "
				+ "            parent_account.account_subtype_id = account_subtype.id AND             "
				+ "            parent_account.organization_id = organization.id AND            "
				+ "            parent_account.deleted = false AND                   "
				+ "            account_type.id < 3       "
				+ "        GROUP BY             "
				+ "            account_type.id, parent_account.initial_debit_amount, parent_account.initial_credit_amount,     "
				+ "        child_account.initial_debit_amount, child_account.initial_credit_amount, parent_account.has_children     "
				+ "        ORDER BY account_type.id DESC         "
				+ "        ) as result_table ",
		resultSetMapping = "monthlyNetAssetsDTOMapping"
)


@Entity
@Table(name = "organization")
public class Organization {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "currency")
	private String currency;
	
	@Column(name = "is_enterprise")
	private boolean isEnterprise;
	
	@Column(name = "fiscal_year_begin")
	private LocalDate fiscalYearBegin = LocalDate.parse("2020-01-01");
	
	@Column(name = "lock_initial_account_values")
	private boolean lockInitialAccountValues = true;
	
	@Column(name = "lock_journal_entries_before")
	private LocalDate lockJournalEntriesBefore = LocalDate.parse("2000-01-01");

	@OneToMany(mappedBy = "organization", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private Set<Permission> permissions = new HashSet<Permission>();

	@OneToMany(mappedBy = "organization", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private Set<JournalEntry> journalEntries = new HashSet<JournalEntry>();
	
	@OneToMany(mappedBy = "organization", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private Set<Vendor> vendors = new HashSet<Vendor>();
	
	@OneToMany(mappedBy = "organization", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private Set<Customer> customers = new HashSet<Customer>();

	
	@OneToMany(mappedBy = "organization", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private Set<Account> accounts = new HashSet<Account>();
	
	@OneToMany(mappedBy = "organization", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<JournalEntryLog> journalEntryLogs = new ArrayList<JournalEntryLog>();
	
	public Organization(String name, String currency, boolean isEnterprise) {
		this.name = Utility.trimString(name, 64);
		this.currency = Utility.trimString(currency, 64);
		this.isEnterprise = isEnterprise;
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
		this.name = Utility.trimString(name, 64);
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = Utility.trimString(currency, 64);
	}

	public boolean isIsEnterprise() {
		return isEnterprise;
	}

	public void setIsEnterprise(boolean isEnterprise) {
		this.isEnterprise = isEnterprise;
	}

	public LocalDate getFiscalYearBegin() {
		return fiscalYearBegin;
	}

	public void setFiscalYearBegin(LocalDate fiscalYearBegin) {
		this.fiscalYearBegin = fiscalYearBegin;
	}

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}
	

	public Set<JournalEntry> getJournalEntries() {
		return journalEntries;
	}

	public void setJournalEntries(Set<JournalEntry> journalEntries) {
		this.journalEntries = journalEntries;
	}

	public Set<Vendor> getVendors() {
		return vendors;
	}

	public void setVendors(Set<Vendor> vendors) {
		this.vendors = vendors;
	}

	public Set<Customer> getCustomers() {
		return customers;
	}

	public void setCustomers(Set<Customer> customers) {
		this.customers = customers;
	}

	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	public List<JournalEntryLog> getJournalEntryLogs() {
		return journalEntryLogs;
	}

	public void setJournalEntryLogs(List<JournalEntryLog> journalEntryLogs) {
		this.journalEntryLogs = journalEntryLogs;
	}

	public boolean isLockInitialAccountValues() {
		return lockInitialAccountValues;
	}

	public void setLockInitialAccountValues(boolean lockInitialAccountValues) {
		this.lockInitialAccountValues = lockInitialAccountValues;
	}

	public LocalDate getLockJournalEntriesBefore() {
		return lockJournalEntriesBefore;
	}

	public void setLockJournalEntriesBefore(LocalDate lockJournalEntriesBefore) {
		this.lockJournalEntriesBefore = lockJournalEntriesBefore;
	}




}
