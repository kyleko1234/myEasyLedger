### Retrieve Account Type Summaries for An Organization for the Past N Months
Endpoint: GET `/organization/{id}/accountTypeSummary/monthly/{monthsAgo}`

Authorization: Requesting user must belong to the specified organization.

Returns a list of monthly account type balance summaries for organization {id} for the past {monthsAgo+} months (i.e. if the current date is 2020-12-12 and we query for 20 monthsAgo, monthly summaries will be returned for all account types since 2020-12 minus 20 months = 2019-04. **This gives us 21 months of data.**). yearMonth in the returned objects are the year and month for the account type which the summary object represents, in yyyymm format. Results are ordered by yearMonth ascending, then AccountTypeId descending.

___

#### Request Body Parameters
None
___
#### Returns
Returns an list of account type summaries for the past {numberOfMonths} months, sorted by accountTypeId descending and then by date descending. This list does not include any monthly AccountType summary objects for an AccountType that has had no LineItems recorded for this organization in a given month - only months in which an AccountType has been populated with data will be returned. If there has been no activity in the past {numberOfMonths} months, an empty list is returned.
___


#### Sample Request
`GET /organization/1/accountTypeSummary/monthly/8` <br/>

#### Sample Response
```json
[
    {
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitAmount": 8180,
        "creditAmount": 0,
        "yearMonth": 202011
    },
    {
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "debitAmount": 0,
        "creditAmount": 24000,
        "yearMonth": 202011
    },
    {
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "debitAmount": 3000,
        "creditAmount": 400000,
        "yearMonth": 202011
    },
    {
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "debitAmount": 0,
        "creditAmount": 22500,
        "yearMonth": 202011
    },
    {
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "debitAmount": 473750,
        "creditAmount": 38430,
        "yearMonth": 202011
    }
]
```

