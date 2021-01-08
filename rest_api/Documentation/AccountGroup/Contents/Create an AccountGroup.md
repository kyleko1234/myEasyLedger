### Create an AccountGroup
Endpoint: `POST /accountGroup`

Authorization: User can only create an account group for an organization that they belong to.

Creates an account group with the values of the parameters passed.

___
#### Request Body Parameters
- **accountGroupName (`String` 64)**<br/>
The name of this account group.

- **accountSubtypeId (`Long`)**<br/>
The id of the subtype that this account group belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this account group belongs to.

___
#### Returns
Returns HTTP 201 and the created account group object upon successful creation. Returns HTTP 409 and an error upon an attempt to manually set an subtype’s id. Returns HTTP 404 and an error if an accountSubType does not exist in the database for the specified accountSubtypeId.
___


#### Sample Request
`POST /accountGroup`

Body:

```json
{
    "accountGroupName": "Cash Account",
    "accountSubtypeId": 1,
	"organizationId": 1
}
```
<br/><br/>

#### Sample Response
```json
{
    "accountGroupId": 10,
    "accountGroupName": "Cash Account",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash and cash equivalents",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "deleted": false
}
```