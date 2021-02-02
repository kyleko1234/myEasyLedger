export const balanceSheetRenderText = {
    "en-US": {
        "Balance Sheet": "Balance Sheet",
        "As of:": "As of:",

        "Assets": "Assets",
        "Current assets": "Current assets",
        "Total current assets": "Total current assets",
        "Non-current assets": "Non-current assets",
        "Total non-current assets": "Total non-current assets",
        "Total assets": "Total assets",

        "Liabilities": "Liabilities",
        "Current liabilities": "Current liabilities",
        "Total current liabilities": "Total current liabilities",
        "Non-current liabilities": "Non-current liabilities",
        "Total non-current liabilities": "Total non-current liabilities",
        "Total liabilities": "Total liabilities",

        "Equity": "Equity",
        "Retained Earnings": "Retained Earnings",
        "Beginning balances": (prevPeriodEndDate) => {
            return `Beginning balances (up to ${prevPeriodEndDate})`;
        },
        "Net income for current period": (currPeriodStartDate, asOfDate) => {
            return `Net income for current period (from ${currPeriodStartDate} to ${asOfDate})`;
        },  
        "Dividends for current period": (currPeriodStartDate, asOfDate) => {
            return `Less dividends and equivalents for current period (from ${currPeriodStartDate} to ${asOfDate})`;
        },
        "Ending balances of retained earnings": "Ending balances of retained earnings",
        "Total equity": "Total equity",

        //Account Subtype Names.
        "Cash and cash equivalents": "Cash and cash equivalents", 
        "Current marketable securities": "Current marketable securities", 
        "Receivables": "Receivables", 
        "Inventories": "Inventories", 
        "Other current assets": "Other current assets", 
        "Property": "Property", 
        "Plant and equipment": "Plant and equipment", 
        "Non-current marketable securities": "Non-current marketable securities", 
        "Other non-current assets": "Other non-current assets", 
        "Payables": "Payables", 
        "Deferred revenue": "Deferred revenue", 
        "Commercial paper": "Commercial paper", 
        "Current term debt": "Current term debt", 
        "Deferred tax": "Deferred tax", 
        "Other current liabilities": "Other current liabilities", 
        "Non-current term debt": "Non-current term debt", 
        "Other non-current liabilities": "Other non-current liabilities", 
        "Paid-in capital": "Paid-in capital", 
        "Dividends and equivalents": "Dividends and equivalents", 
        "Other equity items": "Other equity items", 
        "Revenue": "Revenue", 
        "Other income": "Other income", 
        "Cost of sales": "Cost of sales", 
        "Research and development": "Research and development", 
        "Selling, general, and administration": "Selling, general, and administration", 
        "Depreciation": "Depreciation", 
        "Amortization": "Amortization", 
        "Other expenses": "Other expenses", 
        "Income taxes": "Income taxes", 

    }
}