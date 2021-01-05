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
								@ColumnResult(name = "accountGroupId"),
								@ColumnResult(name = "accountGroupName"),
								@ColumnResult(name = "accountSubtypeId"),
								@ColumnResult(name = "accountSubtypeName"),
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "amount"),
								@ColumnResult(name = "description"),
								@ColumnResult(name = "journalEntryId"),
								@ColumnResult(name = "journalEntryDate"),
								@ColumnResult(name = "isCredit"),
								@ColumnResult(name = "lineItemId")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted LineItems in undeleted entries for an account when given an accountId
		name = "LineItem.getAllLineItemsForAccount",
		query = "SELECT " + 
				"    account.id AS accountId, account.name AS accountName, " + 
				"    account_group.id AS accountGroupId, account_group.name AS accountGroupName, " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, " + 
				"    account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    line_item.amount AS amount, line_item.description AS description, " + 
				"    journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, " + 
				"    line_item.is_credit AS isCredit, line_item.id AS lineItemId " + 
				"FROM " + 
				"    account, account_group, account_subtype, account_type, line_item, journal_entry " + 
				"WHERE " + 
				"    account.id = ? AND  " + 
				"    line_item.account_id = account.id AND " + 
				"    line_item.journal_entry_id = journal_entry.id AND " + 
				"    account.account_group_id = account_group.id AND " + 
				"    account_group.account_subtype_id = account_subtype.id AND  " + 
				"    account_subtype.account_type_id = account_type.id AND  " + 
				"    journal_entry.deleted = false " + 
				"ORDER BY " + 
				"    journal_entry.journal_entry_date DESC, line_item.id DESC " + 
				"",
		resultSetMapping = "lineItemDTOMapping"
)
@NamedNativeQuery( //retrieves all undeleted LineItems in undeleted entries for an account group when given an accountGroupId
		name = "LineItem.getAllLineItemsForAccountGroup",
		query = "SELECT " + 
				"    account.id AS accountId, account.name AS accountName, " + 
				"    account_group.id AS accountGroupId, account_group.name AS accountGroupName, " + 
				"    account_subtype.id AS accountSubtypeId, account_subtype.name AS accountSubtypeName, " + 
				"    account_type.id AS accountTypeId, account_type.name AS accountTypeName, " + 
				"    line_item.amount AS amount, line_item.description AS description, " + 
				"    journal_entry.id AS journalEntryId, journal_entry.journal_entry_date AS journalEntryDate, " + 
				"    line_item.is_credit AS isCredit, line_item.id AS lineItemId " + 
				"FROM " + 
				"    account, account_group, account_subtype, account_type, line_item, journal_entry " + 
				"WHERE " + 
				"    account_group.id = ? AND  " + 
				"    line_item.account_id = account.id AND " + 
				"    line_item.journal_entry_id = journal_entry.id AND " + 
				"    account.account_group_id = account_group.id AND " + 
				"    account_group.account_subtype_id = account_subtype.id AND  " + 
				"    account_subtype.account_type_id = account_type.id AND  " + 
				"    journal_entry.deleted = false " + 
				"ORDER BY " + 
				"    journal_entry.journal_entry_date DESC, line_item.id DESC " + 
				"",
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
@NamedNativeQuery( //query to count number of LineItems in order to use Pageable on LineItem.getAllLineItemsForAccountSubtype
		name = "LineItem.getAllLineItemsForAccountGroup.count",
		query = "SELECT count(*) AS count from line_item, account, account_group, journal_entry  " + 
				"	WHERE  " + 
				"		account_group.id = ? AND  " + 
				"		line_item.account_id = account.id AND  " + 
				"		account_group.id = account.account_group_id AND " + 
				"		line_item.journal_entry_id = journal_entry.id AND  " + 
				"		journal_entry.deleted = false AND " + 
				"		account.deleted = false ",
		resultSetMapping = "lineItemDTOMapping.count"
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
		
	@ManyToOne(fetch=FetchType.EAGER)
	@JsonIgnore
	@JoinColumn(name = "journal_entry_id", nullable = false)
	private JournalEntry journalEntry;
	
	public LineItem(boolean isCredit, BigDecimal amount, String description) {
		this.isCredit = isCredit;
		this.amount = amount;
		this.description = description;
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
		this.description = description;
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
