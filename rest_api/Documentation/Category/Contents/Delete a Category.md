### Delete a category
Endpoint: `DELETE /category/{id}`

Deletes the category with the specified id. Categories can only be deleted if there are no Accounts associated with them. Any Accounts will need to be removed or updated to modify a different category before deletion of the category can occur.
___

#### Request Body Parameters
None
___
#### Returns
Returns HTTP 200 and a JSON object indicating successful deletion. Returns HTTP 409 and an error if there are accounts still associated with this category at time of deletion. Returns HTTP 404 and an error if the category with the specified id cannot be found.

___

#### Sample Request
`DELETE /category/1`
<br/>

#### Sample Response
```json
{
    "deleted": true
}
```

