### Retrieve All Asset and Liability LineItems for an Organization
Endpoint: `POST /organization/{organizationId}/assetAndLiabilityLineItem?page={i}&size={j}`

Authorization: User must have view permissions for this organization.

Retrieves all LineItems belonging to organization with id {organizationId}, that belong to an account with accountType < 3. Paginated server-side.

A request body should be provided with a search query. This query will be used to search for and return LineItems that have descriptions matching this query, LineItems contained within JournalEntries with descriptions that match this query. If a query is not provided, or if it is an empty string or whitespace, this endpoint will return all LineItems instead of performing a text search.
In order to support the Chinese language, this search requires exact string matches or partial string matches (no fuzzy searches or advanced search engine features).
___
#### Request Body Structure
``` json
{
	query: <String 255>
}
```
- **query** 
	A text search query to find JournalEntryViewModels for JournalEntries with a description that match the search query. If this field is empty, full of whitespace, or not supplied, ALL LineItems will be returned instead.
___
#### Returns
Returns a page of LineItems based on the query parameters provided, sorted by descending journalEntryDate, then descending journalEntryId, then descending lineItemId.
___

#### Sample Request
`POST /organization/1/assetAndLiabilityLineItem?page=0&size=2`
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
            "accountId": 1,
            "accountName": "Cash",
            "amount": 7501,
            "description": "",
            "journalEntryId": 10,
            "journalEntryDate": "2020-11-30",
            "journalEntryDescription": "Paid salary for the month of November $7,501",
            "isCredit": true,
            "lineItemId": 57850,
            "accountSubtypeId": 1,
            "accountTypeId": 1
        },
        {
            "accountId": 1,
            "accountName": "Cash",
            "amount": 20000,
            "description": "Collected cash from clients billed on November 21",
            "journalEntryId": 9,
            "journalEntryDate": "2020-11-29",
            "journalEntryDescription": "Received $20,000 cash from clients billed on November 21.",
            "isCredit": false,
            "lineItemId": 1217,
            "accountSubtypeId": 1,
            "accountTypeId": 1
        }
    ],
    "pageable": {
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "pageNumber": 0,
        "pageSize": 2,
        "offset": 0,
        "paged": true,
        "unpaged": false
    },
    "totalPages": 7,
    "totalElements": 14,
    "last": false,
    "numberOfElements": 2,
    "size": 2,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "first": true,
    "number": 0,
    "empty": false
}
```

