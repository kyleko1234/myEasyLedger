### Authentication

Authentication in Easy Ledger is implemented using a JWT system. Unauthenticated users will only be able to perform 'sign in' and 'sign up' actions. Only requests with a valid JWT in the request header are able to access any other API endpoints.

Currently, the only two user roles are ROLE_USER and ROLE_ADMIN. The API currently only supports signing up users as *ROLE_USER*. There is not yet a difference in priveleges between the two roles.

Signing a user up will create a user account, disabled by default. An email will be sent to the email address that the user provided on the signup form, containing a unique verification link. *Only one verification link can be active at a time. If another verification link is sent to the user, the first link is invalidated.* Verification links expire after 24 hours, and clicking on an expired verification link will cause the API to send a new verification email to the user.


A successful sign-in will return two JWT tokens: an access token and a refresh token. When making a request to the API, a client should first send the access token. If the access token is rejected due to expiry, call `GET /auth/refresh` using the refresh token to obtain new JWTs. If this is once again rejected due to expiry, the client must send another sign-in request in order to obtain fresh JWTs. If this refresh is successful, the client should re-send the original request using the refreshed access token.
___
An access token expires after one day after being issued. 

A refresh token expires one week after being issued.
___
JWT claims for this application are as follows:

- **sub** <br/>
The personId for the specific user.

- **organizations** <br/>
Organization objects for each organization that the user belongs to. **JWT claims may be used to authorize organization-sensitive API calls. Thus, after any CRUD operation involving Organization objects is performed, the client *must* call GET `/auth/refresh` to obtain new JWTs with updated organization information.**


___
- [[Sign In]]
- [[Sign Up]]
- [[Refresh JWT]]