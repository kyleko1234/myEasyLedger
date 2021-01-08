### Retrieve an account group
Endpoint: `GET /accountGroup/{id}`

Authorization: Requesting user must belong to the organization that owns this account group.

Retrieves an account group using the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an AccountGroup object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___


#### Sample Request
`GET /accountGroup/1`
<br/>

#### Sample Response
```json
{
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
