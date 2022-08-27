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
`GET /lineItem/1`
<br />

#### Sample Response
```json
{
    "accountId": 6,
    "accountName": "Paid-in Capital",
    "amount": 400000,
    "description": "Issued 20000 shares of common at 20 per",
    "journalEntryId": 1,
    "journalEntryDate": "2020-11-01",
    "journalEntryDescription": "Issued 20,000 shares of common stock at $20 per share",
    "isCredit": true,
    "lineItemId": 1,
    "accountSubtypeId": 20,
    "accountTypeId": 3
}
```