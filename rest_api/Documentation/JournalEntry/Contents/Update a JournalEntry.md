### Update an JournalEntry
Endpoint: `PUT /journalEntry/{id}`

Authorization: User making the request must have EDIT permissions for the organization that owns the specified entry.

Updates an journal entry with the specified id by setting the value of the parameters passed. All parameters must be passed; any unpassed parameters will set the attribute to null. All existing LineItems will be destroyed and replaced with LineItems passed in the request body. A journal entry will keep the same id after an update, but its LineItems will be assigned new ids after an update regardless of whether the updated list of LineItems is different from that of the existing Entry. 

Returns a 409 if the (old) date of the JournalEntry is before the organizations lockJournalEntryBefore date.
___
#### Request Body Parameters
- **journalEntryId (`Long`)**<br/>
Id of the entry to be updated. Must match id in URI of the request.

- **journalEntryDate (`LocalDate`)**<br/>
User-supplied date of this entry.

- **description (`String` 255)**<br/>
User-supplied description of this entry, up to 255 characters.

- **organizationId (`Long`)**<br/>
Id of the organization that this entry belongs to.

- **lineItems (`ArrayList<LineItem>`)**<br/>
List of LineItems to be contained in this entry. Each entry’s LineItems must be balanced; that is, total credit amounts must equal total debit amounts. LineItems require the following attributes:
   -  **accountId (`Long`)**<br/>
        Account that this LineItem affects.
    - **amount (`BigDecimal`)**<br/>
        Amount of money that this LineItem represents.
   -  **description (optional `String` 255)**<br/>
        A description for this LineItem.
    - **isCredit (`boolean`)**<br/>
        True for a credit LineItem, false for a debit.
___
#### Returns
Returns the updated entry object upon successful update. Returns HTTP 404 upon submission of an invalid personId, accountId, organizationId, or categoryId, or if an entry does not exist for the supplied entryId. Returns HTTP 409 if URI and entryID do not match, or if total debits and credits of LineItems are not equal.
___
#### Sample Request
`PUT /journalEntry/1`
Body:
```json 
{
    "journalEntryId": 11,
    "journalEntryDate": "2020-11-01",
    "description": "Issued a whole bunch of shares of common stock at $20 per share",
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
    "description": "Issued a whole bunch of shares of common stock at $20 per share",
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
            "lineItemId": 24
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
            "lineItemId": 25
        }
    ],
    "deleted": false
}```
