### Update an account
Endpoint: `PUT /account/{id}`

Authorization: User must have EDIT permissions for all associated accounts.

Updates an account with the values of the parameters passed. Cannot be used to soft-delete an account; use `DELETE /account/{id}` instead. All parameters must be passed in the request body unless otherwise indicated, otherwise the corresponding fields of the account will be updated to `null`.


___

#### Request Body Parameters
- **accountId (`Long`)**<br/>
The id of the account that is to be updated.

- **accountCode (`Optional String` 16)**<br/>
An account code for this account.

- **accountName (`String` 40)**<br/>
The name of this account.

- **parentAccountId ( `Optional Long`)**<br/>
The id of the parent account for this account, if it has one.

- **accountSubtypeId (`Optional Long`)**<br/>
The id of the subtype that this account belongs to, if it has no parent account. An account **must** have either an accountSubtypeId OR a parentAccountId, not both nor neither.

- **initialDebitAmount ( `BigDecimal`)**<br/>
The debit value that this account is initialized at. 

- **initialCreditAmount ( `BigDecimal`)**<br/>
The credit value that this account is initialized at. 

**The following fields are optional. If not supplied in the request body, these fields will be inherited from either the parent account or the account subtype of the account being edited. When an account is updated, these fields will be updated for all of its children, if it has any. These fields will also be updated for its parent and all the other children of its parent.**

- **incomeStatementFormatPositionId** <br/>
The id for an object that defines the position on the income statement that accounts with this account should appear in. By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **balanceSheetFormatPositionId** <br/>
The id for an object that defines the position on the balance sheet statement that accounts with this AccountSubtype should appear in.  By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

- **cashFlowFormatPositionId** <br/>
The id for an object that defines the position on the cash flow statement that accounts with this AccountSubtype should appear in. By default, accounts should inherit this field from their parent account if they have one, or from their account subtype if they have no parent account, but users should be able to override this if they wish. See [[Reports#Custom report format positions]]

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
#### Returns
Returns HTTP 201 and the updated account object upon successful update. Returns HTTP 409 and an error if the accountId field does not match the request URI, or if the accountType of the provided subtype does not match the provided accountType of the object to be created. Returns HTTP 404 and an error if an accountType or accountSubtype does not exist in the database for the specified accountTypeId or accountSubtypeId, or if the account for this id cannot be found.
___


#### Sample Request
`PUT /account/1`

Body:
```json
{
    "accountId": 1,
	"accountCode": "110100",
    "accountName": "Cash",
    "accountGroupId": 1,
	"initialDebitAmount": 0,
	"initialCreditAmount": 0
}
```
<br/>
<br/>

#### Sample Response
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
