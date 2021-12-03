### Check if invitation link has already been used
Endpoint: `GET /acceptInvitation/hasCompletedSetup/{token}`

**This endpoint can be accessed without authentication.**

Checks an invitation token to see if a user has already completed setup using this token. Returns three possible strings: 

* `"failure"` : This invitation token is invalid.
* `"true"`: This invitation has already been used to successfully set up a user's account. If this is returned, redirect the user to login.
* `"false"`: This invitation has not been used to successfully set up a user's account. If this is returned, direct the user to a form to finish setting up their account.
