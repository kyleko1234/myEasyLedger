### List all categories
Endpoint: `GET /category`

Returns a list of all categories in the database.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all categories in the database.
___
#### Sample Request
`GET /category`
<br/>

#### Sample Response
```json
[
    {
        "categoryId": 1,
        "categoryName": "Grocery",
        "accountId": 5,
        "accountName": "Personal Expenses",
        "deleted": false
    },
    {
        "categoryId": 2,
        "categoryName": "Dining",
        "accountId": 5,
        "accountName": "Personal Expenses",
        "deleted": false
    },
    {
        "categoryId": 3,
        "categoryName": "Rent",
        "accountId": 7,
        "accountName": "Business Expenses",
        "deleted": false
    },
    {
        "categoryId": 4,
        "categoryName": "Supplies and Equipment",
        "accountId": 7,
        "accountName": "Business Expenses",
        "deleted": false
    },
    {
        "categoryId": 5,
        "categoryName": "Revenue from operations",
        "accountId": 8,
        "accountName": "Business Income",
        "deleted": false
    },
    {
        "categoryId": 6,
        "categoryName": "Utilities",
        "accountId": 8,
        "accountName": "Business Income",
        "deleted": false
    },
    {
        "categoryId": 7,
        "categoryName": "Dividends",
        "accountId": 8,
        "accountName": "Business Income",
        "deleted": false
    },
    {
        "categoryId": 8,
        "categoryName": "Employee Salary",
        "accountId": 7,
        "accountName": "Business Expenses",
        "deleted": false
    }
]
```
 
