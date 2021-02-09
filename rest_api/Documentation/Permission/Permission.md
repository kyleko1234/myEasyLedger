## Permission
Permission objects represent a relationship between Persons and Organizations. A person may have View, Edit, Admin, and Own permissions for any given organization. The Permission Object has the following fields:

- **id (`Long`)** <br/>
A unique identifier for this person-organization-permissionType relation.

- **organization (`Organization`)**<br/>
An organization object representing the organization that this permission object is linked to. See [[The Organization Object]]
- **permissionType(`PermissionType`)**<br/>
The type of permission that the person has with the organization.

Permission objects can be thought of as belonging to Person objects, and can be found in the `permissions` field of [[The Person Object]].


The four permission levels are represented by PermissionType objects, which have the following fields: 
- id
- name

The possible permission levels are as follows: 

|id|name|
|--|------|
|1|VIEW|
|2|EDIT|
|3|ADMIN|
|4|OWN|

Each successive permission type includes the privileges of the types before it. A VIEW permissionType means that a person may view data for this organization, but not edit. An EDIT permissionType means that a person may view and edit data for this organization. An ADMIN permissionType allows a user to add and remove users with lower permissions from the organization, and change permissions of Viewers and Editors. An OWN permissionType allows this user to add and remove admins, as well as freely change the permissionTypes of all users in the organization. By default, the creator of an organization is given the OWN permissionType for the newly created organization. 