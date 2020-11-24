### List all account subtypes
Endpoint: `GET /accountSubtype`

Authorization: `ROLE_ADMIN`

Returns a list of all account subtypes in the database.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all subtypes in the database.
___


#### Sample Request
`GET /accountSubtype`
<br/>

#### Sample Response
```json
[
    {
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 2,
        "accountSubtypeName": "Checking Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 3,
        "accountSubtypeName": "Savings Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 4,
        "accountSubtypeName": "Mobile Payment Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 5,
        "accountSubtypeName": "Investment Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 6,
        "accountSubtypeName": "Mortgage",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 7,
        "accountSubtypeName": "Line of Credit",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 8,
        "accountSubtypeName": "Accounts Payable",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountSubtypeId": 9,
        "accountSubtypeName": "Accounts Receivable",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
	...
]
```