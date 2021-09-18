### Renew Verification Token
Endpoint: `GET /verification/resend/{email}`

Generates a new verification token for the user with the given email address, and sends a new verification email. Invalidates the previous verification token. Throws 404 if email address is invalid.