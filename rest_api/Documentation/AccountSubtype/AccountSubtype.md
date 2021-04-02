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
___
### Contents
- [[The AccountSubtype Object]]
- [[Retrieve an AccountSubtype]]
- [[List All AccountSubtypes]]
- [[List All AccountSubtype Balances for an Organization]]