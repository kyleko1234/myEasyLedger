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

- **password (optional `string` 30)**<br/>
Password of the user. Returned JSON output will always be “*******” regardless of input.

- **organizationIds (optional `Array<Integer>`)**<br/>
The full list of IDs for the organizations that this person belongs to. All organizations that the person belongs to must be included in this list; the person will be removed from any organizations not passed into this list. To remove a person from all organizations, pass an empty list. Internally organizationIds is parsed from the `ArrayList<Integer>` in the JSON request body into a `Set<Long>`.
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
    "personId": 1,
    "firstName": "Sample",
    "lastName": "User",
    "email": "sampleuser2@gmail.com",
    "password": "*******",
    "organizationIds": [
        1, 2
    ]
}
```




