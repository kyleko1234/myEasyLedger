### Retrieve All LineItems for a Category
Endpoint: `GET /category/{id}/lineItem?page={i}&size={j}`

Authorization: Specified category must belong to an organization which includes the requesting user.

Retrieves all LineItems belonging to category with id {id}. Paginated server-side.
___
#### Request Body Parameters
None
___
#### Returns
Returns a page of LineItems based on the query parameters provided, sorted by descending lineItemId.
___

#### Sample Request
`GET /category/1/lineItem?page=0&size=2`
<br />

#### Sample Response
```json 
{
    "content": [
        {
            "accountId": 5,
            "accountName": "Personal Expenses",
            "accountSubtypeId": null,
            "accountSubtypeName": null,
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "amount": 20.00,
            "categoryId": 1,
            "categoryName": "Grocery",
            "description": "bought an stick of celery at whole foods",
            "journalEntryId": 6,
            "journalEntryDate": "2020-04-21",
            "isCredit": false,
            "lineItemId": 13
        },
        {
            "accountId": 5,
            "accountName": "Personal Expenses",
            "accountSubtypeId": null,
            "accountSubtypeName": null,
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "amount": 40.00,
            "categoryId": 1,
            "categoryName": "Grocery",
            "description": "Grocery expenses",
            "journalEntryId": 1,
            "journalEntryDate": "2020-04-11",
            "isCredit": false,
            "lineItemId": 1
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

