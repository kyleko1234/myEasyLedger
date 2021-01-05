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
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

import com.easyledger.api.dto.AccountTypeSummaryDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;


@SqlResultSetMapping( //maps native SQL query to EntryViewModel class
		name = "accountTypeSummaryViewModelMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountTypeSummaryDTO.class,
						columns = {
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "debitAmount"),
								@ColumnResult(name = "creditAmount"),
								@ColumnResult(name = "yearMonth")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted entries for the given organization and maps them into EntryViewModels
		name = "AccountType.getMonthlyAccountTypeSummaries",
		query = "SELECT  " + 
				"    account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitAmount, " + 
				"    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditAmount, " + 
				"    journal_entry.year_month AS yearMonth " + 
				"FROM " + 
				"    account_type, line_item, journal_entry, account_subtype, account_group, account, organization " + 
				"WHERE  " + 
				"    organization.id = :organizationId AND " + 
				"    account_subtype.account_type_id = account_type.id AND  " + 
				"    account_group.account_subtype_id = account_subtype.id AND  " + 
				"    account_group.organization_id = organization.id AND  " + 
				"    account.account_group_id = account_group.id AND  " + 
				"    line_item.account_id = account.id AND  " + 
				"    line_item.journal_entry_id = journal_entry.id AND  " + 
				"    journal_entry.year_month >= :yearMonth " + 
				"GROUP BY " + 
				"    account_type.id, journal_entry.year_month " + 
				"ORDER BY journal_entry.year_month ASC, account_type.id DESC",
		resultSetMapping = "accountTypeSummaryViewModelMapping"
)

@Entity
@Table(name = "account_type")
public class AccountType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@OneToMany(mappedBy = "accountType")
	@JsonIgnore
	private Set<AccountSubtype> accountSubtypes;
	
	
	public AccountType() {
		this.accountSubtypes = new HashSet<AccountSubtype>();
	}
	
	public AccountType(String name) {
		this.name = name;
		this.accountSubtypes = new HashSet<AccountSubtype>();
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
		this.name = name;
	}

	public Set<AccountSubtype> getAccountSubtypes() {
		return accountSubtypes;
	}

	public void setAccountSubtypes(Set<AccountSubtype> accountSubtypes) {
		this.accountSubtypes = accountSubtypes;
	}

	@Override
	public String toString() {
		return "AccountType [id=" + id + ", name=" + name + ", accountSubtypes=" + accountSubtypes + "]";
	}



	
	
	
	
}
