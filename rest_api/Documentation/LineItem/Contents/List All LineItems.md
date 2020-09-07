### List all LineItems
Endpoint: `GET /lineItem`

Returns a list of all line items.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all LineItems in the database, ordered by first modified.
___


#### Sample Request
`GET /lineItem`
<br />

#### Sample Response
```json 
[
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
        "entryId": 1,
        "isCredit": false,
        "lineItemId": 1
    },
    {
        "accountId": 1,
        "accountName": "Cash",
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "amount": 40.00,
        "categoryId": null,
        "categoryName": null,
        "description": "Cash payment for groceries",
        "entryId": 1,
        "isCredit": true,
        "lineItemId": 2
    }, 
    ...
]
```
