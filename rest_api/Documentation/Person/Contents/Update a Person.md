### Update a person
Endpoint: `PATCH /person/{id}`

Updates a Person with the specified id by setting the value of the parameters passed. Any parameters not supplied will be left unchanged. A Person’s id cannot be changed.
___
#### Request Body Parameters
- **firstName (optional `string` 25)**<br/>
First name of the user.

- **lastName (optional `string` 25)**<br/>
Last name of the user.

- **email (optional `string` 255)**<br/>
Email address of the user. Cannot be an email already belonging to an existing user.

- **password (optional `string` 64)**<br/>
Password of the user. 

- **locale (optional `string` 64)** <br/>
Locale representing the language settings for the user. A list of valid locales is found [[Easy Ledger#Currently supported locales|here]].

- **darkMode (`String` 16)**<br/>
The user's preferred color scheme. Three options are valid: `'system'`, `'true', and 'false'`. The `'system'` option changes the color scheme based on the user's system preferences; the other two are self explanatory. If an invalid option is given here, the app should default to system appearance.

- **currentOrganizationId (optional`Long`)**<br/>
The current organization that the user is viewing information or making edits for. This should be an organization that the user belongs to; otherwise any requests involving organizationId will likely return an unauthorized exception. The API does not validate this field!
___
#### Returns
Returns the HTTP 200 and the person object if update is successful. Returns HTTP 404 if specified id does not belong to an existing person. Returns HTTP 409 if a supplied email already belongs to another user, upon an attempt to update email or password fields to null, or upon an attempt to update a person’s id.
___
#### Sample Request
`PATCH /person/1`
Body:
``` json
{
    "email": "sampleuser2@gmail.com"
}
```
<br />
<br />

#### Sample Response
```json
{
    "id": 1,
    "firstName": "Kyle",
    "lastName": "Ko",
    "email": "kyleko1234@gmail.com",
    "locale": "en-US",
    "currentOrganizationId": 1,
	"darkMode": "system",
    "organizations": [
        {
            "id": 1,
            "name": "Sample organization",
            "currency": "USD",
            "isEnterprise": true
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




