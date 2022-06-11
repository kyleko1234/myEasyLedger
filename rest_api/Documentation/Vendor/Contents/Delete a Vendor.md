### Delete a Vendor
Endpoint: `DELETE /vendor/{id}`

Authorization: User must have EDIT permissinos for the associated Organization.

Deletes the vendor with the specified id. This is a hard-delete, so use caution. Vendors with associated undeleted JournalEntries cannot be deleted.
___

#### Request Body Parameters
None
___
#### Returns
Returns HTTP 200 and a JSON object indicating successful deletion. Returns HTTP 409 and an error if there are JournalEntries still associated with this Vendor at time of deletion. Returns HTTP 404 and an error if the account with the specified id cannot be found.
___


### Sample Request
`DELETE /vendor/1`


#### Sample Response
```json
{
    "deleted": true
}
```