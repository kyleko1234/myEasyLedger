### Create a Customer
Endpoint: `POST /customer`

Authorization: User must have EDIT permissions for the associated Organization.

Creates a Customer object.
___
#### Request Body Parameters
- **customerName (`String` 64)**<br/>
A name for this customer.

- **contactName (`Optional String` 64)**<br/>
The name of the main contact for this customer.

- **contactEmail (`Optional String` 64)**<br/>
An email to contact this customer.

- **phoneNumber (`Optional String` 64)**<br/>
A phone number to contact this customer.

-**organizationId (`Long`)**<br/>
The id of the organization that this customer belongs to.
___

#### Returns
Returns HTTP 201 and the created Customer object. Returns HTTP 409 and an error upon an attempt to manually set an customer’s id. Returns 409 and the message "Duplicate customer name." if a user attempts to create two customers with the same customerName (leading/trailing whitespace discounted, case-insensitive) for the same organization.  Returns 404 if an Organization object cannot be found for the specified organizationId.
___
#### Sample Request
`POST /customer`

Body:
```json
{
    "customerName": "Best customer",
    "email": "best@customer.com",
    "contactName": "Kyle",
    "organizationId": 1
}
```
<br/>
<br/>

#### Sample Response
```json
    {
        "customerId": 3,
        "customerName": "Best customer",
        "contactName": "Kyle",
        "email": "best@customer.com",
		"phoneNumber": null,
        "organizationId": 1
    }
```