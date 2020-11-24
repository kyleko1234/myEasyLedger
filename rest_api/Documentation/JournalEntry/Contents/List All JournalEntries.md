### List all JournalEntries
Endpoint: `GET /journalEntry`

Authorization: `ROLE_ADMIN`

Returns a list of all JournalEntries. Database requests for this endpoint scale linearly with the number of entries to be returned, so it is not recommended to use this endpoint. If possible, fetch only the journalEntries you need, or use `GET /organization/{id}/journalEntry` instead.
___
#### Request Body Parameters
None
___
#### Returns
Returns a list of all journal entries in the database, ordered by first modified.
___
#### Sample Request
`GET /journalEntry`
<br/>

#### Sample Response
``` json
[
	{
		"journalEntryId": 1,
		"journalEntryDate": "2020-04-11",
		"description": "Grocery for the week",
		"personId": 1,
		"organizationId": 1,
		"lineItems": [
			{
				"accountId": 1,
				"accountName": "Personal Cash",
				"accountSubtypeId": 1,
				"accountSubtypeName": "Cash",
				"accountTypeId": 1,
				"accountTypeName": "Assets",
				"amount": 40.00,
				"categoryId": null,
				"categoryName": null,
				"description": "Cash payment for groceries",
				"journalEntryId": 1,
				"journalEntryDate": "2020-04-11",
				"isCredit": true,
				"lineItemId": 2
			},
			{
				"accountId": 5,
				"accountName": "Personal Expenses",
				"accountSubtypeId": null,
				"accountSubtypeName": null,
				"accountTypeId": 5,
				"accountTypeName": "Expenses",
				"amount": 40.00,
				"categoryId": 1,
				"categoryName": "Grocery",
				"description": "Grocery expenses",
				"journalEntryId": 1,
				"journalEntryDate": "2020-04-11",
				"isCredit": false,
				"lineItemId": 1
			}
		],
		"deleted": false
	},
	...
]
```
