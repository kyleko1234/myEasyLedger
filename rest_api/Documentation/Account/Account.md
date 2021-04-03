## Account
Accounts represent a single account from a Chart of Accounts. A user can and usually will have many accounts. Accounts are affected by LineItems and owned by Organizations. 

The user can configure up to two levels of accounts - that is, an account may have a parent account or it may have child accounts, not both. An account may have many child accounts, but those child accounts may not have their own child accounts. If an account has no parent account it must be designated an AccountSubtype.
LineItems can only be written to accounts without child accounts. Accounts with LineItems written to them may not contain child accounts. Accounts with children may not be deleted until their child accounts are deleted or moved to another account.

The API allows you to create, retrieve, update, and delete accounts, as well as retrieve a list of all accounts. 
___
### Contents
- [[The Account Object]]
- [[Create an Account]]
- [[Retrieve an Account]]
- [[Update an Account]]
- [[Delete an Account]]
- [[List All Accounts]]
- [[List All Accounts Belonging to an Organization]]
- [[Find All Account Balances for an Organization For a Certain Date Range]]
