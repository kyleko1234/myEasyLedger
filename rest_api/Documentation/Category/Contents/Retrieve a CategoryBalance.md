### Retrieve a CategoryBalance
Endpoint: `GET /category/{id}/categoryBalance`

Retrieves a category with balance information using the specified id.
___

#### Request Body Parameters
None
___
#### Returns
Returns an CategoryBalance object if a valid ID was supplied, otherwise returns HTTP 404 and an error.

___

#### Sample Request
`GET /category/1/categoryBalance`
<br/>

#### Sample Response
```json
{
    "categoryId": 1,
    "categoryName": "Grocery",
    "accountId": 5,
    "debitTotal": 60.00,
    "creditTotal": 1000.111
}
```