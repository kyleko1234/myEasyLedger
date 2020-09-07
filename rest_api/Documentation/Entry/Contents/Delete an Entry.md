### Delete an entry
Endpoint: `DELETE /entry/{id}`

Deletes an entry and all the line items contained in that entry using the specified entry id.
___
#### Parameters
None
___

#### Returns
HTTP 200 and JSON containing “deleted : true” if valid id, otherwise returns HTTP 404 and an error.
___

#### Sample Request
`DELETE /entry/3`
<br />

#### Sample Response
```json 
{
    "deleted": true
}
```
