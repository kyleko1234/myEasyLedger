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

import com.easyledger.api.dto.CategoryBalanceDTO;
import com.easyledger.api.dto.CategoryDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SqlResultSetMapping( //maps native SQL query to CategoryDTO class
		name = "categoryDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = CategoryDTO.class,
						columns = {
								@ColumnResult(name = "categoryId"),
								@ColumnResult(name = "categoryName"),
								@ColumnResult(name = "accountId"),
								@ColumnResult(name = "accountName"),
								@ColumnResult(name = "deleted")	
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted categories for an organization when given an organization id
		name = "Category.getAllCategoriesForOrganization",
		query = "SELECT category.id AS categoryId, category.name AS categoryName, "
					+ "account.id AS accountId, account.name AS accountName, "
					+ "category.deleted AS deleted "
				+ "FROM category, account "
				+ "WHERE account.organization_id = ? AND category.account_id = account.id AND category.deleted = false "
				+ "ORDER BY category.name",
		resultSetMapping = "categoryDTOMapping"
)

@SqlResultSetMapping( //maps native SQL query to CategoryDTO class
		name = "categoryBalanceDTOMapping",
		classes = {
				@ConstructorResult(
						targetClass = CategoryBalanceDTO.class,
						columns = {
								@ColumnResult(name = "categoryId"),
								@ColumnResult(name = "categoryName"),
								@ColumnResult(name = "accountId"),
								@ColumnResult(name = "accountName"),
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "debitTotal"),
								@ColumnResult(name = "creditTotal")	
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all undeleted categories for an organization when given an organization id
		name = "Category.getAllCategoryBalancesForOrganization",
		query = " SELECT category.id AS categoryId, category.name AS categoryName, category.account_id AS accountId, account.name AS accountName, account.account_type_id AS accountTypeId, account_type.name AS accountTypeName,    " + 
				"                                   SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal,      " + 
				"                                   SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal      " + 
				"                                 FROM category       " + 
				"                                   LEFT JOIN line_item ON line_item.category_id = category.id       " + 
				"                                   LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id,      " + 
				"                                   account, account_type " + 
				"                                 WHERE account.organization_id = ? " + 
				"                                   AND category.account_id = account.id " + 
				"                                   AND account_type.id = account.account_type_id  " + 
				"                                   AND category.deleted = false      " + 
				"                                 GROUP BY category.id, account.account_type_id, account.name, account_type.name     " + 
				"                                 ORDER BY category.name",
		resultSetMapping = "categoryBalanceDTOMapping"
)
@NamedNativeQuery( //retrieves all a category with balance info when given a category id. Uses left join in order to allow for retrieval of categories with no undeleted line items.
		name = "Category.getCategoryBalanceById",
		query = " SELECT category.id AS categoryId, category.name AS categoryName, category.account_id AS accountId, account.name AS accountName, account.account_type_id AS accountTypeId, account_type.name AS accountTypeName,   " + 
				"                                   SUM(CASE WHEN line_item.is_credit = false AND journal_entry.deleted = false THEN line_item.amount END) AS debitTotal,     " + 
				"                                   SUM(CASE WHEN line_item.is_credit = true AND journal_entry.deleted = false THEN line_item.amount END) AS creditTotal     " + 
				"                                 FROM category      " + 
				"                                   LEFT JOIN line_item ON line_item.category_id = category.id      " + 
				"                                   LEFT JOIN journal_entry ON line_item.journal_entry_id = journal_entry.id,     " + 
				"                                   account, account_type " + 
				"                                 WHERE category.id = ? " +  
				"                                   AND category.account_id = account.id " + 
				"                                   AND account_type.id = account.account_type_id " + 
				"                                 GROUP BY category.id, account.account_type_id, account.name, account_type.name    " + 
				"                                 ORDER BY category.name",
		resultSetMapping = "categoryBalanceDTOMapping"
)



@Entity
@Table(name = "category")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "deleted")
	private boolean deleted;
	
	@OneToMany(mappedBy = "category")
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "account_id", nullable = false)
	private Account account;
	
	
	public Category() {
		this.lineItems = new HashSet<LineItem>();
	}

	public Category(String name) {
		this.name = name;
		this.lineItems = new HashSet<LineItem>();
	}

	public Category(String name, Account account) {
		this.name = name;
		this.account = account;
		account.getCategories().add(this);
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

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
		account.getCategories().add(this);
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + ", deleted=" + deleted + ", lineItems=" + lineItems
				+ ", account=" + account + "]";
	}





	
}
