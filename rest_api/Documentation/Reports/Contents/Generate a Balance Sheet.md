### Generate a Balance Sheet

Endpoint: `POST /organization/{organizationId}/reports/balanceSheet`

Authorization: User must have VIEW permissions.
Retrieves balance sheet information based on the given parameters.

#### JSON Request Body Parameters:
This method requires an array of JSONs. Single JSON request bodies are not accepted unless the single JSON is wrapped in an array. The request body will be returned in the response body as the `dates` field. All are fields can be left blank except for `endDate`. The `name` field should be used in case you want to label your columns with a name such as 'Q3 2023' rather than a date label.
- **name (Optional `String`)** <br/>
A name for this date range.

- **prevPeriodEndDate (`LocalDate`)** <br/>
This is an unused field.

- **startDate (`LocalDate`)** <br/>
This is an unused field.

- **endDate (`LocalDate`)** <br/>
The date that balance sheet data will be generated for. Balance sheet data will include transactions made on or before this date.

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
    "currentAssetsSubtypes": [
        {
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash and cash equivalents",
            "accounts": [
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
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 2,
            "accountSubtypeName": "Current marketable securities",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 3,
            "accountSubtypeName": "Current receivables",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 4,
            "accountSubtypeName": "Inventory",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 5,
            "accountSubtypeName": "Other current assets",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        }
    ],
    "totalCurrentAssets": [
        0
    ],
    "nonCurrentAssetsSubtypes": [
        {
            "accountSubtypeId": 8,
            "accountSubtypeName": "Property, plant, and equipment",
            "accounts": [
                {
                    "accountId": 579,
                    "accountName": "Office Equipment",
                    "accountCode": "1431",
                    "amounts": [
                        1385.75
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
                        -1212.54
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
                }
            ],
            "totalDebitsMinusCredits": [
                173.21
            ]
        },
        {
            "accountSubtypeId": 9,
            "accountSubtypeName": "Intangible assets and goodwill",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 6,
            "accountSubtypeName": "Non-current marketable securities",
            "accounts": [
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
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 7,
            "accountSubtypeName": "Non-current receivables",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 10,
            "accountSubtypeName": "Other non-current assets",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        }
    ],
    "totalNonCurrentAssets": [
        173.21
    ],
    "totalAssets": [
        173.21
    ],
    "currentLiabilitiesSubtypes": [
        {
            "accountSubtypeId": 11,
            "accountSubtypeName": "Current payables",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 13,
            "accountSubtypeName": "Deferred revenue",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 15,
            "accountSubtypeName": "Deferred tax",
            "accounts": [
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
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 12,
            "accountSubtypeName": "Dividends and equivalents payable",
            "accounts": [
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
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 16,
            "accountSubtypeName": "Other current liabilities",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 14,
            "accountSubtypeName": "Short-term debt",
            "accounts": [
                {
                    "accountId": 175,
                    "accountName": "Short-term debt",
                    "accountCode": "",
                    "amounts": [
                        25005.61
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
                                25005.61
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
            "totalDebitsMinusCredits": [
                25005.61
            ]
        }
    ],
    "totalCurrentLiabilities": [
        25005.61
    ],
    "nonCurrentLiabilitiesSubtypes": [
        {
            "accountSubtypeId": 17,
            "accountSubtypeName": "Long-term debt",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 18,
            "accountSubtypeName": "Non-current payables",
            "accounts": [
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
                }
            ],
            "totalDebitsMinusCredits": [
                0
            ]
        },
        {
            "accountSubtypeId": 19,
            "accountSubtypeName": "Other non-current liabilities",
            "accounts": [
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
            "totalDebitsMinusCredits": [
                0
            ]
        }
    ],
    "totalNonCurrentLiabilities": [
        0
    ],
    "totalLiabilities": [
        25005.61
    ],
    "paidInCapitalAccounts": [
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
    "totalPaidInCapital": [
        0
    ],
    "shareBasedCompensationAccounts": [
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
    "totalShareBasedCompensation": [
        0
    ],
    "otherEquityItemsAccounts": [
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
        }
    ],
    "totalOtherEquityItems": [
        0
    ],
    "previousPeriodEndDates": [
        "2021-12-31"
    ],
    "currentPeriodStartDates": [
        "2022-01-01"
    ],
    "retainedEarningsBeginningBalances": [
        -15569.64
    ],
    "dividendsAndEquivalentsAccountsPreviousPeriod": [
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
    "totalDividendsAndEquivalentsPreviousPeriod": [
        0
    ],
    "netIncomePreviousPeriod": [
        -15569.64
    ],
    "dividendsAndEquivalentsAccountsCurrentPeriod": [
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
    "netIncomeCurrentPeriod": [
        -9262.76
    ],
    "totalDividendsAndEquivalentsCurrentPeriod": [
        0
    ],
    "retainedEarningsEndingBalances": [
        -24832.40
    ],
    "totalEquity": [
        -24832.40
    ]
}
```