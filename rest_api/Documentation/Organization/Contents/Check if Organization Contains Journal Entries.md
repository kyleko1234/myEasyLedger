### Check if Organization Contains Journal Entries
Endpoint: `GET /organization/{organizationId}/containsJournalEntries`

Authorization: Requesting user must belong to the requested organization.

Checks whether or not an organization contains journal entries.
___

#### Request Body Parameters
None
___

#### Returns
Returns a JSON containing one field: 'containsJournalEntries'. This field is true if the organization contains journal entries, and false if it does not. 
___

#### Sample Request
`GET /organization/1/containsJournalEntries`
<br/>

#### Sample Response
```json
{
    "containsJournalEntries": true
}
```
