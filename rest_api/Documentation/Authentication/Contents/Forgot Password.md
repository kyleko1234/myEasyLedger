### Forgot Password
Endpoints: 
- `POST /auth/forgotPassword`
- `POST /auth/verifyResetPasswordCode`
- `POST /auth/resetPassword`

The general procedure to reset a user's password is to first request a Reset Password Code to be sent to the user's email, verify the identity of the user by checking the user-entered Reset Password Code against the database, then set a new password for the user.

**It is important that the user has verified their account using the verification email sent upon signup before attempting to change their password, otherwise they may need to request a new verification email.**

#### Requesting a Reset Password Code
`POST /auth/forgotPassword` requires a request body as follows: 
```json
{
	"email": <STRING>
}
```

If the email corresponds to a user, an email will be sent with a six-digit Reset Password Code for the user. If not, a 404 will be thrown.

#### Verifying a Reset Password Code
`POST /auth/verifyResetPasswordCode` requires a request body as follows:
```json
{
	"email": <STRING>,
	"token": <STRING>
}
```
The given email and Password Reset Code will be verified against the database. If the email is not found, a 404 is thrown. If the Reset Password Code is incorrect, a 409 is thrown with the message `"Incorrect password reset code."`. If the code is expired, a 409 is thrown with the message `"Expired code."`. Otherwise the server will respond with the following json:
```json
{
	"verified": true
}
```
This endpoint will not reset the code, nor will it invalidate the existing code, nor will it change the user's password. It is strictly used for verifying a user's Reset Password Code.

#### Resetting a user's password
`POST /auth/resetPassword` requires the following request body:
```json
{
	"email": <STRING>,
	"token": <STRING>,
	"newPassword": <STRING>
}
```
This endpoint performs the same email/token checks and throws the same errors as the verification step above (`POST /auth/verifyResetPasswordCode`). Upon successful verification, the password of the user will be reset according to the given newPassword field, and the user will need to log in to receive new JWTs.

A successful reset password will return the following json:
```json
{
	"password changed": true
}
```