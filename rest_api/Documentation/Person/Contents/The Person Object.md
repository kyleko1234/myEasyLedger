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

- **currentOrganizationId (optional`Long`)**<br/>
The current organization that the user is viewing information or making edits for. This should be an organization that the user belongs to; otherwise any requests involving organizationId will likely return an unauthorized exception. This field can be null! It is suggested that the default behavior of a client is to treat this field as organizations[0].id if this field is null.

- **darkMode (`String` 16)**<br/>
The user's preferred color scheme. Three options are valid: `'system'`, `'true', and 'false'`. The `'system'` option changes the color scheme based on the user's system preferences; the other two are self explanatory. If an invalid option is given here, the app should default to light-mode appearance.

- **permissions(`Array<Permission>`)**<br/>
 A list of Permission objects that affect this user. See [[Permission]]. A Person can be expected to have exactly one permission object for each organization they belong to.
 
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
    "currentOrganizationId": 1,
	"darkMode": "system",
    "permissions": [
        {
            "id": 1,
            "organization": {
                "id": 1,
                "name": "Sample organization",
                "currency": "USD",
                "isEnterprise": true
            },
            "permissionType": {
                "id": 4,
                "name": "OWN"
            }
        }
    ],
    "roles": [
        {
            "id": 1,
            "name": "ROLE_USER"
        }
    ]
}
```
