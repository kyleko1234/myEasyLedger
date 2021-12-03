### Accept an invitation
Endpoint: `POST /acceptInvitation/{token}`

Accepts an invitation and sets up a user account according to the details provided. This should be used to accept an invitation sent through the means of [[Invite a Person by Email|this endpoint.]] Before using this endpoint, it is recommended to check if an invitation link has already been used by accessing [[Check if invitation link has already been used|this endpoint.]]
___
#### Request Body
The request body should contain the following fields in this format: 

```json
{
	"firstName": <String>,
	"lastName": <String>,
	"password": <String>,
	"reEnterPassword": <String>,
	"locale": <String>,
	"agree": <boolean>
}
```

* firstName: The first name of the user being created.
* lastName: The last name of the user being created.
* password: The intended password of the user being created, in plaintext.
* reEnterPassword: The same as above once again. These two fields must match.
* locale: The locale preference of the person being created. See [[Easy Ledger#Currently supported locales]].
* agree: Whether or not the user has agreed to the terms and conditions.
___
#### Returns
Returns a json containing `{"accepted": true}` when this form is successfully validated and the user is successfully created. Returns 404 when the token in the URI is invalid. Returns 409 when the two password fields do not match, or when `agree` is false, or when the Person object being set up already has an `enabled` field that is `true`.