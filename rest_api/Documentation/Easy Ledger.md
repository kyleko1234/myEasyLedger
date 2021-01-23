# Easy Ledger API v0.2 Documentation
___

### Objects
- [[Person]]
- [[JournalEntry]]
- [[LineItem]]
- [[Organization]]
- [[Account]]
- [[AccountSubtype]]
- [[AccountType]]
- [[AccountGroup]]
___
### List of Endpoints

Prefix all endpoints with `http://{host}/v0.2/`
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
- [[Retrieve All LineItems for an Account Group|GET /accountGroup/{id}/lineItem]]**
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
- [[List All Accounts Belonging to an Organization as AccountBalance Objects|GET /organization/{id}/accountBalance/{endDate}]]
- [[List All Accounts Belonging to an Organization as AccountBalance Objects|GET /organization/{id}/accountBalance/{startDate}/{endDate}]]
- [[Update an Account|PUT /account/{id}]]**
- [[Create an Account|POST /account]]**
- [[Delete an Account|DELETE /account/{id}]]**
<br/><br/>
- [[List All AccountTypes|GET /accountType]]
- [[Retrieve an AccountType|GET /accountType/{id}]]
- [[Retrieve Monthly Account Type Summaries for An Organization for the Past N Months|GET /organization/{id}/accountTypeSummary/monthly/{monthsAgo}]]
<br/><br/>
- [[List All AccountSubtypes|GET /accountSubtype]]
- [[Retrieve an AccountSubtype|GET /accountSubtype/{id}]]
- [[List All AccountSubtype Balances for an Organization|GET /organization/{id}/accountSubtypeBalance]]
- [[List All AccountSubtype Balances for an Organization|GET /organization/{id}/accountSubtypeBalance/{endDate}]]
- [[List All AccountSubtype Balances for an Organization|GET /organization/{id}/accountSubtypeBalance/{startDate}/{endDate}]]
<br/><br/>
- [[List All AccountGroups|GET /accountGroup]]
- [[Retrieve an AccountGroup|GET /accountGroup/{id}]]
- [[List All AccountGroups Belonging to an Organization|GET /organization/{id}/accountGroup]]
- [[List All AccountGroups Belonging to an Organization as AccountGroupBalance Objects|GET /organization/{id}/accountGroupBalance]]
- [[List All AccountGroups Belonging to an Organization as AccountGroupBalance Objects|GET /organization/{id}/accountGroupBalance/{endDate}]]
- [[List All AccountGroups Belonging to an Organization as AccountGroupBalance Objects|GET /organization/{id}/accountGroupBalance/{startDate}/{endDate}]]
- [[Create an AccountGroup| POST /accountGroup]]
- [[Update an AccountGroup|PUT /accountGroup/{id}]]
- [[Delete an AccountGroup| DELETE /accountGroup/{id}]]
<br/><br/>






