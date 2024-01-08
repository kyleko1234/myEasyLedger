package com.easyledger.api.dto;

public class SearchQueryDTO {
	private String query = "";
	
	public SearchQueryDTO() {
	}
	
	public SearchQueryDTO(String query) {
		if (query != null) {
			this.query = query.trim();
		} else {
			this.query = "";
		}
	}	
	
	public String getQuery() {
		return query;
	}
	
	public void setQuery(String query) {
		if (query != null) {
			this.query = query.trim();
		} else {
			this.query = "";
		}
	}
	
	
}
