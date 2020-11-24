### List All Categories Belonging to an Organization
Endpoint: `GET /organization/{id}/category/`

Authorization: User must belong to the specified organization.

Retrieves all undeleted categories for the specified organization id.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all undeleted category objects for an organization with ID if a valid ID was supplied, otherwise returns HTTP 404 and an error.

___

#### Sample Request
`GET /organization/1/category`
<br/>


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