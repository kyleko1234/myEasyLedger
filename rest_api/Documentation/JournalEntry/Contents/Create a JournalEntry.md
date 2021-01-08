### Create a JournalEntry
Endpoint: `POST /journalEntry`

Authorization: Entry can only be created with an organizationId of an organization that the user belongs to.

Creates a journal entry and line items using the values of the parameters passed.
___
#### Request Body Parameters
- **journalEntryDate (`LocalDate`)**<br/>
User-supplied date of this entry.

- **personId (`Long`)**<br/>
Id of the person who last modified this entry.

- **description (`String` 255)**<br/>
A description for this entry, up to 255 characters.

- **organizationId (`Long`)**<br/>
Id of the organization that this entry belongs to.

- **lineItems (`ArrayList<LineItem>`)**<br/>
List of LineItems to be contained in this entry. Each entry’s LineItems must be balanced; that is, total credit amounts must equal total debit amounts. LineItems require the following attributes:
   - **accountId (`Long`)**<br/>
        Account that this LineItem affects.
		
   - **amount (`BigDecimal`)**<br/>
        Amount of money that this LineItem represents.
		
   - **description (optional `String` 255)**<br/>
        A description for this LineItem.
		
   - **isCredit (`boolean`)**<br/>
        True for a credit LineItem, false for a debit.
___

#### Returns
Returns HTTP 201 and the updated entry object upon successful update. Returns HTTP 404 upon submission of an invalid personId, accountId, organizationId, or categoryId, Returns HTTP 409 if total debits and credits of LineItems are not equal, or if there is an attempt to manually assign an entryId.
___
#### Sample Request
`POST /journalEntry`
Body:
```json 
{
    "journalEntryDate": "2020-11-01",
    "description": "Issued 20,000 shares of common stock at $20 per share",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
        {
            "accountId": 1,
            "amount": 400000,
            "description": "Cash influx from initial offering",
            "isCredit": false
        },
        {
            "accountId": 9,
            "amount": 400000,
            "description": "Issued 20000 shares of common at 20 per",
            "isCredit": true
        }
    ]
}
```
<br />
<br />

#### Sample Response
```json
{
    "journalEntryId": 11,
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
            "journalEntryId": 11,
            "journalEntryDate": "2020-11-01",
            "isCredit": false,
            "lineItemId": 22
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
            "journalEntryId": 11,
            "journalEntryDate": "2020-11-01",
            "isCredit": true,
            "lineItemId": 23
        }
    ],
    "deleted": false
}
```

