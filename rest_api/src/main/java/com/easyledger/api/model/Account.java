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

import com.easyledger.api.dto.AccountDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to CategoryDTO class
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
								@ColumnResult(name = "organizationName")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all entries and maps them into EntryViewModels
		name = "Account.getAllAccountsForOrganization",
		query = "SELECT account.id AS accountId, "
					+ "account.name AS accountName, "
					+ "account_subtype.id AS accountSubtypeId, "
					+ "account_subtype.name AS accountSubtypeName, "
					+ "account_type.id AS accountTypeId, "
					+ "account_type.name AS accountTypeName, "
					+ "organization.id AS organizationId, "
					+ "organization.name AS organizationName "
				+ "FROM account "
				+ "LEFT JOIN account_subtype ON account.account_subtype_id = account_subtype.id "
					+ "LEFT JOIN account_type ON account.account_type_id = account_type.id "
					+ "LEFT JOIN organization ON account.organization_id = organization.id "
				+ "WHERE organization.id = ? "
				+ "ORDER BY accountTypeId ASC, accountId DESC",
		resultSetMapping = "accountDTOMapping"
)


@Entity
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "name")
    private String name;

	@OneToMany(mappedBy = "account")
	@JsonIgnore
	private Set<LineItem> lineItems;
	
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
	}

	public Account(String name) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
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

	public Set<LineItem> getLineItems() {
		return lineItems;
	}

	public void setLineItems(Set<LineItem> lineItems) {
		this.lineItems = lineItems;
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
		return "Account [id=" + id + ", name=" + name + ", lineItems=" + lineItems + ", accountSubtype="
				+ accountSubtype + ", accountType=" + accountType + ", organization=" + organization + "]";
	}


	
	




	
	
}