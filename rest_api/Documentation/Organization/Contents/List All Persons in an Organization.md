### List all persons associated with an organization
Endpoint: `GET /organization/{id}/person`

Returns a list of all persons associated with the organization with the specified id.
___
#### Request Body Parameters
None
___
#### Returns
Returns an array of Person objects including all persons in the specified organization.
___
#### Sample Request
`GET /organization/1/person`
<br/>

#### Sample Response
```json
[
    {
        "personId": 1,
        "firstName": "Sample",
        "lastName": "User",
        "email": "sampleuser@gmail.com",
        "password": "*******",
        "organizationIds": [
            1
        ]
    },
    ...
]
 ```

