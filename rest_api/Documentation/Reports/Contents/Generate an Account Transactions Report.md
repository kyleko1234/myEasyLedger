### Generate an Account Transactions Report

Endpoint: `GET /reports/accountTransactionsReport/account/{accountId}/{startDate}/{endDate}`

Returns data for buildign an Account Transactions Report for the specified account between the specified dates. Dates should be given in yyyy-mm-dd format.

Authorization: The requesting user must belong to the organization for which this report is being generated.

___
#### Response Body Structure
- **startDate** `LocalDate`
- **endDate** `LocalDate`
- **account** 
	- **accountId** `Long`
	- **accountCode** `optional String 16`
	- **accountName** `String 64`
	- **parentAccountId** `optional Long`
	- **accountName** `optional String 64`
	- **accountSubtypeId** `optional Long`
	- **accountSubtypeName** `optional String 64`
	- **accountTypeId** `Long`
	- **accountTypeName** `String 64`
	- **organizationId** `Long`
	- **organizationName** `String 64`
	- **sumOfDebitLineItems** `BigDecimal`
		Sum of debit Lineitems for this account with a date that is earlier than but not including startDate
	- **sumOfCreditLineItems** `BigDecimal`
		Sum of credit Lineitems for this account with a date that is earlier than but not including startDate
	- **initialDebitAmount** `BigDecimal`
	- **initialCreditAmount** `BigDecimal`
	- **debitTotal** `BigDecimal`
		Sum of initialDebitAmount for this account and the sumOfDebitLineItems mentioned above
	- **creditTotal** `BigDecimal`	
		Sum of initialCreditAmount for this account and the sumOfCreditLineItems mentioned above
	- **debitsMinusCredits** `BigDecimal`
		debitTotal - creditTotal
	- **hasChildren** `boolean`
- **initialDebitValue** `BigDecimal`
	Sum of all debit LineItems dated earlier than but not including startDate, plus the initialDebitAmount for the account
- **initialCreditValue** `BigDecimal`
	Sum of all credit LineItems dated earlier than but not including startDate, plus the initialCreditAmount for the account
- **initialDebitsMinusCredits** `BigDecimal`
	initialDebitValue - initialCreditValue
- **lineItems** `Array<AccountTransactionsReportLineItemDTO>`
	An array of LineItems for this account dated between startDate and endDate inclusive, ordered by journalEntryDate ASC, journalEntryId ASC, lineItemIdASC (i.e. from least recent to most recent). The currentDebitBalance, currentCreditBalance, and currentDebitsMinusCredits represent a running tally of debits and credits when each LineItem's value is added onto the account's initialDebitValue and initialCreditValue in the order that the LineItems are displayed in this array.
	- **journalEntryDate** `LocalDate`
	- **journalEntryDescription** `String 255`
	- **description** `String 255`
	- **accountId** `Long`
	- **accountName** `String 64`
	- **amount** `BigDecimal`
	- **isCredit** `boolean`
	- **currentDebitBalance** `BigDecimal`
	- **currentCreditBalance** `BigDecimal`
	- **curentDebitsMinusCredits** `BigDecimal`
- **endingDebitValue** `BigDecimal`
	Total debit value of this account by the end of endDate.
- **endingCreditValue** `BigDecimal`
	Total credit value of this account by the end of endDate.
- **endingDebitsMinusCredits** `BigDecimal`
- **changeInDebitValue** `BigDecimal`
	endingDebitValue - initialDebitValue
- **changeInCreditValue** `BigDecimal`
	endingCreditValue - initialCreditValue
- **changeInDebitsMinusCredits** `BigDecimal`
	endingDebitsMinusCredits - initialDebitsMinusCredits

#### Sample Request and Response
`GET /reports/accountTransactionsReport/account/1/2020-11-02/2020-11-28`

```json
{
    "startDate": "2020-11-02",
    "endDate": "2020-11-28",
    "account": {
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
        "sumOfDebitLineItems": 400000,
        "sumOfCreditLineItems": 0,
        "initialDebitAmount": 0,
        "initialCreditAmount": 0,
        "debitTotal": 400000,
        "creditTotal": 0,
        "debitsMinusCredits": 400000,
        "hasChildren": false
    },
    "initialDebitValue": 400000,
    "initialCreditValue": 0,
    "initialDebitsMinusCredits": 400000,
    "lineItems": [
        {
            "journalEntryDate": "2020-11-03",
            "journalEntryDescription": "Paid office rent for the month of November $500",
            "description": "Paid office rent november in cash",
            "accountId": 1,
            "accountName": "Cash",
            "amount": 500,
            "isCredit": true,
            "currentDebitBalance": 400000,
            "currentCreditBalance": 500,
            "currentDebitsMinusCredits": 399500
        },
        {
            "journalEntryDate": "2020-11-06",
            "journalEntryDescription": "Purchased office supplies $250",
            "description": "Purchase of office supplies",
            "accountId": 1,
            "accountName": "Cash",
            "amount": 250,
            "isCredit": true,
            "currentDebitBalance": 400000,
            "currentCreditBalance": 750,
            "currentDebitsMinusCredits": 399250
        },
        {
            "journalEntryDate": "2020-11-16",
            "journalEntryDescription": "Purchased business car for $25,000. Paid $10,000 cash and issued a note for the balance.",
            "description": "Paid 10000 down for vehicle",
            "accountId": 1,
            "accountName": "Cash",
            "amount": 10000,
            "isCredit": true,
            "currentDebitBalance": 400000,
            "currentCreditBalance": 10750,
            "currentDebitsMinusCredits": 389250
        },
        {
            "journalEntryDate": "2020-11-28",
            "journalEntryDescription": "Paid utility bills for the month of November $180.",
            "description": "November utilities paid in cash",
            "accountId": 1,
            "accountName": "Cash",
            "amount": 180,
            "isCredit": true,
            "currentDebitBalance": 400000,
            "currentCreditBalance": 10930,
            "currentDebitsMinusCredits": 389070
        }
    ],
    "endingDebitValue": 400000,
    "endingCreditValue": 10930,
    "endingDebitsMinusCredits": 389070,
    "changeInDebitValue": 0,
    "changeInCreditValue": 10930,
    "changeInDebitsMinusCredits": -10930
}
```

