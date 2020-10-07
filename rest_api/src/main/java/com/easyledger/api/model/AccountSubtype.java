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

import com.easyledger.api.dto.AccountSubtypeDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to AccountDTO class
		name = "accountSubtypeDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountSubtypeDTO.class,
						columns = {
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
		name = "AccountSubtype.getAllAccountSubtypesForOrganization",
		query = "SELECT " + 
				"  account_subtype.id AS accountSubtypeId, " + 
				"  account_subtype.name AS accountSubtypeName, " + 
				"  account_subtype.account_type_id AS accountTypeId, " + 
				"  account_type.name AS accountTypeName, " + 
				"  account_subtype.organization_id AS organizationId, " + 
				"  organization.name AS organizationName, " + 
				"  account_subtype.deleted AS deleted " + 
				"FROM account_subtype, account_type, organization " + 
				"WHERE account_subtype.account_type_id = account_type.id " + 
				"  AND account_subtype.organization_id = organization.id " + 
				"  AND account_subtype.deleted = false " + 
				"  AND organization.id = ? " + 
				"ORDER BY account_subtype.account_type_id ASC, account_subtype.name ASC",
		resultSetMapping = "accountSubtypeDTOMapping"
)

@Entity
@Table(name = "account_subtype")
public class AccountSubtype {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "deleted")
	private boolean deleted;
	
	@OneToMany (mappedBy = "accountSubtype")
	@JsonIgnore
	private Set<Account> accounts;
	
	@ManyToOne
	@JoinColumn(name = "account_type_id", nullable = false)
	private AccountType accountType;
	
	@ManyToOne
	@JoinColumn(name = "organization_id", nullable = false)
	private Organization organization;
	


	public AccountSubtype() {
		this.accounts = new HashSet<Account>();
	}

	public AccountSubtype(String name) {
		this.name = name;
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

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
	}
	
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getAccountSubtypes().add(this);
	}

	@Override
	public String toString() {
		return "AccountSubtype [id=" + id + ", name=" + name + ", deleted=" + deleted + ", accounts=" + accounts
				+ ", accountType=" + accountType + ", organization=" + organization + "]";
	}




}
