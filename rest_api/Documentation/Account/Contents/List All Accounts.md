### List all accounts
Endpoint: `GET /account`

Authorization: `ROLE_ADMIN`

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
		"accountName": "Cash",
		"accountGroupId": 1,
		"accountGroupName": "Cash",
		"accountSubtypeId": 1,
		"accountSubtypeName": "Cash and cash equivalents",
		"accountTypeId": 1,
		"accountTypeName": "Assets",
		"organizationId": 1,
		"organizationName": "Sample organization",
		"deleted": false
	},
    ...
]
```