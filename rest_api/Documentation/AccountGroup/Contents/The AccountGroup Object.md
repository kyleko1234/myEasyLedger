### The AccountGroup Object
___

#### Attributes
- **accountGroupId (`Long`)** <br/>
The unique identifier for this object.

- **accountGroupName (`String` 64)**<br/>
The name of this account group.

- **accountSubtypeId (`Long`)** <br/>
The id of the account subtype that this account group belongs to.

- **accountSubtypeName (`String` 64)**<br/>
The name of the account subtype that this account group belongs to.

- **accountTypeId (`Long`)**<br/>
The id of the account type that this account group belongs to.

- **accountTypeName (`String` 64)**<br/>
The name of the account type that this account group belongs to.

- **organizationId(`Long`)**<br/>
The id of the organization that this account group belongs to.

- **organizationName (`String` 50)**<br/>
The name of the organization that this account group belongs to.

- **deleted (`boolean`) ** <br/>
Whether or not this account group has been deleted.
___

#### Sample Object
```json
{
    "accountGroupId": 1,
    "accountGroupName": "Cash",
    "accountSubtypeId": 1,
    "accountSubtypeName": "Cash and cash equivalents",
    "accountTypeId": 1,
    "accountTypeName": "Assets",
    "organizationId": 1,
    "organizationName": "Sample organization",
    "deleted": false
}
```




