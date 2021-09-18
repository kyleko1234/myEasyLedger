### User Verification Process
The user verification process generally begins iwth a [[Sign Up|sign up request]], which will prompt the server to send an email to the user in order to verify their email address. This email will contain a link that contains a token, and when clicked will trigger a function that calls the `GET /verification/{token}` endpoint.
