### Retrieve an Entry
Endpoint: `GET /entry/{id}`

Retrieves an existing entry using the supplied id.
___
#### Request Body Parameters
None.
___ 
#### Returns
Returns HTTP 200 and an entry object if a valid id was supplied, otherwise returns an HTTP 404 error.
___
#### Sample Request
`GET /entry/1`
<br />

#### Sample Response
```json
{
   "entryId": 7,
   "entryDate": "2020-04-22",
   "description": "cheese shopping at whole foods",
   "personId": 1,
   "organizationId": 1,
   "lineItems": [
       {
           "accountId": 5,
           "accountName": "Personal Expenses",
           "accountSubtypeId": null,
           "accountSubtypeName": null,
           "accountTypeId": 5,
           "accountTypeName": "Expenses",
           "amount": 20.00,
           "categoryId": 2,
           "categoryName": "Dining",
           "description": "bought lunch at whole foods",
           "entryId": 7,
           "isCredit": false,
           "lineItemId": 17
       },
       {
           "accountId": 5,
           "accountName": "Personal Expenses",
           "accountSubtypeId": null,
           "accountSubtypeName": null,
           "accountTypeId": 5,
           "accountTypeName": "Expenses",
           "amount": 20.00,
           "categoryId": 1,
           "categoryName": "Grocery",
           "description": "cheese",
           "entryId": 7,
           "isCredit": false,
           "lineItemId": 16
       },
       {
           "accountId": 1,
           "accountName": "Cash",
           "accountSubtypeId": 1,
           "accountSubtypeName": "Cash",
           "accountTypeId": 1,
           "accountTypeName": "Assets",
           "amount": 40.00,
           "categoryId": null,
           "categoryName": null,
           "description": "whole foods drained my whole wallet",
           "entryId": 7,
           "isCredit": true,
           "lineItemId": 15
       }
   ]
}
```