### List All JournalEntries Belonging to an Organization as JournalEntryViewModels
Endpoint: `GET /organization/{id}/journalEntryViewModel?page={i}&size={j}`

Authorization: User making the request must belong to the specified organization.

Returns a page from a paginated list of all undeleted journal entries belonging to organization with id {id} with zero-indexed page number  `i` and page size `j` as ViewModels, sorted by most recent journalEntryDate, secondary sorted by journalEntryId descending. JournalEntryViewModels are a compressed view of entries, allowing the entry to be displayed in one row with a summary of LineItem data for that entry. This is useful for generating a compact paginated view of a General Journal. ViewModels include information on journalEntryId, journalEntryDate, description for the journal entry, total debit amounts for the entry, and total credit amounts for the entry. Pagination is done server-side.
___

#### Request Body Parameters
None
___
#### Returns
Returns a page of JournalEntryViewModels based on the query parameters provided.
___

#### Sample Request
`GET /organization/1/journalEntryViewModel?page=0&size=3`
<br />

#### Sample Response
```json 
{
    "content": [
        {
            "journalEntryId": 10,
            "journalEntryDate": "2020-11-30",
            "description": "Paid salary for the month of November $7,500",
            "debitAmount": 7500,
            "creditAmount": 7500
        },
        {
            "journalEntryId": 9,
            "journalEntryDate": "2020-11-29",
            "description": "Received $20,000 cash from clients billed on November 21.",
            "debitAmount": 20000,
            "creditAmount": 20000
        },
        {
            "journalEntryId": 8,
            "journalEntryDate": "2020-11-28",
            "description": "Paid utility bills for the month of November $180.",
            "debitAmount": 180,
            "creditAmount": 180
        }
    ],
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "offset": 0,
        "pageNumber": 0,
        "pageSize": 3,
        "paged": true,
        "unpaged": false
    },
    "last": false,
    "totalPages": 4,
    "totalElements": 10,
    "size": 3,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "number": 0,
    "numberOfElements": 3,
    "first": true,
    "empty": false
}
```

