### The AccountSubtype Object
___

#### Attributes
- **accountSubtypeId (`Long`)** <br/>
The unique identifier for this object.

- **accountSubtypeName (`String` 40)**<br/>
The name of this account type.

- **accountTypeId (`Long`)**<br/>
The id of the account type that this subtype belongs to.

- **accountTypeName (`String` 20)**<br/>
The name of the account type that this subtype belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this subtype belongs to.

- **organizationName (`String` 50)**<br/>
The name of the organization that this subtype belongs to.
___

#### Sample Object
```json
{
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization"
}
```




