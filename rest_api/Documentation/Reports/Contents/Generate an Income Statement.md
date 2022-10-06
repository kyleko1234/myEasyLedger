### Generate an Income Statement

Endpoint: `GET /organization/{id}/reports/incomeStatement/{startDate}/{endDate}`

Generates a income statement for the period from `startDate` to  `endDate` inclusive, for the organization with the given id. Dates should be given in `yyyy-MM-dd` format.

Authorization: The requesting user must belong to the organization for which this report is being generated.
___
#### Response body structure
```json
{
    "startDate": LocalDate,
    "endDate": LocalDate,
    "totalRevenue": BigDecimal,
    "totalCostOfSales": BigDecimal,
    "grossProfit": BigDecimal,
    "totalResearchAndDevelopment": BigDecimal,
    "totalSalesGeneralAndAdministration": BigDecimal,
    "totalDepreciationAndAmortization": BigDecimal,
    "totalOperatingExpenses": BigDecimal,
    "operatingIncome": BigDecimal,
    "incomeFromInvesting": BigDecimal,
    "incomeFromFinancing": BigDecimal,
    "expenseFromInvesting": BigDecimal,
    "expenseFromFinancing": BigDecimal,
    "interestIncome": BigDecimal,
    "totalOtherIncomeExpense": BigDecimal,
    "ebit": BigDecimal,
    "interestExpense": BigDecimal,
    "earningsBeforeTax": BigDecimal,
    "taxExpense": BigDecimal,
    "nonRecurringAndExtraordinaryItems": BigDecimal,
    "netIncome": BigDecimal,
    "accountGroupBalances": List<AccountGroupBalanceDTO>,
    "accountBalances": List<AccountDTO>
    "revenueSubtypeId": 24,
    "incomeFromInvestingSubtypeId": 25,
    "incomeFromFinancingSubtypeId": 26,
    "costOfSalesSubtypeId": 27,
    "researchAndDevelopmentSubtypeId": 28,
    "sgaSubtypeId": 29,
    "depreciationAmortizationSubtypeId": 30,
    "expenseFromInvestingSubtypeId": 31,
	"expenseFromFinancingSubtypeId": 32,
    "interestExpenseSubtypeId": 33,
    "taxExpenseSubtypeId": 34,
    "nonRecurringSubtypeId": 35
}
```
___
#### Sample Request
	GET /organization/1/reports/incomeStatement/2020-11-01/2021-01-23`
	