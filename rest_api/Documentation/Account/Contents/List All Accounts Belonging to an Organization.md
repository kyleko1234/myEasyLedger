### List All Accounts Belonging to an Organization
Endpoint: <br/>
- `GET /organization/{id}/account` 

Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all undeleted accounts belonging to an organization with the specified id, sorted by accountTypeId ascending and then by accountName alphabetic.

For accounts that are not direct descendants of Account Subtype and are child accounts of a parent account, the parent's accountSubtype and accountType will be used for the respective fields on the child account object. **Note that when you [[Find All Account Balances for an Organization For a Certain Date Range|provide date ranges for account values]], these fields on a child account will return null instead.**
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
        "accountId": 1,
        "accountCode": "110100",
        "accountName": "Cash",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash and cash equivalents",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 420000,
        "creditTotal": 18430,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitsMinusCredits": 401570,
        "hasChildren": false
    },
    {
        "accountId": 2,
        "accountCode": "130100",
        "accountName": "Accounts Receivable",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 3,
        "accountSubtypeName": "Current receivables",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 24000,
        "creditTotal": 20000,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitsMinusCredits": 4000,
        "hasChildren": false
    },
	...
]
```