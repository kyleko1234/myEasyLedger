### The Customer Object
___
#### Attributes
- **customerId (`Long`)**<br/>
The id of the customer.

- **customerName (`String` 64)**<br/>
A name for this customer.

- **contactName (`Optional String` 64)**<br/>
The name of the main contact for this customer.

- **contactEmail (`Optional String` 64)**<br/>
An email to contact this customer.

-**organizationId (`Long`)**<br/>
The id of the organization that this customer belongs to.
___
#### Sample Object
```json
{
    "customerId": 1,
    "customerName": "Test Customer",
    "contactName": "Test",
    "email": "test@customer.com",
    "organizationId": 1
}
```
