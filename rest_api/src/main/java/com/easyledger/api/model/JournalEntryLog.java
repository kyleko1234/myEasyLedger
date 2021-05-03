package com.easyledger.api.model;

import java.time.OffsetDateTime;
import java.time.ZoneId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import com.easyledger.api.dto.JournalEntryDTO;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;

@TypeDefs({
	@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
})
@Entity
@Table(name = "journal_entry_log")
public class JournalEntryLog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "datetime_of_edit")
	private OffsetDateTime datetimeOfEdit = OffsetDateTime.now(ZoneId.of("UTC"));
	
	@Type(type = "jsonb")
	@Column(name = "snapshot", columnDefinition = "jsonb")
	private JournalEntryDTO snapshot;
	
	@ManyToOne
	@JoinColumn(name = "person_id")
	private Person person;

	@ManyToOne
	@JoinColumn(name = "journal_entry_id")
	private JournalEntry journalEntry;

	public JournalEntryLog(JournalEntry journalEntry) {
		this.journalEntry = journalEntry;
		this.person = journalEntry.getPerson();
		this.snapshot = new JournalEntryDTO(journalEntry);
	}
	
	public JournalEntryLog(JournalEntry journalEntry, JournalEntryDTO dto, Person person) {
		this.journalEntry = journalEntry;
		this.person = person;
		this.snapshot = dto;
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

	public JournalEntryDTO getSnapshot() {
		return snapshot;
	}

	public void setSnapshot(JournalEntryDTO snapshot) {
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
