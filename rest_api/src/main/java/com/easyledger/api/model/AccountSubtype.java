package com.easyledger.api.model;

import java.util.HashSet;
import java.util.Set;

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

import com.easyledger.api.dto.AccountSubtypeBalanceDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to AccountSubtypeBalanceDTO class
		name = "accountSubtypeBalanceDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountSubtypeBalanceDTO.class,
						columns = {
								@ColumnResult(name = "accountSubtypeId"),
								@ColumnResult(name = "accountSubtypeName"),
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "organizationId"),
								@ColumnResult(name = "organizationName"),
								@ColumnResult(name = "debitTotal"),
								@ColumnResult(name = "creditTotal")
						}
				)
		}
)	
@NamedNativeQuery( // takes an organization ID as a parameter and returns all undeleted account subtypes with balances for that organization
		name = "AccountSubtype.getAllAccountSubtypeBalancesForOrganization",
		query = "SELECT   " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,      " + 
				"    account_type.id AS accountTypeId, account_type.name AS accountTypeName,      " + 
				"    organization.id AS organizationId, organization.name AS organizationName,    " + 
				"    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal,  " + 
				"    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal " + 
				"FROM      " + 
				"    account_group " + 
				"        LEFT JOIN account ON account.account_group_id = account_group.id AND account.deleted = false  " + 
				"        LEFT JOIN line_item ON line_item.account_id = account.id  " + 
				"        LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id,  " + 
				"    account_subtype, account_type, organization      " + 
				"WHERE       " + 
				"    organization.id = ? AND      " + 
				"    account_group.organization_id = organization.id AND     " + 
				"    account_group.account_subtype_id = account_subtype.id AND       " + 
				"    account_subtype.account_type_id = account_type.id AND       " + 
				"    account_group.deleted = false     " + 
				"GROUP BY account_subtype.id, account_type.id, organization.id " + 
				"ORDER BY account_type.id ASC, account_subtype.id ASC  ",
		resultSetMapping = "accountSubtypeBalanceDTOMapping"
)

@Entity
@Table(name = "account_subtype")
public class AccountSubtype {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "account_type_id", nullable = false)
	private AccountType accountType;
	
	@OneToMany(mappedBy = "accountSubtype")
	@JsonIgnore
	private Set<AccountGroup> accountGroups;
	
	public AccountSubtype() {
		this.accountGroups = new HashSet<AccountGroup>();
	}

	public AccountSubtype(String name) {
		this.name = name;
		this.accountGroups = new HashSet<AccountGroup>();
	}
	
	public AccountSubtype(String name, AccountType accountType) {
		this.name = name;
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
		this.accountGroups = new HashSet<AccountGroup>();
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

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
	}
	
	public Set<AccountGroup> getAccountGroups() {
		return accountGroups;
	}

	public void setAccountGroups(Set<AccountGroup> accountGroups) {
		this.accountGroups = accountGroups;
	}

	@Override
	public String toString() {
		return "AccountSubtype [id=" + id + ", name=" + name + ", accountType=" + accountType + ", accountGroups="
				+ accountGroups + "]";
	}


	
}
