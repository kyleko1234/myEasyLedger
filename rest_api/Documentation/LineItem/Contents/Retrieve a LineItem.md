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
    "accountId": 10,
    "accountName": "Cash",
    "amount": 400000,
    "description": "Cash influx from initial offering",
    "journalEntryId": 1,
    "journalEntryDate": "2020-11-01",
    "isCredit": false,
    "lineItemId": 1
}
```