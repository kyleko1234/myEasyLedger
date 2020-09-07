### Create an organization
Endpoint: `POST /organization`

Creates an organization with the values of the parameters passed.
___

#### Request Body Parameters
- **name (`String` 50)**<br/>
The name of this organization.
___
#### Returns
Returns HTTP 201 and the created organization object. Returns HTTP 409 and an error upon an attempt to manually set an organization’s id.
___
#### Sample Request
`POST /organization`

Body:
```json
{
    "name": "Sample organization"
}
```
<br/>
<br/>

#### Sample Response
```json
{
    "id": 1,
    "name": "Sample organization"
}
```
