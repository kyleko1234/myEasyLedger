### List All Categories Belonging to an Organization
Endpoint: GET /organization/{id}/category

Returns a list of all categories that belong to the organization with the given id, ordered by category name.
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
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 7,
        "categoryName": "Dividends",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 8,
        "categoryName": "Employee Salary",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 1,
        "categoryName": "Grocery",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 3,
        "categoryName": "Rent",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 5,
        "categoryName": "Revenue from operations",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 4,
        "categoryName": "Supplies and Equipment",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    },
    {
        "categoryId": 6,
        "categoryName": "Utilities",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization"
    }
]
```