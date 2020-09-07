### List All Entries for an Organization
Endpoint: `GET /organization/{id}/entry`

Returns a list of all entries owned by the organization with the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an array of entry objects for all entries owned by the specified organization.
___
#### Sample Request
`GET /organization/1/entry`
<br/>

####Sample Response
```json
[
    {
        "entryId": 4,
        "entryDate": "2020-04-20",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
            {
                "accountId": 3,
                "accountName": "Venmo",
                "accountSubtypeId": 4,
                "accountSubtypeName": "Mobile Payment Account",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "venmo transfer to bank",
                "entryId": 4,
                "isCredit": true,
                "lineItemId": 9
            },
            {
                "accountId": 2,
                "accountName": "Checking",
                "accountSubtypeId": 2,
                "accountSubtypeName": "Checking Account",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "venmo transfer to bank",
                "entryId": 4,
                "isCredit": false,
                "lineItemId": 8
            }
        ]
    },
    ...
}
 ```
