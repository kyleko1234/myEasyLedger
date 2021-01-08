### Retrieve a LineItem
Endpoint: `GET /lineItem/{id}`

Authorization: The requested line item must belong to an organization that includes the requesting user.

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
    "accountId": 12,
    "accountName": "Office Rent",
    "accountGroupId": 9,
    "accountGroupName": "Selling, general, and administration",
    "accountSubtypeId": 26,
    "accountSubtypeName": "Selling, general, and administration",
    "accountTypeId": 5,
    "accountTypeName": "Expenses",
    "amount": 500,
    "description": "Office rent expense, November",
    "journalEntryId": 2,
    "journalEntryDate": "2020-11-03",
    "isCredit": false,
    "lineItemId": 3
}
```