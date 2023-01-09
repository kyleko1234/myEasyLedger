package com.easyledger.api.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
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
import com.easyledger.api.utility.Utility;
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
								@ColumnResult(name = "hasChildren"),
								@ColumnResult(name = "incomeStatementFormatPositionId"),
								@ColumnResult(name = "incomeStatementFormatPositionName"),
								@ColumnResult(name = "cashFlowFormatPositionId"),
								@ColumnResult(name = "cashFlowFormatPositionName"),
								@ColumnResult(name = "balanceSheetFormatPositionId"),
								@ColumnResult(name = "balanceSheetFormatPositionName"),
								@ColumnResult(name = "cashItem"),
								@ColumnResult(name = "relevantToTaxesPaid"),
								@ColumnResult(name = "relevantToInterestPaid"),
								@ColumnResult(name = "relevantToDividendsPaid"),
								@ColumnResult(name = "relevantToDepreciationAmortization")

						}
				)
		}
)	
@NamedNativeQuery( //  takes an organization ID as a parameter and returns all undeleted accounts for that organization
		name = "Account.getAllAccountsForOrganization", 
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName,      "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName,      "
				+ "    organization.id AS organizationId, organization.name AS organizationName,       "
				+ "    account.debit_total AS debitTotal, account.credit_total AS creditTotal, account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount,      "
				+ "    account.has_children AS hasChildren, "
				+ "    account.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account.cash_item AS cashItem, account.relevant_to_taxes_paid AS relevantToTaxesPaid, account.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account.relevant_to_dividends_paid AS relevantToDividendsPaid, account.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization "
				+ "FROM account AS account       "
				+ "    LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id       "
				+ "    LEFT JOIN account_subtype ON account.account_subtype_id = account_subtype.id OR parent_account.account_subtype_id = account_subtype.id      "
				+ "    LEFT JOIN account_type ON account_subtype.account_type_id = account_type.id,       "
				+ "income_statement_format_position, cash_flow_format_position, balance_sheet_format_position, organization  "
				+ "WHERE       "
				+ "    organization.id = :organizationId AND      "
				+ "    account.organization_id = organization.id AND       "
				+ "    account.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account.cash_flow_format_position_id = cash_flow_format_position.id AND  "
				+ "    account.balance_sheet_format_position_id = balance_sheet_format_position.id AND "
				+ "    account.deleted = false      "
				+ "ORDER BY account_type.id, NULLIF(account.account_code, ''), account.name NULLS LAST ",
		resultSetMapping = "accountDTOMapping"
)

