### List All Categories Belonging to an Organization As CategoryBalance Objects
Endpoints:
- `GET /organization/{id}/categoryBalance/`
- `GET /organization/{id}/categoryBalance/{startDate}/{endDate}`

Authorization: User must belong to the specified organization.

Retrieves all undeleted categories for the specified organization id as CategoryBalance objects. CategoryBalance objects are Category objects, but additionally contain totals of all credit and debit line-items within the category. The returned list of CategoryBalance objects is ordered alphabetically.

Requires either zero or two date parameters. When zero parameters are given, the debitTotal and creditTotal fields of the returned CategoryBalance objects will encompass all undeleted LineItems. When two date parameters are given, the returned objects will encompass all LineItems within the given date range, inclusive.

If the two date parameters are the same, the returned objects will only encompass that date. If the startDate is later than the endDate, all CategoryBalance objects will have credit and debit totals of 0.
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
        "categoryId": 6,
        "categoryName": "Apparel",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 5,
        "categoryName": "Dining",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 40,
        "creditTotal": 10
    },
    {
        "categoryId": 9,
        "categoryName": "Education",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 10,
        "categoryName": "Entertainment",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 4,
        "categoryName": "Grocery",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 60,
        "creditTotal": 0
    },
    {
        "categoryId": 1,
        "categoryName": "Job #1",
        "accountId": 6,
        "accountName": "Personal Income",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 7,
        "categoryName": "Living",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 3,
        "categoryName": "Other",
        "accountId": 6,
        "accountName": "Personal Income",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 11,
        "categoryName": "Other",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 2,
        "categoryName": "Project #1",
        "accountId": 6,
        "accountName": "Personal Income",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "debitTotal": 0,
        "creditTotal": 0
    },
    {
        "categoryId": 8,
        "categoryName": "Transportation",
        "accountId": 7,
        "accountName": "Personal Expenses",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "debitTotal": 0,
        "creditTotal": 0
    }
]
```