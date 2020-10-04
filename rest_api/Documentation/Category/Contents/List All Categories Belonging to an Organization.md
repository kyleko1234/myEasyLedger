### List All Categories Belonging to an Organization
Endpoint: GET /organization/{id}/category

Returns a list of all undeleted categories that belong to the organization with the given id, ordered by category name.
___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all categories belonging to the specified organization, or 404 and an error if the given organization does not exist. 
___
#### Sample Request
`GET /organization/{id}/category`
<br/>

#### Sample Response
```json
[
    {
        "categoryId": 2,
        "categoryName": "Dining",
        "accountId": 5,
        "accountName": "Personal Expenses",
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
    },
    {
        "categoryId": 1,
        "categoryName": "Grocery",
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
        "categoryId": 5,
        "categoryName": "Revenue from operations",
        "accountId": 8,
        "accountName": "Business Income",
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
        "categoryId": 6,
        "categoryName": "Utilities",
        "accountId": 8,
        "accountName": "Business Income",
        "deleted": false
    }
]
```