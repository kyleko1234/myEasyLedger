### Create an account
Endpoint: `POST /account`

Authorization: AccountGroup must be provided. AccountGroup must belong to an organization that the user belongs to.

Creates an account with the values of the parameters passed.
___
#### Request Body Parameters
- **accountName (`String` 40)**<br/>
The name of this account.

- **accountGroupId (`Long`)**<br/>
The id of the type for this account.

___

#### Returns
Returns HTTP 201 and the created account object. Returns HTTP 409 and an error upon an attempt to manually set an account’s id, or if the accountType of the provided subtype does not match the provided accountType of the object to be created. Returns HTTP 404 and an error if an accountType or accountSubtype does not exist in the database for the specified accountTypeId or accountSubtypeId.
___
#### Sample Request
`POST /account`

Body:
```json
{
    "accountName": "Cash Equivalents",
    "accountGroupId": 1
}
```
<br/>
<br/>

#### Sample Response
```json
{
    "accountId": 15,
    "accountName": "Cash Equivalents",
    "accountGroupId": 1,
    "accountGroupName": "Cash",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash and cash equivalents",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "deleted": false
}
```