@NamedNativeQuery( // takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization for the given time period
		name = "Account.getAllAccountBalancesForOrganizationBetweenDates",
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName,      "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName,      "
				+ "    organization.id AS organizationId, organization.name AS organizationName,      "
				+ "    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= :startDate AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS debitTotal,                     "
				+ "    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= :startDate AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS creditTotal,           "
				+ "    account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount, account.has_children AS hasChildren, "
				+ "    account.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account.cash_item AS cashItem, account.relevant_to_taxes_paid AS relevantToTaxesPaid, account.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account.relevant_to_dividends_paid AS relevantToDividendsPaid, account.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization "
				+ "FROM account AS account      "
				+ "    LEFT JOIN line_item ON line_item.account_id = account.id      "
				+ "    LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id      "
				+ "    LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id      "
				+ "    LEFT JOIN account_subtype ON account_subtype.id = account.account_subtype_id      "
				+ "    LEFT JOIN account_type ON account_type.id = account_subtype.account_type_id,      "
				+ "    income_statement_format_position, cash_flow_format_position, balance_sheet_format_position, organization  "
				+ "WHERE      "
				+ "    organization.id = :organizationId AND      "
				+ "    account.organization_id = organization.id AND   "
				+ "    account.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account.cash_flow_format_position_id = cash_flow_format_position.id AND  "
				+ "    account.balance_sheet_format_position_id = balance_sheet_format_position.id AND     "
				+ "    account.deleted = false      "
				+ "GROUP BY account.id, parent_account.id, account_subtype.id, account_type.id, organization.id, income_statement_format_position.name, cash_flow_format_position.name, balance_sheet_format_position.name "
				+ "ORDER BY account_type.id, NULLIF(account.account_code, ''), account.name NULLS LAST",
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
								@ColumnResult(name = "hasChildren"),
								@ColumnResult(name = "incomeStatementFormatPositionId"),
								@ColumnResult(name = "incomeStatementFormatPositionName"),
								@ColumnResult(name = "cashFlowFormatPositionId"),
								@ColumnResult(name = "cashFlowFormatPositionName"),
								@ColumnResult(name = "balanceSheetFormatPositionId"),
								@ColumnResult(name = "balanceSheetFormatPositionName"),
								@ColumnResult(name = "cashItem"),
								@ColumnResult(name = "relevantToTaxesPaid"),
								@ColumnResult(name = "relevantToInterestPaid"),
								@ColumnResult(name = "relevantToDividendsPaid"),
								@ColumnResult(name = "relevantToDepreciationAmortization")
						}
				)
		}
)	
@NamedNativeQuery( //takes an organization ID as a parameter and returns all undeleted accounts with balances for that organization up until the given date
		name = "Account.getAllAccountBalancesForOrganizationUpToDate",
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName,      "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName,      "
				+ "    organization.id AS organizationId, organization.name AS organizationName,      "
				+ "    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS sumOfDebitLineItems,                   "
				+ "    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS sumOfCreditLineItems,         "
				+ "    account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount, account.has_children AS hasChildren, "
				+ "    account.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account.cash_item AS cashItem, account.relevant_to_taxes_paid AS relevantToTaxesPaid, account.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account.relevant_to_dividends_paid AS relevantToDividendsPaid, account.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization "
				+ "FROM account AS account      "
				+ "    LEFT JOIN line_item ON line_item.account_id = account.id      "
				+ "    LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id      "
				+ "    LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id      "
				+ "    LEFT JOIN account_subtype ON account_subtype.id = account.account_subtype_id       "
				+ "    LEFT JOIN account_type ON account_type.id = account_subtype.account_type_id,      "
				+ "    income_statement_format_position, cash_flow_format_position, balance_sheet_format_position, organization  "
				+ "WHERE      "
				+ "    organization.id = :organizationId AND       "
				+ "    account.organization_id = organization.id AND       "
				+ "    account.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account.cash_flow_format_position_id = cash_flow_format_position.id AND  "
				+ "    account.balance_sheet_format_position_id = balance_sheet_format_position.id AND     "
				+ "    account.deleted = false      "
				+ "GROUP BY account.id, parent_account.id, account_subtype.id, account_type.id, organization.id, income_statement_format_position.name, cash_flow_format_position.name, balance_sheet_format_position.name "
				+ "ORDER BY account_type.id, NULLIF(account.account_code, ''), account.name NULLS LAST ",
		resultSetMapping = "accountBalanceDTOMapping"
)

@NamedNativeQuery( //takes an accountId as a parameter and returns an AccountBalanceDTO with inital balances and the sum of all lineItems with a journalEntryDate before and not including :endDate
		name = "Account.getAccountBalanceUpToDateExclusive",
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName,        "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName,        "
				+ "    organization.id AS organizationId, organization.name AS organizationName,        "
				+ "    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date < :endDate THEN line_item.amount END) AS sumOfDebitLineItems,                     "
				+ "    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date < :endDate THEN line_item.amount END) AS sumOfCreditLineItems,           "
				+ "    account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount, account.has_children AS hasChildren, "
				+ "    account.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account.cash_item AS cashItem, account.relevant_to_taxes_paid AS relevantToTaxesPaid, account.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account.relevant_to_dividends_paid AS relevantToDividendsPaid, account.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization   "
				+ "FROM account AS account        "
				+ "    LEFT JOIN line_item ON line_item.account_id = account.id        "
				+ "    LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id        "
				+ "    LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id        "
				+ "    LEFT JOIN account_subtype ON account_subtype.id = account.account_subtype_id         "
				+ "    LEFT JOIN account_type ON account_type.id = account_subtype.account_type_id,        "
				+ "    income_statement_format_position, cash_flow_format_position, balance_sheet_format_position, organization  "
				+ "WHERE        "
				+ "    account.id = :accountId AND         "
				+ "    account.organization_id = organization.id AND "
				+ "    account.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account.cash_flow_format_position_id = cash_flow_format_position.id AND  "
				+ "    account.balance_sheet_format_position_id = balance_sheet_format_position.id     "
				+ "GROUP BY account.id, parent_account.id, account_subtype.id, account_type.id, organization.id, income_statement_format_position.name, cash_flow_format_position.name, balance_sheet_format_position.name",
		resultSetMapping = "accountBalanceDTOMapping"
)

