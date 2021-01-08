### The Account Object
___
#### Attributes
- **accountId (`Long`)**<br/>
A unique identifier for this object. 

- **accountName (`String` 64)**<br/>
The name of this account.

- **accountGroupId ( `Long`)**<br/>
The id of the AccountGroup for this account.

- **accountGroupName ( `String` 64)**<br/>
The name of the AccountGroup for this account.

- **accountSubtypeId ( `Long`)**<br/>
The id of the subtype for this account.

- **accountSubtypeName (`String` 64)**<br/>
The name of the subtype for this account.

- **accountTypeId (`Long`)**<br/>
The id of the type for this account.

- **accountTypeName (`String` 64)**<br/>
The name of the type of this account: Assets, Expenses, Owner’s Equity, Income, or Expenses.

- **organizationId (`Long`)** <br/>
The id of the organization that this account belongs to.

- **organizationName (`String`)** <br/>
The name of the organization that this account belongs to.

- **deleted (`boolean`)** <br/>
Whether or not this account has been deleted.
___
#### Sample Object
```json
{
    "accountId": 1,
    "accountName": "Cash",
    "accountGroupId": 1,
    "accountGroupName": "Cash",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash and cash equivalents",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "deleted": false
}
```
