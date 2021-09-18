### Verify an Email Address
Endpoint: `GET /verification/{token}`

Verifies an email address by matching a randomized token sent in an email to the user with a token created for that user in the database.

___
#### Returns
Returns a json in the following format: 
```json
{
	firstName: optional String
	lastName: optional String
	verificationResult: String
}
```

`firstName` and `lastName` correspond to the first name and last name of the user being verified. `verificationResult` is a string that can be one of three possibilities: `"success"`, `"failure"`, or `"expired"`. `"success"` indicates a successful verification and indicates that the user can now log in to this accound. `"failure"` indicates that the token is invalid/incorrect, and will accompany null values for `firstName` and `lastName`. `"expired"` indicates that the token was once valid but has since expired. A new token will automatically be generated and sent to the user upon an attempt to validate an expired token.