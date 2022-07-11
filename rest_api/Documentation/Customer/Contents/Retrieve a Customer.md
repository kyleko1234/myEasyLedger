### Retrieve a Customer
Endpoint: `GET /customer/{id}`

Authorization: Requesting user must belong to the organization that owns this customer. 

Retrieves a customer using the specified id.
___
#### Request Body Parameters
None
___
#### Returns
Returns a customer object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___
#### Sample Request
`GET /customer/1`
<br/>

#### Sample Response
```json
{
	"customerId": 1,
	"customerName": "Test Customer",
	"contactName": "Test"
	"email": "test@customer.com",
	"organizationId": 1
}
```


