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
	"transactionLineItems": Array<TransactionLineItem> 
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
3. The accountId and accountName of the first LineItem are set as the 'fromAccount' for the transaction. Then, remove this first LineItem from the array of LineItems.
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
	2. amount of this LineItem is the total credits of the rest of the line items minus the total debits
	3. isCredit = false
	4. description should be the same as the description of the Transaction.
4. Populate the JournalEntry fields from the Transaction fields: organizationId, personId, description, journalEntryDate, journalEntryId should all remain the same.