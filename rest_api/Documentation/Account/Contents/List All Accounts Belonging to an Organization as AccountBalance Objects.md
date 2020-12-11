### List All Accounts Belonging to an Organization as AccountBalance Objects
Endpoint: `GET /organization/{id}/accountBalance`

Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all undeleted accounts belonging to an organization with the specified id. These accounts are presented as AccountBalance objects, which are Account objects that include the total debit and credit amounts of all undeleted line items affecting the account. The results are ordered by AccountTypeId, then by AccountName alphabetically.
___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all accounts belonging to an organization when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/accountBalance`
<br/>

#### Sample Response
```json
[
    {
        "accountId": 3,
        "accountName": "Checking Account #1",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 2,
        "accountSubtypeName": "Bank Accounts",
        "debitTotal": 20,
        "creditTotal": 30
    },
    {
        "accountId": 4,
        "accountName": "Investment Account #1",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 2,
        "accountSubtypeName": "Bank Accounts",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 1,
        "accountName": "My Personal Wallet",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash",
        "debitTotal": 0,
        "creditTotal": 80
    },
    {
        "accountId": 2,
        "accountName": "Savings Account #1",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 2,
        "accountSubtypeName": "Bank Accounts",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 8,
        "accountName": "Venmo Balance",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 4,
        "accountSubtypeName": "Digital Payment Accounts",
        "debitTotal": 20,
        "creditTotal": 20
    },
    {
        "accountId": 5,
        "accountName": "Credit Card #1",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "accountSubtypeId": 3,
        "accountSubtypeName": "Credit Cards",
        "debitTotal": 30,
        "creditTotal": 30
    },
    {
        "accountId": 6,
        "accountName": "Personal Income",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "accountSubtypeId": null,
        "accountSubtypeName": null,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "accountSubtypeId": null,
        "accountSubtypeName": null,
        "debitTotal": 100,
        "creditTotal": 10
    }
]
```