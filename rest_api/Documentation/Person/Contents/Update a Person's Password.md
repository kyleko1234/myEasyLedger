### Update a Person's Password
Endpoint: `PATCH /person/password`

Updates the user's password. The user to be updated is the user whose id is the subject of the JWT used to authenticate the request. 
___

#### Request Body Parameters
 - **currentPassword (`String 64`)**
The current password of the user.

 - **newPassword (`String 64`)**
 The new password for the user.
 
 - **confirmNewPassword (`String 64`)**
The new password for the user, once again. This field should be identical to the previous field.

___
#### Returns
Returns a json {"deleted": true} upon successful update. If the current password is incorrect, a 401 will be returned (to avoid auto-logging out, make sure to create a new axios instance for this request). If the two new passwords do not match, a 409 will be returned.

___

Because our auth system checks for parity between the system-stored password and the hash stored in the JWT claims, users must log in again after changing their password in order to obtain updated JWTs, otherwise all requests will end with 401s. It is recommended that upon successful changes of password, users are redirected to the login page.