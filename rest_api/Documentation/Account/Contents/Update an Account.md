### Update an account
Endpoint: `PUT /account/{id}`

Authorization: User must belong to both the organization that owns the account and the supplied organization in the request body.

Updates an account with the values of the parameters passed. Cannot be used to soft-delete an account; use `DELETE /account/{id}` instead.
___

#### Request Body Parameters
- **accountId (`Long`)**<br/>
The id of the account that is to be updated.

- **accountName (`String` 40)**<br/>
The name of this account.

- **accountTypeId (`Long`)**<br/>
The id of the type for this account.

- **accountSubtypeId (optional `Long`)**<br/>
The id of the subtype for this account.

- **organizationId (`Long`)** <br/>
The id of the organization that this account belongs to.
___
#### Returns
Returns HTTP 201 and the updated account object upon successful update. Returns HTTP 409 and an error if the accountId field does not match the request URI, or if the accountType of the provided subtype does not match the provided accountType of the object to be created. Returns HTTP 404 and an error if an accountType or accountSubtype does not exist in the database for the specified accountTypeId or accountSubtypeId, or if the account for this id cannot be found.
___


#### Sample Request
`PUT /account/1`

Body:
```json
{
    "accountId": 1,
    "accountName": "Cash",
    "accountTypeId": 1,
    "accountSubtypeId": 1,
	"organizationId": 1
}
```
<br/>
<br/>

#### Sample Response
```json
{
    "accountId": 1,
    "accountName": "Personal Cash",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash",
    "organizationId": 1,
    "organizationName": "Sample organization"
}
```
