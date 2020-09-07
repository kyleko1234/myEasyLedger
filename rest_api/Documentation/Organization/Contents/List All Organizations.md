### List all Organizations
Endpoint: `GET /organization`

Returns a list of all organizations in the database.
___

#### Request Body Parameters
None
___

#### Returns
Returns an array of all organizations in the database, ordered by first modified.
___


#### Sample Request
`GET /organization`
<br/>

#### Sample Response
```json
[
    {
        "id": 1,
        "name": "Sample organization"
    },
    ...
]
```
