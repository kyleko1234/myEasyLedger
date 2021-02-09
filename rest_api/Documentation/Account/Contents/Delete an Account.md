### Delete an account
Endpoint: `DELETE /account/{id}`

Authorization: User must have EDIT permissinos for the associated Organization.

Soft-deletes the account with the specified id. Accounts can only be deleted if there are no LineItems associated with them. Any LineItems will need to be removed or updated to modify a different account before deletion of the account.
___

#### Request Body Parameters
None
___
#### Returns
Returns HTTP 200 and a JSON object indicating successful deletion. Returns HTTP 409 and an error if there are LineItems still associated with this account at time of deletion. Returns HTTP 404 and an error if the account with the specified id cannot be found.
___


### Sample Request
`DELETE /account/1`


#### Sample Response
```json
{
    "deleted": true
}
```