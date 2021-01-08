### Retrieve an account subtype
Endpoint: `GET /accountSubtype/{id}`

Retrieves an account type using the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an AccountSubtype object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___


#### Sample Request
	GET /accountSubtype/1
<br/>

#### Sample Response
```json
{
    "id": 1,
    "name": "Cash and cash equivalents",
    "accountType": {
        "id": 1,
        "name": "Assets"
    }
}
```
