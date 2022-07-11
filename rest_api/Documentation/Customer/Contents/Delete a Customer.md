### Delete a Customer
Endpoint: `DELETE /customer/{id}`

Authorization: User must have EDIT permissions for the associated Organization.

Deletes the customer with the specified id. This is a hard-delete, so use caution. Customers with associated undeleted JournalEntries cannot be deleted.
___

#### Request Body Parameters
None
___
#### Returns
Returns HTTP 200 and a JSON object indicating successful deletion. Returns HTTP 409 and an error if there are JournalEntries still associated with this customer at time of deletion. Returns HTTP 404 and an error if the account with the specified id cannot be found.
___


### Sample Request
`DELETE /customer/1`


#### Sample Response
```json
{
    "deleted": true
}
```