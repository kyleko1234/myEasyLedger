### Invite a Person to an organization by Email
Endpoint: `POST /organization/{organizationId}/invitation`

Authorization: Requesting user must have administrator privileges for the organization.

Invites an unregistered user to the organization. A Person object will be created in the database for the invitee using the email address provided in the request body, the locale of the inviter, a dummy password that will not be required later, and `null` for all other fields. This Person object will be added to the specified organization, and an email will be sent to the invitee providing a link they can click through to finish setting up their account.

This invitation email uses a VerificationToken to authorize the user, rather than using a password or JWT. This VerificationToken will have an expiry period of 15 minutes after sending, but this expiry should not be checked when validating acceptance of an invitation: that is, this link should not expire.

This endpoint should only be used after an attempt to invite a user that already exists in the database has been performed, i.e. only use this endpoint when it is confirmed that the invitee does not already exist in the database.
___
#### Request Body Parameters
The request body should be sent in this format: 
```json
{
	"permissionTypeId": <number>,
	"email": <String>,
	"locale": <String>
}
```
permissionTypeId: [[Permission#Permission Types]]

email: The email address of the invitee

locale: The locale preference for the invitee. This should be set to match the locale preference of the inviter by default.
___
#### Returns
Returns a 409 when an email is already taken or an invalid locale is provided. Returns 201 and a Permission object on successful invite/creation. Returns 404 when an invalid organizationId is provided.

