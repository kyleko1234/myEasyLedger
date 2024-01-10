### Search for JournalEntryViewModels
Endpoint: `POST /organization/{id}/journalEntryViewModel?page={i}&size={j}`

Authorization: User making the request must belong to the specified organization.

Returns a page from a paginated list of all undeleted journal entries belonging to organization with id {id} with zero-indexed page number  `i` and page size `j` as ViewModels, sorted by most recent journalEntryDate, secondary sorted by journalEntryId descending. JournalEntryViewModels are a compressed view of entries, allowing the entry to be displayed in one row with a summary of LineItem data for that entry. This is useful for generating a compact paginated view of a General Journal. ViewModels include information on journalEntryId, journalEntryDate, description for the journal entry, total debit amounts for the entry, and total credit amounts for the entry. Pagination is done server-side.
A request body should be provided with a search query. This query will be used to search for and return JournalEntryViewModels for JournalEntries that have descriptions matching this query. This endpoint does NOT search through LineItem descriptions/memos. If a query is not provided, or if it is an empty string or whitespace, this endpoint will return all JournalEntryViewModels instead of performing a text search.
___

#### Request Body Structure
``` json
{
	query: <String 255>
}
```
- **query** 
	A text search query to find JournalEntryViewModels for JournalEntries with a description that match the search query. If this field is empty, full of whitespace, or not supplied, ALL JournalEntryViewModels will be returned instead.
___
#### Returns
Returns a page of JournalEntryViewModels based on the query parameters provided.
___

#### Sample Request
`POST /organization/1/journalEntryViewModel?page=0&size=3`
<br />
Request body: 
```json
{
    "query" : ""
}
```
#### Sample Response
```json 
{
    "content": [
        {
            "journalEntryId": 10,
            "journalEntryDate": "2020-11-30",
            "description": "Paid salary for the month of November $7,501",
            "debitAmount": 7501,
            "creditAmount": 7501
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
        "pageNumber": 0,
        "pageSize": 3,
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "totalPages": 4,
    "totalElements": 10,
    "last": false,
    "numberOfElements": 3,
    "number": 0,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "first": true,
    "size": 3,
    "empty": false
}
```

