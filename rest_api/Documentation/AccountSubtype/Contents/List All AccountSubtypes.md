### List all account subtypes
Endpoint: `GET /accountSubtype`

Retrieves a list of all valid account subtypes.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all valid AccountSubtype objects.
___
#### Sample Request
`GET /accountSubtype/`
<br/>

#### Sample Response
```json
[
    {
        "id": 1,
        "name": "Cash and cash equivalents",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 2,
        "name": "Current marketable securities",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 3,
        "name": "Receivables",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 4,
        "name": "Inventories",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 5,
        "name": "Other current assets",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 6,
        "name": "Property",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 7,
        "name": "Plant and Equipment",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 8,
        "name": "Non-current marketable securities",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 9,
        "name": "Other non-current assets",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 10,
        "name": "Cash and cash equivalents",
        "accountType": {
            "id": 1,
            "name": "Assets"
        }
    },
    {
        "id": 11,
        "name": "Payables",
        "accountType": {
            "id": 2,
            "name": "Liabilities"
        }
    },
    {
        "id": 12,
        "name": "Deferred revenue",
        "accountType": {
            "id": 2,
            "name": "Liabilities"
        }
    },
    {
        "id": 13,
        "name": "Commercial paper",
        "accountType": {
            "id": 2,
            "name": "Liabilities"
        }
    },
    {
        "id": 14,
        "name": "Current term debt",
        "accountType": {
            "id": 2,
            "name": "Liabilities"
        }
    },
    {
        "id": 15,
        "name": "Deferred tax",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    },
    {
        "id": 16,
        "name": "Other current liabilities",
        "accountType": {
            "id": 2,
            "name": "Liabilities"
        }
    },
    {
        "id": 17,
        "name": "Non-current term debt",
        "accountType": {
            "id": 2,
            "name": "Liabilities"
        }
    },
    {
        "id": 18,
        "name": "Other non-current liabilities",
        "accountType": {
            "id": 2,
            "name": "Liabilities"
        }
    },
    {
        "id": 19,
        "name": "Paid-in capital",
        "accountType": {
            "id": 3,
            "name": "Owner's Equity"
        }
    },
    {
        "id": 20,
        "name": "Dividends and equivalents",
        "accountType": {
            "id": 3,
            "name": "Owner's Equity"
        }
    },
    {
        "id": 21,
        "name": "Other equity items",
        "accountType": {
            "id": 3,
            "name": "Owner's Equity"
        }
    },
    {
        "id": 22,
        "name": "Revenue",
        "accountType": {
            "id": 4,
            "name": "Income"
        }
    },
    {
        "id": 23,
        "name": "Other income",
        "accountType": {
            "id": 4,
            "name": "Income"
        }
    },
    {
        "id": 24,
        "name": "Cost of sales",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    },
    {
        "id": 25,
        "name": "Research and development",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    },
    {
        "id": 26,
        "name": "Selling, general, and administration",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    },
    {
        "id": 27,
        "name": "Depreciation",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    },
    {
        "id": 28,
        "name": "Amortization",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    },
    {
        "id": 29,
        "name": "Other expenses",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    },
    {
        "id": 30,
        "name": "Income taxes",
        "accountType": {
            "id": 5,
            "name": "Expenses"
        }
    }
]
```


