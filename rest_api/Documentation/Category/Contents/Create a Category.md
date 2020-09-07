### Create a category
`Endpoint: POST /category`

Creates a category with the values of the parameters passed.
___

#### Request Body Parameters
- **categoryName (`String` 40)** <br/>
The name of this category.

- **accountTypeId (`Long`)** <br/>
The id of the account type that this category belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this category belongs to.

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
    "accountTypeId": 5,
	"organizationId": 1
}
```


Sample Response
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
