### Retrieve a LineItem
Endpoint: `GET /lineItem/{id}`

Retrieves an existing line item using the supplied id.
___

#### Request Body Parameters
None.
____

#### Returns
Returns HTTP 200 and an entry object if a valid id was supplied, otherwise returns an HTTP 404 error.
____
#### Sample Request
`GET /lineItem/3`
<br />

#### Sample Response
```json
{
    "accountId": 5,
    "accountName": "Personal Expenses",
    "accountSubtypeId": null,
    "accountSubtypeName": null,
    "accountTypeId": 5,
    "accountTypeName": "Expenses",
    "amount": 20.00,
    "categoryId": 2,
    "categoryName": "Dining",
    "description": "Dining expenses",
    "entryId": 2,
    "isCredit": false,
    "lineItemId": 3
}
```