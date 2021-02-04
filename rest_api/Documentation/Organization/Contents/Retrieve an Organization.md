### Retrieve an organization
Endpoint: `GET /organization/{id}`

Authorization: Requesting user must belong to the requested organization.

Retrieves an organization using the specified id.
___

#### Request Body Parameters
None
___

#### Returns
Returns an organization object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___

#### Sample Request
`GET /organization/1`
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
