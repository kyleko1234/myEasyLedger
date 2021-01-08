### The JournalEntry Object
___
#### Attributes
- **journalEntryId (`Long`)**<br/>
Unique identifier for the object.

- **journalEntryDate (`LocalDate`)**<br/>
Date for the entry, supplied by the user, in “YYYY-MM-DD” format.

- **description (`String` 255)**<br/>
A description for this entry, up to 255 characters.

- **personId (`Long`)**<br/>
Id of the user that last modified this entry.

- **organizationId (`Long`)**<br/>
Id of the organization that this entry belongs to. 

- **lineItems (`ArrayList<LineItem>`)**<br/>
A list of LineItem objects that this entry contains. Each entry’s LineItems must be balanced; that is, total credit amounts must equal total debit amounts.

- **deleted(`boolean`)** <br/>
Whether or not this journal entry has been deleted.
___
#### Sample Object
```json
{
    "journalEntryId": 1,
    "journalEntryDate": "2020-11-01",
    "description": "Issued 20,000 shares of common stock at $20 per share",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
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
        },
        {
            "accountId": 9,
            "accountName": "Capital stock",
            "accountGroupId": 6,
            "accountGroupName": "Paid-in Capital",
            "accountSubtypeId": 19,
            "accountSubtypeName": "Paid-in capital",
            "accountTypeId": 3,
            "accountTypeName": "Owner's Equity",
            "amount": 400000,
            "description": "Issued 20000 shares of common at 20 per",
            "journalEntryId": 1,
            "journalEntryDate": "2020-11-01",
            "isCredit": true,
            "lineItemId": 2
        }
    ],
    "deleted": false
}
```