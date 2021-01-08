### Retrieve a JournalEntry
Endpoint: `GET /journalEntry/{id}`

Authorization: User making the request must belong to the organization that owns the specified entry..

Retrieves an existing entry using the supplied id.

___
#### Request Body Parameters
None.
___ 
#### Returns
Returns HTTP 200 and an entry object if a valid id was supplied, otherwise returns an HTTP 404 error.
___
#### Sample Request
`GET /journalEntry/1`
<br />

#### Sample Response
```json
{
    "journalEntryId": 1,
    "journalEntryDate": "2020-11-01",
    "description": "Issued 20,000 shares of common stock at $20 per share",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
        {
            "accountId": 1,
            "accountName": "Cash",
            "accountGroupId": 1,
            "accountGroupName": "Cash",
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash and cash equivalents",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 400000,
            "description": "Cash influx from initial offering",
            "journalEntryId": 1,
            "journalEntryDate": "2020-11-01",
            "isCredit": false,
            "lineItemId": 1
        },
        {
            "accountId": 9,
            "accountName": "Capital stock",
            "accountGroupId": 6,
            "accountGroupName": "Paid-in Capital",
            "accountSubtypeId": 19,
            "accountSubtypeName": "Paid-in capital",
            "accountTypeId": 3,
            "accountTypeName": "Owner's Equity",
            "amount": 400000,
            "description": "Issued 20000 shares of common at 20 per",
            "journalEntryId": 1,
            "journalEntryDate": "2020-11-01",
            "isCredit": true,
            "lineItemId": 2
        }
    ],
    "deleted": false
}
```