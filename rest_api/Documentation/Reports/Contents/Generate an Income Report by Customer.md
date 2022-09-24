### Generate an Income Report by Customer

Endpoint: `GET /reports/incomeByCustomerReport/organization/{organizationId}/{startDate}/{endDate}`

Returns data with total income for each customer for the specified organization between the specified dates inclusive. Dates should be given in yyyy-mm-dd format.

Authorization: The requesting user must belong to the organization for which this report is being generated.

___
#### Response Body Structure
- **customerIncomeDTOs** `Array<CustomerIncomeDTO>`
	A list of all vendors for this organization.
	- **customerId** `Long`
	- **customerName** `String 64`
	- **debitTotal** `BigDecimal`
		The sum of all debit line items written to expense accounts on journal entries that are associated with this customer, between the dates given by the requester
	- **creditTotal** `BigDecimal`
		The sum of all credit line items written to expense accounts on journal entries that are associated with this customer, between the dates given by the requester
	- **creditsMinusDebits** `BigDecimal`
		creditTotal - debitTotal, i.e. the total income for this time period from this customer.
- **totalExpenses** `BigDecimal`
	Total expenses for this organization for this time period, including expenses not assigned to any customers.

#### Sample Request and Response
`GET /reports/incomeByCustomerReport/organization/1/2020-01-01/2022-09-09`

```json
{
    "customerIncomeDTOs": [
        {
            "customerId": 19,
            "customerName": "customer 1",
            "debitTotal": 0,
            "creditTotal": 0,
            "creditsMinusDebits": 0
        },
        {
            "customerId": 20,
            "customerName": "customer 2",
            "debitTotal": 0,
            "creditTotal": 0,
            "creditsMinusDebits": 0
        }
    ],
    "totalIncome": 24000
}
```

