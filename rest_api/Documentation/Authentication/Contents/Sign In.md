### Sign In

Endpoint: `POST /auth/signin`

Authenticates a user using the user-provided credentials.
___

#### Request Body Parameters

- **email** <br/>
The email that identifies the user being authenticated.

- **password** <br/>
The password of the user being authenticated.
___
#### Returns
Returns a JWT token upon successful authentication, or 401 and an error upon failed authentication.
___
#### Sample Request
`POST /auth/signin`

Body:
```json 
{
    "email": "signuptester@gmail.com",
    "password": "password"
}
```

#### Sample Response
```json
{
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjA0ODgzODc2LCJleHAiOjE2MDU0ODg2NzZ9.7QcM78SUqtXOhZicX_hoEOBl4OQULk_G4I_v 4Y3q07Ta7VQE0baZnnqPnv-qtOi1O5NqMta5IwsDyJvWtbzJKA",
    "tokenType": "Bearer"
}
```