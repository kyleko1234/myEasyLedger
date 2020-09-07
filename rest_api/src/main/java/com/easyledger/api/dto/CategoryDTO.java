package com.easyledger.api.dto;

import com.easyledger.api.model.Category;

public class CategoryDTO {
	
	private Long categoryId;
	private String categoryName;
	private Long accountTypeId;
	private String accountTypeName;
	private Long organizationId;
	private String organizationName;
	
	public CategoryDTO(Category category) {
		this.categoryId = category.getId();
		this.categoryName = category.getName();
		this.accountTypeId = category.getAccountType().getId();
		this.accountTypeName = category.getAccountType().getName();
		this.organizationId = category.getOrganization().getId();
		this.organizationName = category.getOrganization().getName();
	}
	
	public CategoryDTO() {
	}

	//Getters, Setters, toString
	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Long getAccountTypeId() {
		return accountTypeId;
	}

	public void setAccountTypeId(Long accountTypeId) {
		this.accountTypeId = accountTypeId;
	}

	public String getAccountTypeName() {
		return accountTypeName;
	}

	public void setAccountTypeName(String accountTypeName) {
		this.accountTypeName = accountTypeName;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	@Override
	public String toString() {
		return "CategoryDTO [categoryId=" + categoryId + ", categoryName=" + categoryName + ", accountTypeId="
				+ accountTypeId + ", accountTypeName=" + accountTypeName + ", organizationId=" + organizationId
				+ ", organizationName=" + organizationName + "]";
	}
	
	

}
