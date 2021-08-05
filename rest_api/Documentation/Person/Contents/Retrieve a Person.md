### Retrieve a person
Endpoint: `GET /person/{id}`

Authorization: Current user can only request the Person object representing themselves.

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



