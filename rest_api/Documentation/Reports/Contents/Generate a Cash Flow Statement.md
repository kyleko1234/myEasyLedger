### Generate a Cash Flow Statement

Endpoint: `POST /organization/{organizationId}/reports/cashFlowStatement

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
    "cashAndCashEquivalentsAccountsBeginning": [
        {
            "accountId": 162,
            "accountName": "Cash and cash equivalents",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash and cash equivalents",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 5,
            "balanceSheetFormatPositionId": 2,
            "cashItem": true,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalCashAndCashEquivalentsBeginning": [
        0
    ],
    "incomeExpenseAccounts": [
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
    "totalNetIncome": [
        -9262.76
    ],
    "totalAdjustmentForNonOperatingIncomeExpenseNet": [
        0
    ],
    "totalIncomeExpenseFromOperatingNet": [
        -9262.76
    ],
    "nonCashOperatingIncomeExpenseAccounts": [
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
    "totalNonCashOperatingIncomeExpense": [
        692.88
    ],
    "changesInOperatingAssetsLiabilitiesAccounts": [
        {
            "accountId": 164,
            "accountName": "Current receivables",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 3,
            "accountSubtypeName": "Current receivables",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 2,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 165,
            "accountName": "Inventory",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 4,
            "accountSubtypeName": "Inventory",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 2,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 168,
            "accountName": "Non-current receivables",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 7,
            "accountSubtypeName": "Non-current receivables",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 3,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 166,
            "accountName": "Other current assets",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 5,
            "accountSubtypeName": "Other current assets",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 2,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 171,
            "accountName": "Other non-current assets",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 10,
            "accountSubtypeName": "Other non-current assets",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 3,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 172,
            "accountName": "Current payables",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 11,
            "accountSubtypeName": "Current payables",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 4,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 174,
            "accountName": "Deferred revenue",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 13,
            "accountSubtypeName": "Deferred revenue",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 4,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 176,
            "accountName": "Deferred tax",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 15,
            "accountSubtypeName": "Deferred tax",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 4,
            "cashItem": false,
            "relevantToTaxesPaid": true,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 179,
            "accountName": "Non-current payables",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 18,
            "accountSubtypeName": "Non-current payables",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 5,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 177,
            "accountName": "Other current liabilities",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 16,
            "accountSubtypeName": "Other current liabilities",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 4,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 180,
            "accountName": "Other non-current liabilities",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 19,
            "accountSubtypeName": "Other non-current liabilities",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 5,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalChangesInOperatingAssetsLiabilities": [
        0
    ],
    "changesInOperatingEquityAccounts": [
        {
            "accountId": 1195,
            "accountName": "Share-based compensation",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 21,
            "accountSubtypeName": "Share-based compensation",
            "accountTypeId": 3,
            "accountTypeName": "Owner's Equity",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 7,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalChangesInOperatingEquity": [
        0
    ],
    "cashFlowFromOperations": [
        -8569.88
    ],
    "incomeExpenseFromInvestingAccounts": [
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
        },
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
    "totalIncomeExpenseFromInvestingNet": [
        0
    ],
    "nonCashInvestingIncomeExpenseAccounts": [],
    "totalNonCashInvestingIncomeExpense": [],
    "changesInInvestingAssetsLiabilitiesAccounts": [
        {
            "accountId": 579,
            "accountName": "Office Equipment",
            "accountCode": "1431",
            "amounts": [
                0
            ],
            "accountSubtypeId": 8,
            "accountSubtypeName": "Property, plant, and equipment",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 3,
            "balanceSheetFormatPositionId": 3,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": true,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 718,
            "accountName": "Accumulated Depreciation",
            "accountCode": "",
            "amounts": [
                -692.88
            ],
            "accountSubtypeId": 8,
            "accountSubtypeName": "Property, plant, and equipment",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 3,
            "balanceSheetFormatPositionId": 3,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": true,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 163,
            "accountName": "Current marketable securities",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 2,
            "accountSubtypeName": "Current marketable securities",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 3,
            "balanceSheetFormatPositionId": 2,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 170,
            "accountName": "Intangible assets and goodwill",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 9,
            "accountSubtypeName": "Intangible assets and goodwill",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 3,
            "balanceSheetFormatPositionId": 3,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": true,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 167,
            "accountName": "Non-current marketable securities",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 6,
            "accountSubtypeName": "Non-current marketable securities",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 3,
            "balanceSheetFormatPositionId": 3,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalChangesInInvestingAssetsLiabilities": [
        692.88
    ],
    "depreciationAdjustmentAccounts": [
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
    "totalAdjustmentForDepreciationAmortization": [
        -692.88
    ],
    "changesInInvestingEquityAccounts": [],
    "totalChangesInInvestingEquity": [],
    "cashFlowFromInvesting": [
        0.00
    ],
    "incomeExpenseFromFinancingAccounts": [
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
        },
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
    "totalIncomeExpenseFromFinancingNet": [
        0
    ],
    "nonCashFinancingIncomeExpenseAccounts": [],
    "totalNonCashFinancingIncomeExpense": [],
    "changesInNonDividendFinancingEquityAccounts": [
        {
            "accountId": 184,
            "accountName": "Other equity items",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 23,
            "accountSubtypeName": "Other equity items",
            "accountTypeId": 3,
            "accountTypeName": "Owner's Equity",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 4,
            "balanceSheetFormatPositionId": 9,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 181,
            "accountName": "Paid-in capital",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 20,
            "accountSubtypeName": "Paid-in capital",
            "accountTypeId": 3,
            "accountTypeName": "Owner's Equity",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 4,
            "balanceSheetFormatPositionId": 6,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalChangesInNonDividendFinancingEquity": [
        0
    ],
    "changesInNonDividendFinancingAssetLiabilityAccounts": [
        {
            "accountId": 178,
            "accountName": "Long-term debt",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 17,
            "accountSubtypeName": "Long-term debt",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 4,
            "balanceSheetFormatPositionId": 5,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        },
        {
            "accountId": 175,
            "accountName": "Short-term debt",
            "accountCode": "",
            "amounts": [
                -8569.88
            ],
            "accountSubtypeId": 14,
            "accountSubtypeName": "Short-term debt",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 4,
            "balanceSheetFormatPositionId": 4,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": true,
            "children": [
                {
                    "accountId": 487,
                    "accountName": "Share Holder Loan Payable",
                    "accountCode": "",
                    "amounts": [
                        -8569.88
                    ],
                    "accountSubtypeId": null,
                    "accountSubtypeName": null,
                    "accountTypeId": null,
                    "accountTypeName": null,
                    "parentAccountId": 175,
                    "parentAccountName": "Short-term debt",
                    "incomeStatementFormatPositionId": 1,
                    "cashFlowFormatPositionId": 4,
                    "balanceSheetFormatPositionId": 4,
                    "cashItem": false,
                    "relevantToTaxesPaid": false,
                    "relevantToInterestPaid": false,
                    "relevantToDividendsPaid": false,
                    "relevantToDepreciationAmortization": false,
                    "hasChildren": false,
                    "children": []
                }
            ]
        }
    ],
    "totalChangesInNonDividendFinancingAssetLiabilities": [
        8569.88
    ],
    "dividendEquityAccounts": [
        {
            "accountId": 183,
            "accountName": "Dividends and equivalents",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 22,
            "accountSubtypeName": "Dividends and equivalents",
            "accountTypeId": 3,
            "accountTypeName": "Owner's Equity",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 4,
            "balanceSheetFormatPositionId": 8,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": true,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalDividendEquity": [
        0
    ],
    "dividendLiabilityAccounts": [
        {
            "accountId": 173,
            "accountName": "Dividends and equivalents payable",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 12,
            "accountSubtypeName": "Dividends and equivalents payable",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 4,
            "balanceSheetFormatPositionId": 4,
            "cashItem": false,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": true,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalDividendLiabilities": [
        0
    ],
    "totalDividendsPaid": [
        0
    ],
    "cashFlowFromFinancing": [
        8569.88
    ],
    "cashAndCashEquivalentsAccountsEnding": [
        {
            "accountId": 162,
            "accountName": "Cash and cash equivalents",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash and cash equivalents",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 5,
            "balanceSheetFormatPositionId": 2,
            "cashItem": true,
            "relevantToTaxesPaid": false,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalCashAndCashEquivalentsEnding": [
        0
    ],
    "interestExpenseAccounts": [
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
    "totalInterestExpense": [
        0
    ],
    "interestLiabilityAccounts": [],
    "totalInterestLiabilities": [],
    "totalInterestPaid": [
        0
    ],
    "taxExpenseAccounts": [
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
    "totalTaxExpense": [
        0
    ],
    "taxLiabilityAccounts": [
        {
            "accountId": 176,
            "accountName": "Deferred tax",
            "accountCode": "",
            "amounts": [
                0
            ],
            "accountSubtypeId": 15,
            "accountSubtypeName": "Deferred tax",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "parentAccountId": null,
            "parentAccountName": null,
            "incomeStatementFormatPositionId": 1,
            "cashFlowFormatPositionId": 2,
            "balanceSheetFormatPositionId": 4,
            "cashItem": false,
            "relevantToTaxesPaid": true,
            "relevantToInterestPaid": false,
            "relevantToDividendsPaid": false,
            "relevantToDepreciationAmortization": false,
            "hasChildren": false,
            "children": []
        }
    ],
    "totalTaxLiabilities": [
        0
    ],
    "totalTaxesPaid": [
        0
    ]
}
```