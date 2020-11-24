### Create a category
`Endpoint: POST /category`

Authorization: User must belong to the organization that owns the account that this category belongs to. 

Creates a category with the values of the parameters passed.
___

#### Request Body Parameters
- **categoryName (`String` 40)** <br/>
The name of this category.

- **accountId (`Long`)** <br/>
The id of the account that this category belongs to.

___
#### Returns
Returns HTTP 201 and the created category object upon successful creation. Returns HTTP 409 and an error upon an attempt to manually set a category’s id. Returns HTTP 404 and an error if an AccountType does not exist in the database for the specified accountTypeId.

___

#### Sample Request
`POST /category`

Body:

```json
{
    "categoryName": "Grocery",
    "accountId": 5,
}
```


Sample Response
```json
{
    "categoryId": 1,
    "categoryName": "Grocery",
    "accountId": 5,
    "accountName": "Personal Expenses",
    "deleted": false
}
```
