### List all persons
Endpoint: `GET /person`

Authorization: `ROLE_ADMIN`

Returns a list of all persons.
___
#### Request Body Parameters
none
___

#### Returns
Returns an array of all person objects.
___
#### Sample Request
`GET /person`
<br />
#### Sample Response
``` json
[
	{
		"id": 1,
		"firstName": "Kyle",
		"lastName": "Ko",
		"email": "kyleko1234@gmail.com",
		"locale": "en-US",
		"currentOrganizationId": 1,
		"organizations": [
			{
				"id": 1,
				"name": "Sample organization",
				"currency": "USD",
				"isEnterprise": true
			}
		],
		"roles": [
			{
				"id": 1,
				"name": "ROLE_USER"
			}
		]
	},
	...
]
 ```

