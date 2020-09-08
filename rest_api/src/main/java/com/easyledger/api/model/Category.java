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
								@ColumnResult(name = "accountTypeId"),
								@ColumnResult(name = "accountTypeName"),
								@ColumnResult(name = "organizationId"),
								@ColumnResult(name = "organizationName")
						}
				)
		}
)	
@NamedNativeQuery( //retrieves all entries and maps them into EntryViewModels
		name = "Category.getAllCategoriesForOrganization",
		query = "SELECT category.id AS categoryId, category.name AS categoryName, "
					+ "account_type.id AS accountTypeId, account_type.name AS accountTypeName, "
					+ "organization.id AS organizationId, organization.name AS organizationName "
				+ "FROM category, account_type, organization "
				+ "WHERE category.organization_id = ? "
				+ "AND organization.id = category.organization_id "
					+ "AND account_type.id = category.account_type_id",
		resultSetMapping = "categoryDTOMapping"
)


@Entity
@Table(name = "category")
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String name;
	
	@OneToMany(mappedBy = "category")
	@JsonIgnore
	private Set<LineItem> lineItems;
	
	@ManyToOne
	@JoinColumn(name = "account_type_id", nullable = false)
	private AccountType accountType;
	
	@ManyToOne
	@JoinColumn(name = "organization_id", nullable = false)
	private Organization organization;
	
	public Category() {
		this.lineItems = new HashSet<LineItem>();
	}

	public Category(String name) {
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

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
		accountType.getCategories().add(this);
	}
	
	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
		organization.getCategories().add(this);
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + ", lineItems=" + lineItems + ", accountType=" + accountType
				+ ", organization=" + organization + "]";
	}





	
}
