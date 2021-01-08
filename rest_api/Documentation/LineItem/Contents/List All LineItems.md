### List all LineItems
Endpoint: `GET /lineItem`

Authorization: `ROLE_ADMIN`

Returns a list of all line items.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all LineItems in the database, ordered by first modified.
___


#### Sample Request
`GET /lineItem`
<br />

#### Sample Response
```json 
[
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
    ...
]
```
