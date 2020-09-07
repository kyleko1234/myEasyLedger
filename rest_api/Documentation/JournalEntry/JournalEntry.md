## JournalEntry
The `JournalEntry` object represents a single transaction recorded in a General Journal. Users should submit data into the ledger primarily through JournalEntries. JournalEntry data is stored in the entry as LineItem objects, which represent single line-items in a double-entry style ledger book. LineItems must be submitted or updated as part of a journal entry, and cannot be created or updated piecemeal. The API allows you to retrieve, delete, create, and update entries, and retrieve a list of all entries. It also allows you to retrieve a server-paginated list of all journal entries as view models, sorted by most recent journalEntryDate.
___
### Contents
- [[The JournalEntry Object]]
- [[Create a JournalEntry]]
- [[Retrieve a JournalEntry]]
- [[Update a JournalEntry]]
- [[Delete a  JournalEntry]]
- [[List All JournalEntries]]
- [[List All JournalEntries as JournalEntryViewModels]]
