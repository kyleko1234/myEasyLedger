### Update a category
Endpoint: `PUT /category/{id}`

Updates a category with the values of the parameters passed. All parameters must be passed in order to update the object. Any parameters not passed are set to null.
___

#### Request Body Parameters
- **categoryId (`Long`)**<br/>
The id of the category that is to be updated.

- **categoryName (`String` 40)**<br/>
The name of this category.

- **accountTypeId (`Long`)**<br/>
The id of the type that this account subtype belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this account subtype belongs to.

___
#### Returns
Returns the updated category object upon successful update. Returns HTTP 409 and an error if the id in the URI does not match the id in the request body. Returns HTTP 404 and an error if an AccountType does not exist in the database for the specified accountTypeId, or if a Category does not exist for the provided categoryId.
___


#### Sample Request
`PUT /category/1`

Body:
```json
{
    "categoryId": 1,
    "categoryName": "Food components",
    "accountTypeId": 5,
	"organizationId": 1
}
```
<br/><br/>

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
