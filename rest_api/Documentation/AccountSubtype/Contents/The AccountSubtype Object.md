### The AccountSubtype Object
___
#### Attributes
- **id (`Long`)**<br/>
The unique identifier for this object.

- **name (`String` 64)** <br/>
The name of this account subtype.

- **accountType (AccountType)** <br/>
The AccountType object for the AccountType that this AccountSubtype belongs to.

- **incomeStatementFormatPosition** <br/>
An object that defines the position on the income statement that accounts with this AccountSubtype should appear in. Contains a numerical id and a name for this position object. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 

- **balanceSheetFormatPosition** <br/>
An object that defines the position on the balance sheet statement that accounts with this AccountSubtype should appear in. Contains a numerical id and a name for this position object. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 

- **cashFlowFormatPosition** <br/>
An object that defines the position on the cash flow statement that accounts with this AccountSubtype should appear in. Contains a numerical id and a name for this position object. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 

- **cashItem** (boolean) <br/>
Boolean flag determining whether this account should be treated as a cash item on the cash flow statement. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 

- **relevantToTaxesPaid** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to taxes paid on the cash flow statement. Liabilities with this flag are treated as 'taxes payable', and expenses with this flag are treated as 'tax expense' items. 'Taxes paid' is calculated by total tax expense minus total taxes payable. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 

- **relevantToInterestPaid** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to interest paid on the cash flow statement. Liabilities with this flag are treated as 'interest payable', and expenses with this flag are treated as 'interest expense' items. 'Interest paid' is calculated by total interest expense minus total interest payable. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 

- **relevantToDividendsPaid** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to dividends paid on the cash flow statement and balance sheet. Liabilities with this flag are treated as 'dividends payable', and equity items with this flag are treated as 'dividends expense' items. 'Dividends paid' is calculated by total dividends equity itemds minus total dividends payable. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 

- **relevantToDepreciationAmortization** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to depreciation/amortization on the cash flow statement, balance sheet, and income statement. Assets with this flag are treated as depreciable assets, and expense items with this flag are treated as depreciation expense items. Accounts with this AccountSubtype should inherit this by default, but users should be able to override this if they wish. 
___
#### Sample Object
```json 
{
	"id": 1,
	"name": "Cash and cash equivalents",
	"accountType": {
		"id": 1,
		"name": "Assets"
	},
	"incomeStatementFormatPosition": {
		"id": 1,
		"name": "None"
	},
	"balanceSheetFormatPosition": {
		"id": 2,
		"name": "Current assets"
	},
	"cashFlowFormatPosition": {
		"id": 5,
		"name": "Cash and cash equivalents"
	},
	"cashItem": true,
	"relevantToTaxesPaid": false,
	"relevantToInterestPaid": false,
	"relevantToDividendsPaid": false,
	"relevantToDepreciationAmortization": false
}
```
 



