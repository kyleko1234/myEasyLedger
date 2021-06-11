package com.easyledger.api.model;

import java.math.BigDecimal;
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
								@ColumnResult(name = "accountCode"),
								@ColumnResult(name = "accountName"),
								@ColumnResult(name = "parentAccountId"),
								@ColumnResult(name = "parentAccountName"),
								@ColumnResult(name = "accountSubtypeId"),
								@ColumnResult(name = "accountSubtypeName"),
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "organizationId"),
								@ColumnResult(name = "organizationName"),
								@ColumnResult(name = "debitTotal"),
								@ColumnResult(name = "creditTotal"),
								@ColumnResult(name = "initialDebitAmount"),
								@ColumnResult(name = "initialCreditAmount"),
								@ColumnResult(name = "hasChildren")
						}
				)
		}
)	
@NamedNativeQuery( //  takes an organization ID as a parameter and returns all undeleted accounts for that organization
		name = "Account.getAllAccountsForOrganization", 
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName, " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    organization.id AS organizationId, organization.name AS organizationName,  " + 
				"    account.debit_total AS debitTotal, account.credit_total AS creditTotal, account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount, " + 
				"    account.has_children AS hasChildren " + 
				"FROM account AS account  " + 
				"		LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id  " + 
				"		LEFT JOIN account_subtype ON account.account_subtype_id = account_subtype.id OR parent_account.account_subtype_id = account_subtype.id " + 
				"		LEFT JOIN account_type ON account_subtype.account_type_id = account_type.id,  " + 
				"	organization " + 
				"WHERE  " + 
				"    organization.id = :organizationId AND " + 
				"    account.organization_id = organization.id AND  " + 
				"    account.deleted = false " + 
				"ORDER BY account_type.id, account.account_code, account.name",
		resultSetMapping = "accountDTOMapping"
)

//TODO: TEST
@NamedNativeQuery( // takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization for the given time period
		name = "Account.getAllAccountBalancesForOrganizationBetweenDates",
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName, " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    organization.id AS organizationId, organization.name AS organizationName, " + 
				"    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= :startDate AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS debitTotal,                " + 
				"    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= :startDate AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS creditTotal,      " + 
				"    account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount, account.has_children AS hasChildren " + 
				"FROM account AS account " + 
				"    LEFT JOIN line_item ON line_item.account_id = account.id " + 
				"    LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id " + 
				"    LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id " + 
				"    LEFT JOIN account_subtype ON account_subtype.id = account.account_subtype_id " + 
				"    LEFT JOIN account_type ON account_type.id = account_subtype.account_type_id, " + 
				"    organization " + 
				"WHERE " + 
				"    organization.id = :organizationId AND " + 
				"    account.organization_id = organization.id AND  " + 
				"    account.deleted = false " + 
				"GROUP BY account.id, parent_account.id, account_subtype.id, account_type.id, organization.id " + 
				"ORDER BY account_type.id, account.account_code, account.name ",
		resultSetMapping = "accountDTOMapping"
)

@SqlResultSetMapping( //maps native SQL query to AccountDTO class
		name = "accountBalanceDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = AccountBalanceDTO.class,
						columns = {
								@ColumnResult(name = "accountId"),
								@ColumnResult(name = "accountCode"),
								@ColumnResult(name = "accountName"),
								@ColumnResult(name = "parentAccountId"),
								@ColumnResult(name = "parentAccountName"),
								@ColumnResult(name = "accountSubtypeId"),
								@ColumnResult(name = "accountSubtypeName"),
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "organizationId"),
								@ColumnResult(name = "organizationName"),
								@ColumnResult(name = "sumOfDebitLineItems"),
								@ColumnResult(name = "sumOfCreditLineItems"),
								@ColumnResult(name = "initialDebitAmount"),
								@ColumnResult(name = "initialCreditAmount"),
								@ColumnResult(name = "hasChildren")
						}
				)
		}
)	
//TODO: TEST
@NamedNativeQuery( //takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization up until the given date
		name = "Account.getAllAccountBalancesForOrganizationUpToDate",
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName, " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    organization.id AS organizationId, organization.name AS organizationName, " + 
				"    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS sumOfDebitLineItems,              " + 
				"    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS sumOfCreditLineItems,    " + 
				"    account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount, account.has_children AS hasChildren " + 
				"FROM account AS account " + 
				"    LEFT JOIN line_item ON line_item.account_id = account.id " + 
				"    LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id " + 
				"    LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id " + 
				"    LEFT JOIN account_subtype ON account_subtype.id = account.account_subtype_id " + 
				"    LEFT JOIN account_type ON account_type.id = account_subtype.account_type_id, " + 
				"    organization " + 
				"WHERE " + 
				"    organization.id = :organizationId AND  " + 
				"    account.organization_id = organization.id AND  " + 
				"    account.deleted = false " + 
				"GROUP BY account.id, parent_account.id, account_subtype.id, account_type.id, organization.id " + 
				"ORDER BY account_type.id, account.account_code, account.name ",
		resultSetMapping = "accountBalanceDTOMapping"
)

