### Retrieve a CategoryBalance
Endpoint: `GET /category/{id}/categoryBalance`

Authorization: User must belong to the organization that owns the specified category.

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
    "categoryName": "Job #1",
    "accountId": 6,
    "accountName": "Personal Income",
    "accountTypeId": 4,
    "accountTypeName": "Income",
    "debitTotal": 0,
    "creditTotal": 0
}
```