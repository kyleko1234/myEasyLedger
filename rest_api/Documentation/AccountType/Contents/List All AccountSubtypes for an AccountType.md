### List all AccountSubtypes for an AccountType
Endpoint: `GET /accountType/{id}/accountSubtype`

Retrieves a list of all existing account subtypes for the account type with the given id. In most cases, only asset and liability account types will have subtypes.
___

#### Request Body Parameters
None
____
#### Returns
Returns a list of all existing account subtypes for the account type with the given valid account type id. Returns HTTP 404 and an error if the supplied account type id is invalid. Returns an empty list if the given account type has no existing subtypes.
____


#### Sample Request
`GET /accountType/1/accountSubtype`
<br/>

#### Sample Response
```json
[
    {
        "accountSubtypeId": 5,
        "accountSubtypeName": "Investment Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets"
    },
    {
        "accountSubtypeId": 2,
        "accountSubtypeName": "Checking Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets"
    },
    {
        "accountSubtypeId": 3,
        "accountSubtypeName": "Savings Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets"
    },
    {
        "accountSubtypeId": 4,
        "accountSubtypeName": "Mobile Payment Account",
        "accountTypeId": 1,
        "accountTypeName": "Assets"
    },
    {
        "accountSubtypeId": 1,
        "accountSubtypeName": "Cash",
        "accountTypeId": 1,
        "accountTypeName": "Assets"
    }
]
```