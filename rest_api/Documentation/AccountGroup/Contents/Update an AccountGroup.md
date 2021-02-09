### Update an AccountGroup
Endpoint: `PUT /accountGroup/{id}`

Authorization: User must have EDIT permissions for the organization that owns the specified account group and the organization that this account group is being updated to belong to.

Updates an account group with the values of the parameters passed. All parameters must be passed in order to update the object. Any parameters not passed are set to null. Cannot be used to update the "deleted" field; use `DELETE /accountGroup/{id}` instead.
___

#### Request Body Parameters
- **accountGroupId (`Long`)** <br/>
The id of the group that is to be updated. Must match the id in the request URI.

- **accountGroupName (`String` 64)** <br/>
The name of this account group.

- **accountSubtypeId (`Long`)** <br/>
The id of the subtype that this account group belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this account group belongs to.

___
#### Returns
Returns the updated account group object upon successful update. Returns HTTP 409 and an error if the id in the URI does not match the id in the request body. Returns HTTP 404 and an error if an AccountSubtpe does not exist in the database for the specified accountSubtypeId, or an AccountGroup does not exist for the provided accountGroupId.
___


#### Sample Request
`PUT /accountGroup/10`

Body:
```json
{
    "accountGroupId": 10,
    "accountGroupName": "More Cash",
    "accountSubtypeId": 1, 
	"organizationId": 1
}
```
<br/><br/>

#### Sample Response
```json
{
    "accountGroupId": 10,
    "accountGroupName": "More Cash",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash and cash equivalents",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "deleted": false
}
```
