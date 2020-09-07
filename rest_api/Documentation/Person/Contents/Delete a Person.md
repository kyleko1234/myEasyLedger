### Delete a Person
Endpoint: `DELETE /person/{id}`

Deletes a person from the database, removing them from all organizations that they belong to.
___

#### Request Body Parameters
None.
___
#### Returns
JSON object indicating successful deletion, or HTTP 404 if specified person was not found in the database.
___

#### Sample Request
`DELETE /person/{id}`
<br />
#### Sample Response
```json
{
    "deleted": true
}
```
 
