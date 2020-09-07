### List All Categories for an AccountType
Endpoint: `GET /accountType/{id}/category`

Retrieves a list of all existing categories for the account type with the given id. Only Income, Expense and Owner's Equity account types should have categories. Others should use AccountSubtype instead.
___

#### Request Body Parameters
None
__
#### Returns
Returns a list of all existing categories for the account type with the given valid account type id. Returns HTTP 404 and an error if the supplied account type id is invalid. Returns an empty list if the given account type has no existing categories.
___


#### Sample Request
`GET /accountType/5/category`
<br/>

#### Sample Response
```json
[
    {
        "categoryId": 2,
        "categoryName": "Dining",
        "accountTypeId": 5,
        "accountTypeName": "Expenses"
    },
    {
        "categoryId": 1,
        "categoryName": "Grocery",
        "accountTypeId": 5,
        "accountTypeName": "Expenses"
    }
]
```