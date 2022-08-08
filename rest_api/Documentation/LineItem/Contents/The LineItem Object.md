### The LineItem Object
___
#### Attributes
- **lineItemId (`Long`)**<br/>
Unique identifier for the object.

- **journalEntryId (`Long`)**<br/>
The id of the JournalEntry that this LineItem belongs to.

- **journalEntryDate (`LocalDate`)**<br/>
Date for the JournalEntry that this LineItem belongs to, in “YYYY-MM-DD” format.

- **journalEntryDescription (`String` 255)**<br/>
A description for the JournalEntry that this LineItem belongs to, up to 255 characters.

- **description (`Optional String` 255)**<br/>
A description for this LineItem, up to 255 characters.

- **amount (`BigDecimal`)**<br/>
The amount that this LineItem is for.

- **isCredit (`boolean`)**<br/>
True if this is a credit LineItem, false if it is a debit item.

- **accountId (`Long`)**<br/>
Id of the Account that this LineItem is assigned to. 

- **accountName (`String` 64)**<br/>
The name of the Account that this LineItem is assigned to.

- **accountSubtypeId(`Long`)**<br/>
The id of the AccountSubtype of this LineItem's Account.

- **accountTypeId(` Long`)**<br/>
The id of the AccountType of this LineItem's Account.

___
#### Sample Object
```json
{
    "accountId": 6,
    "accountName": "Paid-in Capital",
    "amount": 400000,
    "description": "Issued 20000 shares of common at 20 per",
    "journalEntryId": 1,
    "journalEntryDate": "2020-11-01",
    "journalEntryDescription": "Issued 20,000 shares of common stock at $20 per share",
    "isCredit": true,
    "lineItemId": 1,
    "accountSubtypeId": 20,
    "accountTypeId": 3
}
```