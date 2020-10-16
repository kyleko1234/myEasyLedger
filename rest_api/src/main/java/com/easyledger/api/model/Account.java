package com.easyledger.api.model;

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
@NamedNativeQuery( //takes an organization ID as a parameter and returns all undeleted accounts for that organization
		name = "Account.getAllAccountsForOrganization",
		query = "SELECT account.id AS accountId, "
					+ "account.name AS accountName, "
					+ "account_subtype.id AS accountSubtypeId, "
					+ "account_subtype.name AS accountSubtypeName, "
					+ "account_type.id AS accountTypeId, "
					+ "account_type.name AS accountTypeName, "
					+ "organization.id AS organizationId, "
					+ "organization.name AS organizationName, "
					+ "account.deleted AS deleted "
				+ "FROM account "
				+ "LEFT JOIN account_subtype ON account.account_subtype_id = account_subtype.id "
					+ "LEFT JOIN account_type ON account.account_type_id = account_type.id "
					+ "LEFT JOIN organization ON account.organization_id = organization.id "
				+ "WHERE organization.id = ? AND account.deleted = false "
				+ "ORDER BY accountTypeId ASC, accountId DESC",
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
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountSubtypeId"),
								@ColumnResult(name = "debitTotal"),
								@ColumnResult(name = "creditTotal")
						}
				)
		}
)	
@NamedNativeQuery( //takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization
		name = "Account.getAllAccountBalancesForOrganization",
		query = "SELECT account.id AS accountId, account.name AS accountName, account.account_type_id AS accountTypeId, account.account_subtype_id AS accountSubtypeId, " + 
				"  SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal, " + 
				"  SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal " + 
				"FROM account " + 
				"  LEFT JOIN line_item ON line_item.account_id = account.id " + 
				"  LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id " + 
				"WHERE account.organization_id = ?" + 
				"  AND account.deleted = false " + 
				"GROUP BY account.id " + 
				"ORDER BY account.account_type_id, account.name",
		resultSetMapping = "accountBalanceDTOMapping"
)
@NamedNativeQuery( //takes an account ID as a parameter and returns an account with balances with that id 
		name = "Account.getAccountBalanceById",
		query = "SELECT account.id AS accountId, account.name AS accountName, account.account_type_id AS accountTypeId, account.account_subtype_id AS accountSubtypeId, " + 
				"  SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal, " + 
				"  SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal " + 
				"FROM account " + 
				"  LEFT JOIN line_item ON line_item.account_id = account.id " + 
				"  LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id " + 
				"WHERE account.id = ?" + 
				"GROUP BY account.id ",
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

	@OneToMany(mappedBy = "account")
	@JsonIgnore
	private List<Category> categories;
	
	@ManyToOne
	@JoinColumn(name = "account_subtype_id", nullable = true)
	private AccountSubtype accountSubtype;
	
	@ManyToOne
	@JoinColumn(name = "account_type_id", nullable = false)
	private AccountType accountType;
	
	@ManyToOne
	@JoinColumn(name = "organization_id", nullable = false)
	private Organization organization;
	
	public Account() {
		this.lineItems = new HashSet<LineItem>();
		this.categories = new ArrayList<Category>();
	}

	public Account(String name) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
		this.categories = new ArrayList<Category>();
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

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public AccountSubtype getAccountSubtype() {
		return accountSubtype;
	}

	public void setAccountSubtype(AccountSubtype accountSubtype) {
		this.accountSubtype = accountSubtype;
		accountSubtype.getAccounts().add(this);
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
		accountType.getAccounts().add(this);
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getAccounts().add(this);
	}

	@Override
	public String toString() {
		return "Account [id=" + id + ", name=" + name + ", deleted=" + deleted + ", lineItems=" + lineItems
				+ ", categories=" + categories + ", accountSubtype=" + accountSubtype + ", accountType=" + accountType
				+ ", organization=" + organization + "]";
	}


	
	




	
	
}