@Entity
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "account_code")
	private String accountCode = "";

	@Column(name = "name")
    private String name;
		
	@Column(name = "deleted")
	private boolean deleted;
	
	@Column(name = "debit_total")
	private BigDecimal debitTotal;
	
	@Column(name = "credit_total")
	private BigDecimal creditTotal;

	@Column(name = "initial_debit_amount")
	private BigDecimal initialDebitAmount;
	
	@Column(name = "initial_credit_amount")
	private BigDecimal initialCreditAmount;
	
	@Column(name = "has_children")
	private boolean hasChildren;
	
	@ManyToOne
	@JoinColumn(name = "account_subtype_id")
	private AccountSubtype accountSubtype;

	@ManyToOne
	@JoinColumn(name = "organization_id")
	private Organization organization;
	
	@ManyToOne
	@JoinColumn(name = "parent_account_id")
	private Account parentAccount;
	
	@OneToMany(mappedBy = "parentAccount")
	@JsonIgnore
	private Set<Account> childAccounts = new HashSet<Account>();
	
	@OneToMany(mappedBy = "account")
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	public Account() {
		this.lineItems = new HashSet<LineItem>();
		this.hasChildren = false;
	}

	public Account(String name) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
		this.hasChildren = false;
		}
	
	public Account(String name, Account parentAccount) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
		this.initialDebitAmount = new BigDecimal(0);
		this.initialCreditAmount = new BigDecimal(0);
		this.debitTotal = initialDebitAmount;
		this.creditTotal = initialCreditAmount;
		this.parentAccount = parentAccount;
		parentAccount.getChildAccounts().add(this);
		this.hasChildren = false;
	}
	
	public Account (String name, AccountSubtype accountSubtype) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
		this.initialDebitAmount = new BigDecimal(0);
		this.initialCreditAmount = new BigDecimal(0);
		this.debitTotal = initialDebitAmount;
		this.creditTotal = initialCreditAmount;
		this.accountSubtype = accountSubtype;
		accountSubtype.getAccounts().add(this);
		this.hasChildren = false;
	}
	public Account(String name, BigDecimal initialDebitAmount, BigDecimal initialCreditAmount) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
		this.initialDebitAmount = initialDebitAmount;
		this.initialCreditAmount = initialCreditAmount;
		this.debitTotal = initialDebitAmount;
		this.creditTotal = initialCreditAmount;
		this.hasChildren = false;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAccountCode() {
		return accountCode;
	}

	public void setAccountCode(String accountCode) {
		this.accountCode = accountCode;
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
	
	public BigDecimal getDebitTotal() {
		return debitTotal;
	}

	public void setDebitTotal(BigDecimal debitTotal) {
		this.debitTotal = debitTotal;
	}

	public BigDecimal getCreditTotal() {
		return creditTotal;
	}

	public void setCreditTotal(BigDecimal creditTotal) {
		this.creditTotal = creditTotal;
	}

	public BigDecimal getInitialDebitAmount() {
		return initialDebitAmount;
	}

	public void setInitialDebitAmount(BigDecimal initialDebitAmount) {
		this.initialDebitAmount = initialDebitAmount;
	}

	public BigDecimal getInitialCreditAmount() {
		return initialCreditAmount;
	}

	public void setInitialCreditAmount(BigDecimal initialCreditAmount) {
		this.initialCreditAmount = initialCreditAmount;
	}

	public boolean isHasChildren() {
		return hasChildren;
	}

	public void setHasChildren(boolean hasChildren) {
		this.hasChildren = hasChildren;
	}

	public AccountSubtype getAccountSubtype() {
		return accountSubtype;
	}

	public void setAccountSubtype(AccountSubtype accountSubtype) {
		this.accountSubtype = accountSubtype;
		accountSubtype.getAccounts().add(this);
	}

	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getAccounts().add(this);
	}

	public Account getParentAccount() {
		return parentAccount;
	}

	public void setParentAccount(Account parentAccount) {
		this.parentAccount = parentAccount;
		parentAccount.getChildAccounts().add(this);
	}

	public Set<Account> getChildAccounts() {
		return childAccounts;
	}

	public void setChildAccounts(Set<Account> childAccounts) {
		this.childAccounts = childAccounts;
	}

	@Override
	public String toString() {
		return "Account [id=" + id + ", accountCode=" + accountCode + ", name=" + name + ", deleted=" + deleted
				+ ", debitTotal=" + debitTotal + ", creditTotal=" + creditTotal + ", initialDebitAmount="
				+ initialDebitAmount + ", initialCreditAmount=" + initialCreditAmount + ", hasChildren=" + hasChildren
				+ ", accountSubtype=" + accountSubtype + ", organization=" + organization + ", parentAccount="
				+ parentAccount + ", childAccounts=" + childAccounts + ", lineItems=" + lineItems + "]";
	}
	
	
	
}