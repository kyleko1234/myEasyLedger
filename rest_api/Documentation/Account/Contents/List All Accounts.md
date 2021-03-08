### List all accounts
Endpoint: `GET /account`

Authorization: `ROLE_ADMIN`

Returns a list of all accounts in the database.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all accounts in the database.
___


#### Sample Request
`GET /account`
<br/>

#### Sample Response
```json
[
    {
        "accountId": 2,
        "accountName": "Accounts receivable",
        "accountGroupId": 2,
        "accountGroupName": "Accounts Receivable",
        "accountSubtypeId": 3,
        "accountSubtypeName": "Receivables",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 24000,
        "creditTotal": 20000,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitsMinusCredits": 4000,
        "deleted": false
    },
    ...
]
```