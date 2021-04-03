### Find All Account Balances for an Organization For a Certain Date Range
Endpoints: 
- `GET /organization/{id}/accountBalance/{endDate}`
- `GET /organization/{id}/accountBalance/{startDate}/{endDate}`



Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all undeleted accounts belonging to an organization with the specified id. These accounts are presented as AccountBalance objects, which are special Account objects that include information on the total debit and credit amounts of all undeleted line items affecting the account. The results are ordered by AccountTypeId, then by AccountName alphabetically.

Account's debitTotal/creditTotal field is a memoized total that is updated with every LineItem put/post/delete. This makes it a relatively cheap operation to fetch, but this means that the Account object can only show the most up-to-date balances of the account. AccountBalance calculates debitTotal and creditTotal by summing all relevant LineItem fields and adding initialDebitAmount (or initialCreditAmount). This allows us to query for specific date ranges at the cost of speed.

'debitAmount' and 'creditAmount' fields should be regarded as the final balances for each AccountBalance object. In the case that a date range (both a startDate AND and endDate) is provided, the resulting debitTotal and creditTotal (and debitsMinusCredits) will disregard initialDebitAmount and initialCreditAmount.


Date parameters should be provided in `yyyy-mm-dd` format. If no date parameters are given, the resulting creditTotal and debitTotal fields in the returned objects will encompass all undeleted LineItems. If one date parameter is given, the resulting totals will encompass all LineItems dated up to and including the given date. If two date parameters are given, the resulting totals will encompass the date range between the given start date and end date, inclusive.

If start date and end date are the same date, the resulting totals will only encompass LineItems dated for that day. If the given end date is earlier than the given start date, all resulting totals will be 0.

**When requesting a date range, the debitTotal and creditTotal for parent accounts will be 0; only child accounts will carry debitTotal and creditTotals. For accounts that are child accounts of other accounts, accountSubtypeId, accountSubtypeName, accountTypeId, and accountTypeName will return null values.**
___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all accounts belonging to an organization when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/accountBalance/2020-12-01`
<br/>

#### Sample Response
```json
[
    {
        "accountId": 2,
        "accountName": "Accounts Receivable",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 3,
        "accountSubtypeName": "Current receivables",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "sumOfDebitLineItems": 0,
        "sumOfCreditLineItems": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitTotal": 0,
        "creditTotal": 0,
        "debitsMinusCredits": 0,
        "hasChildren": true
    },
    {
        "accountId": 1,
        "accountName": "Cash",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash and cash equivalents",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "sumOfDebitLineItems": 0,
        "sumOfCreditLineItems": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitTotal": 0,
        "creditTotal": 0,
        "debitsMinusCredits": 0,
        "hasChildren": true
    },
    {
        "accountId": 4,
        "accountName": "Equipment",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 6,
        "accountSubtypeName": "Property, plant, and equipment",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "sumOfDebitLineItems": 0,
        "sumOfCreditLineItems": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitTotal": 0,
        "creditTotal": 0,
        "debitsMinusCredits": 0,
        "hasChildren": true
    },
    {
        "accountId": 3,
        "accountName": "Inventories",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 4,
        "accountSubtypeName": "Inventory",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "sumOfDebitLineItems": 0,
        "sumOfCreditLineItems": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitTotal": 0,
        "creditTotal": 0,
        "debitsMinusCredits": 0,
        "hasChildren": true
    },
    {
        "accountId": 5,
        "accountName": "Payables",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 11,
        "accountSubtypeName": "Current payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "sumOfDebitLineItems": 0,
        "sumOfCreditLineItems": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitTotal": 0,
        "creditTotal": 0,
        "debitsMinusCredits": 0,
        "hasChildren": true
    },
    {
        "accountId": 7,
        "accountName": "Dividends and equivalents",
        "parentAccountId": null,
        "parentAccountName": null,
        "accountSubtypeId": 21,
        "accountSubtypeName": "Dividends and equivalents",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "sumOfDebitLineItems": 0,
        "sumOfCreditLineItems": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitTotal": 0,
        "creditTotal": 0,
        "debitsMinusCredits": 0,
        "hasChildren": true
    },
	...
]
```