# Easy Ledger API v0.5 Documentation
___

### Objects
- [[Person]]
- [[JournalEntry]]
- [[LineItem]]
- [[Organization]]
- [[Account]]
- [[AccountSubtype]]
- [[AccountType]]
___
### List of Endpoints

Prefix all endpoints with `http://{host}/v0.6/`
- [[Sign In | POST /auth/signin]]
- [[Sign Up| POST /auth/signup]]
- [[Refresh JWT|GET /auth/refresh]]
- [[Forgot Password#Requesting a Reset Password Code|POST /auth/forgotPassword]]
- [[Forgot Password#Verifying a Reset Password Code|POST /auth/verifyResetPasswordCode]]
- [[Forgot Password#Resetting a user's password|POST /auth/resetPassword]]
- [[Check For Available Email|POST /auth/checkForAvailableEmail]]
<br/><br/>
- [[Invite a Person by Email|POST /organization/{organizationId}/invitation]]
- [[Check if invitation link has already been used|GET /acceptInvitation/hasCompletedSetup/{token}]]
- [[Accept an invitation|POST /acceptInvitation/{token}]]
<br/><br/>
- [[List All Persons|GET /person]]
- [[Retrieve a Person|GET /person/{id}]]
- [[Update a Person|PATCH /person/{id}]]
- [[List All Persons in an Organization|GET /organization/{organizationId}/person]]
- [[Update a Person's Password|PATCH /person/password]]
<br/> <br/>
- [[List All JournalEntries|GET /journalEntry]]
- [[List All JournalEntries Belonging to an Organization as JournalEntryViewModels|GET /organization/{id}/journalEntryViewModel]]*
- [[Retrieve a JournalEntry|GET /journalEntry/{id}]] **
- [[Update a JournalEntry|PUT /journalEntry/{id}]]**
- [[Create a JournalEntry|POST /journalEntry]]**
- [[Delete a JournalEntry| DELETE /journalEntry/{id}]]**
- [[Access Edit History of a Journal Entry|GET /journalEntry/{id}/log]]
- [[Access Edit History of Journal Entries for an Organization|GET /journalEntry/organization/{organizationId}/log]]
<br/><br/>
- [[List All LineItems| GET /lineItem]]
- [[Retrieve a LineItem|GET /lineItem/{id}]]
- [[Retrieve All LineItems for an Account|GET /account/{id}/lineItem]]**
<br/><br/>
- [[List All Organizations|GET /organization]]
- [[Retrieve an Organization|GET /organization/{id}]]
- [[Create an Organization|POST /organization]]
- [[Update an Organization| PUT /organization/{id}]]
- [[Retrieve Monthly Net Assets for an Organization | GET /organization/{organizationId}/monthlyNetAssets/{numberOfMonths}]]
- [[Get Fiscal Year Date Range Presets for Generating Reports for Organization Up To Date | GET /organization/{organizationId}/dateRangePresetsUpToDate/{endDate}]]
- [[Delete an Organization | DELETE /organization/{organizationId}]]
<br/><br/>
- [[List All Accounts|GET /account]]
- [[Retrieve an Account| GET /account/{id}]]
- [[List All Accounts Belonging to an Organization|GET /organization/{id}/account]]
- [[Find All Account Balances for an Organization For a Certain Date Range|GET /organization/{id}/accountBalance]]
- [[Find All Account Balances for an Organization For a Certain Date Range|GET /organization/{id}/accountBalance/{endDate}]]
- [[Find All Account Balances for an Organization For a Certain Date Range|GET /organization/{id}/accountBalance/{startDate}/{endDate}]]
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
- [[Generate a Balance Sheet|GET /organization/{id}/reports/balanceSheet/{endDate}]]
- [[Generate an Income Statement|GET /organization/{id}/reports/incomeStatement/{startDate}/{endDate}]]
- [[Generate a Cash Flow Statement | GET /organization/{id}/reports/cashFlow/{startDate}/{endDate}]]
<br/><br/>
- [[Create a Permission for an Organization|POST /organization/{organizationId}/permission]]
- [[Edit a Permission Object|PATCH /permission/{permissionId}]]
- [[Delete a Permission Object|DELETE /permission/{permissionId}]]



### Currently supported locales
- "en-US"
- "zh-TW"
### Currently supported currencies
- "USD"
- "TWD"