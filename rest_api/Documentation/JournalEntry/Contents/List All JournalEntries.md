### List all JournalEntries
Endpoint: `GET /journalEntry`

Returns a list of all JournalEntries.
___
#### Request Body Parameters
None
___
#### Returns
Returns a list of all journal entries in the database, ordered by first modified.
___
#### Sample Request
`GET /journalEntry`
<br/>

#### Sample Response
``` json
[
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
                "isCredit": false,
                "lineItemId": 1
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
    {
        "journalEntryId": 3,
        "journalEntryDate": "2020-04-18",
        "description": "Receive money from friend",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
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
                "description": "other friend paid back",
                "journalEntryId": 3,
                "isCredit": false,
                "lineItemId": 6
            },
            {
                "accountId": 5,
                "accountName": "Personal Expenses",
                "accountSubtypeId": null,
                "accountSubtypeName": null,
                "accountTypeId": 5,
                "accountTypeName": "Expenses",
                "amount": 10.00,
                "categoryId": 2,
                "categoryName": "Dining",
                "description": "dining expenses paid back",
                "journalEntryId": 3,
                "isCredit": true,
                "lineItemId": 7
            }
        ]
    },
    {
        "journalEntryId": 4,
        "journalEntryDate": "2020-04-19",
        "description": "Transfer venmo balance to bank",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
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
                "description": "venmo transfer to bank",
                "journalEntryId": 4,
                "isCredit": false,
                "lineItemId": 8
            },
            {
                "accountId": 3,
                "accountName": "Personal Venmo",
                "accountSubtypeId": 4,
                "accountSubtypeName": "Mobile Payment Account",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "venmo transfer to bank",
                "journalEntryId": 4,
                "isCredit": true,
                "lineItemId": 9
            }
        ]
    },
    {
        "journalEntryId": 5,
        "journalEntryDate": "2020-04-20",
        "description": "Pay credit card balance",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
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
                "description": "paid credit balance",
                "journalEntryId": 5,
                "isCredit": false,
                "lineItemId": 10
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
                "categoryId": 2,
                "categoryName": "Dining",
                "description": "bought lunch at whole foods",
                "journalEntryId": 6,
                "isCredit": false,
                "lineItemId": 12
            },
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
    }
]
```
