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

- **debitTotal (`BigDecimal`)** <br/>
The total debit balance of this account. This should equal initialDebitAmount plus the sum of all debit LineItems affecting this account.

- **creditTotal (`BigDecimal`)** <br/>
The total credit balance of this account. This should equal initialCreditAmount plus the sum of all credit LineItems affecting this account.

- **initialDebitAmount (`BigDecimal`)** <br/>
The debit amount that this account was initialized with. By default this is zero, but users migrating from other software may find it useful to initialize an account with non-zero values.

- **initialCreditAmount (`BigDecimal`)** <br/>
The credit amount that this account was initialized with. By default this is zero, but users migrating from other software may find it useful to initialize an account with non-zero values.

- **debitsMinusCredits (`BigDecimal`)** <br/>
For utility's sake we provide debitTotal-creditTotal as totalDebitsMinusCredits.

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
    "debitTotal": 420000,
    "creditTotal": 18430,
    "initialDebitAmount": 0,
    "initialCreditAmount": 0,
    "debitsMinusCredits": 401570,
    "deleted": false
}
```
