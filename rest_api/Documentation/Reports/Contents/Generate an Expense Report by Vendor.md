### Generate an Expense Report by Vendor

Endpoint: `GET /reports/expensesByVendorReport/organization/{organizationId}/{startDate}/{endDate}`

Returns data with total expenses for each vendor for the specified organization between the specified dates inclusive. Dates should be given in yyyy-mm-dd format.

Authorization: The requesting user must belong to the organization for which this report is being generated.

___
#### Response Body Structure
- **vendorExpensesDTOs** `Array<VendorExpensesDTO>`
	A list of all vendors for this organization.
	- **vendorId** `Long`
	- **vendorName** `String 64`
	- **debitTotal** `BigDecimal`
		The sum of all debit line items written to expense accounts on journal entries that are associated with this vendor, between the dates given by the requester
	- **creditTotal** `BigDecimal`
		The sum of all credit line items written to expense accounts on journal entries that are associated with this vendor, between the dates given by the requester
	- **debitsMinusCredits** `BigDecimal`
		debitTotal - creditTotal, i.e. the total expenses for this time period for this vendor.
- **totalExpenses** `BigDecimal`
	Total expenses for this organization for this time period, including expenses not assigned to any vendors.

#### Sample Request and Response
`GET /reports/expensesByVendorReport/organization/7/2022-01-01/2022-09-09`

```json
{
    "vendorExpensesDTOs": [
        {
            "vendorId": 182,
            "vendorName": "sample",
            "debitTotal": 600,
            "creditTotal": 2,
            "debitsMinusCredits": 598
        },
        {
            "vendorId": 183,
            "vendorName": "test 1",
            "debitTotal": 123.2,
            "creditTotal": 0,
            "debitsMinusCredits": 123.2
        }
    ],
    "totalExpenses": 5940.70
}
```

