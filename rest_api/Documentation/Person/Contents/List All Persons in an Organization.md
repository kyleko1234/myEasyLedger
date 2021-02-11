### List All Persons in an Organization
Endpoint: `GET /organization/{organizationId}/person`

Authorization: Requesting user must have viewing privileges for the organization.

Retrieves all persons in an organization.
___
#### Response format:

```json
[
    {
        "personId": Long,
        "firstName": String,
        "lastName": String,
        "email": String,
        "permissionTypeId": Long,
        "permissionTypeName": String
    },
	... etc
]
```

personId, firstName, lastName, email correspond to fields from [[The Person Object]].

permissionTypeId, permissionTypeName correspond to fields from [[Permission]].

This array of objects details every person in the given organization and their respective permissions for the organization.

If the requesting user does not have view permissions for the requested organization, an Unauthorized Exception will be returned. This Unauthorized Exception is returned whether or not the requested organization actually exists.