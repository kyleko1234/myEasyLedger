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
    "journalEntryDate": "2020-04-11",
    "description": "Grocery for the week",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
        {
            "accountId": 5,
            "accountName": "Personal Expenses",
            "accountSubtypeId": null,
            "accountSubtypeName": null,
            "accountTypeId": 5,
            "accountTypeName": "Expenses",
            "amount": 40.00,
            "categoryId": 1,
            "categoryName": "Grocery",
            "description": "Grocery expenses",
            "journalEntryId": 1,
            "isCredit": false,
            "lineItemId": 1
        },
        {
            "accountId": 1,
            "accountName": "Personal Cash",
            "accountSubtypeId": 1,
            "accountSubtypeName": "Cash",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 40.00,
            "categoryId": null,
            "categoryName": null,
            "description": "Cash payment for groceries",
            "journalEntryId": 1,
            "isCredit": true,
            "lineItemId": 2
        }
    ],
	"deleted": "false"
}
```