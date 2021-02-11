### Edit a Permission Object
Endpoint: `PATCH /permission/{permissionId}`

Edits the permission object with the given permissionId. PermissionType is currently the only field that can be edited through this endpoint.

Authorization: Editing user must have higher privileges than the editee user. Editing user must have ADMIN privileges. Editing user must have OWN privileges to change an editee to ADMIN level permissions.
___
#### Request Body Parameters
- **permissionTypeId (`Long`)**<br/>
The permission type that the editee should be raised or lowered to. See [[Permission#Permission Types]]
___
#### Sample Request
`PATCH /permission/20`
```json
{
	"permissionTypeId": 2
}
```

#### Sample Response
```json
{
    "id": 20,
    "organization": {
        "id": 1,
        "name": "Sample organization",
        "currency": "USD",
        "isEnterprise": true
    },
    "permissionType": {
        "id": 2,
        "name": "EDIT"
    }
}
```