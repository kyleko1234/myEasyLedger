package com.easyledger.api.model;

import java.math.BigDecimal;

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
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

import com.easyledger.api.dto.LineItemDTO;
import com.easyledger.api.utility.Utility;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@SqlResultSetMapping( //maps native SQL query to LineItemDTO class
		name = "lineItemDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = LineItemDTO.class,
						columns = {
								@ColumnResult(name = "accountId"),
								@ColumnResult(name = "accountName"),
								@ColumnResult(name = "amount"),
								@ColumnResult(name = "description"),
								@ColumnResult(name = "journalEntryId"),
								@ColumnResult(name = "journalEntryDate"),
								@ColumnResult(name = "journalEntryDescription"),
								@ColumnResult(name = "isCredit"),
								@ColumnResult(name = "lineItemId"),
								@ColumnResult(name = "accountSubtypeId"),
								@ColumnResult(name = "accountTypeId")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted LineItems in undeleted entries for an account when given an accountId
		name = "LineItem.getAllLineItemsForAccount",
		query = "(SELECT       " + 
				"        account.id AS accountId, account.name AS accountName,       " + 
				"        line_item.amount AS amount, line_item.description AS description,       " + 
				"        journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS journalEntryDescription,       " + 
				"        line_item.is_credit AS isCredit, line_item.id AS lineItemId, account_subtype.id AS accountSubtypeId, account_type.id AS accountTypeId " + 
				"    FROM       " + 
				"        line_item, journal_entry, account, account_subtype, account_type " + 
				"    WHERE       " + 
				"        account.id = :accountId AND        " + 
				"        line_item.account_id = account.id AND       " + 
				"        line_item.journal_entry_id = journal_entry.id AND       " + 
				"        journal_entry.deleted = false AND  " + 
				"        account_subtype.id = account.account_subtype_id AND " + 
				"        account_type.id = account_subtype.account_type_id " + 
				") " +
				"UNION " + 
				"(SELECT       " + 
				"    child_account.id AS accountId, child_account.name AS accountName,       " + 
				"    line_item.amount AS amount, line_item.description AS description,       " + 
				"    journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS journalEntryDescription,       " + 
				"    line_item.is_credit AS isCredit, line_item.id AS lineItemId, account_subtype.id AS accountSubtypeId, account_type.id AS accountTypeId " + 
				"FROM       " + 
				"    line_item, journal_entry, account AS child_account, account AS parent_account, account_subtype, account_type " + 
				"WHERE       " + 
				"    child_account.parent_account_id = :accountId AND        " + 
				"    line_item.account_id = child_account.id AND       " + 
				"    line_item.journal_entry_id = journal_entry.id AND       " + 
				"    journal_entry.deleted = false AND  " + 
				"    parent_account.id = child_account.parent_account_id AND  " + 
				"    account_subtype.id = parent_account.account_subtype_id AND " + 
				"    account_type.id = account_subtype.account_type_id" + 
				") " +
				"ORDER BY       " + 
				"    journalEntryDate DESC, journalEntryId DESC, lineItemId DESC ",
		resultSetMapping = "lineItemDTOMapping"
)
@NamedNativeQuery( //retrieves all undeleted LineItems in undeleted entries for an organization when given an organizationId
		name = "LineItem.getAllAssetAndLiabilityLineItemsForOrganization",
		query = " (SELECT            "
				+ "        account.id AS accountId, account.name AS accountName,            "
				+ "        line_item.amount AS amount, line_item.description AS description,            "
				+ "        journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS journalEntryDescription,            "
				+ "        line_item.is_credit AS isCredit, line_item.id AS lineItemId, account_subtype.id AS accountSubtypeId, account_type.id AS accountTypeId      "
				+ "    FROM            "
				+ "        line_item, journal_entry, account, account_subtype, account_type      "
				+ "    WHERE            "
				+ "        journal_entry.organization_id = :organizationId AND             "
				+ "        line_item.account_id = account.id AND            "
				+ "        line_item.journal_entry_id = journal_entry.id AND            "
				+ "        journal_entry.deleted = false AND       "
				+ "        account_subtype.id = account.account_subtype_id AND      "
				+ "        account_type.id = account_subtype.account_type_id AND "
				+ "        account_type.id < 3 "
				+ ")     "
				+ "UNION      "
				+ "(SELECT            "
				+ "    child_account.id AS accountId, child_account.name AS accountName,            "
				+ "    line_item.amount AS amount, line_item.description AS description,           "
				+ "    journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS journalEntryDescription,            "
				+ "    line_item.is_credit AS isCredit, line_item.id AS lineItemId, account_subtype.id AS accountSubtypeId, account_type.id AS accountTypeId      "
				+ "FROM            "
				+ "    line_item, journal_entry, account AS child_account, account AS parent_account, account_subtype, account_type      "
				+ "WHERE            "
				+ "    journal_entry.organization_id = :organizationId AND             "
				+ "    line_item.account_id = child_account.id AND            "
				+ "    line_item.journal_entry_id = journal_entry.id AND            "
				+ "    journal_entry.deleted = false AND       "
				+ "    parent_account.id = child_account.parent_account_id AND       "
				+ "    account_subtype.id = parent_account.account_subtype_id AND      "
				+ "    account_type.id = account_subtype.account_type_id AND "
				+ "    account_type.id < 3 "
				+ ")     "
				+ "ORDER BY            "
				+ "    journalEntryDate DESC, journalEntryId DESC, lineItemId DESC  ",
		resultSetMapping = "lineItemDTOMapping"
)
@SqlResultSetMapping(//sqlresultsetmapping for counting query
		name = "lineItemDTOMapping.count",
		columns = @ColumnResult(name = "count"))

@NamedNativeQuery( //query to count number of LineItems in order to use Pageable on LineItem.getAllLineItemsForAccount
		name = "LineItem.getAllLineItemsForAccount.count",
		query = "SELECT count(*) AS count from line_item, journal_entry WHERE line_item.account_id = ? AND line_item.journal_entry_id = journal_entry.id AND journal_entry.deleted = false",
		resultSetMapping = "lineItemDTOMapping.count"
)
@NamedNativeQuery( //query to count number of LineItems in order to use Pageable on LineItem.getAllLineItemsForOrganization
		name = "LineItem.getAllAssetAndLiabilityLineItemsForOrganization.count",
		query = "SELECT SUM(count) AS count FROM ( "
				+ "    ( "
				+ "        SELECT  "
				+ "            count(*) AS count  "
				+ "        FROM  "
				+ "            line_item, journal_entry, account, account_subtype "
				+ "        WHERE  "
				+ "            journal_entry.organization_id = :organizationId AND  "
				+ "            line_item.journal_entry_id = journal_entry.id AND  "
				+ "            journal_entry.deleted = false AND "
				+ "            line_item.account_id = account.id AND  "
				+ "            account.account_subtype_id = account_subtype.id AND "
				+ "            account_subtype.account_type_id < 3 "
				+ "    )  "
				+ "    UNION "
				+ "    ( "
				+ "        SELECT  "
				+ "            count(*) AS count  "
				+ "        FROM  "
				+ "            line_item, journal_entry, account_subtype, "
				+ "            account AS parent_account, account AS child_account "
				+ "        WHERE  "
				+ "            journal_entry.organization_id = :organizationId AND  "
				+ "            line_item.journal_entry_id = journal_entry.id AND  "
				+ "            journal_entry.deleted = false AND "
				+ "            line_item.account_id = child_account.id AND  "
				+ "            child_account.parent_account_id = parent_account.id AND "
				+ "            parent_account.account_subtype_id = account_subtype.id AND "
				+ "            account_subtype.account_type_id < 3 "
				+ "    ) "
				+ ") AS return_table",
		resultSetMapping = "lineItemDTOMapping.count"
)
@NamedNativeQuery( //retrieves all LineItems in undeleted entries between startDate and endDate (inclusive) for an account
		name = "LineItem.getLineItemsForAccountBetweenDates",
		query = "(SELECT            "
				+ "        account.id AS accountId, account.name AS accountName,            "
				+ "        line_item.amount AS amount, line_item.description AS description,            "
				+ "        journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS journalEntryDescription,            "
				+ "        line_item.is_credit AS isCredit, line_item.id AS lineItemId, account_subtype.id AS accountSubtypeId, account_type.id AS accountTypeId      "
				+ "    FROM            "
				+ "        line_item, journal_entry, account, account_subtype, account_type      "
				+ "    WHERE            "
				+ "        account.id = :accountId AND             "
				+ "        line_item.account_id = account.id AND            "
				+ "        line_item.journal_entry_id = journal_entry.id AND        "
				+ "        journal_entry.journal_entry_date >= :startDate AND "
				+ "        journal_entry.journal_entry_date <= :endDate AND "
				+ "        journal_entry.deleted = false AND       "
				+ "        account_subtype.id = account.account_subtype_id AND      "
				+ "        account_type.id = account_subtype.account_type_id      "
				+ ")     "
				+ "UNION      "
				+ "(SELECT            "
				+ "    child_account.id AS accountId, child_account.name AS accountName,            "
				+ "    line_item.amount AS amount, line_item.description AS description,            "
				+ "    journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, journal_entry.description AS journalEntryDescription,            "
				+ "    line_item.is_credit AS isCredit, line_item.id AS lineItemId, account_subtype.id AS accountSubtypeId, account_type.id AS accountTypeId      "
				+ "FROM            "
				+ "    line_item, journal_entry, account AS child_account, account AS parent_account, account_subtype, account_type      "
				+ "WHERE            "
				+ "    child_account.parent_account_id = :accountId AND             "
				+ "    line_item.account_id = child_account.id AND            "
				+ "    line_item.journal_entry_id = journal_entry.id AND        "
				+ "    journal_entry.journal_entry_date >= :startDate AND "
				+ "    journal_entry.journal_entry_date <= :endDate AND "
				+ "    journal_entry.deleted = false AND       "
				+ "    parent_account.id = child_account.parent_account_id AND       "
				+ "    account_subtype.id = parent_account.account_subtype_id AND      "
				+ "    account_type.id = account_subtype.account_type_id     "
				+ ")     "
				+ "ORDER BY journalEntryDate ASC, journalEntryId ASC, lineItemId ASC ",
		resultSetMapping = "lineItemDTOMapping"
)




@Entity
@Table(name = "line_item")
public class LineItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "is_credit", nullable = false)
	private boolean isCredit;
	
	@Column(name = "amount", nullable = false)
	private BigDecimal amount;
	
	@Column(name = "description", nullable = true)
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "account_id", nullable = false)
	private Account account;
		
	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "journal_entry_id", nullable = false)
	private JournalEntry journalEntry;
	
	public LineItem(boolean isCredit, BigDecimal amount, String description) {
		this.isCredit = isCredit;
		this.amount = amount;
		this.description = Utility.trimString(description, 255);
	}
	
	public LineItem() {
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public boolean isIsCredit() {
		return isCredit;
	}
	
	public void setIsCredit(boolean isCredit) {
		this.isCredit = isCredit;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = Utility.trimString(description, 255);
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public JournalEntry getJournalEntry() {
		return journalEntry;
	}

	public void setJournalEntry(JournalEntry journalEntry) {
		this.journalEntry = journalEntry;
		journalEntry.getLineItems().add(this);
	}

	@Override
	public String toString() {
		return "LineItem [id=" + id + ", isCredit=" + isCredit + ", amount=" + amount + ", description=" + description
				+ ", account=" + account + ", journalEntry=" + journalEntry + "]";
	}






	
	
}
