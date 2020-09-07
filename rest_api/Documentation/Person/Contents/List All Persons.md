### List all persons
Endpoint: `GET /person`

Returns a list of all persons.
___
#### Request Body Parameters
none
___

#### Returns
Returns an array of all person objects.
___
#### Sample Request
`GET /person`
<br />
#### Sample Response
``` json
[
    {
        "personId": 1,
        "firstName": "Sample",
        "lastName": "User",
        "email": "sampleuser@gmail.com",
        "password": "*******",
        "organizationIds": [1, 2]
    }, 
    {
        "personId": 2,
        "firstName": "Sample2",
        "lastName": "User2",
        "email": "sampleuser2@gmail.com",
        "password": "*******",
        "organizationIds": [1, 2]
    }
]
 ```

