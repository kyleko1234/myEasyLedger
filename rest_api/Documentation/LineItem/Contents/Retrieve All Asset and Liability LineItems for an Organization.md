### Retrieve All Asset and Liability LineItems for an Organization
Endpoint: `GET /organization/{organizationId}/assetAndLiabilityLineItem?page={i}&size={j}`

Authorization: User must have view permissions for this organization.

Retrieves all LineItems belonging to organization with id {organizationId}, that belong to an account with accountType < 3. Paginated server-side.

___
#### Request Body Parameters
None
___
#### Returns
Returns a page of LineItems based on the query parameters provided, sorted by descending journalEntryDate, then descending journalEntryId, then descending lineItemId.
___

#### Sample Request
`GET /organization/1/assetAndLiabilityLineItem?page=0&size=2`
<br />

#### Sample Response
```json 
{
    "content": [
        {
            "accountId": 1,
            "accountName": "Cash",
            "amount": 2000,
            "description": "Paid salary expense for November",
            "journalEntryId": 10,
            "journalEntryDate": "2020-11-30",
            "journalEntryDescription": "Paid salary for the month of November $7,501",
            "isCredit": true,
            "lineItemId": 1350,
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
            "lineItemId": 1316,
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
    "number": 0,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "first": true,
    "empty": false
}
```

