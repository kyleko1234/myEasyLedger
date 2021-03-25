### List All Account Subtype Balances for an Organization

Endpoints: 
- `GET /organization/{id}/accountSubtypeBalance`
- `GET /organization/{id}/accountSubtypeBalance/{endDate}`
- `GET /organization/{id}/accountSubtypeBalance/{startDate}/{endDate}`

Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all account subtypes that the user has created (undeleted) accountGroups for, including information on debit and credit balances. Account subtypes for which the user has not created any account groups will not be shown. Results are ordered by AccountSubtypeId.

When possible (i.e. no explicit date range is given), AccountSubtypeGroupBalances are calculated using sums of Account.debitTotal and Account.creditTotal. 

'debitAmount' and 'creditAmount' fields should be regarded as the final balances for each AccountBalance object. In the case that a date range (both a startDate AND and endDate) is provided, the resulting debitTotal and creditTotal (and debitsMinusCredits) will disregard initialDebitAmount and initialCreditAmount. When no date range is given and Account.debitTotal and Account.creditTotal are used to calculate account group balances, expect the sumOf... fields to be null. 

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
        "sumOfDebitLineItems": null,
        "sumOfCreditLineItems": null,
        "sumOfInitialDebitAmounts": null,
        "sumOfInitialCreditAmounts": null,
        "debitTotal": 420000,
        "creditTotal": 18430,
        "debitsMinusCredits": 401570
    },
    {
        "accountSubtypeId": 3,
        "accountSubtypeName": "Current receivables",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "sumOfDebitLineItems": null,
        "sumOfCreditLineItems": null,
        "sumOfInitialDebitAmounts": null,
        "sumOfInitialCreditAmounts": null,
        "debitTotal": 24000,
        "creditTotal": 20000,
        "debitsMinusCredits": 4000
    },
	...
]
```