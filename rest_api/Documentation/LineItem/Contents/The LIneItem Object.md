### The LineItem Object
___
#### Attributes
- **accountId (`Long`)**<br/>
The id of the Account which this LineItem affects.

- **accountName (`String` 40)**<br/>
The name of the Account which this LineItem affects.

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

- **accountSubtypeId (`Long`)**<br/>
The id of the accountSubtype to which this lineItem can ultimately be classified.
- **accountTypeId (`Long`)**<br/>
The id of the accountType to which this lineItem can ultimately be classified.

___
#### Sample Object
``` json 
{
    "accountId": 10,
    "accountName": "Cash",
    "amount": 400000,
    "description": "Cash influx from initial offering",
    "journalEntryId": 1,
    "journalEntryDate": "2020-11-01",
    "isCredit": false,
    "lineItemId": 1,
	"accountSubtypeId": 1,
	"accountTypeId": 1
}
```