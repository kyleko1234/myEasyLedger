### List All Accounts Belonging to an Organization
Endpoint: `GET /organization/{id}/account`

Returns a list of all undeleted accounts belonging to an organization with the specified id, sorted by accountTypeId and then by accountId.
___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all accounts belonging to an organization when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/account`
<br/>

#### Sample Response
```json
[
    {
        "accountId": 10,
        "accountName": "Accounts Receivable",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 9,
        "accountSubtypeName": "Accounts Receivable",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 6,
        "accountName": "Business Cash",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 3,
        "accountName": "Personal Venmo",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 4,
        "accountSubtypeName": "Mobile Payment Account",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 2,
        "accountName": "Personal Checking",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 2,
        "accountSubtypeName": "Checking Account",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 1,
        "accountName": "Personal Cash",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 9,
        "accountName": "Accounts Payable",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "accountSubtypeId": 8,
        "accountSubtypeName": "Accounts Payable",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 4,
        "accountName": "Personal BOA Credit Card",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "accountSubtypeId": 7,
        "accountSubtypeName": "Line of Credit",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 11,
        "accountName": "Business Equity",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "accountSubtypeId": null,
        "accountSubtypeName": null,
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 8,
        "accountName": "Business Income",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "accountSubtypeId": null,
        "accountSubtypeName": null,
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 7,
        "accountName": "Business Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "accountSubtypeId": null,
        "accountSubtypeName": null,
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 5,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "accountSubtypeId": null,
        "accountSubtypeName": null,
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    }
]
```