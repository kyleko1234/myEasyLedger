### Update a customer
Endpoint: `PUT /customer/{customerId}`

Authorization: User must have EDIT permissions.

Updates a customer. All fields in the request body must be passed; missing fields will be updated with `null`.
___

#### Request Body Parameters
- **customerId (`Long`)**<br/>
The id of the customer that is to be updated.

- **customerName (`String` 64)**<br/>
A name for this customer.

- **contactName (`Optional String` 64)**<br/>
The name of the main contact for this customer.

- **contactEmail (`Optional String` 64)**<br/>
An email to contact this customer.

-**organizationId (`Long`)**<br/>
The id of the organization that this customer belongs to.

___
#### Returns
Returns HTTP 201 and the updated customer object upon successful update. Returns HTTP 409 and an error if the customerId field does not match the request URI. Returns HTTP 404 and an error if an Organization does not exist in the database for the specified organizationId. Returns 409 and the message "Duplicate customer name." if a user attempts to create two customers with the same customerName (leading/trailing whitespace discounted, case-insensitive) for the same organization.
___


#### Sample Request
`PUT /account/1`

Body:
```json
{
    "customerId": 1,
    "customerName": "Test customerer",
    "email": "test@customer.com",
    "contactName": "Test",
    "organizationId": 1
}
```
<br/>
<br/>

#### Sample Response
```json
{
    "customerId": 1,
    "customerName": "Test Customer",
    "contactName": "Test",
    "email": "test@customer.com",
    "organizationId": 1
}
```
