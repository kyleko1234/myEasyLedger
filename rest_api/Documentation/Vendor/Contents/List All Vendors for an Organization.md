### List All Vendors for an Organization
Endpoint: `GET /organization/{id}/vendor` 

Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all vendors belonging to the Organization with the specified id, sorted by vendorName alphabetic.
___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all vendors belonging to an organization when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/vendor`
<br/>

#### Sample Response
```json
[
    {
        "vendorId": 3,
        "vendorName": "Best Vendor",
        "contactName": "Kyle",
        "email": "best@vendor.com",
		"phoneNumber": null,
        "organizationId": 1
    },
    {
        "vendorId": 1,
        "vendorName": "Test Vendor",
        "contactName": "Test",
        "email": "test@vendor.com",
		"phoneNumber": null,
        "organizationId": 1
    },
	...
]
```