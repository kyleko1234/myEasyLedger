### Create an account subtype
Endpoint: `POST /accountSubtype`

Creates an account subtype with the values of the parameters passed.

___
#### Request Body Parameters
- **accountSubtypeName (`String` 40)**<br/>
The name of this subtype.

- **accountTypeId (`Long`)**<br/>
The id of the type that this account subtype belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this account subtype belongs to.
___
#### Returns
Returns HTTP 201 and the created account subtype object upon successful creation. Returns HTTP 409 and an error upon an attempt to manually set an subtype’s id. Returns HTTP 404 and an error if an accountType does not exist in the database for the specified accountTypeId.
___


#### Sample Request
`POST /accountSubtype`

Body:

```json
{
    "accountSubtypeName": "Cash",
    "accountTypeId": 1,
	"organizationId": 1
}
```
<br/><br/>

#### Sample Response
```json
{
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "deleted": false
}
```