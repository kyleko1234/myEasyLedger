### Retrieve a JournalEntry
Endpoint: `GET /journalEntry/{id}`

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
    "journalEntryDate": "2020-04-11",
    "description": "Grocery for the week",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
        {
            "accountId": 1,
            "accountName": "Personal Cash",
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 40.00,
            "categoryId": null,
            "categoryName": null,
            "description": "Cash payment for groceries",
            "journalEntryId": 1,
            "journalEntryDate": "2020-04-11",
            "isCredit": true,
            "lineItemId": 2
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
    "deleted": false
}
```