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
import com.easyledger.api.utility.Utility;
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
								@ColumnResult(name = "creditTotal"),
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
@SqlResultSetMapping( //maps native SQL query to AccountSubtypeBalanceDTO class
		name = "accountSubtypeBalanceDTOAlternateMapping",
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
								@ColumnResult(name = "sumOfDebitLineItems"),
								@ColumnResult(name = "sumOfCreditLineItems"),
								@ColumnResult(name = "sumOfInitialDebitAmounts"),
								@ColumnResult(name = "sumOfInitialCreditAmounts"),
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
@NamedNativeQuery( // takes an organization ID as a parameter and returns all undeleted account subtypes with balances for that organization
		name = "AccountSubtype.getAllAccountSubtypeBalancesForOrganization",
		query = "SELECT        "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,        "
				+ "    account_type.id AS accountTypeId, account_type.name AS accountTypeName,        "
				+ "    organization.id AS organizationId, organization.name AS organizationName,        "
				+ "    SUM(account.debit_total) AS debitTotal,        "
				+ "    SUM(account.credit_total) AS creditTotal, "
				+ "    account_subtype.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account_subtype.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account_subtype.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account_subtype.cash_item AS cashItem, "
				+ "    account_subtype.relevant_to_taxes_paid AS relevantToTaxesPaid, account_subtype.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account_subtype.relevant_to_dividends_paid AS relevantToDividendsPaid, account_subtype.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization "
				+ "FROM        "
				+ "    account_subtype, account_type, organization, account, income_statement_format_position, cash_flow_format_position, balance_sheet_format_position      "
				+ "WHERE         "
				+ "    organization.id = ? AND        "
				+ "    account.organization_id = organization.id AND        "
				+ "    account.account_subtype_id = account_subtype.id AND        "
				+ "    account_subtype.account_type_id = account_type.id AND    "
				+ "    account_subtype.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account_subtype.cash_flow_format_position_id = cash_flow_format_position.id AND "
				+ "    account_subtype.balance_sheet_format_position_id = balance_sheet_format_position.id AND      "
				+ "    account.deleted = false        "
				+ "GROUP BY account_subtype.id, account_type.id, organization.id, income_statement_format_position.name, cash_flow_format_position.name, balance_sheet_format_position.name  "
				+ "ORDER BY account_type.id ASC, account_subtype.id ASC ",
		resultSetMapping = "accountSubtypeBalanceDTOMapping"
)

@NamedNativeQuery( // takes an organization ID as a parameter and returns all undeleted account subtypes with balances for that organization
		name = "AccountSubtype.getAllAccountSubtypeBalancesForOrganizationUpToDate",
		query = "SELECT         "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,         "
				+ "    account_type.id AS accountTypeId, account_type.name AS accountTypeName,         "
				+ "    organization.id AS organizationId, organization.name AS organizationName,         "
				+ "    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS sumOfDebitLineItems,                "
				+ "    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date <= :endDate THEN line_item.amount END) AS sumOfCreditLineItems,         "
				+ "    sum_of_initial_amounts.sum_of_initial_debit_amounts AS sumOfInitialDebitAmounts, sum_of_initial_amounts.sum_of_initial_credit_amounts AS sumOfInitialCreditAmounts, "
				+ "    account_subtype.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account_subtype.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account_subtype.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account_subtype.cash_item AS cashItem, "
				+ "    account_subtype.relevant_to_taxes_paid AS relevantToTaxesPaid, account_subtype.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account_subtype.relevant_to_dividends_paid AS relevantToDividendsPaid, account_subtype.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization    "
				+ "FROM          "
				+ "    (SELECT         "
				+ "        account_subtype.id AS account_subtype_id, SUM(account.initial_debit_amount) AS sum_of_initial_debit_amounts, SUM(account.initial_credit_amount) AS sum_of_initial_credit_amounts          "
				+ "    FROM           "
				+ "        account, organization, account_subtype         "
				+ "    WHERE organization.id = :organizationId AND          "
				+ "        account.organization_id = organization.id AND          "
				+ "        account.account_subtype_id = account_subtype.id AND    "
				+ "        account.deleted = false    "
				+ "    GROUP BY account_subtype.id, organization.id         "
				+ "    ORDER BY account_subtype.id)         "
				+ "        AS sum_of_initial_amounts,         "
				+ "    account AS parent_account         "
				+ "        LEFT JOIN account AS child_account ON child_account.parent_account_id = parent_account.id AND child_account.deleted = false         "
				+ "        LEFT JOIN line_item ON (line_item.account_id = parent_account.id OR line_item.account_id = child_account.id)         "
				+ "        LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id,         "
				+ "    account_subtype, account_type, organization, income_statement_format_position, cash_flow_format_position, balance_sheet_format_position "
				+ "WHERE          "
				+ "    organization.id = :organizationId AND         "
				+ "    parent_account.organization_id = organization.id AND          "
				+ "    parent_account.account_subtype_id = account_subtype.id AND          "
				+ "    account_subtype.account_type_id = account_type.id AND          "
				+ "    parent_account.deleted = false AND         "
				+ "    sum_of_initial_amounts.account_subtype_id = account_subtype.id AND  "
				+ "    account_subtype.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account_subtype.cash_flow_format_position_id = cash_flow_format_position.id AND "
				+ "    account_subtype.balance_sheet_format_position_id = balance_sheet_format_position.id   "
				+ "GROUP BY account_subtype.id, account_type.id, organization.id, sum_of_initial_amounts.sum_of_initial_debit_amounts, sum_of_initial_amounts.sum_of_initial_credit_amounts,  "
				+ "    income_statement_format_position.name, cash_flow_format_position.name, balance_sheet_format_position.name  "
				+ "ORDER BY account_type.id ASC, account_subtype.id ASC",
		resultSetMapping = "accountSubtypeBalanceDTOAlternateMapping"
)

@NamedNativeQuery( // takes an organization ID as a parameter and returns all undeleted account subtypes with balances for that organization
		name = "AccountSubtype.getAllAccountSubtypeBalancesForOrganizationBetweenDates",
		query = "SELECT        "
				+ "    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName,        "
				+ "    account_type.id AS accountTypeId, account_type.name AS accountTypeName,        "
				+ "    organization.id AS organizationId, organization.name AS organizationName,        "
				+ "    SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= '2000-01-01' AND journal_entry.journal_entry_date <= '2023-01-01' THEN line_item.amount END) AS debitTotal,            "
				+ "    SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false AND journal_entry.journal_entry_date >= '2000-01-01' AND journal_entry.journal_entry_date <= '2023-01-01' THEN line_item.amount END) AS creditTotal, "
				+ "    account_subtype.income_statement_format_position_id AS incomeStatementFormatPositionId, income_statement_format_position.name AS incomeStatementFormatPositionName, "
				+ "    account_subtype.cash_flow_format_position_id AS cashFlowFormatPositionId, cash_flow_format_position.name AS cashFlowFormatPositionName, "
				+ "    account_subtype.balance_sheet_format_position_id AS balanceSheetFormatPositionId, balance_sheet_format_position.name AS balanceSheetFormatPositionName, "
				+ "    account_subtype.cash_item AS cashItem, "
				+ "    account_subtype.relevant_to_taxes_paid AS relevantToTaxesPaid, account_subtype.relevant_to_interest_paid AS relevantToInterestPaid, "
				+ "    account_subtype.relevant_to_dividends_paid AS relevantToDividendsPaid, account_subtype.relevant_to_depreciation_amortization AS relevantToDepreciationAmortization "
				+ "FROM         "
				+ "    account AS parent_account        "
				+ "        LEFT JOIN account AS child_account ON child_account.parent_account_id = parent_account.id AND child_account.deleted = false        "
				+ "        LEFT JOIN line_item ON (line_item.account_id = parent_account.id OR line_item.account_id = child_account.id)        "
				+ "        LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id,        "
				+ "    account_subtype, account_type, organization, income_statement_format_position, cash_flow_format_position, balance_sheet_format_position  "
				+ "WHERE         "
				+ "    organization.id = 1 AND        "
				+ "    parent_account.organization_id = organization.id AND         "
				+ "    parent_account.account_subtype_id = account_subtype.id AND         "
				+ "    account_subtype.account_type_id = account_type.id AND         "
				+ "    parent_account.deleted = false AND     "
				+ "    account_subtype.income_statement_format_position_id = income_statement_format_position.id AND "
				+ "    account_subtype.cash_flow_format_position_id = cash_flow_format_position.id AND "
				+ "    account_subtype.balance_sheet_format_position_id = balance_sheet_format_position.id "
				+ "GROUP BY account_subtype.id, account_type.id, organization.id, income_statement_format_position.name, cash_flow_format_position.name, balance_sheet_format_position.name        "
				+ "ORDER BY account_type.id ASC, account_subtype.id ASC ",
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
	private Set<Account> accounts;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "income_statement_format_position_id", nullable = false)
	private IncomeStatementFormatPosition incomeStatementFormatPosition;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "balance_sheet_format_position_id", nullable = false)
	private BalanceSheetFormatPosition balanceSheetFormatPosition;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cash_flow_format_position_id", nullable = false)
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
	
	public AccountSubtype() {
		this.accounts = new HashSet<Account>();
	}

	public AccountSubtype(String name) {
		this.name = Utility.trimString(name, 64);
		this.accounts = new HashSet<Account>();
	}
	
	public AccountSubtype(String name, AccountType accountType) {
		this.name = Utility.trimString(name, 64);
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
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
		this.name = Utility.trimString(name, 64);
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
		accountType.getAccountSubtypes().add(this);
	}
	
	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	public IncomeStatementFormatPosition getIncomeStatementFormatPosition() {
		return incomeStatementFormatPosition;
	}

	public void setIncomeStatementFormatPosition(IncomeStatementFormatPosition incomeStatementFormatPosition) {
		this.incomeStatementFormatPosition = incomeStatementFormatPosition;
		incomeStatementFormatPosition.getAccountSubtypes().add(this);
	}

	public BalanceSheetFormatPosition getBalanceSheetFormatPosition() {
		return balanceSheetFormatPosition;
	}

	public void setBalanceSheetFormatPosition(BalanceSheetFormatPosition balanceSheetFormatPosition) {
		this.balanceSheetFormatPosition = balanceSheetFormatPosition;
		balanceSheetFormatPosition.getAccountSubtypes().add(this);
	}

	public CashFlowFormatPosition getCashFlowFormatPosition() {
		return cashFlowFormatPosition;
	}

	public void setCashFlowFormatPosition(CashFlowFormatPosition cashFlowFormatPosition) {
		this.cashFlowFormatPosition = cashFlowFormatPosition;
		cashFlowFormatPosition.getAccountSubtypes().add(this);
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
		return "AccountSubtype [id=" + id + ", name=" + name + ", accountType=" + accountType + ", accounts="
				+ accounts + "]";
	}


	
}
