### Retrieve All LineItems for an Account Group
Endpoint: `GET /accountGroup/{id}/lineItem?page={i}&size={j}`

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
            "accountId": 1,
            "accountName": "Cash",
            "accountGroupId": 1,
            "accountGroupName": "Cash",
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash and cash equivalents",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 7500,
            "description": "Paid salary expense for November",
            "journalEntryId": 10,
            "journalEntryDate": "2020-11-30",
            "isCredit": true,
            "lineItemId": 21
        },
        {
            "accountId": 1,
            "accountName": "Cash",
            "accountGroupId": 1,
            "accountGroupName": "Cash",
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash and cash equivalents",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 20000,
            "description": "Collected cash from clients billed on November 21",
            "journalEntryId": 9,
            "journalEntryDate": "2020-11-29",
            "isCredit": false,
            "lineItemId": 18
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
    "last": false,
    "totalPages": 4,
    "totalElements": 7,
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

