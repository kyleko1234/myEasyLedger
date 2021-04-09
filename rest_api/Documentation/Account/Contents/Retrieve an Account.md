### Retrieve an account
Endpoint: `GET /account/{id}`

Authorization: Requesting user must belong to the organization that owns this account. 

Retrieves an account using the specified id.
___
#### Request Body Parameters
None
___
#### Returns
Returns an account object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___
#### Sample Request
`GET /account/1`
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
}
```


