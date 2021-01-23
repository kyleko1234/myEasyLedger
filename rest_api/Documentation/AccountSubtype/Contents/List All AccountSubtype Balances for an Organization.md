### List All Account Subtype Balances for an Organization

Endpoints: 
- `GET /organization/{id}/accountSubtypeBalance`
- `GET /organization/{id}/accountSubtypeBalance/{endDate}`
- `GET /organization/{id}/accountSubtypeBalance/{startDate}/{endDate}`

Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all account subtypes that the user has created (undeleted) accountGroups for, including information on debit and credit balances. Account subtypes for which the user has not created any account groups will not be shown. Results are ordered by AccountSubtypeId.

Date parameters should be provided in `yyyy-mm-dd` format. If no date parameters are given, the resulting creditTotal and debitTotal fields in the returned objects will encompass all undeleted LineItems. If one date parameter is given, the resulting totals will encompass all LineItems dated up to and including the given date. If two date parameters are given, the resulting totals will encompass the date range between the given start date and end date, inclusive.

If start date and end date are the same date, the resulting totals will only encompass LineItems dated for that day. If the given end date is earlier than the given start date, all resulting totals will be 0.


___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of an organization's balances based on account subtype when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/accountSubtypeBalance`
<br/>

#### Sample Response
```json
[
    {
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash and cash equivalents",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 420000,
        "creditTotal": 18430,
        "debitsMinusCredits": 401570
    },
    {
        "accountSubtypeId": 3,
        "accountSubtypeName": "Receivables",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 24000,
        "creditTotal": 20000,
        "debitsMinusCredits": 4000
    },
    {
        "accountSubtypeId": 4,
        "accountSubtypeName": "Inventories",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 250,
        "creditTotal": 0,
        "debitsMinusCredits": 250
    },
    {
        "accountSubtypeId": 7,
        "accountSubtypeName": "Plant and equipment",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 29500,
        "creditTotal": 0,
        "debitsMinusCredits": 29500
    },
    {
        "accountSubtypeId": 10,
        "accountSubtypeName": "Payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 22500,
        "debitsMinusCredits": -22500
    },
    {
        "accountSubtypeId": 18,
        "accountSubtypeName": "Paid-in capital",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 400000,
        "debitsMinusCredits": -400000
    },
    {
        "accountSubtypeId": 19,
        "accountSubtypeName": "Dividends and equivalents",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 3000,
        "creditTotal": 0,
        "debitsMinusCredits": 3000
    },
    {
        "accountSubtypeId": 21,
        "accountSubtypeName": "Revenue",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 24000,
        "debitsMinusCredits": -24000
    },
    {
        "accountSubtypeId": 25,
        "accountSubtypeName": "Selling, general, and administration",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 8180,
        "creditTotal": 0,
        "debitsMinusCredits": 8180
    }
]
```