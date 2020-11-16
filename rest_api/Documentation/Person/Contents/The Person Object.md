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
Password of the user, stored as a BCrypt hash. Not returned as a result of GET requests. Use only for PATCH and POST requests.

- **organizationIds (`Array<Integer>`)**<br/>
List of IDs of organizations that this Person belongs to. When an organization that a person belongs to is deleted, it is automatically deleted from this list. This is used for convenience of PATCHing a person. 

- **organizations (`Array<Organization>`**<br/>
List of organizations with name and ID that this person belongs to. This field is used for GET requests only; PATCH requests need only send an array of IDs.

- **roles (`Array<Role>`)** <br/>
List of roles that this person holds, with ID and name of role. Currently there are two roles: ROLE_USER and ROLE_ADMIN. There are not yet any functional differences between the two roles.
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
