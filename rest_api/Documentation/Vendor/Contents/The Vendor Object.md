### The Vendor Object
___
#### Attributes
- **vendorId (`Long`)**<br/>
The id of the vendor.

- **vendorName (`String` 64)**<br/>
A name for this Vendor.

- **contactName (`Optional String` 64)**<br/>
The name of the main contact for this vendor.

- **contactEmail (`Optional String` 64)**<br/>
An email to contact this vendor.

-**organizationId (`Long`)**<br/>
The id of the organization that this vendor belongs to.
___
#### Sample Object
```json
{
    "vendorId": 1,
    "vendorName": "Test Vendor",
    "contactName": "Test",
    "email": "test@vendor.com",
    "organizationId": 1
}
```
