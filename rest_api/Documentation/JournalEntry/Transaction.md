The `Transaction` object is an abstraction of `JournalEntry` used in the single-entry display. All `Transaction`s are stored as `JournalEntry`s in the database. 
`Transaction`s contain `TransactionLineItem`s, which are a similar abstraction for `LineItem`s.

The object structure for `Transaction`:
```json
{
	"journalEntryId": Long,
	"journalEntryDate": LocalDate,
	"organizationId": Long,
	"personId": Long,
	"description": String 255,
	"fromAccountId": Long,
	"fromAccountName": String 64,
	"transactionLineItems": Array<TransactionLineItem>,
	"total": BigDecimal,
	"balancerLineItemId": Long
}
```
The object structure for `TransactionLineItem`:
```json
{
	"lineItemId": Long,
	"journalEntryId": Long,
	"description": String 255,
	"amount": BigDecimal,
	"accountId": Long,
	"accountName": String 64,
	"transactionTypeId": Long,
	"transactionTypeName": String,
}
```

Transactions can be thought of as a two-or-more LineItem process: moving value from the account of the first LineItem to the accounts of the remaining LineItems. There are three types of transaction: Expense, Income, and Transfer. These correspond to [[AccountType]] objects: Income and Expense are self-explanatory, and Transfers can be made to either Asset or Liability accounts.

Expense transactions generally decrease personal asset value; therefore the asset/liability account is credited and the expense account is debited
Income transactions do the opposite, so the asset/liability account is debited and the income account is credited
Transfers are transactions debiting one asset/liability account and crediting another; in this case they are conceptualized as moving value FROM the first TO the second; ergo the first account is credited and the second is debited.
If you have an equity account in an organization where isEnterprise = false, you did something very wrong.

TransactionTypes:

| transactionTypeId | transactionTypeName | accountTypeIds | isCredit |
| ---- | ---- | ---- | ---- |
| 1 | Expense | [5] | false |
| 2 | Income | [4] | true |
| 3 | Transfer | [1, 2] | false |

# Converting Journal Entries into Transactions
1. Ensure LineItems are sorted by lineItemId, ascending.
2. JournalEntryId, Description, Date, PersonId, OrganizationId are all directly copied.
3. The accountId and accountName of the first LineItem are set as the 'fromAccount' for the transaction. The 'total' of this transaction is the amount of the first LineItem if isCredit is false, else negate the amount of this LineItem to get the total. Set the "balancerLineItemId" of the Transaction to the lineItemId of this LineItem. Then, remove this first LineItem from the array of LineItems.
4. Reformat the remaining LineItems into TransactionLineItems:
	1. LineItemId and description remain the same
	2. AccountName and AccountId remain the same
	3. TransactionTypeId and TransactionTypeName are assigned based on AccountTypeId
	4. If the isCredit of the LineItem is the same as the isCredit of the TransactionType, the amount of the LineItem is the amount of the TransactionLineItem. Otherwise, the amount of the TransactionLineItem should be the amount of the LineItem \* -1.
# Converting a Transaction into a JournalEntry:
1. Turn each TransactionLineItem into a LineItem:
	1. accountId, amount, description all stay the same
	2. isCredit is the same as the isCredit of the TransactionType
2. Sum total debits and credits of the resulting LineItems.
3. Add a LineItem to the front of the array: 
	1. accountId, accountName are taken from the 'fromAccount'  of the Transaction
	2. If total debits >= total credits, make this LineItem isCredit = true, with total debits - total credits as the amount. Otherwise if credits > debits, make isCredit false, with total credits - debits as the amount.
	4. description should be the same as the description of the Transaction.
	5. lineItemId should be taken from balancerLineItemId of the Transaction.
4. Populate the JournalEntry fields from the Transaction fields: organizationId, personId, description, journalEntryDate, journalEntryId should all remain the same.

# Endpoints
## Retrieve a single transaction by JournalEntryId
GET `/transaction/{journalEntryId}`
## Post a transaction
POST `/transaction`
Request body format:
```json
{
    "journalEntryId": null,
    "journalEntryDate": Date string, "yyyy-mm-dd" format,
    "organizationId": Number,
    "personId": Number,
    "description": String,
    "fromAccountId": Number,
    "lineItems": [
        {
            "accountId": Number,
            "description": String,
            "amount": Number,
            "transactionTypeId": Number,
        }
    ]
}
```
Note that the `journalEntryId` field must be null.
## Edit a transaction
PUT `/transaction/{journalEntryId}`
Request body format:
```json
{
    "journalEntryId": Number,
    "journalEntryDate": Date string, "yyyy-mm-dd" format,
    "organizationId": Number,
    "personId": Number,
    "description": String,
    "fromAccountId": Number,
    "lineItems": [
        {
            "accountId": Number,
            "description": String,
            "amount": Number,
            "transactionTypeId": Number,
        }
    ]
}
```
The `journalEntryId` field must match the `journalEntryId` in the URI. This `journalEntryId` determines the entry that you will edit with this operation.
## Retrieving edit history of transactions
This is currently not supported on the backend. Use [[Access Edit History of a Journal Entry]] and then do the conversion from journal entry to transaction on the front end.