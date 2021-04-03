### Generate a Cash Flow Statement

Endpoint: `GET /organization/{id}/reports/cashFlow/{startDate}/{endDate}`

Generates a cash flow statement for the period from `startDate` to  `endDate` inclusive, for the organization with the given id. Dates should be given in `yyyy-MM-dd` format.

All fields indicate increases for the subtype or subtypes in that field. Negative numbers indicate decreases.

In generating cash flow statements, 'other equity' is considered a cash-affecting financing subtype. 'Other assets' and 'Other Liabilities' are considered cash-affecting assets and liabilities.

Authorization: The requesting user must belong to the organization for which this report is being generated.

___

#### Response Body Structure
```json
{
    "netIncome": BigDecimal,
    "depreciationAndAmortization": BigDecimal,
    "deferredTax": BigDecimal,
    "shareBasedCompensation": BigDecimal,
    "nonOperatingIncome": BigDecimal,
    "receivables": BigDecimal,
    "payables": BigDecimal,
    "inventory": BigDecimal,
    "deferredRevenue": BigDecimal,
    "otherAssets": BigDecimal,
    "otherLiabilities": BigDecimal,
    "cashFlowFromOperations": BigDecimal,
    "netIncomeFromInvesting": 0BigDecimal
    "marketableSecurities": BigDecimal,
    "propertyPlantAndEquipment": BigDecimal,
    "cashFlowFromInvesting": BigDecimal,
    "paidInCapital": BigDecimal,
    "dividendPayments": BigDecimal,
    "otherEquity":BigDecimal0,
    "netIncomeFromFinancing": BigDecimal,
    "debt": BigDecimal,
    "cashFlowFromFinancing": BigDecimal,
    "cashFlow": BigDecimal,
	
    "incomeFromInvestingSubtypeId": 25,
    "incomeFromFinancingSubtypeId": 26,
    "depreciationAmortizationSubtypeId": 31,
    "expenseFromInvestingSubtypeId": 31,
    "expenseFromFinancingSubtypeId": 32,
    "deferredTaxSubtypeId": 15,
    "shareBasedCompensationSubtypeId": 21,
    "nonOperatingIncomeSubtypeIds": [
        25,
        26,
        31,
        32
    ],
    "receivablesSubtypeIds": [
        3,
        7
    ],
    "payablesSubtypeIds": [
        11,
        18
    ],
    "inventorySubtypeId": 4,
    "deferredRevenueSubtypeId": 13,
    "otherAssetsSubtypeIds": [
        5,
        10
    ],
    "otherLiabilitiesSubtypeIds": [
        16,
        19
    ],
    "marketableSecuritiesSubtypeIds": [
        2,
        6
    ],
    "ppeSubtypeId": 8,
    "paidInCapitalSubtypeId": 20,
    "dividendsPayableSubtypeId": 12,
    "dividendsDeclaredSubtypeId": 22,
    "otherEquitySubtypeId": 23,
    "debtSubtypeIds": [
        14,
        17
    ],
    "incomeSubtypeIds": [
        24,
        25,
        26,
        27
    ],
    "expenseSubtypeIds": [
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35
    ]
}

```