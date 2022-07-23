### Update a vendor
Endpoint: `PUT /vendor/{vendorId}`

Authorization: User must have EDIT permissions.

Updates a vendor. All fields in the request body must be passed; missing fields will be updated with `null`.
___

#### Request Body Parameters
- **vendorId (`Long`)**<br/>
The id of the vendor that is to be updated.

- **vendorName (`String` 64)**<br/>
A name for this Vendor.

- **contactName (`Optional String` 64)**<br/>
The name of the main contact for this vendor.

- **contactEmail (`Optional String` 64)**<br/>
An email to contact this vendor.

- **phoneNumber (`Optional String` 64)**<br/>
A phone number to contact this customer.

-**organizationId (`Long`)**<br/>
The id of the organization that this vendor belongs to.

___
#### Returns
Returns HTTP 201 and the updated vendor object upon successful update. Returns HTTP 409 and an error if the vendorId field does not match the request URI. Returns HTTP 404 and an error if an Organization does not exist in the database for the specified organizationId. Returns 409 and the message "Duplicate vendor name." if a user attempts to create two vendors with the same vendorName (leading/trailing whitespace discounted, case-insensitive) for the same organization.
___


#### Sample Request
`PUT /account/1`

Body:
```json
{
    "vendorId": 1,
    "vendorName": "Test Vendor",
    "email": "test@vendor.com",
    "contactName": "Test",
    "organizationId": 1
}
```
<br/>
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
