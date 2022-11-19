## AccountSubtype


AccountSubtypes represent subgroups of each AccountType. These are hardcoded into the server for the purposes of generating accurate reports. Each AccountGroup must belong to exactly one AccountSubtype. **For the purposes of generating cash flow statements,  "Other current/noncurrent assets/liabilities" are treated as operating assets and liabilities. "Other equity" is treated as a cash adjustment when calculating cash flows.**

The account subtypes are provided as follows:

```
ASSETS
   1 Cash and cash equivalents
   2 Current marketable securities 
   3 Current receivables 
   4 Inventory 
   5 Other current assets
   6 Non-current marketable securities
   7 Non-current receivables 
   8 Property, plant, and equipment 
   9 Intangible assets and goodwill
   10 Other non-current assets
LIABILITIES
   11 Current payables 
   12 Dividends and equivalents payable 
   13 Deferred revenue 
   14 Short-term debt 
   15 Deferred tax 
   16 Other current liabilities
   17 Long-term debt 
   18 Non-current payables 
   19 Other non-current liabilities
EQUITY
   20 Paid-in capital 
   21 Share-based compensation
   22 Dividends and equivalents 
   23 Other equity items
INCOME
   24 Revenue
   25 Income from investing activities
   26 Income from financing activities
   36 Interest income
EXPENSES
   27 Cost of sales
   28 Research and development
   29 Selling, general, and administration
   30 Depreciation and Amortization 
   31 Expense from investing activities
   32 Expense from financing activities
   33 Interest expense 
   34 Tax expense 
   35 Non-recurring and extraordinary items
```

| id          | name                                  | account_type_id | income_statement_format_position_id | cash_flow_format_position_id | balance_sheet_format_position_id | cash_item                               | relevant_to_taxes_paid | relevant_to_interest_paid | relevant_to_dividends_paid | relevant_to_depreciation_amortization |
|-------------|---------------------------------------|-----------------|-------------------------------------|------------------------------|----------------------------------|-----------------------------------------|------------------------|---------------------------|----------------------------|--------------------------|
| ASSETS      |                                       |                 |                                     |                              |                                  |                                         |                        |                           |                            |                          |
|           1 | Cash and cash equivalents             |               1 |                                   1 |                            5 |                                2 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|           2 | Current marketable securities         |               1 |                                   1 |                            3 |                                2 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|           3 | Current receivables                   |               1 |                                   1 |                            2 |                                2 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|           4 | Inventory                             |               1 |                                   1 |                            2 |                                2 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|           5 | Other current assets                  |               1 |                                   1 |                            2 |                                2 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|           6 | Non-current marketable securities     |               1 |                                   1 |                            3 |                                3 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|           7 | Non-current receivables               |               1 |                                   1 |                            2 |                                3 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|           8 | Property, plant, and equipment        |               1 |                                   1 |                            3 |                                3 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           TRUE           |
|           9 | Intangible assets and goodwill        |               1 |                                   1 |                            3 |                                3 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           TRUE           |
|          10 | Other non-current assets              |               1 |                                   1 |                            2 |                                3 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
| LIABILITIES |                                       |                 |                                     |                              |                                  |                                         |                        |                           |                            |                          |
|          11 | Current payables                      |               2 |                                   1 |                            2 |                                4 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          12 | Dividends and equivalents payable     |               2 |                                   1 |                            4 |                                4 |                  FALSE                  |          FALSE         |           FALSE           |            TRUE            |           FALSE          |
|          37 | Interest payable                      |               2 |                                   1 |                            2 |                                4 |                  FALSE                  |          FALSE         |            TRUE           |            FALSE           |           FALSE          |
|          38 | Taxes Payable                         |               2 |                                   1 |                            2 |                                4 |                  FALSE                  |          TRUE          |           FALSE           |            FALSE           |           FALSE          |
|          13 | Deferred revenue                      |               2 |                                   1 |                            2 |                                4 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          14 | Short-term debt                       |               2 |                                   1 |                            4 |                                4 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          15 | Deferred tax                          |               2 |                                   1 |                            2 |                                4 |                  FALSE                  |          TRUE          |           FALSE           |            FALSE           |           FALSE          |
|          16 | Other current liabilities             |               2 |                                   1 |                            2 |                                4 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          17 | Long-term debt                        |               2 |                                   1 |                            4 |                                5 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          18 | Non-current payables                  |               2 |                                   1 |                            2 |                                5 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          19 | Other non-current liabilities         |               2 |                                   1 |                            2 |                                5 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
| EQUITY      |                                       |                 |                                     |                              |                                  |                                         |                        |                           |                            |                          |
|          20 | Paid-in capital                       |               3 |                                   1 |                            4 |                                6 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          21 | Share-based compensation              |               3 |                                   1 |                            2 |                                7 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          22 | Dividends and equivalents             |               3 |                                   1 |                            4 |                                8 |                  FALSE                  |          FALSE         |           FALSE           |            TRUE            |           FALSE          |
|          23 | Other equity items                    |               3 |                                   1 |                            4 |                                9 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
| INCOME      |                                       |                 |                                     |                              |                                  |                                         |                        |                           |                            |                          |
|          24 | Revenue                               |               4 |                                   2 |                            2 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          25 | Income from investing activities      |               4 |                                   5 |                            3 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          26 | Income from financing activities      |               4 |                                   6 |                            4 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          36 | Interest income                       |               4 |                                   7 |                            2 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          39 | Non-recurring and extraordinary items |               4 |                                  10 |                            2 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
| EXPENSES    |                                       |                 |                                     |                              |                                  |                                         |                        |                           |                            |                          |
|          27 | Cost of sales                         |               5 |                                   3 |                            2 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          28 | Research and development              |               5 |                                   4 |                            2 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          29 | Selling, general, and administration  |               5 |                                   4 |                            2 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          30 | Depreciation and Amortization         |               5 |                                   4 |                            2 |                                1 |                  FALSE                  |          FALSE         |           FALSE           |            FALSE           |           TRUE           |
|          31 | Expense from investing activities     |               5 |                                   5 |                            3 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          32 | Expense from financing activities     |               5 |                                   6 |                            4 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
|          33 | Interest expense                      |               5 |                                   8 |                            2 |                                1 |                   TRUE                  |          FALSE         |            TRUE           |            FALSE           |           FALSE          |
|          34 | Tax expense                           |               5 |                                   9 |                            2 |                                1 |                   TRUE                  |          TRUE          |           FALSE           |            FALSE           |           FALSE          |
|          35 | Non-recurring and extraordinary items |               5 |                                  10 |                            2 |                                1 |                   TRUE                  |          FALSE         |           FALSE           |            FALSE           |           FALSE          |
___
### Contents
- [[The AccountSubtype Object]]
- [[Retrieve an AccountSubtype]]
- [[List All AccountSubtypes]]
- [[List All AccountSubtype Balances for an Organization]]