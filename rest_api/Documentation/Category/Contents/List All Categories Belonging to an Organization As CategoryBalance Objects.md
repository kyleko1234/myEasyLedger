### List All Categories Belonging to an Organization As CategoryBalance Objects
Endpoint: `GET /organization/{id}/categoryBalance/`

Authorization: User must belong to the specified organization.

Retrieves all undeleted categories for the specified organization id as CategoryBalance objects. CategoryBalance objects are Category objects, but additionally contain totals of all credit and debit line-items within the category. The returned list of CategoryBalance objects is ordered alphabetically.
___

#### Request Body Parameters
None
___
#### Returns
Returns a list of all undeleted Categories as CategoryBalance objects for an organization with ID if a valid ID was supplied, otherwise returns HTTP 404 and an error.

___

#### Sample Request
`GET /organization/1/categoryBalance`
<br/>


```json
[
    {
        "categoryId": 2,
        "categoryName": "Dining",
        "accountId": 5,
        "accountTypeId": 5,
        "debitTotal": 1040.111,
        "creditTotal": 10.00
    },
    {
        "categoryId": 7,
        "categoryName": "Dividends",
        "accountId": 8,
        "accountTypeId": 4,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 8,
        "categoryName": "Employee Salary",
        "accountId": 7,
        "accountTypeId": 5,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 1,
        "categoryName": "Grocery",
        "accountId": 5,
        "accountTypeId": 5,
        "debitTotal": 60.00,
        "creditTotal": 1000.111
    },
    {
        "categoryId": 3,
        "categoryName": "Rent",
        "accountId": 7,
        "accountTypeId": 5,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 5,
        "categoryName": "Revenue from operations",
        "accountId": 8,
        "accountTypeId": 4,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 4,
        "categoryName": "Supplies and Equipment",
        "accountId": 7,
        "accountTypeId": 5,
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 6,
        "categoryName": "Utilities",
        "accountId": 8,
        "accountTypeId": 4,
        "debitTotal": 0,
        "creditTotal": 0
    }
]
```