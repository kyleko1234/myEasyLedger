## Account
Accounts represent single accounts, lines of credit, expense books, etc. that a user owns. A user can and usually will have many accounts. Accounts are affected by LineItems and owned by Organizations. 

The classification system of accounts depends on the account type. For Asset, Liability, and Equity accounts, the Account object is meant to represent a real-world account, e.g. cash, checking, credit, savings, brokerage, etc. For these account types, accounts belong to one AccountSubtype, which belongs to one AccountType.

For Income and Expense accounts, the Account object is meant to represent an expense or income subdivision; that is, a representation of the aggregate of related expense or income categories. For these account types, a Category belongs to one Account, which belongs to one AccountType.

To summarize, the AccountType is the first level of organization. For Asset, Liability, and Equity account types, the AccountSubtype is the second level of organization, and the Account is the third level. For Income and Expense account types, the Account is the second level of organization, and the Category is the third level. This structure is meant to enforce the semantic and functional difference between, say, a real-life checking account, and an expense category.

The API allows you to create, retrieve, update, and delete accounts, as well as retrieve a list of all accounts. Future versions of the API will allow you to retrieve all LineItems for an account.
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
