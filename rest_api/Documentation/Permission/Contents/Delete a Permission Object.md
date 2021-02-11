### Delete a Permission Object
Endpoint: `DELETE /permission/{permissionId}`

Deletes the permission object, removing the associated person from the associated organization.

Authorization: User requesting deletion must have higher permissions than the deleted user. User requesting deletion must be at least ADMIN.

___

#### Returns
If valid authorization and existing object for the given id, returns the following json.
```json
{
	"deleted": true
}
```
Otherwise returns an error.