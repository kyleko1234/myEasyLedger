### List all entries
Endpoint: `GET /entry`

Returns a list of all entries.
___
#### Request Body Parameters
None
___
#### Returns
Returns a list of all entries in the database, ordered by first modified.
___
#### Sample Request
`GET /entry`
<br/>

#### Sample Response
``` json
[
    {
        "entryId": 1,
        "entryDate": "2020-04-20",
        "description": "Grocery for the week",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
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
            }
        ]
    },
    {
        "entryId": 2,
        "entryDate": "2020-04-20",
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
                "entryId": 2,
                "isCredit": false,
                "lineItemId": 3
            },
            {
                "accountId": 3,
                "accountName": "Venmo",
                "accountSubtypeId": 4,
                "accountSubtypeName": "Mobile Payment Account",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "amount": 10.00,
                "categoryId": null,
                "categoryName": null,
                "description": "Friend venmoed back at table",
                "entryId": 2,
                "isCredit": false,
                "lineItemId": 4
            },
            {
                "accountId": 4,
                "accountName": "BOA Credit Card",
                "accountSubtypeId": 7,
                "accountSubtypeName": "Line of Credit",
                "accountTypeId": 2,
                "accountTypeName": "Liabilities",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "Card payment for lunch",
                "entryId": 2,
                "isCredit": true,
                "lineItemId": 5
            }
        ]
    },
    {
        "entryId": 3,
        "entryDate": "2020-04-20",
        "description": "Receive money from friend",
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
                "amount": 10.00,
                "categoryId": 2,
                "categoryName": "Dining",
                "description": "dining expenses paid back",
                "entryId": 3,
                "isCredit": true,
                "lineItemId": 7
            },
            {
                "accountId": 3,
                "accountName": "Venmo",
                "accountSubtypeId": 4,
                "accountSubtypeName": "Mobile Payment Account",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "amount": 10.00,
                "categoryId": null,
                "categoryName": null,
                "description": "other friend paid back",
                "entryId": 3,
                "isCredit": false,
                "lineItemId": 6
            }
        ]
    },
    {
        "entryId": 4,
        "entryDate": "2020-04-20",
        "description": "Transfer venmo balance to bank",
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
    {
        "entryId": 5,
        "entryDate": "2020-04-20",
        "description": "Pay credit card balance",
        "personId": 1,
        "organizationId": 1,
        "lineItems": [
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
                "description": "paid credit balance from checking acc",
                "entryId": 5,
                "isCredit": true,
                "lineItemId": 11
            },
            {
                "accountId": 4,
                "accountName": "BOA Credit Card",
                "accountSubtypeId": 7,
                "accountSubtypeName": "Line of Credit",
                "accountTypeId": 2,
                "accountTypeName": "Liabilities",
                "amount": 30.00,
                "categoryId": null,
                "categoryName": null,
                "description": "paid credit balance",
                "entryId": 5,
                "isCredit": false,
                "lineItemId": 10
            }
        ]
    },
    {
        "entryId": 6,
        "entryDate": "2020-04-21",
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
                "entryId": 6,
                "isCredit": false,
                "lineItemId": 13
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
                "description": "whole foods drained my whole wallet",
                "entryId": 6,
                "isCredit": true,
                "lineItemId": 14
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
                "entryId": 6,
                "isCredit": false,
                "lineItemId": 12
            }
        ]
    }
]
```
