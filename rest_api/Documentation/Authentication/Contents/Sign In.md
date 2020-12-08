### Sign In

Endpoint: `POST /auth/signin`

Authenticates a user using the user-provided credentials. Returns two JWTs: an access and a refresh token. 
___

#### Request Body Parameters

- **email** <br/>
The email that identifies the user being authenticated.

- **password** <br/>
The password of the user being authenticated.
___
#### Returns
Returns a JWT token upon successful authentication. Returns 401 and message "Bad credentials" upon failure to authenticate. Returns 401 and "User is disabled" if the email in the request body exists in the database but the user has not been verified or is otherwise disabled.
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
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNjA1NTk5NTY4LCJleHAiOjE2MDU2ODU5Njh9.1RvawTsYpA2dwJM1AWViu1YLMiwlgXQHYZQASsmddhubVCt6a_pgZIFFbVb16jbSzkhPq4jXRgAGyVx9kcW0mQ",
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNjA1NTk5NTY4LCJleHAiOjE2MDYyMDQzNjh9.WM1VH1d5I-afCRgNTKuZPOvkpttb19qvKTjfR3eo90ZhOy-_rmj46S2qCKm3tKyp-oRGL1FX3_LkjYzKMnfcuw",
    "tokenType": "Bearer"
}
```