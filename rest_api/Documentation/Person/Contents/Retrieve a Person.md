### Retrieve a person
Endpoint: `GET /person/{id}`

Retrieves an existing person using the specified id.
___

#### Request Body Parameters
none
___
#### Returns
Returns HTTP 200 and a person object if a valid id was supplied, otherwise returns an HTTP 404 error.
___
#### Sample Request
	GET /person/1
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



