### Create an Entry
Endpoint: `POST /entry`

Creates an entry and line items using the values of the parameters passed.
___
#### Request Body Parameters
- **entryDate (`LocalDate`)**<br/>
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
    - **categoryId (optional `Long`)**<br/>
If this is an expense or income LineItem, the type of expense or income it represents.
    - **description (optional `String` 255)**<br/>
        A description for this LineItem.
    - **isCredit (`boolean`)**<br/>
        True for a credit LineItem, false for a debit.
___

#### Returns
Returns HTTP 201 and the updated entry object upon successful update. Returns HTTP 404 upon submission of an invalid personId, accountId, organizationId, or categoryId, Returns HTTP 409 if total debits and credits of LineItems are not equal, or if there is an attempt to manually assign an entryId.
___
#### Sample Request
`POST /entry`
Body:
```json 
{
    "entryDate": "2020-06-20",
    "personId": 1,
    "description": "paid credit card balance",
    "organizationId": 1,
    "lineItems": [
        {
            "accountId": 2,
            "amount": 30.00,
            "categoryId": null,
            "description": "paid credit balance from checking acc",
            "isCredit": true,
        },
        {
            "accountId": 4,
            "amount": 30.00,
            "categoryId": null,
            "description": "paid credit balance",
            "isCredit": false,
        }
    ]
}
```
<br />
<br />

#### Sample Response
```json
{
    "entryId": 7,
    "entryDate": "2020-06-20",
    "description": "paid credit card balance",
    "personId": 1,
    "organizationId": 1,
    "lineItems": [
        {
            "accountId": 2,
            "accountName": "Checking",
            "accountSubtypeId": 2,
            "accountSubtypeName": "Checking Account",
            "accountTypeId": 1,
            "accountTypeName": "Assets",
            "amount": 30.00,
            "categoryId": null,
            "categoryName": null,
            "description": "paid credit balance from checking acc",
            "entryId": 7,
            "isCredit": true,
            "lineItemId": 17
        },
        {
            "accountId": 4,
            "accountName": "BOA Credit Card",
            "accountSubtypeId": 7,
            "accountSubtypeName": "Line of Credit",
            "accountTypeId": 2,
            "accountTypeName": "Liabilities",
            "amount": 30.00,
            "categoryId": null,
            "categoryName": null,
            "description": "paid credit balance",
            "entryId": 7,
            "isCredit": false,
            "lineItemId": 18
        }
    ]
}
```

