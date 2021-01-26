### Generate a Balance Sheet

Endpoint: `GET /organization/{id}/reports/balanceSheet/{endDate}`

Generates a balance sheet, dated as of the given `endDate` for the organization with the given id. Date should be given in `yyyy-MM-dd` format.

Authorization: The requesting user must belong to the organization for which this report is being generated.

___
#### Response Body Structure
```json
{
    "organizationId": Long,
    "asOfDate": LocalDate (in format yyyy-MM-dd),    
	"prevPeriodEndDate": LocalDate (in format yyyy-MM-dd),
    "currPeriodStartDate": LocalDate (in format yyyy-MM-dd),
    "balanceSheetAssets": {
        "totalCurrentAssets": BigDecimal,
        "totalNonCurrentAssets": BigDecimal,
        "totalAssets": BigDecimal,
        "currentAssetsSubtypeBalances": List<AccountSubtypeBalance>,
        "nonCurrentAssetsSubtypeBalances": List<AccountSubtypeBalance>
    },
    "balanceSheetLiabilities": {
        "totalCurrentLiabilities": BigDecimal,
        "totalNonCurrentLiabilities": BigDecimal,
        "totalLiabilities": BigDecimal,
        "currentLiabilitiesSubtypeBalances": List<AccountSubtypeBalance>,
        "nonCurrentLiabilitiesSubtypeBalances": List<AccountSubtypeBalance>
    },
    "balanceSheetEquity": {
        "totalEquityItems": BigDecimal,
        "prevPeriodRetainedEarnings": BigDecimal,
        "currPeriodNetIncome": BigDecimal,
        "currPeriodDividendsAndEquivalents": BigDecimal,
        "totalRetainedEarnings": BigDecimal,
        "totalEquity": BigDecimal,
        "equityItemsSubtypeBalances": List<AccountSubtypeBalance>
    },
    "accountGroupBalances": List<AccountGroupBalance>,
    "accountBalances": List<AccountGroupBalance>
}
```

#### Sample Request
`GET /organization/1/reports/balanceSheet/2021-01-23`
<br/> <br/>

#### Sample Response
```json
{
    "organizationId": 1,
    "asOfDate": "2021-01-23",
	"prevPeriodEndDate": "2020-12-31",
	"currPeriodStartDate": "2021-01-01",
    "balanceSheetAssets": {
        "totalCurrentAssets": 405820,
        "totalNonCurrentAssets": 29500,
        "totalAssets": 435320,
        "currentAssetsSubtypeBalances": [
            {
                "accountSubtypeId": 1,
                "accountSubtypeName": "Cash and cash equivalents",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "organizationId": 1,
                "organizationName": "Sample organization",
                "debitTotal": 420000,
                "creditTotal": 18430,
                "debitsMinusCredits": 401570
            },
            {
                "accountSubtypeId": 3,
                "accountSubtypeName": "Receivables",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "organizationId": 1,
                "organizationName": "Sample organization",
                "debitTotal": 24000,
                "creditTotal": 20000,
                "debitsMinusCredits": 4000
            },
            {
                "accountSubtypeId": 4,
                "accountSubtypeName": "Inventories",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "organizationId": 1,
                "organizationName": "Sample organization",
                "debitTotal": 250,
                "creditTotal": 0,
                "debitsMinusCredits": 250
            }
        ],
        "nonCurrentAssetsSubtypeBalances": [
            {
                "accountSubtypeId": 7,
                "accountSubtypeName": "Plant and equipment",
                "accountTypeId": 1,
                "accountTypeName": "Assets",
                "organizationId": 1,
                "organizationName": "Sample organization",
                "debitTotal": 29500,
                "creditTotal": 0,
                "debitsMinusCredits": 29500
            }
        ]
    },
    "balanceSheetLiabilities": {
        "totalCurrentLiabilities": 22500,
        "totalNonCurrentLiabilities": 0,
        "totalLiabilities": 22500,
        "currentLiabilitiesSubtypeBalances": [
            {
                "accountSubtypeId": 10,
                "accountSubtypeName": "Payables",
                "accountTypeId": 2,
                "accountTypeName": "Liabilities",
                "organizationId": 1,
                "organizationName": "Sample organization",
                "debitTotal": 0,
                "creditTotal": 22500,
                "debitsMinusCredits": -22500
            }
        ],
        "nonCurrentLiabilitiesSubtypeBalances": []
    },
    "balanceSheetEquity": {
        "totalEquityItems": 0,
        "prevPeriodRetainedEarnings": 12820,
        "currPeriodNetIncome": 0,
        "currPeriodDividendsAndEquivalents": 0,
        "totalRetainedEarnings": 12820,
        "totalEquity": 12820,
        "equityItemsSubtypeBalances": [
            {
                "accountSubtypeId": 18,
                "accountSubtypeName": "Paid-in capital",
                "accountTypeId": 3,
                "accountTypeName": "Owner's Equity",
                "organizationId": 1,
                "organizationName": "Sample organization",
                "debitTotal": 0,
                "creditTotal": 400000,
                "debitsMinusCredits": -400000
            }
        ]
    },
    "accountGroupBalances": [
        {
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
            "debitsMinusCredits": 4000
        },
        {
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
            "debitsMinusCredits": 401570
        },
        {
            "accountGroupId": 4,
            "accountGroupName": "Equipment",
            "accountSubtypeId": 7,
            "accountSubtypeName": "Plant and equipment",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "organizationId": 1,
            "organizationName": "Sample organization",
            "debitTotal": 29500,
            "creditTotal": 0,
            "debitsMinusCredits": 29500
        },
        {
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
            "debitsMinusCredits": 250
        },
        {
            "accountGroupId": 10,
            "accountGroupName": "testing empty account group for balance",
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash and cash equivalents",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "organizationId": 1,
            "organizationName": "Sample organization",
            "debitTotal": 0,
            "creditTotal": 0,
            "debitsMinusCredits": 0
        },
        {
            "accountGroupId": 5,
            "accountGroupName": "Payables",
            "accountSubtypeId": 10,
            "accountSubtypeName": "Payables",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "organizationId": 1,
            "organizationName": "Sample organization",
            "debitTotal": 0,
            "creditTotal": 22500,
            "debitsMinusCredits": -22500
        },
        {
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
            "debitsMinusCredits": 3000
        },
        {
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
            "debitsMinusCredits": -400000
        },
        {
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
            "debitsMinusCredits": -24000
        },
        {
            "accountGroupId": 9,
            "accountGroupName": "Selling, general, and administration",
            "accountSubtypeId": 25,
            "accountSubtypeName": "Selling, general, and administration",
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "organizationId": 1,
            "organizationName": "Sample organization",
            "debitTotal": 8180,
            "creditTotal": 0,
            "debitsMinusCredits": 8180
        }
    ],
    "accountBalances": [
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
            "debitsMinusCredits": 4000
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
            "debitsMinusCredits": 401570
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
            "debitsMinusCredits": 4500
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
            "debitsMinusCredits": 250
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
            "debitsMinusCredits": 25000
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
            "debitsMinusCredits": -4500
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
            "debitsMinusCredits": -3000
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
            "debitsMinusCredits": -15000
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
            "debitsMinusCredits": -400000
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
            "debitsMinusCredits": 3000
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
            "debitsMinusCredits": -24000
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
            "debitsMinusCredits": 500
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
            "debitsMinusCredits": 7500
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
            "debitsMinusCredits": 180
        }
    ]
}
```