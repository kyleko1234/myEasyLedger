package com.easyledger.api.dto;

import java.math.BigInteger;

import com.easyledger.api.model.Category;

public class CategoryDTO {
	
	private Long categoryId;
	private String categoryName;
	private Long accountId;
	private String accountName;
	private boolean deleted;
	
	public CategoryDTO(Category category) {
		this.categoryId = category.getId();
		this.categoryName = category.getName();
		this.accountId = category.getAccount().getId();
		this.accountName = category.getAccount().getName();
		this.deleted = category.isDeleted();
	}
	
	public CategoryDTO(BigInteger categoryId, String categoryName, BigInteger accountId, String accountName, boolean deleted) {
		this.categoryId = categoryId.longValueExact();
		this.categoryName = categoryName;
		this.accountId = accountId.longValueExact();
		this.accountName = accountName;
		this.deleted = deleted;
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

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public String toString() {
		return "CategoryDTO [categoryId=" + categoryId + ", categoryName=" + categoryName + ", accountId=" + accountId
				+ ", accountName=" + accountName + ", deleted=" + deleted + "]";
	}
	
	

}
