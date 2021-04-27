### Check For Available Email
Endpoint: `POST /auth/checkForAvailableEmail`

Checks if the given email is available or if it is already registered to a user.

The request body should be formatted as follows:
```json
{
	"email": <STRING>
}
```

If the email is not already in use, this endpoints returns 200 and the following:
```json
{
    "email available": true
}
```

If the email is taken, this endpoint returns a 409 and the following:
```json{
    "timestamp": "2021-04-27T04:46:27.989+0000",
    "status": 409,
    "error": "Conflict",
    "message": "Person already registered with this email :: <EMAIL>",
    "path": "/v0.4/auth/checkForAvailableEmail"
}
```