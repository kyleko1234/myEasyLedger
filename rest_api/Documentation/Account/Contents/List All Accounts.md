### List all accounts
Endpoint: `GET /account`

Returns a list of all accounts in the database.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all accounts in the database.
___


#### Sample Request
`GET /account`
<br/>

#### Sample Response
```json
[
	{
		"accountId": 1,
		"accountName": "Personal Cash",
		"accountTypeId": 1,
		"accountTypeName": "Assets",
		"accountSubtypeId": 1,
		"accountSubtypeName": "Cash",
		"organizationId": 1,
		"organizationName": "Sample organization",
		"deleted": false
	},
    ...
]
```