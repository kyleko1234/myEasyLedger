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
		"currentAssetsSubtypeIds": [
            1,
            2,
            3,
            4,
            5
        ],
        "nonCurrentAssetsSubtypeIds": [
            6,
            7,
            8,
            9,
			10
        ],
		"nonCurrentAssetsSubtypeBalances": List<AccountSubtypeBalance>
    },
    "balanceSheetLiabilities": {
        "totalCurrentLiabilities": BigDecimal,
        "totalNonCurrentLiabilities": BigDecimal,
        "totalLiabilities": BigDecimal,
        "currentLiabilitiesSubtypeBalances": List<AccountSubtypeBalance>,
        "nonCurrentLiabilitiesSubtypeBalances": List<AccountSubtypeBalance>,     "currentLiabilitiesSubtypeIds": [
            11,
            12,
            13,
            14,
            15
        ],
        "nonCurrentLiabilitiesSubtypeIds": [
            16,
            17,
			18
        ]
    },
    "balanceSheetEquity": {
        "totalEquityItems": BigDecimal,
        "prevPeriodRetainedEarnings": BigDecimal,
        "currPeriodNetIncome": BigDecimal,
        "currPeriodDividendsAndEquivalents": BigDecimal,
        "totalRetainedEarnings": BigDecimal,
        "totalEquity": BigDecimal,
        "equityItemsSubtypeBalances": List<AccountSubtypeBalance>,
		"equityItemsSubtypeIds": [
			19,
            20,
            22
        ],
        "dividendsAndEquivalentsSubtypeIds": [
            21
        ],
        "incomeSubtypeIds": [
            23,
            24,
			25,
			26
        ],
        "expensesSubtypeIds": [
            27,
            28,
            29,
            30,
            31,
            32,
            33,
			34
        ]

    },
    "accountGroupBalances": List<AccountGroupBalance>,
    "accountBalances": List<AccountGroupBalance>
}
```

#### Sample Request
`GET /organization/1/reports/balanceSheet/2021-01-23`
