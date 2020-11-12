### The Person Object
___
#### Attributes
- **id (`Long`)**<br/>
Unique identifier for the object.

- **firstName (`string` 25)**<br/>
First name of the user.

- **lastName (`string` 25)**<br/>
Last name of the user.

- **email (`string` 255)**<br/>
Email address of the user. Each user should have a unique email address.

- **password (`string` 64)**<br/>
Password of the user, stored as a BCrypt hash.

- **organizationIds (`Array<Integer>`)**<br/>
List of IDs of organizations that this Person belongs to. When an organization that a person belongs to is deleted, it is automatically deleted from this list. 
___

#### Sample Object
```json
{
    "personId": 1,
    "firstName": "Sample",
    "lastName": "User",
    "email": "sampleuser@gmail.com",
    "password": "*******",
    "organizationIds": [
        1
    ]
}
```
