### The LineItem Object
___
#### Attributes
- **accountId (`Long`)**<br/>
The id of the Account which this LineItem affects.

- **accountName (`String` 40)**<br/>
The name of the Account which this LineItem affects.

- **accountSubtypeId (optional `Long`)**<br/>
The id of the subtype of this LineItem’s account, if it has a subtype.

- **accountSubtypeName (optional `String` 40)**<br/>
The name of the subtype of this LineItem’s account, if it has a subtype.

- **accountTypeId (`Long`)**<br/>
The id of the type of the Account that this LineItem affects. Easy Ledger assumes that there are exactly five account types: Assets (1), Liabilities (2), Owner’s Equity (3), Income (4), and Expenses (5).

- **accountTypeName (`String` 20)**<br/>
The name of the type of the Account that this LineItem affects.

- **categoryId (optional `Long`)**<br/>
The id of the category in which this LineItem falls. This is optional and should generally only be used for Expense and Income accounts.

- **categoryName (optional `String` 40)**<br/>
If this LineItem affects an Income or Expense account, this describes the category of Income or Expense.

- **description (optional `String` 255)**<br/>
A brief description of this LineItem.

- **EntryId (`Long`)**<br/>
The id of the Entry that this LineItem belongs to.

- **isCredit (`boolean`)**<br/>
A boolean that marks whether this is a debit (false) item or a credit (true) item.

- **lineItemId (`Long`)**<br/>
A unique identifier for this object.
___
#### Sample Object
``` json 
{
    "accountId": 5,
    "accountName": "Personal Expenses",
    "accountSubtypeId": null,
    "accountSubtypeName": null,
    "accountTypeId": 5,
    "accountTypeName": "Expenses",
    "amount": 20.00,
    "categoryId": 2,
    "categoryName": "Dining",
    "description": "Dining expenses",
    "entryId": 2,
    "isCredit": false,
    "lineItemId": 3
}
```