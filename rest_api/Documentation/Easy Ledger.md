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

Prefix all endpoints with `http://{host}/v0.1/`
- [[Sign In | POST /auth/signin]]
- [[Sign Up| POST /auth/signup]]
- [[Refresh JWT|GET /auth/refresh]]
<br/><br/>
- [[List All Persons|GET /person]]
- [[Retrieve a Person|GET /person/{id}]]*
- [[Create a Person|POST /person (DEPRECATED)]]
- [[Update a Person|PATCH /person/{id}]]
<br/> <br/>
- [[List All JournalEntries|GET /journalEntry]]
- [[List All JournalEntries Belonging to an Organization as JournalEntryViewModels|GET /organization/{id}/journalEntryViewModel]]*
- [[Retrieve a JournalEntry|GET /journalEntry/{id}]] **
- [[Update a JournalEntry|PUT /journalEntry/{id}]]**
- [[Create a JournalEntry|POST /journalEntry]]**
- [[Delete a JournalEntry| DELETE /journalEntry/{id}]]**
<br/><br/>
- [[List All LineItems| GET /lineItem]]
- [[Retrieve a LineItem|GET /lineItem/{id}]]
- [[Retrieve All LineItems for an Account|GET /account/{id}/lineItem]]**
- [[Retrieve All LineItems for a Category|GET /category/{id}/lineItem]]**
- [[Retrieve All LineItems for an Account Subtype|GET /accountSubtype/{id}/lineItem]]**
<br/><br/>
- [[List All Organizations|GET /organization]]
- [[Retrieve an Organization|GET /organization/{id}]]
- [[List All Persons in an Organization|GET /organization/{id}/person]]
- [[Create an Organization|POST /organization]]
- [[Update an Organization| PUT /organization/{id}]]
<br/><br/>
- [[List All Accounts|GET /account]]
- [[Retrieve an Account| GET /account/{id}]]
- [[Retrieve an AccountBalance|GET /account/{id}/accountBalance]]
- [[List All Accounts Belonging to an Organization|GET /organization/{id}/account]]
- [[List All Accounts Belonging to an Organization as AccountBalance Objects|GET /organization/{id}/accountBalance]]
- [[List All Accounts Belonging to an Organization as AccountBalance Objects|GET /organization/{id}/accountBalance/{startDate}]]
- [[List All Accounts Belonging to an Organization as AccountBalance Objects|GET /organization/{id}/accountBalance/{startDate}/{endDate}]]
- [[Update an Account|PUT /account/{id}]]**
- [[Create an Account|POST /account]]**
- [[Delete an Account|DELETE /account/{id}]]**
<br/><br/>
- [[List All AccountTypes|GET /accountType]]
- [[Retrieve an AccountType|GET /accountType/{id}]]
<br/><br/>
- [[List All AccountSubtypes|GET /accountSubtype]]
- [[Retrieve an AccountSubtype|GET /accountSubtype/{id}]]**
- [[List All AccountSubtypes Belonging to an Organization|GET /organization/{id}/accountSubtype]]*
- [[Create an AccountSubtype| POST /accountSubtype]]**
- [[Update an AccountSubtype|PUT /accountSubtype/{id}]]**
- [[Delete an AccountSubtype| DELETE /accountSubtype/{id}]]**
<br/><br/>
- [[List All Categories|GET /category]]
- [[Retrieve a Category|GET /category/{id}]]
- [[Retrieve a CategoryBalance| GET /category/{id}/categoryBalance]]**
- [[List All Categories Belonging to an Organization|GET /organization/{id}/category]]*
- [[List All Categories Belonging to an Organization As CategoryBalance Objects| GET /organization/{id}/categoryBalance]]*
- [[List All Categories Belonging to an Organization As CategoryBalance Objects| GET /organization/{id}/categoryBalance/{startDate}/{endDate}]]
- [[Create a Category|POST /category]]**
- [[Update a Category|PUT /category/{id}]]**
- [[Delete a Category|DELETE /category/{id}]]**







