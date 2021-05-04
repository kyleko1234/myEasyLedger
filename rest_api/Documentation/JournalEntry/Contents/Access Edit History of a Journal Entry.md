### Access Edit History of a Journal Entry
Endpoint: `GET /journalEntry/{id}/log`

Authorization: Requester must be an admin of the organization that the entry belongs to.

Returns a list of JournalEntryLog objects, representing snapshots of a journal entry at each point that it is created, updated, or deleted, ordered by most recent.

Each JournalEntryLog object has the following format:
```json
    {
        "id": 10,
        "datetimeOfEdit": "2021-05-04T04:07:19.992+0000",
        "organizationId": 1,
        "personId": 1,
        "personFirstName": "Kyle",
        "personLastName": "Ko",
        "journalEntryId": 10,
        "snapshot": "{\"journalEntryId\":10,\"journalEntryDate\":[2020,11,30],\"description\":\"Paid salary for the month of November $7,500\",\"personId\":1,\"organizationId\":1,\"lineItems\":[{\"accountId\":18,\"accountName\":\"Payroll\",\"amount\":7500,\"description\":\"Paid salary expense for November\",\"journalEntryId\":10,\"journalEntryDate\":[2020,11,30],\"isCredit\":false,\"lineItemId\":20,\"accountSubtypeId\":29,\"accountTypeId\":5},{\"accountId\":1,\"accountName\":\"Cash\",\"amount\":7500,\"description\":\"Paid salary expense for November\",\"journalEntryId\":10,\"journalEntryDate\":[2020,11,30],\"isCredit\":true,\"lineItemId\":21,\"accountSubtypeId\":1,\"accountTypeId\":1}],\"deleted\":false}"
    }
```

- **id** (`Long`) <br/>
A unique identifier for this object.
- **datetimeOfEdit** (`Timestamp`) <br/>
The timestamp in UTC at which the JournalEntry was edited.
- **organizationId** (`Long`)<br/>
The organization that owns this JournalEntry.
- **personId** (`Long`)<br/>
The id of the person that made this edit.
- **personFirstName** (`String`)<br/>
The first name of the person who made this edit.
- **personLastName** (`String`)<br/>
The last name of the person who made this edit.
-- **journalEntryId** (`Long`)<br/>
The id of the journal entry that this object is tracking.
- **snapshot** (`JSON string`)<br/>
A json string representing a snapshot of this journal entry object after the edit was made.



