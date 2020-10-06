### List All Accounts Belonging to an Organization as AccountBalance Objects
Endpoint: `GET /organization/{id}/accountBalance`

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
        "accountId": 10,
        "accountName": "Accounts Receivable",
        "accountTypeId": 1,
        "accountSubtypeId": 9,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 6,
        "accountName": "Business Cash",
        "accountTypeId": 1,
        "accountSubtypeId": 1,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 1,
        "accountName": "Personal Cash",
        "accountTypeId": 1,
        "accountSubtypeId": 1,
        "debitTotal": 0,
        "creditTotal": 80.00
    },
    {
        "accountId": 2,
        "accountName": "Personal Checking",
        "accountTypeId": 1,
        "accountSubtypeId": 2,
        "debitTotal": 30.00,
        "creditTotal": 30.00
    },
    {
        "accountId": 3,
        "accountName": "Personal Venmo",
        "accountTypeId": 1,
        "accountSubtypeId": 4,
        "debitTotal": 20.00,
        "creditTotal": 30.00
    },
    {
        "accountId": 9,
        "accountName": "Accounts Payable",
        "accountTypeId": 2,
        "accountSubtypeId": 8,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 4,
        "accountName": "Personal BOA Credit Card",
        "accountTypeId": 2,
        "accountSubtypeId": 7,
        "debitTotal": 30.00,
        "creditTotal": 30.00
    },
    {
        "accountId": 11,
        "accountName": "Business Equity",
        "accountTypeId": 3,
        "accountSubtypeId": null,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 8,
        "accountName": "Business Income",
        "accountTypeId": 4,
        "accountSubtypeId": null,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 7,
        "accountName": "Business Expenses",
        "accountTypeId": 5,
        "accountSubtypeId": null,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "accountId": 5,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountSubtypeId": null,
        "debitTotal": 100.00,
        "creditTotal": 10.00
    }
]
```