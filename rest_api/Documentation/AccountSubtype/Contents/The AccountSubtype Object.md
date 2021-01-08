### The AccountSubtype Object
___
#### Attributes
- **id (`Long`)**<br/>
The unique identifier for this object.

- **name (`String` 64)** <br/>
The name of this account subtype.

- **accountType (AccountType)** <br/>
The AccountType object for the AccountType that this AccountSubtype belongs to.

___
#### Sample Object
```json 
{
    "id": 1,
    "name": "Cash and cash equivalents",
    "accountType": {
        "id": 1,
        "name": "Assets"
    }
}
```
 



