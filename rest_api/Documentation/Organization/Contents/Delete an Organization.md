### Delete an organization
Endpoint: `DELETE /organization/{organizationId}`

Authorization: User must own the organization that is to be deleted..

Deletes the organization specified in path parameters. **This is a hard-delete and will cascade down to hard-delete all entities the organization owns: JournalEntries, LineItems, Accounts, Permissions.** This endpoint does NOT change the currentOrganizationId of the Persons in this Organization, therefore Person.currentOrganizationId **cannot be guaranteed to point to an organization that exists**. All JournalEntries in this Organization must be soft-deleted before the Organization can be deleted.
___
#### Returns
On successful delete, returns the following JSON.
```json
{
	"deleted": true
}
```
Returns HTTP 409 and an error if the organization contains undeleted JournalEntries.
___

