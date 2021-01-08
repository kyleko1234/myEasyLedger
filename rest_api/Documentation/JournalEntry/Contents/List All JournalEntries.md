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
		"journalEntryDate": "2020-11-01",
		"description": "Issued 20,000 shares of common stock at $20 per share",
		"personId": 1,
		"organizationId": 1,
		"lineItems": [
			{
				"accountId": 1,
				"accountName": "Cash",
				"accountGroupId": 1,
				"accountGroupName": "Cash",
				"accountSubtypeId": 1,
				"accountSubtypeName": "Cash and cash equivalents",
				"accountTypeId": 1,
				"accountTypeName": "Assets",
				"amount": 400000,
				"description": "Cash influx from initial offering",
				"journalEntryId": 1,
				"journalEntryDate": "2020-11-01",
				"isCredit": false,
				"lineItemId": 1
			},
			{
				"accountId": 9,
				"accountName": "Capital stock",
				"accountGroupId": 6,
				"accountGroupName": "Paid-in Capital",
				"accountSubtypeId": 19,
				"accountSubtypeName": "Paid-in capital",
				"accountTypeId": 3,
				"accountTypeName": "Owner's Equity",
				"amount": 400000,
				"description": "Issued 20000 shares of common at 20 per",
				"journalEntryId": 1,
				"journalEntryDate": "2020-11-01",
				"isCredit": true,
				"lineItemId": 2
			}
		],
		"deleted": false
	},
	...
]
```
