### Delete an account subtype
Endpoint: `DELETE /accountSubtype/{id}`

Authorization: User must belong to an organization that owns the account subtype that is to be deleted.

Soft-deletes the account subtype with the specified id. Subtypes can only be deleted if there are no Accounts associated with them. Any Accounts will need to be removed or updated to modify a different subtype before deletion of the subtype can occur.
___

#### Request Body Parameters
None
___
#### Returns
Returns HTTP 200 and a JSON object indicating successful deletion. Returns HTTP 409 and an error if there are accounts still associated with this subtype at time of deletion. Returns HTTP 404 and an error if the subtype with the specified id cannot be found.
____


#### Sample Request
	DELETE /accountSubtype/1


#### Sample Response
```json
{
    "deleted": true
}
```


