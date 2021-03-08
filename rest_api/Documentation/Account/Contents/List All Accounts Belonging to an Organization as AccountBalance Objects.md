### List All Accounts Belonging to an Organization as AccountBalance Objects
Endpoints: 
- `GET /organization/{id}/accountBalance/{endDate}`
- `GET /organization/{id}/accountBalance/{startDate}/{endDate}`



Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all undeleted accounts belonging to an organization with the specified id. These accounts are presented as AccountBalance objects, which are special Account objects that include information on the total debit and credit amounts of all undeleted line items affecting the account. The results are ordered by AccountTypeId, then by AccountName alphabetically.

Account's debitTotal/creditTotal field is a memoized total that is updated with every LineItem put/post/delete. This makes it a relatively cheap operation to fetch, but this means that the Account object can only show the most up-to-date balances of the account. AccountBalance calculates debitTotal and creditTotal by summing all relevant LineItem fields and adding initialDebitAmount (or initialCreditAmount). This allows us to query for specific date ranges at the cost of speed.

'debitAmount' and 'creditAmount' fields should be regarded as the final balances for each AccountBalance object. In the case that a date range (both a startDate AND and endDate) is provided, the resulting debitTotal and creditTotal (and debitsMinusCredits) will disregard initialDebitAmount and initialCreditAmount.


Date parameters should be provided in `yyyy-mm-dd` format. If no date parameters are given, the resulting creditTotal and debitTotal fields in the returned objects will encompass all undeleted LineItems. If one date parameter is given, the resulting totals will encompass all LineItems dated up to and including the given date. If two date parameters are given, the resulting totals will encompass the date range between the given start date and end date, inclusive.

If start date and end date are the same date, the resulting totals will only encompass LineItems dated for that day. If the given end date is earlier than the given start date, all resulting totals will be 0.
___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all accounts belonging to an organization when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/accountBalance/2020-10-31/2021-11-01`
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
        "totalDebitsMinusCredits": 4000,
        "deleted": false
    },
    {
        "accountId": 1,
        "accountName": "Cash",
        "accountGroupId": 1,
        "accountGroupName": "Cash",
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
        "totalDebitsMinusCredits": 401570,
        "deleted": false
    },
    {
        "accountId": 15,
        "accountName": "Cash Equivalents",
        "accountGroupId": 1,
        "accountGroupName": "Cash",
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash and cash equivalents",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 0,
        "initialDebitAmount": 1000,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 0,
        "deleted": false
    },
    {
        "accountId": 4,
        "accountName": "Office equipment",
        "accountGroupId": 4,
        "accountGroupName": "Equipment",
        "accountSubtypeId": 7,
        "accountSubtypeName": "Plant and equipment",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 4500,
        "creditTotal": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 4500,
        "deleted": false
    },
    {
        "accountId": 3,
        "accountName": "Office supplies",
        "accountGroupId": 3,
        "accountGroupName": "Inventories",
        "accountSubtypeId": 4,
        "accountSubtypeName": "Inventories",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 250,
        "creditTotal": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 250,
        "deleted": false
    },
    {
        "accountId": 5,
        "accountName": "Vehicles",
        "accountGroupId": 4,
        "accountGroupName": "Equipment",
        "accountSubtypeId": 7,
        "accountSubtypeName": "Plant and equipment",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 25000,
        "creditTotal": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 25000,
        "deleted": false
    },
    {
        "accountId": 7,
        "accountName": "Accounts payable",
        "accountGroupId": 5,
        "accountGroupName": "Payables",
        "accountSubtypeId": 10,
        "accountSubtypeName": "Payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 4500,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": -4500,
        "deleted": false
    },
    {
        "accountId": 8,
        "accountName": "Dividends payable",
        "accountGroupId": 5,
        "accountGroupName": "Payables",
        "accountSubtypeId": 10,
        "accountSubtypeName": "Payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 3000,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": -3000,
        "deleted": false
    },
    {
        "accountId": 6,
        "accountName": "Notes payable",
        "accountGroupId": 5,
        "accountGroupName": "Payables",
        "accountSubtypeId": 10,
        "accountSubtypeName": "Payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 15000,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": -15000,
        "deleted": false
    },
    {
        "accountId": 9,
        "accountName": "Capital stock",
        "accountGroupId": 6,
        "accountGroupName": "Paid-in Capital",
        "accountSubtypeId": 18,
        "accountSubtypeName": "Paid-in capital",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 400000,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": -400000,
        "deleted": false
    },
    {
        "accountId": 10,
        "accountName": "Dividends",
        "accountGroupId": 7,
        "accountGroupName": "Dividends and equivalents",
        "accountSubtypeId": 19,
        "accountSubtypeName": "Dividends and equivalents",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 3000,
        "creditTotal": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 3000,
        "deleted": false
    },
    {
        "accountId": 11,
        "accountName": "Service revenue",
        "accountGroupId": 8,
        "accountGroupName": "Revenue",
        "accountSubtypeId": 21,
        "accountSubtypeName": "Revenue",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 0,
        "creditTotal": 24000,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": -24000,
        "deleted": false
    },
    {
        "accountId": 12,
        "accountName": "Office Rent",
        "accountGroupId": 9,
        "accountGroupName": "Selling, general, and administration",
        "accountSubtypeId": 25,
        "accountSubtypeName": "Selling, general, and administration",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 500,
        "creditTotal": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 500,
        "deleted": false
    },
    {
        "accountId": 13,
        "accountName": "Payroll",
        "accountGroupId": 9,
        "accountGroupName": "Selling, general, and administration",
        "accountSubtypeId": 25,
        "accountSubtypeName": "Selling, general, and administration",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 7500,
        "creditTotal": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 7500,
        "deleted": false
    },
    {
        "accountId": 14,
        "accountName": "Utilities",
        "accountGroupId": 9,
        "accountGroupName": "Selling, general, and administration",
        "accountSubtypeId": 25,
        "accountSubtypeName": "Selling, general, and administration",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "debitTotal": 180,
        "creditTotal": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "totalDebitsMinusCredits": 180,
        "deleted": false
    }
]
```