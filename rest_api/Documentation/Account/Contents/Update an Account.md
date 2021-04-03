### Update an account
Endpoint: `PUT /account/{id}`

Authorization: User must have EDIT permissions for all associated accounts.

Updates an account with the values of the parameters passed. Cannot be used to soft-delete an account; use `DELETE /account/{id}` instead.

___

#### Request Body Parameters
- **accountId (`Long`)**<br/>
The id of the account that is to be updated.

- **accountName (`String` 40)**<br/>
The name of this account.

- **parentAccountId ( `Optional Long`)**<br/>
The id of the parent account for this account, if it has one.

- **accountSubtypeId (`Optional Long`)**<br/>
The id of the subtype that this account belongs to, if it has no parent account. An account **must** have either an accountSubtypeId OR a parentAccountId, not both nor neither.

- **initialDebitAmount ( `BigDecimal`)**<br/>
The debit value that this account is initialized at. 

- **initialCreditAmount ( `BigDecimal`)**<br/>
The credit value that this account is initialized at. 


___
#### Returns
Returns HTTP 201 and the updated account object upon successful update. Returns HTTP 409 and an error if the accountId field does not match the request URI, or if the accountType of the provided subtype does not match the provided accountType of the object to be created. Returns HTTP 404 and an error if an accountType or accountSubtype does not exist in the database for the specified accountTypeId or accountSubtypeId, or if the account for this id cannot be found.
___


#### Sample Request
`PUT /account/1`

Body:
```json
{
    "accountId": 1,
    "accountName": "Cash",
    "accountGroupId": 1,
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
