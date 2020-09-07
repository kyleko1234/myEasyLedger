### Retrieve a category
Endpoint: `GET /category/{id}`

Retrieves a category using the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an category object if a valid ID was supplied, otherwise returns HTTP 404 and an error.

___

#### Sample Request
`GET /category/1`
<br/>

#### Sample Response
```json
{
    "categoryId": 1,
    "categoryName": "Grocery",
    "accountTypeId": 5,
    "accountTypeName": "Expenses",
    "organizationId": 1,
    "organizationName": "Sample organization"
}
```