### Update an JournalEntry
Endpoint: `PUT /journalEntry/{id}`

Authorization: User making the request must belong to the organization that owns the specified entry..

Updates an journal entry with the specified id by setting the value of the parameters passed. All parameters must be passed; any unpassed parameters will set the attribute to null. All existing LineItems will be destroyed and replaced with LineItems passed in the request body. A journal entry will keep the same id after an update, but its LineItems will be assigned new ids after an update regardless of whether the updated list of LineItems is different from that of the existing Entry. 
___
#### Request Body Parameters
- **journalEntryId (`Long`)**<br/>
Id of the entry to be updated. Must match id in URI of the request.

- **journalEntryDate (`LocalDate`)**<br/>
User-supplied date of this entry.

- **description (`String` 255)**<br/>
User-supplied description of this entry, up to 255 characters.

- **personId (`Long`)**<br/>
Id of the person who last modified this entry.

- **organizationId (`Long`)**<br/>
Id of the organization that this entry belongs to.

- **lineItems (`ArrayList<LineItem>`)**<br/>
List of LineItems to be contained in this entry. Each entry’s LineItems must be balanced; that is, total credit amounts must equal total debit amounts. LineItems require the following attributes:
   -  **accountId (`Long`)**<br/>
        Account that this LineItem affects.
    - **amount (`BigDecimal`)**<br/>
        Amount of money that this LineItem represents.
   -  **categoryId (optional `Long`)**<br/>
If this is an expense LineItem, the type of expense it represents.
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
    "journalEntryId": 1,
    "journalEntryDate": "2020-04-21",
    "description": "grocery shopping",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
        {
            "accountId": 5,
            "amount": 40.00,
            "categoryId": 1,
            "description": "Grocery expenses",
            "isCredit": false
        },
        {
            "accountId": 1,
            "amount": 40.00,
            "categoryId": null,
            "description": "Cash payment for groceries",
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
    "journalEntryId": 1,
    "journalEntryDate": "2020-04-11",
    "description": "Grocery for the week",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
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
            "journalEntryDate": "2020-04-11",
            "isCredit": true,
            "lineItemId": 2
        },
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
            "journalEntryDate": "2020-04-11",
            "isCredit": false,
            "lineItemId": 1
        }
    ],
    "deleted": false
}
```
