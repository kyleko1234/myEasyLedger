### List All Customers for an Organization
Endpoint: `GET /organization/{id}/customer` 

Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all customers belonging to the Organization with the specified id, sorted by customerName alphabetic.
___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all customers belonging to an organization when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/customer`
<br/>

#### Sample Response
```json
[
    {
        "customerId": 3,
        "customerName": "Best customer",
        "contactName": "Kyle",
        "email": "best@customer.com",
		"phoneNumber": null,
        "organizationId": 1
    },
    {
        "customerId": 1,
        "customerName": "Test customer",
        "contactName": "Test",
        "email": "test@customer.com",
		"phoneNumber": null,
        "organizationId": 1
    },
	...
]
```