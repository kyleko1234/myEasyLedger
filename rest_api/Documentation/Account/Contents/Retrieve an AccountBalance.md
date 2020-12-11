### Retrieve an AccountBalance
Endpoint: `GET /account/{id}/accountBalance`

Authorization: Requesting user must belong to the organization that owns this account. 

Retrieves an account using the specified account id. Includes information on total debits and credits in this account.
___
#### Request Body Parameters
None
___
#### Returns
Returns an account object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___
#### Sample Request
`GET /account/1/accountBalance`
<br/>

#### Sample Response
```json
{
    "accountId": 1,
    "accountName": "My Personal Wallet",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash",
    "debitTotal": 0,
    "creditTotal": 80
}
```


