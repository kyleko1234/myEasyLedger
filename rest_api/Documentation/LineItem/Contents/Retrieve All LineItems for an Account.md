### Retrieve All LineItems for an Account
Endpoint: `GET /account/{id}/lineItem?page={i}&size={j}`

Authorization: Specified account must belong to an organization which includes the requesting user.

Retrieves all LineItems belonging to account with id {id}. Paginated server-side.

**NOTE: The 'description' field returned by this function will reflect the description of the parent JournalEntry of the LineItem, not the description of the LineItem itself. In order to access LineItem.description you will need to either [[Retrieve a LineItem|retrieve the LineItem alone]], or [[Retrieve a JournalEntry|retrieve it as part of a JournalEntry]]. **
___
#### Request Body Parameters
None
___
#### Returns
Returns a page of LineItems based on the query parameters provided, sorted by descending lineItemId.
___

#### Sample Request
`GET /account/11/lineItem?page=0&size=2`
<br />

#### Sample Response
```json 
{
    "content": [
        {
            "accountId": 11,
            "accountName": "Accounts receivable",
            "amount": 20000,
            "description": "Received $20,000 cash from clients billed on November 21.",
            "journalEntryId": 9,
            "journalEntryDate": "2020-11-29",
            "isCredit": true,
            "lineItemId": 19
        },
        {
            "accountId": 11,
            "accountName": "Accounts receivable",
            "amount": 24000,
            "description": "Billed clients $24,000 on account.",
            "journalEntryId": 6,
            "journalEntryDate": "2020-11-21",
            "isCredit": false,
            "lineItemId": 12
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
        "pageSize": 2,
        "unpaged": false,
        "paged": true
    },
    "totalPages": 1,
    "totalElements": 2,
    "last": true,
    "size": 2,
    "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
    },
    "number": 0,
    "numberOfElements": 2,
    "first": true,
    "empty": false
}
```

