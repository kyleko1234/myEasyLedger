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
		"accountId": 10,
		"accountName": "Cash",
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
