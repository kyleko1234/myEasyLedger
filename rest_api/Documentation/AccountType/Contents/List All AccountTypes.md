### List all account types
Endpoint: `GET /accountType`

Retrieves a list of all valid account types.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all valid AccountType objects.
___
#### Sample Request
`GET /accountType/`
<br/>

#### Sample Response
```json
[
    {
        "id": 1,
        "name": "Assets"
    },
    {
        "id": 2,
        "name": "Liabilities"
    },
    {
        "id": 3,
        "name": "Owner's Equity"
    },
    {
        "id": 4,
        "name": "Income"
    },
    {
        "id": 5,
        "name": "Expenses"
    }
]
```


