### Retrieve a category
Endpoint: `GET /category/{id}`

Authorization: User must belong to the organization that owns this category.

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
    "accountId": 5,
    "accountName": "Personal Expenses",
    "deleted": false
}
```