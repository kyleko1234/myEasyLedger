### Authentication

Authentication in Easy Ledger is implemented using a JWT system. Unauthenticated users will only be able to perform 'sign in' and 'sign up' actions. Only requests with a valid JWT in the request header are able to access any other API endpoints.

Currently, the only two user roles are ROLE_USER and ROLE_ADMIN. The API currently only supports signing up users as *ROLE_USER*. There is not yet a difference in priveleges between the two roles.

A successful sign-in will return two JWT tokens: an access token and a refresh token. When making a request to the API, a client should first send the access token. If the access token is rejected due to expiry, call `GET /auth/refresh` using the refresh token to obtain new JWTs. If this is once again rejected due to expiry, the client must send another sign-in request in order to obtain fresh JWTs. If this refresh is successful, the client should re-send the original request using the refreshed access token.


___
- [[Sign In]]
- [[Sign Up]]
- [[Refresh JWT]]