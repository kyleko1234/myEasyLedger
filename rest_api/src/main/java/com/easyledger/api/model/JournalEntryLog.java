package com.easyledger.api.model;

import java.time.OffsetDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.easyledger.api.dto.JournalEntryDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Entity
@Table(name = "journal_entry_log")
public class JournalEntryLog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "datetime_of_edit")
	private OffsetDateTime datetimeOfEdit;
	
	@Column(name = "snapshot")
	private String snapshot;
	
	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;

	@ManyToOne
	@JoinColumn(name = "journal_entry_id")
	private JournalEntry journalEntry;

	public JournalEntryLog(JournalEntry journalEntry) throws JsonProcessingException {
		this.journalEntry = journalEntry;
		this.person = journalEntry.getPerson();
		ObjectMapper mapper = new ObjectMapper();
		this.snapshot = mapper.writeValueAsString(new JournalEntryDTO(journalEntry));
	}
	
	public JournalEntryLog(JournalEntry journalEntry, JournalEntryDTO dto, Person person) throws JsonProcessingException {
		this.journalEntry = journalEntry;
		this.person = person;
		ObjectMapper mapper = new ObjectMapper();
		this.snapshot = mapper.writeValueAsString(dto);
	}
	
	public JournalEntryLog() {
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

	public String getSnapshot() {
		return snapshot;
	}

	public void setSnapshot(String snapshot) {
		this.snapshot = snapshot;
	}

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}

	public JournalEntry getJournalEntry() {
		return journalEntry;
	}

	public void setJournalEntry(JournalEntry journalEntry) {
		this.journalEntry = journalEntry;
	}

	@Override
	public String toString() {
		return "JournalEntryLog [id=" + id + ", datetimeOfEdit=" + datetimeOfEdit + ", snapshot=" + snapshot
				+ ", person=" + person + ", journalEntry=" + journalEntry + "]";
	}

}
