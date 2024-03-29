### Create a Vendor
Endpoint: `POST /vendor`

Authorization: User must have EDIT permissions for the associated Organization.

Creates a Vendor object.
___
#### Request Body Parameters
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
Returns HTTP 201 and the created Vendor object. Returns HTTP 409 and an error upon an attempt to manually set an vendor’s id. Returns 409 and the message "Duplicate vendor name." if a user attempts to create two vendors with the same vendorName (leading/trailing whitespace discounted, case-insensitive) for the same organization.  Returns 404 if an Organization object cannot be found for the specified organizationId.
___
#### Sample Request
`POST /vendor`

Body:
```json
{
    "vendorName": "Best Vendor",
    "email": "best@vendor.com",
    "contactName": "Kyle",
    "organizationId": 1
}
```
<br/>
<br/>

#### Sample Response
```json
    {
        "vendorId": 3,
        "vendorName": "Best Vendor",
        "contactName": "Kyle",
        "email": "best@vendor.com",
		"phoneNumber": null,
        "organizationId": 1
    }
```