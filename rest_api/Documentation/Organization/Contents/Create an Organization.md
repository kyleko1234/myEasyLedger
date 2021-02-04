### Create an organization
Endpoint: `POST /organization`

Authorization: User must be logged in.

Creates an organization with the values of the parameters passed, automatically populates it with default account groups, adds the requesting user to the organization, and changes the requesting user's currentOrganizationId to the id of the newly created organization. Returns the newly created organization. Users should request fresh Person data by using GET /person/{personId} after creating an organization in order to assure that their person data is up to date.
___

#### Request Body Parameters
- **name (`String` 50)**<br/>
The name of this organization.

- **currency (`string` 64)**<br/>
The currency that this organization does business in. Should not be changed after creation. A list of supported currencies is provided [[Easy Ledger#Currently supported currencies|here]]

- **isEnterprise (`boolean`)**<br/>
True if this organization uses double-entry accounting, false if not. Should not be changed after creation.

___
#### Returns
Returns HTTP 201 and the created organization object. Returns HTTP 409 and an error upon an attempt to manually set an organization’s id.
___
#### Sample Request
`POST /organization`

Body:
```json
{
    "name": "Sample organization",
    "currency": "USD",
    "isEnterprise": true
}
```
<br/>
<br/>

#### Sample Response
```json
{
    "id": 1,
    "name": "Sample organization",
    "currency": "USD",
    "isEnterprise": true
}
```
