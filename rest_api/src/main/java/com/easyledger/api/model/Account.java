package com.easyledger.api.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

import com.easyledger.api.dto.AccountBalanceDTO;
import com.easyledger.api.dto.AccountDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to AccountDTO class
		name = "accountDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountDTO.class,
						columns = {
								@ColumnResult(name = "accountId"),
								@ColumnResult(name = "accountName"),
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
@NamedNativeQuery( //TODO: UNTESTED  takes an organization ID as a parameter and returns all undeleted accounts for that organization
		name = "Account.getAllAccountsForOrganization",
		query = "SELECT account.id AS accountId, account.name AS accountName,  " + 
				"    account_group.id AS accountGroupId, account_group.name AS accountGroupName,  " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,  " + 
				"    account_type.id AS accountTypeId, account_type.name AS accountTypeName,  " + 
				"    organization.id AS organizationId, organization.name AS organizationName, account.deleted AS deleted  " + 
				"FROM  " + 
				"    account, account_group, account_subtype, account_type, organization  " + 
				"WHERE  " + 
				"    organization.id = ? AND  " + 
				"    account_group.organization_id = organization.id AND  " + 
				"    account.account_group_id = account_group.id AND  " + 
				"    account_subtype.id = account_group.account_subtype_id AND  " + 
				"    account_type.id = account_subtype.account_type_id AND  " + 
				"    account.deleted = false  " + 
				"ORDER BY  " + 
				"    account_type.id ASC, account.id DESC ",
		resultSetMapping = "accountDTOMapping"
)

@SqlResultSetMapping( //maps native SQL query to AccountDTO class
		name = "accountBalanceDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountBalanceDTO.class,
						columns = {
								@ColumnResult(name = "accountId"),
								@ColumnResult(name = "accountName"),
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
@NamedNativeQuery( //TODO: UNTESTED takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization
		name = "Account.getAllAccountBalancesForOrganization",
		query = "SELECT account.id AS account_id, account.name AS accountName, account_group.id AS account_group_id, account_group.name AS accountGroupName, " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    organization.id AS organizationId, organization.name AS organizationName, " + 
				"    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal,  " + 
				"    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal " + 
				"FROM account, account_group, account_subtype, account_type, organization, journal_entry, line_item  " + 
				"WHERE  " + 
				"    organization.id = ? AND  " + 
				"    account_group.organization_id = organization.id AND  " + 
				"    account.account_group_id = account_group.id AND  " + 
				"    line_item.account_id = account.id AND  " + 
				"    journal_entry.id = line_item.journal_entry_id AND  " + 
				"    account_subtype.id = account_group.account_subtype_id AND  " + 
				"    account_type.id = account_subtype.account_type_id AND  " + 
				"    account.deleted = false  " + 
				"GROUP BY account.id, account_group.id, account_subtype.id, account_type.id, organization.id  " + 
				"ORDER BY account_type.id, account.name",
		resultSetMapping = "accountBalanceDTOMapping"
)
@NamedNativeQuery( //takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization up until the given date
		name = "Account.getAllAccountBalancesForOrganizationUpToDate",
		query = "SELECT account.id AS accountId, account.name AS accountName, account.account_type_id AS accountTypeId, account_type.name AS accountTypeName, account.account_subtype_id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,      " + 
				"                                                    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS debitTotal,      " + 
				"                                                    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS creditTotal      " + 
				"                                                  FROM account_type, account      " + 
				"                                                    LEFT JOIN line_item ON line_item.account_id = account.id      " + 
				"                                                    LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id      " + 
				"                                                    LEFT JOIN account_subtype ON account.account_subtype_id = account_subtype.id      " + 
				"                                                  WHERE account.organization_id = :organizationId  " + 
				"                                                     AND account.account_type_id = account_type.id          " + 
				"                                                     AND account.deleted = false      " + 
				"                                                  GROUP BY account.id, account_type.name, account_subtype.name      " + 
				"                                                  ORDER BY account.account_type_id, account.name  " + 
				"",
		resultSetMapping = "accountBalanceDTOMapping"
)
@NamedNativeQuery( //takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization for the given time period
		name = "Account.getAllAccountBalancesForOrganizationBetweenDates",
		query = "SELECT account.id AS accountId, account.name AS accountName, account.account_type_id AS accountTypeId, account_type.name AS accountTypeName, account.account_subtype_id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,      " + 
				"                                                    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= :startDate AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS debitTotal,      " + 
				"                                                    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= :startDate AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS creditTotal      " + 
				"                                                  FROM account_type, account      " + 
				"                                                    LEFT JOIN line_item ON line_item.account_id = account.id      " + 
				"                                                    LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id      " + 
				"                                                    LEFT JOIN account_subtype ON account.account_subtype_id = account_subtype.id      " + 
				"                                                  WHERE account.organization_id = :organizationId  " + 
				"                                                     AND account.account_type_id = account_type.id          " + 
				"                                                     AND account.deleted = false      " + 
				"                                                  GROUP BY account.id, account_type.name, account_subtype.name      " + 
				"                                                  ORDER BY account.account_type_id, account.name  " + 
				"",
		resultSetMapping = "accountBalanceDTOMapping"
)
@NamedNativeQuery( //TODO: UNTESTED --takes an account ID as a parameter and returns an account with balances with that id 
		name = "Account.getAccountBalanceById",
		query = "SELECT account.id AS accountId, account.name AS accountName, account.account_group_id AS accountGroupId,  " + 
				"    account_group.name AS accountGroupName, account_group.account_subtype_id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,  " + 
				"    account_subtype.account_type_id AS accountTypeId, account_type.name AS accountTypeName,  " + 
				"    account_group.organization_id AS organizationId, organization.name AS organizationName,  " + 
				"    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal,  " + 
				"    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal " + 
				"FROM account, account_group, account_subtype, account_type, organization, line_item, journal_entry  " + 
				"WHERE  " + 
				"    account.id = ? AND  " + 
				"    account.account_group_id = account_group.id AND  " + 
				"    account_group.account_subtype_id = account_subtype.id AND  " + 
				"    account_subtype.account_type_id = account_type.id AND  " + 
				"    account_group.organization_id = organization.id AND  " + 
				"    line_item.account_id = account.id AND  " + 
				"    line_item.journal_entry_id = journal_entry.id  " + 
				"GROUP BY account.id, account_group.name, account_group.account_subtype_id, account_subtype.name, account_subtype.account_type_id, account_type.name,  " + 
				"	account_group.organization_id, organization.name  " + 
				"ORDER BY account_subtype.account_type_id, account_group.name, account.name",
		resultSetMapping = "accountBalanceDTOMapping"
)

@Entity
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "name")
    private String name;
	
	@Column(name = "deleted")
	private boolean deleted;
	
	@OneToMany(mappedBy = "account")
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "account_group_id", nullable = true)
	private AccountGroup accountGroup;
	
		
	public Account() {
		this.lineItems = new HashSet<LineItem>();
	}

	public Account(String name) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
		}
	
	public Account(String name, AccountGroup accountGroup) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
		this.accountGroup = accountGroup;
		accountGroup.getAccounts().add(this);
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

	public Set<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(Set<LineItem> lineItems) {
		this.lineItems = lineItems;
	}

	public AccountGroup getAccountGroup() {
		return accountGroup;
	}

	public void setAccountGroup(AccountGroup accountGroup) {
		this.accountGroup = accountGroup;
		accountGroup.getAccounts().add(this);
	}

	@Override
	public String toString() {
		return "Account [id=" + id + ", name=" + name + ", deleted=" + deleted + ", lineItems=" + lineItems
				+ ", accountGroup=" + accountGroup + "]";
	}



	
	




	
	
}