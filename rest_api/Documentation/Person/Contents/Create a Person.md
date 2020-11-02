### Create a Person
Endpoint: `POST /person`

Posts a Person object to the database using the specified parameters.
___
#### Request Body Parameters
- **firstName (`string` 25)**<br/>
First name of the user.

- **lastName (`string` 25)**<br/>
Last name of the user.

- **email (`string` 255)**<br/>
Email address of the user. Cannot be an email already belonging to an existing user.

- **password (`string` 64)**<br/>
Password of the user, stored as BCrypt hash.

- **organizationIds (`Array<Integer>`)**<br/>
List of organizations that this person belongs to, separated by commas. Internally, the JSON is parsed from an `ArrayList<Integer>` into a `Set<Long>`.
___
#### Returns
Returns HTTP 201 and the person object if creation is successful. Returns HTTP 409 and an error if an email is already in use by another person, if password and email are not supplied, or upon an attempt to manually create personId.
___
#### Sample Request
```POST /person```
Body:
``` json
{
    "firstName": "Sample",
    "lastName": "User",
    "email": "sampleuser@gmail.com",
    "password": "password",
    "organizationIds": [
        1, 2
    ]
}
```
<br />
<br />

#### Sample Response
```json
{
    "personId": 1,
    "firstName": "Sample",
    "lastName": "User",
    "email": "sampleuser@gmail.com",
    "password": "*******",
    "organizationIds": [
        1, 2
    ]
}
```