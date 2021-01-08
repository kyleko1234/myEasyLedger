### List All Accounts Belonging to an Organization
Endpoint: <br/>
- `GET /organization/{id}/account` 

Authorization: Requesting user must belong to the organization with the specified id.

Returns a list of all undeleted accounts belonging to an organization with the specified id, sorted by accountTypeId ascending and then by accountName alphabetic.

___
#### Request Body Parameters
None
___
#### Returns
Returns 200 and a list of all accounts belonging to an organization when supplied a valid id. Returns 404 and an error if the organization with the supplied id does not exist in the database.
___
#### Sample Request
`GET /organization/1/account`
<br/>

#### Sample Response
```json
[
    {
        "accountId": 2,
        "accountName": "Accounts receivable",
        "accountGroupId": 2,
        "accountGroupName": "Accounts Receivable",
        "accountSubtypeId": 3,
        "accountSubtypeName": "Receivables",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 1,
        "accountName": "Cash",
        "accountGroupId": 1,
        "accountGroupName": "Cash",
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash and cash equivalents",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 4,
        "accountName": "Office equipment",
        "accountGroupId": 4,
        "accountGroupName": "Equipment",
        "accountSubtypeId": 7,
        "accountSubtypeName": "Plant and Equipment",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 3,
        "accountName": "Office supplies",
        "accountGroupId": 3,
        "accountGroupName": "Inventories",
        "accountSubtypeId": 4,
        "accountSubtypeName": "Inventories",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 5,
        "accountName": "Vehicles",
        "accountGroupId": 4,
        "accountGroupName": "Equipment",
        "accountSubtypeId": 7,
        "accountSubtypeName": "Plant and Equipment",
        "accountTypeId": 1,
        "accountTypeName": "Assets",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 7,
        "accountName": "Accounts payable",
        "accountGroupId": 5,
        "accountGroupName": "Payables",
        "accountSubtypeId": 11,
        "accountSubtypeName": "Payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 8,
        "accountName": "Dividends payable",
        "accountGroupId": 5,
        "accountGroupName": "Payables",
        "accountSubtypeId": 11,
        "accountSubtypeName": "Payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 6,
        "accountName": "Notes payable",
        "accountGroupId": 5,
        "accountGroupName": "Payables",
        "accountSubtypeId": 11,
        "accountSubtypeName": "Payables",
        "accountTypeId": 2,
        "accountTypeName": "Liabilities",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 9,
        "accountName": "Capital stock",
        "accountGroupId": 6,
        "accountGroupName": "Paid-in Capital",
        "accountSubtypeId": 19,
        "accountSubtypeName": "Paid-in capital",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 10,
        "accountName": "Dividends",
        "accountGroupId": 7,
        "accountGroupName": "Dividends and equivalents",
        "accountSubtypeId": 20,
        "accountSubtypeName": "Dividends and equivalents",
        "accountTypeId": 3,
        "accountTypeName": "Owner's Equity",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 11,
        "accountName": "Service revenue",
        "accountGroupId": 8,
        "accountGroupName": "Revenue",
        "accountSubtypeId": 22,
        "accountSubtypeName": "Revenue",
        "accountTypeId": 4,
        "accountTypeName": "Income",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 12,
        "accountName": "Office Rent",
        "accountGroupId": 9,
        "accountGroupName": "Selling, general, and administration",
        "accountSubtypeId": 26,
        "accountSubtypeName": "Selling, general, and administration",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 13,
        "accountName": "Payroll",
        "accountGroupId": 9,
        "accountGroupName": "Selling, general, and administration",
        "accountSubtypeId": 26,
        "accountSubtypeName": "Selling, general, and administration",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    },
    {
        "accountId": 14,
        "accountName": "Utilities",
        "accountGroupId": 9,
        "accountGroupName": "Selling, general, and administration",
        "accountSubtypeId": 26,
        "accountSubtypeName": "Selling, general, and administration",
        "accountTypeId": 5,
        "accountTypeName": "Expenses",
        "organizationId": 1,
        "organizationName": "Sample organization",
        "deleted": false
    }
]
```