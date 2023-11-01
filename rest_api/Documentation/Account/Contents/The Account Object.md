### The Account Object
___
#### Attributes
- **accountId (`Long`)**<br/>
A unique identifier for this object. 

- **accountCode (`Optional String` 16)**<br/>
An account code for this account.

- **accountName (`String` 64)**<br/>
The name of this account.

- **parentAccountId ( `Long`)**<br/>
The id of the parent account for this account. Null if account has no parent.

- **parentAccountName ( `String` 64)**<br/>
The name of the parent account for this account. Null if account has no parent.

- **accountSubtypeId ( `Long`)**<br/>
The id of the subtype for this account. If the account has a parent account, this will be null; to access account type/subtype information you should retrieve the parent account for this account.

- **accountSubtypeName (`String` 64)**<br/>
The name of the subtype for this account. If the account has a parent account, this will be null; to access account type/subtype information you should retrieve the parent account for this account.

- **accountTypeId (`Long`)**<br/>
The id of the type for this account. If the account has a parent account, this will be null; to access account type/subtype information you should retrieve the parent account for this account.

- **accountTypeName (`String` 64)**<br/>
The name of the type of this account: Assets, Expenses, Owner’s Equity, Income, or Expenses. If the account has a parent account, this will be null; to access account type/subtype information you should retrieve the parent account for this account.

- **organizationId (`Long`)** <br/>
The id of the organization that this account belongs to.

- **organizationName (`String`)** <br/>
The name of the organization that this account belongs to.

- **debitTotal (`BigDecimal`)** <br/>
The total debit balance of this account. This should equal initialDebitAmount plus the sum of all debit LineItems affecting this account. **In the event that you are requesting account totals for date ranges, debitTotal and creditTotal are the fields of interest.** The raw sum of LineItem totals will be displayed in a separate `sumOfDebitLineItem / sumOfCreditLineItem` field. The debitTotal and creditTotal fields will be equal to the sum of all debit/credit LineItems plus initialDebitAmount/initialCreditAmount when user requests balances up to a certain date (including the default case of requesting balances inclusive of all entries entered into the database), and will be equal to the sum of all debit/credit items without initial values added if a date range with a discrete start and end date is requested.

- **creditTotal (`BigDecimal`)** <br/>
The total credit balance of this account. This should equal initialCreditAmount plus the sum of all credit LineItems affecting this account. **In the event that you are requesting account totals for date ranges, debitTotal and creditTotal are the fields of interest.** The raw sum of LineItem totals will be displayed in a separate `sumOfDebitLineItem / sumOfCreditLineItem` field. The debitTotal and creditTotal fields will be equal to the sum of all debit/credit LineItems plus initialDebitAmount/initialCreditAmount when user requests balances up to a certain date (including the default case of requesting balances inclusive of all entries entered into the database), and will be equal to the sum of all debit/credit items without initial values added if a date range with a discrete start and end date is requested.

- **initialDebitAmount (`BigDecimal`)** <br/>
The debit amount that this account was initialized with. By default this is zero, but users migrating from other software may find it useful to initialize an account with non-zero values.

- **initialCreditAmount (`BigDecimal`)** <br/>
The credit amount that this account was initialized with. By default this is zero, but users migrating from other software may find it useful to initialize an account with non-zero values.

- **debitsMinusCredits (`BigDecimal`)** <br/>
For utility's sake we provide debitTotal-creditTotal as totalDebitsMinusCredits.

- **deleted (`boolean`)** <br/>
Whether or not this account has been deleted. This field is generally ignored in API response bodies but it exists - accounts are soft-deleted.

- **incomeStatementFormatPositionId** <br/>
The id for an object that defines the position on the income statement that accounts with this account should appear in. By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **incomeStatementFormatPositionName** <br/>
The name for the above object.

- **balanceSheetFormatPositionId** <br/>
The id for an object that defines the position on the balance sheet statement that accounts with this AccountSubtype should appear in.  By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **balanceSheetFormatPositionName** <br/>
The name for the above object.

- **cashFlowFormatPositionId** <br/>
The id for an object that defines the position on the cash flow statement that accounts with this AccountSubtype should appear in. By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **cashFlowFormatPositionName** <br/>
The name for the above object.

- **cashItem** (boolean) <br/>
Boolean flag determining whether this account should be treated as a cash item on the cash flow statement. By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **relevantToTaxesPaid** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to taxes paid on the cash flow statement. Liabilities with this flag are treated as 'taxes payable', and expenses with this flag are treated as 'tax expense' items. 'Taxes paid' is calculated by total tax expense minus total taxes payable.  By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **relevantToInterestPaid** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to interest paid on the cash flow statement. Liabilities with this flag are treated as 'interest payable', and expenses with this flag are treated as 'interest expense' items. 'Interest paid' is calculated by total interest expense minus total interest payable.  By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **relevantToDividendsPaid** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to dividends paid on the cash flow statement and balance sheet. Liabilities with this flag are treated as 'dividends payable', and equity items with this flag are treated as 'dividends expense' items. 'Dividends paid' is calculated by total dividends equity items minus total dividends payable.  By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **relevantToDepreciationAmortization** (boolean) <br/>
Boolean flag determining whether this account should be treated as relevant to depreciation/amortization on the cash flow statement, balance sheet, and income statement. Assets with this flag are treated as depreciable assets, and expense items with this flag are treated as depreciation expense items.  By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]
___
#### Sample Object
```json
{
    "accountId": 1,
    "accountCode": "110100",
    "accountName": "Cash",
    "parentAccountId": null,
    "parentAccountName": null,
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash and cash equivalents",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "debitTotal": 420000,
    "creditTotal": 18431,
    "initialDebitAmount": 0,
    "initialCreditAmount": 0,
    "debitsMinusCredits": 401569,
    "hasChildren": false,
    "incomeStatementFormatPositionId": 1,
    "incomeStatementFormatPositionName": "None",
    "cashFlowFormatPositionId": 5,
    "cashFlowFormatPositionName": "Cash and cash equivalents",
    "balanceSheetFormatPositionId": 2,
    "balanceSheetFormatPositionName": "Current assets",
    "cashItem": true,
    "relevantToTaxesPaid": false,
    "relevantToInterestPaid": false,
    "relevantToDividendsPaid": false,
    "relevantToDepreciationAmortization": false
}
```
