package com.easyledger.api.dto;

import java.math.BigInteger;
import java.time.OffsetDateTime;

public class JournalEntryLogDTO {
	private Long id;
	private OffsetDateTime datetimeOfEdit;
	private Long organizationId;
	private Long personId;
	private String personFirstName;
	private String personLastName;
	private Long journalEntryId;
	private JournalEntryDTO snapshot;
	
	public JournalEntryLogDTO(BigInteger id, OffsetDateTime datetimeOfEdit, BigInteger organizationId, BigInteger personId, String personFirstName,
			String personLastName, BigInteger journalEntryId, JournalEntryDTO snapshot) {
		super();
		this.id = id.longValueExact();
		this.datetimeOfEdit = datetimeOfEdit;
		this.organizationId = organizationId.longValueExact();
		this.personId = personId.longValueExact();
		this.personFirstName = personFirstName;
		this.personLastName = personLastName;
		this.journalEntryId = journalEntryId.longValueExact();
		this.snapshot = snapshot;
	}
	
	public JournalEntryLogDTO() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public OffsetDateTime getDatetimeOfEdit() {
		return datetimeOfEdit;
	}

	public void setDatetimeOfEdit(OffsetDateTime datetimeOfEdit) {
		this.datetimeOfEdit = datetimeOfEdit;
	}

	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
	}

	public String getPersonFirstName() {
		return personFirstName;
	}

	public void setPersonFirstName(String personFirstName) {
		this.personFirstName = personFirstName;
	}

	public String getPersonLastName() {
		return personLastName;
	}

	public void setPersonLastName(String personLastName) {
		this.personLastName = personLastName;
	}

	public Long getJournalEntryId() {
		return journalEntryId;
	}

	public void setJournalEntryId(Long journalEntryId) {
		this.journalEntryId = journalEntryId;
	}

	public JournalEntryDTO getSnapshot() {
		return snapshot;
	}

	public void setSnapshot(JournalEntryDTO snapshot) {
		this.snapshot = snapshot;
	}

	@Override
	public String toString() {
		return "JournalEntryLogDTO [id=" + id + ", datetimeOfEdit=" + datetimeOfEdit + ", personId=" + personId
				+ ", personFirstName=" + personFirstName + ", personLastName=" + personLastName + ", journalEntryId="
				+ journalEntryId + ", snapshot=" + snapshot + "]";
	}
	
	
	
}
