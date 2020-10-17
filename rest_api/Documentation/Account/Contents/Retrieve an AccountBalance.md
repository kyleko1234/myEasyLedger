### Retrieve an AccountBalance
Endpoint: `GET /account/{id}/accountBalance`

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
    "accountName": "Personal Cash",
    "accountTypeId": 1,
    "accountSubtypeId": 1,
    "debitTotal": 0,
    "creditTotal": 80.00
}
```


