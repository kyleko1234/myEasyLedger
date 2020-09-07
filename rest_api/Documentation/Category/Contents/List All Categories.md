### List all categories
Endpoint: `GET /category`

Returns a list of all categories in the database.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all categories in the database.
___
#### Sample Request
`GET /category`
<br/>

#### Sample Response
```json
[
    {
        "categoryId": 1,
        "categoryName": "Grocery",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 2,
        "categoryName": "Dining",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
	...
]
```
 
