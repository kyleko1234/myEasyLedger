
This document is a work in progress.

# Getting Started
Prefix all endpoints with `{host}/v0.6.1/`. The public host is `https://myeasyledger.com:8443`. If you are using Spring Tools to run your own version of the server, your local host is likely to be `localhost:8080`.

## Authentication
Authentication in myEasyLedger is implemented using JWT. All requests must include a valid JWT in the request header except for 'sign in' and 'sign up'.

### Signing up a new user
#Endpoint `POST /auth/signup` <br/>
Request body format:
```json 
{
	firstName: String 25,
	lastName: String 25,
	email: String 255,
	reEnterEmail: String 255,
	password: String 64,
	reEnterPassword: String 64,
	agree: boolean,
	locale: String 64,
	organizationName: String 64
	currency: String 64,
	isEnterprise: boolean
}
```
For the most part, these fields directly match what one would expect from a 'create an account' form on a website. Most of these are self-explanatory, but a few clarifications should be made:
 - myEasyLedger treats `email` as the username for the user, and as such, `email` must be unique. Emails are saved as all-lowercase strings with whitespace trimmed.
 - `email` and `reEnterEmail` must match. `password` and `reEnterPassword` must match.
 - `agree` must be `true`.
 - `organizationName` is the name of the user's first ledger. In all cases, the term 'organization' on the backend corresponds with the term 'ledger' on the front end.
 - A list of supported currencies and locales is provided [[#Supported Locales and Currencies|here]].
 - `isEnterprise` should be `true` if the user's first ledger is double-entry (accrual method), or `false` if single-entry (cash method).
 - `isEnterprise` and `currency` for a ledger cannot be changed after the ledger is created.
 
This endpoint creates a new user. By default, users are disabled. Upon user creation, a verification email will be sent to the user, with instructions on how to enable the user.


A successful sign-in will return two JWT tokens: an access token and a refresh token. When making a request to the API, a client should first send the access token. If the access token is rejected due to expiry, call `GET /auth/refresh` using the refresh token to obtain new JWTs. If this is once again rejected due to expiry, the client must send another sign-in request in order to obtain fresh JWTs. If this refresh is successful, the client should re-send the original request using the refreshed access token.
___
An access token expires after one day after being issued. 

A refresh token expires one week after being issued.
___
JWT claims for this application are as follows:

- **sub** <br/>
The personId for the specific user.

- **auth** <br/>
Password hash for the user.
# Basic Object Model Types

# Reports
## Report formatting
### Custom report format positions
For the income statement, cash flow statement, and balance sheet, the user can customize where certain accounts appear in each report. The placement of an account within a report is determined by the `account.income_statement_format_position_id`, `account.cash_flow_format_position_id`, and `account.balance_sheet_format_position_id` fields. By default, an account should inherit these fields from its parent account (or from its account subtype if it has no parent account). These fields refer to the static tables below: 
#### Income statement format positions
| id | name                                  |
|----|---------------------------------------|
|  1 | None                                  |
|  2 | Revenue                               |
|  3 | Cost of sales                         |
|  4 | Operating expenses                    |
|  5 | Income/Expense from investing         |
|  6 | Income/Expense from financing         |
|  7 | Other non-operating income/expense    |
|  8 | Interest expense                      |
|  9 | Tax expense                           |
| 10 | Non-recurring and extraordinary items |
#### Cash flow statement format positions
| id | name                 |
|----|----------------------|
|  1 | None                 |
|  2 | Operating activities |
|  3 | Investing activities |
|  4 | Financing activities |
|  5 | Cash and cash equivalents |
#### Balance sheet format positions
| id | name                      |
|----|---------------------------|
|  1 | None                      |
|  2 | Current assets            |
|  3 | Non-current assets        |
|  4 | Current liabilities       |
|  5 | Non-current liabilities   |
|  6 | Paid-in capital           |
|  7 | Share-based compensation  |
|  8 | Dividends and equivalents |
|  9 | Other equity items        |

# Exhaustive List of Endpoints

# Supported Locales and Currencies
##  Locales
- "en-US": English (US)
- "zh-TW": Chinese (Traditional, Taiwan)
## Currencies
- "USD": US Dollar
- "TWD": New Taiwan Dollar