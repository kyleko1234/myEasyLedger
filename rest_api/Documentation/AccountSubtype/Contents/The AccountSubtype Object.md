### The AccountSubtype Object
___

#### Attributes
- **accountSubtypeId (`Long`)** <br/>
The unique identifier for this object.

- **accountSubtypeName (`String` 40)**<br/>
The name of this account type.

- **accountTypeId (`Long`)**<br/>
The id of the account type that this subtype belongs to.

- **accountTypeName (`String` 20)**<br/>
The name of the account type that this subtype belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this subtype belongs to.

- **organizationName (`String` 50)**<br/>
The name of the organization that this subtype belongs to.

- **affectsRetainedEarnings (`boolean`)** <br/>
A flag used for reporting purposes. This should only be used for subtypes of Owner's Equity, and indicates whether or not the contents of this subtype should be included in the Retained Earnings calculation on the balance sheet (a Dividends and Dividend Equivalents subtype, for example) or as a standalone Equity item. For all account types other than Equity, this should be set to false.

- **deleted (`boolean`) ** <br/>
Whether or not this account subtype has been deleted.
___

#### Sample Object
```json
{
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Easy Ledger Test",
    "affectsRetainedEarnings": false,
    "deleted": false
}
```




