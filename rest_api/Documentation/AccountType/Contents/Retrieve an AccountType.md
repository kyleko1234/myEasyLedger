### Retrieve an account type
Endpoint: `GET /accountType/{id}`

Retrieves an account type using the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an AccountType object if a valid ID was supplied, otherwise returns HTTP 404 and an error.
___


#### Sample Request
	GET /accountType/1
<br/>

#### Sample Response
```json
{
    "id": 1,
    "name": "Assets"
}
```
