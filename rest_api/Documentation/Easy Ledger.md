# Easy Ledger API Documentation
___

### Objects
- [[Person]]
- [[JournalEntry]]
- [[LineItem]]
- [[Organization]]
- [[Account]]
- [[AccountType]]
- [[AccountSubtype]]
- [[Category]]
___
### List of Endpoints
- [[List All Persons|GET /person]]
- [[Retrieve a Person|GET /person/{id}]]
- [[Create a Person|POST /person]]
- [[Update a Person|PATCH /person/{id}]]
- [[Delete a Person|DELETE /person/{id}]]
<br/> <br/>
- [[List All JournalEntries|GET /journalEntry]]
- [[List All JournalEntries as JournalEntryViewModels|GET /journalEntryViewModel]]
- [[Update a JournalEntry|PUT /journalEntry/{id}]]
- [[Create a JournalEntry|POST /journalEntry]]
- [[Delete a JournalEntry| DELETE /entry/{id}]]
<br/><br/>
- [[List All LineItems| GET /lineItem]]
- [[Retrieve a LineItem|GET /lineItem/{id}]]
<br/><br/>
- [[List All Organizations|GET /organization]]
- [[Retrieve an Organization|GET /organization/{id}]]
- [[List All JournalEntries for an Organization|GET    /organization/{id}/entry]]
- [[List All Persons in an Organization|GET /organization/{id}/person]]
- [[Create an Organization|POST /organization]]
- [[Update an Organization| PUT /organization/{id}]]
- [[Delete an Organization|DELETE /organization/{id}]]
<br/><br/>
- [[List All Accounts|GET /account]]
- [[Retrieve an Account| GET /account/{id}]]
- [[Update an Account|PUT /account/{id}]]
- [[Create an Account|POST /account]]
- [[Delete an Account|DELETE /account/{id}]]
<br/><br/>
- [[List All AccountTypes|GET /accountType]]
- [[Retrieve an AccountType|GET /accountType/{id}]]
- [[List All Categories for an AccountType| GET /accountType/{id}/category]]
- [[List All AccountSubtypes for an AccountType| GET /accountType/{id}/accountSubtype]]
<br/><br/>
- [[List All AccountSubtypes|GET /accountSubtype]]
- [[Retrieve an AccountSubtype|GET /accountSubtype/{id}]]
- [[Create an AccountSubtype| POST /accountSubtype]]
- [[Update an AccountSubtype|PUT /accountSubtype/{id}]]
- [[Delete an AccountSubtype| DELETE /accountSubtype/{id}]]
<br/><br/>
- [[List All Categories|GET /category]]
- [[Retrieve a Category|GET /category/{id}]]
- [[Create a Category|POST /category]]
- [[Update a Category|PUT /category/{id}]]
- [[Delete a Category|DELETE /category/{id}]]







