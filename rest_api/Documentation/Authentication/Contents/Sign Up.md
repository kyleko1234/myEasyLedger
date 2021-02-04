### Sign Up
Endpoint: `POST /auth/signup`

Creates a new user with role ROLE_USER. Request body parameters should match the front-end registration form exactly. By default, users are disabled. Upon user creation, a verification email will be sent to the user, with instructions on how to enable the user.
___
#### Request Body Parameters
- **firstName (`String 25`)** <br/>
The first name of the user being signed up.

- **lastName(`String 25`)** <br/>
The last name of the user being signed up.

- **email (`String 255`)** <br/>
The email of the user being signed up. Must be unique; this is used as the username for this account.

- **reEnterEmail (`String 255`)** <br/>
The email of the user, once again. `confirmEmail` and `email`  must match in order to successfully register.

- **password (`String 64`)** <br/>
The password of the user being signed up.

- **reEnterPassword (`String 64`)** <br/>
The password of the user being signed up, once again. `confirmPassword` and `password` must match in order to successfully register.

- **agree (`boolean`)** <br/>
A boolean signifying that the user agrees to the terms and conditions of using this software.
f
- **locale(`string` 64)** <br/>
Locale representing the language setting for the user. A list of valid locales is found [[Easy Ledger#Currently supported locales|here]].

- **organizationName (`String 64`)** <br/>
The name of the first organization for this person. A user must have at least one organization, so it is required to provide an organization name on sign-up.

- **currency (`string` 64)**<br/>
The currency that this organization does business in. Should not be changed after creation. A list of supported currencies is provided [[Easy Ledger#Currently supported currencies|here]]

- **isEnterprise (`boolean`)**<br/>
True if this organization uses double-entry accounting, false if not. Should not be changed after creation.

___
#### Returns
Returns a message indicating success or failure of user registration. Signing a user up will not log the user in; this must be done manually.

___
#### Sample Request
`POST /auth/signup`

Body:
```json 
{
    "firstName": "cheese",
    "lastName" : "grater",
    "email": "cheesegrater@gmail.com",
    "reEnterEmail": "cheesegrater@gmail.com",
    "password": "macpro",
	"reEnterPassword": "macpro",
	"agree": true,
	"locale": "en-US",
	"organizationName": "Apple Computer Incorporated",
	"currency": "USD",
	"isEnterprise": true
}
```

#### Sample Response
```json
{
    "success": true,
    "message": "User registered successfully!"
}
```