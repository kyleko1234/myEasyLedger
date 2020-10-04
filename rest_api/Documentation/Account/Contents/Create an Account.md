### Create an account
Endpoint: `POST /account`

Creates an account with the values of the parameters passed.
___
#### Request Body Parameters
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
Returns HTTP 201 and the created account object. Returns HTTP 409 and an error upon an attempt to manually set an account’s id, or if the accountType of the provided subtype does not match the provided accountType of the object to be created. Returns HTTP 404 and an error if an accountType or accountSubtype does not exist in the database for the specified accountTypeId or accountSubtypeId.
___
#### Sample Request
`POST /account`

Body:
```json
{
    "accountName": "Personal Cash",
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
    "organizationName": "Sample organization",
    "deleted": false
}
```