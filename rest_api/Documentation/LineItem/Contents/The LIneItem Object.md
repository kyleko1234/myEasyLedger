### The LineItem Object
___
#### Attributes
- **accountId (`Long`)**<br/>
The id of the Account which this LineItem affects.

- **accountName (`String` 40)**<br/>
The name of the Account which this LineItem affects.

- **accountGroupId ( `Long`)**<br/>
The id of the group of this LineItem’s account.

- **accountGroupName ( `String` 64)**<br/>
The name of the group of this LineItem’s account.

- **accountSubtypeId ( `Long`)**<br/>
The id of the subtype of this LineItem’s account.

- **accountSubtypeName ( `String` 64)**<br/>
The name of the subtype of this LineItem’s account.

- **accountTypeId (`Long`)**<br/>
The id of the type of the Account that this LineItem affects. Easy Ledger assumes that there are exactly five account types: Assets (1), Liabilities (2), Owner’s Equity (3), Income (4), and Expenses (5).

- **accountTypeName (`String` 64)**<br/>
The name of the type of the Account that this LineItem affects. Easy Ledger assumes that there are exactly five account types: Assets (1), Liabilities (2), Owner’s Equity (3), Income (4), and Expenses (5).

- **amount (`BigDecimal`)**<br/>
The amount that this lineItem is recording.

- **description (optional `String` 255)**<br/>
A brief description of this LineItem.

- **journalEntryId (`Long`)**<br/>
The id of the journal entry that this LineItem belongs to.

- **journalEntryDate (`LocalDate`)**<br/>
The date of the journal entry that this LineItem belongs to.

- **isCredit (`boolean`)**<br/>
A boolean that marks whether this is a debit (false) item or a credit (true) item.

- **lineItemId (`Long`)**<br/>
A unique identifier for this object.
___
#### Sample Object
``` json 
{
    "accountId": 1,
    "accountName": "Cash",
    "accountGroupId": 1,
    "accountGroupName": "Cash",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash and cash equivalents",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "amount": 400000,
    "description": "Cash influx from initial offering",
    "journalEntryId": 1,
    "journalEntryDate": "2020-11-01",
    "isCredit": false,
    "lineItemId": 1
}
```