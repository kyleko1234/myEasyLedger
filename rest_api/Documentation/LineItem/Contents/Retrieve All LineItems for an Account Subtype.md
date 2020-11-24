### Retrieve All LineItems for an Account Subtype
Endpoint: `GET /accountSubtype/{id}/lineItem?page={i}&size={j}`

Authorization: Specified account subtype must belong to an organization which includes the requesting user.

Retrieves all LineItems belonging to account subtype with id {id}. Paginated server-side.
___
#### Request Body Parameters
None
___
#### Returns
Returns a page of LineItems based on the query parameters provided, sorted by descending lineItemId.
___

#### Sample Request
`GET /accountSubtype/2/lineItem?page=0&size=2`
<br />

#### Sample Response
```json 
{
    "content": [
        {
            "accountId": 2,
            "accountName": "Personal Checking",
            "accountSubtypeId": 2,
            "accountSubtypeName": "Checking Account",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 30.00,
            "categoryId": null,
            "categoryName": null,
            "description": "paid credit balance from checking acc",
            "journalEntryId": 5,
            "journalEntryDate": "2020-04-20",
            "isCredit": true,
            "lineItemId": 11
        },
        {
            "accountId": 2,
            "accountName": "Personal Checking",
            "accountSubtypeId": 2,
            "accountSubtypeName": "Checking Account",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 30.00,
            "categoryId": null,
            "categoryName": null,
            "description": "venmo transfer to bank",
            "journalEntryId": 4,
            "journalEntryDate": "2020-04-19",
            "isCredit": false,
            "lineItemId": 8
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
        "paged": true,
        "unpaged": false
    },
    "last": true,
    "totalPages": 1,
    "totalElements": 2,
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

