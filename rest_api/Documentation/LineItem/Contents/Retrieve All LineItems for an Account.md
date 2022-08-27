### Retrieve All LineItems for an Account
Endpoint: `GET /account/{id}/lineItem?page={i}&size={j}`

Authorization: Specified account must belong to an organization which includes the requesting user.

Retrieves all LineItems belonging to account with id {id}. Paginated server-side.

___
#### Request Body Parameters
None
___
#### Returns
Returns a page of LineItems based on the query parameters provided, sorted by descending journalEntryDate, then descending journalEntryId, then descending lineItemId.
___

#### Sample Request
`GET /account/1/lineItem?page=0&size=2`
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
    "totalPages": 4,
    "totalElements": 7,
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

