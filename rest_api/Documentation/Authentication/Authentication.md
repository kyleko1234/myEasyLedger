### Authentication

Authentication in Easy Ledger is implemented using a JWT system. Unauthenticated users will only be able to perform 'sign in' and 'sign up' actions. Only requests with a valid JWT in the request header are able to access any other API endpoints.

Currently, the only two user roles are ROLE_USER and ROLE_ADMIN. The API currently only supports signing up users as *ROLE_USER*. There is not yet a difference in priveleges between the two roles.


___
- [[Sign In]]
- [[Sign Up]]
