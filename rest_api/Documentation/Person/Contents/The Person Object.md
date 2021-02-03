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

- **locale (`string` 64)**<br/>
String representing the locale for the user's language setting. A list of supported locales can be found [[Easy Ledger#Currently supported locales|here]].

- **organizationIds (`Array<Integer>`)**<br/>
List of IDs of organizations that this Person belongs to. When an organization that a person belongs to is deleted, it is automatically deleted from this list. This is used for convenience of PATCHing a person. 

- **organizations (`Array<Organization>`**<br/>
List of organization objects with name and ID that this person belongs to. This field is used for GET requests only; PATCH requests need only send an array of IDs.

- **roles (`Array<Role>`)** <br/>
List of roles that this person holds, with ID and name of role. Currently there are two roles: ROLE_USER and ROLE_ADMIN. There are not yet any functional differences between the two roles.
___

#### Sample Object
```json
{
    "id": 1,
    "firstName": "Kyle",
    "lastName": "Ko",
    "email": "kyleko1234@gmail.com",
	"locale": "en-US",
    "organizations": [
        {
            "id": 1,
            "name": "Sample organization"
        }
    ],
    "roles": [
        {
            "id": 2,
            "name": "ROLE_ADMIN"
        }
    ]
}
```
