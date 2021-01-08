### Delete an account subtype
Endpoint: `DELETE /accountGroup/{id}`

Authorization: User must belong to an organization that owns the account group that is to be deleted.

Soft-deletes the account group with the specified id. AccountGroups can only be deleted if there are no Accounts associated with them. Any Accounts will need to be removed or updated to belong to a different group before deletion of the AccountGroup can occur.
___

#### Request Body Parameters
None
___
#### Returns
Returns HTTP 200 and a JSON object indicating successful deletion. Returns HTTP 409 and an error if there are accounts still associated with this group at time of deletion. Returns HTTP 404 and an error if the group with the specified id cannot be found.
____


#### Sample Request
	DELETE /accountGroup/10


#### Sample Response
```json
{
    "deleted": true
}
```


