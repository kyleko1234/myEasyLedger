### The Account Object
___
#### Attributes
- **accountId (`Long`)**<br/>
A unique identifier for this object. 

- **accountName (`String` 40)**<br/>
The name of this account.

- **accountTypeId (`Long`)**<br/>
The id of the type for this account.

- **accountTypeName (`String` 20)**<br/>
The name of the type of this account: Assets, Expenses, Owner’s Equity, Income, or Expenses.

- **accountSubtypeId (optional `Long`)**<br/>
The id of the subtype for this account.

- **accountSubtypeName (optional `String` 40)**<br/>
The name of the subtype for this account.
__
#### Sample Object
```json
{
    "accountId": 1,
    "accountName": "Cash",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash"
}
```
