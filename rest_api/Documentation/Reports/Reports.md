## Reports

The API allows you to automatically generate reports to use.

## Report formatting
### Income Statement Format

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
## Endpoints
- [[Generate a Balance Sheet]]
- [[Generate an Income Statement]]
- [[Generate a Cash Flow Statement]]
- [[Generate an Account Transactions Report]]
- [[Generate an Expense Report by Vendor]]
- [[Generate an Income Report by Customer]]