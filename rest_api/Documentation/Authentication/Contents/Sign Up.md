### Sign Up
Endpoint: `POST /auth/signup`

Creates a new user with role ROLE_USER.
___
#### Request Body Parameters
- **firstName (`String 25`)** <br/>
The first name of the user being signed up.

- **lastName(`String 25`)** <br/>
The last name of the user being signed up.

- **email (`String 255`)** <br/>
The email of the user being signed up. Must be unique; this is used as the username for this account.

- **password (`String 64`)** <br/>
The password of the user being signed up.

___
#### Returns
Returns a message indicating success or failure of user registration. Signing a user up will not log the user in; this must be done manually.

___
#### Sample Request
`POST /auth/signup`

Body:
```json 
{
    "firstName": "cheese",
    "lastName" : "grater",
    "email": "cheesegrater@gmail.com",
    "password": "macpro"
}
```

#### Sample Response
```json
{
    "success": true,
    "message": "User registered successfully!"
}
```