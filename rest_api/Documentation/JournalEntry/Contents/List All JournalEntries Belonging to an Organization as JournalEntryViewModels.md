### List All JournalEntries Belonging to an Organization as JournalEntryViewModels
Endpoint: `GET /organization/{id}/journalEntryViewModel?page={i}&size={j}`

Returns a page from a paginated list of all journal entries belonging to organization with id {id} with zero-indexed page number  `i` and page size `j` as ViewModels, sorted by most recent journalEntryDate, secondary sorted by journalEntryId descending. JournalEntryViewModels are a compressed view of entries, allowing the entry to be displayed in one row with a summary of LineItem data for that entry. This is useful for generating a compact paginated view of a General Journal. ViewModels include information on journalEntryId, journalEntryDate, description for the journal entry, total debit amounts for the entry, and total credit amounts for the entry. Pagination is done server-side.
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
            "journalEntryId": 6,
            "journalEntryDate": "2020-04-21",
            "description": "Lunch at Whole Foods",
            "debitAmount": 40.00,
            "creditAmount": 40.00
        },
        {
            "journalEntryId": 5,
            "journalEntryDate": "2020-04-20",
            "description": "Pay credit card balance",
            "debitAmount": 30.00,
            "creditAmount": 30.00
        },
        {
            "journalEntryId": 4,
            "journalEntryDate": "2020-04-19",
            "description": "Transfer venmo balance to bank",
            "debitAmount": 30.00,
            "creditAmount": 30.00
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
        "unpaged": false,
        "paged": true
    },
    "totalPages": 2,
    "totalElements": 6,
    "last": false,
    "size": 3,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "number": 0,
    "first": true,
    "numberOfElements": 3,
    "empty": false
}
```

