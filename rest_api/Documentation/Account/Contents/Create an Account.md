### Create an account
Endpoint: `POST /account`

Authorization: AccountGroup must be provided. User must have EDIT permissions for the associated Organization.

Creates an account with the values of the parameters passed.
___
#### Request Body Parameters
- **accountName (`String` 64)**<br/>
The name of this account.

- **accountCode (`Optional String` 16)**<br/>
An account code for this account.

- **parentAccountId (`Optional Long`)**<br/>
The id of the parent account for this account. This is optional, but an account must have either a parent account or an account subtype.

- **accountSubtypeId (`Optional Long`)**>br/>
The id of the account subtype that this account belongs to. This is optional if this account is a child account of another account, but if this account has no parent then it must have an account subtype.

-**organizationId (`Long`)**<br/>
The id of the organization that this account belongs to.

- **initialDebitAmount ( `BigDecimal`)**<br/>
The debit value that this account is initialized at. 

- **initialCreditAmount ( `BigDecimal`)**<br/>
The credit value that this account is initialized at. 

___

#### Returns
Returns HTTP 201 and the created account object. Returns HTTP 409 and an error upon an attempt to manually set an account’s id, or if the accountType of the provided subtype does not match the provided accountType of the object to be created. Returns HTTP 404 and an error if an accountType or accountSubtype does not exist in the database for the specified accountTypeId or accountSubtypeId.
___
#### Sample Request
`POST /account`

Body:
```json
{
    "accountName": "Cash",
	"accountCode": "110100",
    "accountSubtypeId": 1,
	"organizationId": 1,
	"initialDebitAmount": 0,
	"initialCreditAmount": 0
}
```
<br/>
<br/>

#### Sample Response
```json
{
    "accountId": 1,
    "accountCode": "110100",
    "accountName": "Cash",
    "parentAccountId": null,
    "parentAccountName": null,
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
    "hasChildren": false
}```