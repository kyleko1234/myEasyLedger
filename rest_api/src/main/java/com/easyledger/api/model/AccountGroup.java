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

import com.easyledger.api.dto.AccountGroupBalanceDTO;
import com.easyledger.api.dto.AccountGroupDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to AccountGroupDTO class
		name = "accountGroupDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountGroupDTO.class,
						columns = {
								@ColumnResult(name = "accountGroupId"),
								@ColumnResult(name = "accountGroupName"),
								@ColumnResult(name = "accountSubtypeId"),
								@ColumnResult(name = "accountSubtypeName"),
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "organizationId"),
								@ColumnResult(name = "organizationName"),
								@ColumnResult(name = "deleted")
						}
				)
		}
)	
@NamedNativeQuery( //takes an organization ID as a parameter and returns all undeleted account groups for that organization
		name = "AccountGroup.getAllAccountGroupsForOrganization",
		query = "SELECT  " + 
				"    account_group.id AS accountGroupId, account_group.name AS accountGroupName, " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, " + 
				"    account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    organization.id AS organizationId, organization.name AS organizationName, " + 
				"    account_group.deleted AS deleted " + 
				"FROM " + 
				"    account_group, account_subtype, account_type, organization " + 
				"WHERE  " + 
				"    organization.id = ? AND " + 
				"    account_group.organization_id = organization.id AND  " + 
				"    account_group.account_subtype_id = account_subtype.id AND  " + 
				"    account_subtype.account_type_id = account_type.id AND  " + 
				"    account_group.deleted = false " + 
				"ORDER BY account_type.id ASC, account_group.name",
		resultSetMapping = "accountGroupDTOMapping"
)

@SqlResultSetMapping( //maps native SQL query to AccountGroupBalanceDTO class
		name = "accountGroupBalanceDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountGroupBalanceDTO.class,
						columns = {
								@ColumnResult(name = "accountGroupId"),
								@ColumnResult(name = "accountGroupName"),
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

@NamedNativeQuery( //takes an organization ID as a parameter and returns AccountGroupBalanceDTO objects for all undeleted account groups for that organization
		name = "AccountGroup.getAllAccountGroupBalancesForOrganization",
		query = "SELECT   " + 
				"    account_group.id AS accountGroupId, account_group.name AS accountGroupName,      " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,      " + 
				"    account_type.id AS accountTypeId, account_type.name AS accountTypeName,      " + 
				"    organization.id AS organizationId, organization.name AS organizationName,    " + 
				"    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal,  " + 
				"    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal " + 
				"FROM      " + 
				"    account_group  " + 
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
				"GROUP BY account_group.id, account_subtype.id, account_type.id, organization.id " + 
				"ORDER BY account_type.id ASC, account_group.name  ",
		resultSetMapping = "accountGroupBalanceDTOMapping"
)



@Entity
@Table(name = "account_group")
public class AccountGroup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "deleted")
	private boolean deleted;
		
	@OneToMany(mappedBy = "accountGroup")
	@JsonIgnore
	private Set<Account> accounts;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "account_subtype_id", nullable = false)
	private AccountSubtype accountSubtype;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "organization_id", nullable = false)
	private Organization organization;
	

	public AccountGroup() {
		this.accounts = new HashSet<Account>();
	}

	public AccountGroup(String name) {
		this.name = name;
		this.accounts = new HashSet<Account>();
	}
	public AccountGroup(String name, AccountSubtype accountSubtype) {
		this.name = name;
		this.accountSubtype = accountSubtype;
		accountSubtype.getAccountGroups().add(this);
		this.accounts = new HashSet<Account>();
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

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	public AccountSubtype getAccountSubtype() {
		return accountSubtype;
	}

	public void setAccountSubtype(AccountSubtype accountSubtype) {
		this.accountSubtype = accountSubtype;
		accountSubtype.getAccountGroups().add(this);
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getAccountGroups().add(this);
	}

	@Override
	public String toString() {
		return "AccountGroup [id=" + id + ", name=" + name + ", deleted=" + deleted + ", accounts=" + accounts
				+ ", accountSubtype=" + accountSubtype + ", organization=" + organization + "]";
	}

	



}
