### List All Entries as EntryViewModels
Endpoint: `GET /entryViewModel?page={i}&size={j}`

Returns a page from a paginated list of all entries with zero-indexed page number  `i` and page size `j` as ViewModels, sorted by most recent entryDate. EntryViewModels are a compressed view of entries, allowing the entry to be displayed in one row with a summary of LineItem data for that entry. ViewModels include information on entryId, entryDate, description for the entry, total debit amounts for the entry, and total credit amounts for the entry. Pagination is done server-side.
___

#### Request Body Parameters
None
___
#### Returns
Returns a page of EntryViewModels based on the query parameters provided.
___

#### Sample Request
`GET /entryViewModel?page=0&size=3`
<br />

#### Sample Response
```json 
{
    "content": [
        {
            "entryId": 6,
            "entryDate": "2020-04-21",
            "description": "Lunch at Whole Foods",
            "debitAmount": 40.00,
            "creditAmount": 40.00
        },
        {
            "entryId": 1,
            "entryDate": "2020-04-20",
            "description": "Grocery for the week",
            "debitAmount": 40.00,
            "creditAmount": 40.00
        },
        {
            "entryId": 2,
            "entryDate": "2020-04-20",
            "description": "Group lunch",
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
    "numberOfElements": 3,
    "first": true,
    "empty": false
}
```

