package com.easyledger.api.dto;

import com.easyledger.api.model.Category;

public class CategoryDTO {
	
	private Long categoryId;
	private String categoryName;
	private Long accountTypeId;
	private String accountTypeName;
	
	public CategoryDTO(Category category) {
		this.categoryId = category.getId();
		this.categoryName = category.getName();
		this.accountTypeId = category.getAccountType().getId();
		this.accountTypeName = category.getAccountType().getName();
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

	@Override
	public String toString() {
		return "CategoryDTO [categoryId=" + categoryId + ", categoryName=" + categoryName + ", accountTypeId="
				+ accountTypeId + ", accountTypeName=" + accountTypeName + "]";
	}
	
	

}
