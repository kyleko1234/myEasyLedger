### Update an organization
Endpoint: `PUT /organization/{id}`

Authorization: Requesting user must have ADMIN permissions for this organization.

Updates an organization with the values of the parameters passed. Only organization name can be updated. At this time the API will ignore attempts to update Currency and isEnterprise fields. ALL fields will be updated, so please send a complete object in the request body.
___

#### Request Body Parameters
- **id (`Long`)** <br/>
The id for the organization you intend to update.

- **name (`String` 50)** <br/>
The name of this organization.

- **fiscalYearBegin (`LocalDate`)** <br/>
The date that the fiscal year for this organization begins, in yyyymmdd. The year portion of this date is not likely to be important but it is recommended to use a leap year for this date.

- **lockInitialAccountValues(`boolean`)**<br/>
If true, the initial debit and credit amounts of the accounts this organization owns may not be modified after the account contains line-items. Defaults to true.

- **lockJournalEntriesBefore(`LocalDate`)**<br/>
Journal entries belonging to this organization dated before this date cannot be edited. Defaults to "null".

___
#### Returns
Returns HTTP 201 and the updated organization object upon successful update. Returns HTTP 409 and an error if id in request body does not match id in URI. Returns HTTP 404 and an error if the specified id does not exist in the database.
___
#### Sample Request
`PUT /organization/1`

Body: 

```json
{
    "id": 1,
    "name": "Sample organization2",
	"fiscalYearBegin": "2020-01-01",
	"lockInitialAccountValues": false,
    "lockJournalEntriesBefore": "2020-01-01"

}
```
<br/>
<br/>

#### Sample Response
```json
{
    "id": 1,
    "name": "Sample organization",
    "currency": "USD",
    "isEnterprise": true,
    "fiscalYearBegin": "2020-01-01",
    "lockInitialAccountValues": false,
    "lockJournalEntriesBefore": "2020-01-01"
}
```

