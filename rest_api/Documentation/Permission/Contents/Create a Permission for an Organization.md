### Create a Permission for an Organization
Endpoint: `POST /organization/{organizationId}/permission`

Creates a permission object for the organization with the given organizationId; i.e. adds a person to the organization.

Authorization: Requesting user must have OWN permissions to this organization to add an ADMIN. The requesting user must have ADMIN permissions to add a VIEW or EDIT user.

___
#### Request Body Parameters
- **email (`String` 64)** <br/>
The email address for the person to be added to the organization. 
- **permissionTypeId(`Long`)** <br/>
The level of permission that the new member of the organization should have. See [[Permission#Permission Types]]

___
#### Returned Object
  

{

"email": "testperson@gmail.com",

"permissionTypeId": 2

}

#### Returns
Returns a PersonInRosterDTO for the user that has been successfully added to the organization.

___
#### Sample Request
`POST /organization/1/permission`

```json
{
    "email": "testperson@gmail.com",
    "permissionTypeId": 2
}
```

#### Sample Response
```json
{
    "personId": 2,
    "firstName": "test",
    "lastName": "person",
    "email": "testperson@gmail.com",
    "permissionTypeId": 2,
    "permissionTypeName": "EDIT",
    "permissionId": 2
}
```