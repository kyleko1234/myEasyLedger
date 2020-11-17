### Refresh JWT

Endpoint: `GET /auth/refresh`

Returns two fresh JWTs. Generally, the client should first attempt an API call using the access token. If the API call fails due to expired JWT, call this endpoint using the refresh token in order to obtain a refreshed access token and refresh token. If this endpoint returns 401 due to expired JWT, the client should sign in again.
___

#### Request Body Parameters

none
___
#### Returns
Returns fresh access and refresh tokens upon successful authentication, or 401 and an error upon failed authentication.
___
#### Sample Request
`POST /auth/signin`

#### Sample Response
```json
{
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNjA1NTk5NTY4LCJleHAiOjE2MDU2ODU5Njh9.1RvawTsYpA2dwJM1AWViu1YLMiwlgXQHYZQASsmddhubVCt6a_pgZIFFbVb16jbSzkhPq4jXRgAGyVx9kcW0mQ",
    "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3IiwiaWF0IjoxNjA1NTk5NTY4LCJleHAiOjE2MDYyMDQzNjh9.WM1VH1d5I-afCRgNTKuZPOvkpttb19qvKTjfR3eo90ZhOy-_rmj46S2qCKm3tKyp-oRGL1FX3_LkjYzKMnfcuw",
    "tokenType": "Bearer"
}
```