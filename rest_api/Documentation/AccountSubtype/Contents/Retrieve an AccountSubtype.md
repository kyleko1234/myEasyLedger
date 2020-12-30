### Retrieve an account subtype
Endpoint: `GET /accountSubtype/{id}`

Authorization: Requesting user must belong to the organization that owns this account subtype.

Retrieves an account subtype using the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an AccountSubtype object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___


#### Sample Request
`GET /accountSubtype/1`
<br/>

#### Sample Response
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
