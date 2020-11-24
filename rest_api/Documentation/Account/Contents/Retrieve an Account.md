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
    "accountName": "Personal Cash",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "deleted": false
}
```


