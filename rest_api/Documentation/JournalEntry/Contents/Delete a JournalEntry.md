### Delete a  JournalEntry
Endpoint: `DELETE /journalEntry/{id}`

Authorization: User making the request must belong to the organization that owns the specified entry..

Soft-deletes a journal entry and all the line items contained in that entry using the specified entry id.
___
#### Parameters
None
___

#### Returns
HTTP 200 and JSON containing “deleted : true” if valid id, otherwise returns HTTP 404 and an error.
___

#### Sample Request
`DELETE /journalEntry/3`
<br />

#### Sample Response
```json 
{
    "deleted": true
}
```
