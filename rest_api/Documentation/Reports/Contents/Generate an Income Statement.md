### Generate an Income Statement

Endpoint: `POST /organization/{organizationId}/reports/incomeStatement`

Authorization: User must have VIEW permissions.
Retrieves balance sheet information based on the given parameters.

#### JSON Request Body Parameters:
This method requires an array of JSONs. Single JSON request bodies are not accepted unless the single JSON is wrapped in an array. The request body will be returned in the response body as the `dates` field. All are fields can be left blank except for `startDate` and `endDate`. The `name` field should be used in case you want to label your columns with a name such as 'Q3 2023' rather than a date label.
- **name (Optional `String`)** <br/>
A name for this date range.

- **prevPeriodEndDate (`LocalDate`)** <br/>
This is an unused field.

- **startDate (`LocalDate`)** <br/>
The start date that income statement data will be generated for. Income statement data will include transactions made on or after this date.

- **endDate (`LocalDate`)** <br/>
The end date that income statement data will be generated for. Income statement data will include transactions made on or before this date.

#### Return Object Format

``` JSON
{
    "dateRanges": [
        {
            "name": null,
            "prevPeriodEndDate": null,
            "startDate": "2022-01-01",
            "endDate": "2022-12-31"
        }
    ],
    "revenueAccounts": [
        {
            "accountId": 185,
            "accountName": "Revenue",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 24,
            "accountSubtypeName": "Revenue",
            "accountTypeId": 4,
            "accountTypeName": "Income",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 2,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 1,
            "cashItem": true,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalRevenue": [
        0
    ],
    "costOfSalesAccounts": [
        {
            "accountId": 486,
            "accountName": "Server Hosting",
            "accountCode": "11",
            "amounts": [
                173.76
            ],
            "accountSubtypeId": 27,
            "accountSubtypeName": "Cost of sales",
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 3,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 1,
            "cashItem": true,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 719,
            "accountName": "Software Service",
            "accountCode": "12",
            "amounts": [
                0
            ],
            "accountSubtypeId": 27,
            "accountSubtypeName": "Cost of sales",
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 3,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 1,
            "cashItem": true,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalCostOfSales": [
        173.76
    ],
    "totalGrossProfit": [
        -173.76
    ],
    "operatingExpensesSubtypes": [
        {
            "accountSubtypeId": 28,
            "accountSubtypeName": "Research and development",
            "accounts": [
                {
                    "accountId": 488,
                    "accountName": "Software Development",
                    "accountCode": "01",
                    "amounts": [
                        7796.12
                    ],
                    "accountSubtypeId": 28,
                    "accountSubtypeName": "Research and development",
                    "accountTypeId": 5,
                    "accountTypeName": "Expenses",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 4,
                    "cashFlowFormatPositionId": 2,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": true,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                },
                {
                    "accountId": 7375,
                    "accountName": "Development Bonus",
                    "accountCode": "02",
                    "amounts": [
                        600
                    ],
                    "accountSubtypeId": 28,
                    "accountSubtypeName": "Research and development",
                    "accountTypeId": 5,
                    "accountTypeName": "Expenses",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 4,
                    "cashFlowFormatPositionId": 2,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": true,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                }
            ],
            "totalDebitsMinusCredits": [
                8396.12
            ]
        },
        {
            "accountSubtypeId": 30,
            "accountSubtypeName": "Depreciation and amortization",
            "accounts": [
                {
                    "accountId": 580,
                    "accountName": "Accumulated depreciation, office equipment",
                    "accountCode": "21",
                    "amounts": [
                        692.88
                    ],
                    "accountSubtypeId": 30,
                    "accountSubtypeName": "Depreciation and amortization",
                    "accountTypeId": 5,
                    "accountTypeName": "Expenses",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 4,
                    "cashFlowFormatPositionId": 2,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": false,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": true,
                    "hasChildren": false,
                    "children": []
                }
            ],
            "totalDebitsMinusCredits": [
                692.88
            ]
        },
        {
            "accountSubtypeId": 29,
            "accountSubtypeName": "Selling, general, and administration",
            "accounts": [
                {
                    "accountId": 190,
                    "accountName": "Selling, general, and administration",
                    "accountCode": "",
                    "amounts": [
                        0
                    ],
                    "accountSubtypeId": 29,
                    "accountSubtypeName": "Selling, general, and administration",
                    "accountTypeId": 5,
                    "accountTypeName": "Expenses",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 4,
                    "cashFlowFormatPositionId": 2,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": true,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        }
    ],
    "totalOperatingExpenses": [
        9089.00
    ],
    "totalOperatingIncome": [
        -9262.76
    ],
    "nonOperatingIncomeAndExpenseSubtypes": [
        {
            "accountSubtypeId": 26,
            "accountSubtypeName": "Income from financing activities",
            "accounts": [
                {
                    "accountId": 187,
                    "accountName": "Income from financing activities",
                    "accountCode": "",
                    "amounts": [
                        0
                    ],
                    "accountSubtypeId": 26,
                    "accountSubtypeName": "Income from financing activities",
                    "accountTypeId": 4,
                    "accountTypeName": "Income",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 6,
                    "cashFlowFormatPositionId": 4,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": true,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 25,
            "accountSubtypeName": "Income from investing activities",
            "accounts": [
                {
                    "accountId": 186,
                    "accountName": "Income from investing activities",
                    "accountCode": "",
                    "amounts": [
                        0
                    ],
                    "accountSubtypeId": 25,
                    "accountSubtypeName": "Income from investing activities",
                    "accountTypeId": 4,
                    "accountTypeName": "Income",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 5,
                    "cashFlowFormatPositionId": 3,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": true,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 32,
            "accountSubtypeName": "Expense from financing activities",
            "accounts": [
                {
                    "accountId": 193,
                    "accountName": "Expense from financing activities",
                    "accountCode": "",
                    "amounts": [
                        0
                    ],
                    "accountSubtypeId": 32,
                    "accountSubtypeName": "Expense from financing activities",
                    "accountTypeId": 5,
                    "accountTypeName": "Expenses",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 6,
                    "cashFlowFormatPositionId": 4,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": true,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 31,
            "accountSubtypeName": "Expense from investing activities",
            "accounts": [
                {
                    "accountId": 192,
                    "accountName": "Expense from investing activities",
                    "accountCode": "",
                    "amounts": [
                        0
                    ],
                    "accountSubtypeId": 31,
                    "accountSubtypeName": "Expense from investing activities",
                    "accountTypeId": 5,
                    "accountTypeName": "Expenses",
                    "parentAccountId": null,
                    "parentAccountName": null,
                    "incomeStatementFormatPositionId": 5,
                    "cashFlowFormatPositionId": 3,
                    "balanceSheetFormatPositionId": 1,
                    "cashItem": true,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        }
    ],
    "totalNonOperatingIncomeAndExpenseSubtypesNet": [
        0
    ],
    "totalEbit": [
        -9262.76
    ],
    "interestAccounts": [
        {
            "accountId": 194,
            "accountName": "Interest expense",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 33,
            "accountSubtypeName": "Interest expense",
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 8,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 1,
            "cashItem": true,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": true,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalInterest": [
        0
    ],
    "totalEarningsBeforeTax": [
        -9262.76
    ],
    "taxAccounts": [
        {
            "accountId": 195,
            "accountName": "Tax expense",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 34,
            "accountSubtypeName": "Tax expense",
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 9,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 1,
            "cashItem": true,
            "relevantToTaxesPaid": true,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalTaxes": [
        0
    ],
    "nonRecurringAccounts": [
        {
            "accountId": 196,
            "accountName": "Non-recurring and extraordinary items",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 35,
            "accountSubtypeName": "Non-recurring and extraordinary items",
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 10,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 1,
            "cashItem": true,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalNonRecurringNet": [
        0
    ],
    "netIncome": [
        -9262.76
    ]
}
```