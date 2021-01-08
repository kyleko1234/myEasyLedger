## Account
Accounts represent a single account from a Chart of Accounts. A user can and usually will have many accounts. Accounts are affected by LineItems and owned by Organizations. 

The account is the lowest level of division in the 'account hierarchy'; that is, an Account belongs to an AccountGroup which belongs to an AccountSubtype which belongs to an AccountType. 

An Account **must** belong to an AccountGroup. The AccountGroup connects the owning Organization to the Account.

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
- [[List All Accounts Belonging to an Organization as AccountBalance Objects]]
- [[Retrieve an AccountBalance]]
