### The Category Object
___
#### Attributes

- **categoryId (`Long`)**<br/>
The unique identifier for this object.

- **categoryName (`String` 40)**<br/>
The name of this category.

- **accountId (`Long`)**<br/>
The id of the account type that this category belongs to.

- **accountName (`String` 20)**<br/>
The name of the account type that this category belongs to.

- **deleted(`boolean`)**
Whether or not this category has been deleted.
___
#### Sample  Object
```json
{
    "categoryId": 1,
    "categoryName": "Grocery",
    "accountId": 5,
    "accountName": "Personal Expenses",
    "deleted": false
}
```




