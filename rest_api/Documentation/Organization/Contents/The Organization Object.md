### The Organization Object
___
#### Attributes
- **id (`Long`)**
A unique identifier for this object.

- **name (`String` 64)**
The name of this organization.

- **currency (`string` 64)**<br/>
The currency that this organization does business in. Should not be changed after creation. A list of supported currencies is provided [[Easy Ledger#Currently supported currencies|here]]

- **isEnterprise (`boolean`)**<br/>
True if this organization uses double-entry accounting, false if not. Should not be changed after creation.

- **fiscalYearBegin(`LocalDate`)**<br/>
The beginning date of the fiscal year for this organization. The year is generally not important but it is recommended that the year be set to a leap year such as 2020. Format 'yyyymmdd'.

- **lockInitialAccountValues(`boolean`)**<br/>
If true, the initial debit and credit amounts of the accounts this organization owns may not be modified after the account contains line-items. Defaults to true.

- **lockJournalEntriesBefore(`LocalDate`)**<br/>
Journal entries belonging to this organization dated before this date cannot be edited. Defaults to "null".

___
#### Sample Object
```json
{
    "id": 1,
    "name": "Sample organization",
    "currency": "USD",
    "isEnterprise": true,
	"fiscalYearBegin": "2020-01-01"
}
```


