### Retrieve a Vendor
Endpoint: `GET /vendor/{id}`

Authorization: Requesting user must belong to the organization that owns this account. 

Retrieves a vendor using the specified id.
___
#### Request Body Parameters
None
___
#### Returns
Returns a vendor object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___
#### Sample Request
`GET /vendor/1`
<br/>

#### Sample Response
```json
{
	"vendorId": 1,
	"vendorName": "Test Vendor",
	"contactName": "Test",
	"email": "test@vendor.com",
	"phoneNumber": null,
	"organizationId": 1
}
```


