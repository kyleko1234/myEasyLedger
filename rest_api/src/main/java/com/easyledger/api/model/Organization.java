package com.easyledger.api.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
		query = "SELECT SUM(debitAmount) - SUM(creditAmount) AS netAssets, :yearMonth AS yearMonth FROM  "
				+ "    (SELECT      "
				+ "        account_type.id AS accountTypeId, account_type.name AS accountTypeName,         "
				+ "        SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.year_month <= :yearMonth THEN line_item.amount END) AS debitAmount,         "
				+ "        SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.year_month <= :yearMonth THEN line_item.amount END) AS creditAmount,         "
				+ "        :yearMonth AS yearMonth         "
				+ "    FROM      "
				+ "        account_type, line_item, journal_entry, account_subtype, organization,      "
				+ "        account AS parent_account      "
				+ "            LEFT JOIN account AS child_account ON child_account.parent_account_id = parent_account.id AND child_account.deleted = false      "
				+ "    WHERE       "
				+ "        organization.id = :organizationId AND      "
				+ "        account_subtype.account_type_id = account_type.id AND      "
				+ "        parent_account.account_subtype_id = account_subtype.id AND       "
				+ "        parent_account.organization_id = organization.id AND      "
				+ "        parent_account.deleted = false AND       "
				+ "        (line_item.account_id = parent_account.id OR line_item.account_id = child_account.id) AND      "
				+ "        line_item.journal_entry_id = journal_entry.id AND  "
				+ "        account_type.id < 3 "
				+ "    GROUP BY       "
				+ "        account_type.id      "
				+ "    ORDER BY account_type.id DESC   "
				+ "    ) as result_table",
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

	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private Set<Permission> permissions = new HashSet<Permission>();

	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private Set<JournalEntry> journalEntries = new HashSet<JournalEntry>();
	
	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private Set<Account> accounts = new HashSet<Account>();
	
	@OneToMany(mappedBy = "organization")
	@JsonIgnore
	private List<JournalEntryLog> journalEntryLogs = new ArrayList<JournalEntryLog>();
	
	public Organization(String name, String currency, boolean isEnterprise) {
		this.name = reduceExcessStringSize(name, 64);
		this.currency = reduceExcessStringSize(currency, 64);
		this.isEnterprise = isEnterprise;
	}
	
	public Organization() {
	}
	
	private static String reduceExcessStringSize(String string, int maxLength) {
		if (string.length() <= maxLength) {
			return string;
		} else {
			return string.substring(0, maxLength);
		}
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
		this.name = reduceExcessStringSize(name, 64);
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = reduceExcessStringSize(currency, 64);
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

	@Override
	public String toString() {
		return "Organization [id=" + id + ", name=" + name + ", currency=" + currency + ", isEnterprise=" + isEnterprise
				+ ", fiscalYearBegin=" + fiscalYearBegin + ", permissions=" + permissions + ", journalEntries="
				+ journalEntries + ", accounts=" + accounts + ", journalEntryLogs=" + journalEntryLogs + "]";
	}


}
