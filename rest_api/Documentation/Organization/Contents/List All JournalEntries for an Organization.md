### List All JournalEntries for an Organization
Endpoint: `GET /organization/{id}/journalEntry`

Returns a list of all journal entries owned by the organization with the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an array of journalEntry objects for all entries owned by the specified organization.
___
#### Sample Request
`GET /organization/1/journalEntry`
<br/>

####Sample Response
```json
[
    {
        "journalEntryId": 5,
        "journalEntryDate": "2020-04-20",
        "description": "Pay credit card balance",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
            {
                "accountId": 4,
                "accountName": "Personal BOA Credit Card",
                "accountSubtypeId": 7,
                "accountSubtypeName": "Line of Credit",
                "accountTypeId": 2,
                "accountTypeName": "Liabilities",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "paid credit balance",
                "journalEntryId": 5,
                "isCredit": false,
                "lineItemId": 10
            },
            {
                "accountId": 2,
                "accountName": "Personal Checking",
                "accountSubtypeId": 2,
                "accountSubtypeName": "Checking Account",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "paid credit balance from checking acc",
                "journalEntryId": 5,
                "isCredit": true,
                "lineItemId": 11
            }
        ]
    },
    {
        "journalEntryId": 6,
        "journalEntryDate": "2020-04-21",
        "description": "Lunch at Whole Foods",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
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
                "amount": 20.00,
                "categoryId": 2,
                "categoryName": "Dining",
                "description": "bought lunch at whole foods",
                "journalEntryId": 6,
                "isCredit": false,
                "lineItemId": 12
            },
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
                "description": "whole foods drained my whole wallet",
                "journalEntryId": 6,
                "isCredit": true,
                "lineItemId": 14
            }
        ]
    },
    {
        "journalEntryId": 2,
        "journalEntryDate": "2020-04-18",
        "description": "Group lunch",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
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
                "journalEntryId": 2,
                "isCredit": false,
                "lineItemId": 3
            },
            {
                "accountId": 3,
                "accountName": "Personal Venmo",
                "accountSubtypeId": 4,
                "accountSubtypeName": "Mobile Payment Account",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "amount": 10.00,
                "categoryId": null,
                "categoryName": null,
                "description": "Friend venmoed back at table",
                "journalEntryId": 2,
                "isCredit": false,
                "lineItemId": 4
            },
            {
                "accountId": 4,
                "accountName": "Personal BOA Credit Card",
                "accountSubtypeId": 7,
                "accountSubtypeName": "Line of Credit",
                "accountTypeId": 2,
                "accountTypeName": "Liabilities",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "Card payment for lunch",
                "journalEntryId": 2,
                "isCredit": true,
                "lineItemId": 5
            }
        ]
    },
	...
]
 ```