@NamedNativeQuery( // takes an organization ID as a parameter and returns all undeleted accounts with entries for that organization
		name = "Account.getLeafAccountsWithEntriesForOrganization",
		query = "SELECT account.id AS accountId, account.account_code AS accountCode, account.name AS accountName, parent_account.id AS parentAccountId, parent_account.name AS parentAccountName,        "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, account_type.id AS accountTypeId, account_type.name AS accountTypeName,        "
				+ "    organization.id AS organizationId, organization.name AS organizationName,         "
				+ "    account.debit_total AS debitTotal, account.credit_total AS creditTotal, account.initial_debit_amount AS initialDebitAmount, account.initial_credit_amount AS initialCreditAmount,        "
				+ "    account.has_children AS hasChildren, "
				+ "    account.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account.cash_item AS cashItem, account.relevant_to_taxes_paid AS relevantToTaxesPaid, account.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account.relevant_to_dividends_paid AS relevantToDividendsPaid, account.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization   "
				+ "FROM account AS account         "
				+ "    LEFT JOIN account AS parent_account ON account.parent_account_id = parent_account.id         "
				+ "    LEFT JOIN account_subtype ON account.account_subtype_id = account_subtype.id OR parent_account.account_subtype_id = account_subtype.id        "
				+ "    LEFT JOIN account_type ON account_subtype.account_type_id = account_type.id,         "
				+ "    income_statement_format_position, cash_flow_format_position, balance_sheet_format_position, organization  "
				+ "WHERE         "
				+ "    organization.id = :organizationId AND        "
				+ "    account.organization_id = organization.id AND    "
				+ "    account.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account.cash_flow_format_position_id = cash_flow_format_position.id AND  "
				+ "    account.balance_sheet_format_position_id = balance_sheet_format_position.id AND       "
				+ "    account.deleted = false AND   "
				+ "    (SELECT CASE EXISTS (   "
				+ "        SELECT 1 from line_item, journal_entry   "
				+ "        WHERE line_item.journal_entry_id = journal_entry.id    "
				+ "        AND line_item.account_id = account.id AND journal_entry.deleted = false   "
				+ "    ) WHEN true THEN true ELSE false END)   "
				+ "ORDER BY account_type.id, NULLIF(account.account_code, ''), account.name NULLS LAST ",
		resultSetMapping = "accountDTOMapping"
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
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "parent_account_id")
	private Account parentAccount;
	
	@OneToMany(mappedBy = "parentAccount")
	@JsonIgnore
	private Set<Account> childAccounts = new HashSet<Account>();
	
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "income_statement_format_position_id")
	private IncomeStatementFormatPosition incomeStatementFormatPosition;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "balance_sheet_format_position_id")
	private BalanceSheetFormatPosition balanceSheetFormatPosition;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cash_flow_format_position_id")
	private CashFlowFormatPosition cashFlowFormatPosition;
	
	@Column(name = "cash_item")
	private boolean cashItem;
	
	@Column(name = "relevant_to_taxes_paid")
	private boolean relevantToTaxesPaid;
	
	@Column(name = "relevant_to_interest_paid")
	private boolean relevantToInterestPaid;
	
	@Column(name = "relevant_to_dividends_paid")
	private boolean relevantToDividendsPaid;
	
	@Column(name = "relevant_to_depreciation_amortization")
	private boolean relevantToDepreciationAmortization;
	
	public Account() {
		this.lineItems = new HashSet<LineItem>();
		this.hasChildren = false;
	}

	public Account(String name) {
		this.name = Utility.trimString(name, 64);
		this.lineItems = new HashSet<LineItem>();
		this.hasChildren = false;
	}
	
	public Account(String name, Account parentAccount) {
		this.name = Utility.trimString(name, 64);
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
		this.name = Utility.trimString(name, 64);
		this.lineItems = new HashSet<LineItem>();
		this.initialDebitAmount = new BigDecimal(0);
		this.initialCreditAmount = new BigDecimal(0);
		this.debitTotal = initialDebitAmount;
		this.creditTotal = initialCreditAmount;
		this.accountSubtype = accountSubtype;
		accountSubtype.getAccounts().add(this);
		this.hasChildren = false;
	}
	
	public Account(String name, Account parentAccount, String accountCode) {
		this.name = Utility.trimString(name, 64);
		this.lineItems = new HashSet<LineItem>();
		this.initialDebitAmount = new BigDecimal(0);
		this.initialCreditAmount = new BigDecimal(0);
		this.debitTotal = initialDebitAmount;
		this.creditTotal = initialCreditAmount;
		this.parentAccount = parentAccount;
		parentAccount.getChildAccounts().add(this);
		this.hasChildren = false;
		this.accountCode = accountCode;
	}
	
	public Account (String name, AccountSubtype accountSubtype, String accountCode) {
		this.name = Utility.trimString(name, 64);
		this.lineItems = new HashSet<LineItem>();
		this.initialDebitAmount = new BigDecimal(0);
		this.initialCreditAmount = new BigDecimal(0);
		this.debitTotal = initialDebitAmount;
		this.creditTotal = initialCreditAmount;
		this.accountSubtype = accountSubtype;
		accountSubtype.getAccounts().add(this);
		this.hasChildren = false;
		this.accountCode = accountCode;
	}
	
	public Account(String name, BigDecimal initialDebitAmount, BigDecimal initialCreditAmount) {
		this.name = Utility.trimString(name, 64);
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
		this.accountCode = Utility.trimString(accountCode, 16);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = Utility.trimString(name, 64);
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

	public IncomeStatementFormatPosition getIncomeStatementFormatPosition() {
		return incomeStatementFormatPosition;
	}

	public void setIncomeStatementFormatPosition(IncomeStatementFormatPosition incomeStatementFormatPosition) {
		this.incomeStatementFormatPosition = incomeStatementFormatPosition;
		incomeStatementFormatPosition.getAccounts().add(this);
	}

	public BalanceSheetFormatPosition getBalanceSheetFormatPosition() {
		return balanceSheetFormatPosition;
	}

	public void setBalanceSheetFormatPosition(BalanceSheetFormatPosition balanceSheetFormatPosition) {
		this.balanceSheetFormatPosition = balanceSheetFormatPosition;
		balanceSheetFormatPosition.getAccounts().add(this);
	}

	public CashFlowFormatPosition getCashFlowFormatPosition() {
		return cashFlowFormatPosition;
	}

	public void setCashFlowFormatPosition(CashFlowFormatPosition cashFlowFormatPosition) {
		this.cashFlowFormatPosition = cashFlowFormatPosition;
		cashFlowFormatPosition.getAccounts().add(this);
	}

	public boolean isCashItem() {
		return cashItem;
	}

	public void setCashItem(boolean cashItem) {
		this.cashItem = cashItem;
	}

	public boolean isRelevantToTaxesPaid() {
		return relevantToTaxesPaid;
	}

	public void setRelevantToTaxesPaid(boolean relevantToTaxesPaid) {
		this.relevantToTaxesPaid = relevantToTaxesPaid;
	}

	public boolean isRelevantToInterestPaid() {
		return relevantToInterestPaid;
	}

	public void setRelevantToInterestPaid(boolean relevantToInterestPaid) {
		this.relevantToInterestPaid = relevantToInterestPaid;
	}

	public boolean isRelevantToDividendsPaid() {
		return relevantToDividendsPaid;
	}

	public void setRelevantToDividendsPaid(boolean relevantToDividendsPaid) {
		this.relevantToDividendsPaid = relevantToDividendsPaid;
	}

	public boolean isRelevantToDepreciationAmortization() {
		return relevantToDepreciationAmortization;
	}

	public void setRelevantToDepreciationAmortization(boolean relevantToDepreciationAmortization) {
		this.relevantToDepreciationAmortization = relevantToDepreciationAmortization;
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