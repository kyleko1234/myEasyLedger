### Delete an organization
Endpoint: `DELETE /organization/{id}`

Deletes an organization with the specified id. An organization cannot be deleted unless it has no entries associated with it. Deleting an organization removes it from the list of organizations of all people associated with that organization.
____

#### Request Body Parameters
None
____
#### Returns
Returns a JSON object indicating successful deletion if deletion was successful. Returns HTTP 404 and an error on submission of an invalid id. Returns HTTP 409 and an error if attempting to delete an organization that has entries still associated with it.
___
#### Sample Request
`DELETE /organization/1`
<br/>

#### Sample Response
```json
{
    "deleted": true
}
```

