## Reports

The API allows you to automatically generate reports to use.

## Report formatting
We are moving in the direction of having all reports be generated for multiple date ranges using a single API call. This will return a single report DTO that represents multiple dates. Each report DTO should have a `dateRanges` field containing an array of DateRangeDTOs indicating the name, startDate, endDate, and prevPeriodEndDate of each date range.

In the report, you will often see fields labeled `amount` or `debitsMinusCredits` or `totalCurrentAssets` or similar labels containing an array of numbers. These arrays of numbers should be the same size as the `dateRanges` array. The first number in the array of number will correspond to the first date in `dateRanges`, the second number with the second date range, and so forth.  **In general, all numbers in arrays labeled `totalInsertLabelHere` are signed the way they are intended to be displayed to the user. Numbers in arrays labeled `amounts` or `debitsMinusCredits` are debits minus credits. The client may need to negate this number before displaying to the user.**

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
## Endpoints
- [[(Deprecated) Generate a Balance Sheet]]
- [[(Deprecated) Generate an Income Statement]]
- [[(Deprecated) Generate a Cash Flow Statement]]
- [[Generate an Account Transactions Report]]
- [[Generate an Expense Report by Vendor]]
- [[Generate an Income Report by Customer]]