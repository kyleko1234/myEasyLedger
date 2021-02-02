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
    },
    "zh-TW": {
        "Balance Sheet": "TRANSLATION HERE",
        "As of:": "TRANSLATION HERE",

        "Assets": "TRANSLATION HERE",
        "Current assets": "TRANSLATION HERE",
        "Total current assets": "TRANSLATION HERE",
        "Non-current assets": "TRANSLATION HERE",
        "Total non-current assets": "TRANSLATION HERE",
        "Total assets": "TRANSLATION HERE",

        "Liabilities": "TRANSLATION HERE",
        "Current liabilities": "TRANSLATION HERE",
        "Total current liabilities": "TRANSLATION HERE",
        "Non-current liabilities": "TRANSLATION HERE",
        "Total non-current liabilities": "TRANSLATION HERE",
        "Total liabilities": "TRANSLATION HERE",

        "Equity": "TRANSLATION HERE",
        "Retained Earnings": "TRANSLATION HERE",
        "Beginning balances": (prevPeriodEndDate) => {
            return `Beginning balances (up to ${prevPeriodEndDate})`;
        },
        "Net income for current period": (currPeriodStartDate, asOfDate) => {
            return `Net income for current period (from ${currPeriodStartDate} to ${asOfDate})`;
        },  
        "Dividends for current period": (currPeriodStartDate, asOfDate) => {
            return `Less dividends and equivalents for current period (from ${currPeriodStartDate} to ${asOfDate})`;
        },
        "Ending balances of retained earnings": "TRANSLATION HERE",
        "Total equity": "TRANSLATION HERE",

        //Account Subtype Names.
        "Cash and cash equivalents": "TRANSLATION HERE", 
        "Current marketable securities": "TRANSLATION HERE", 
        "Receivables": "TRANSLATION HERE", 
        "Inventories": "TRANSLATION HERE", 
        "Other current assets": "TRANSLATION HERE", 
        "Property": "TRANSLATION HERE", 
        "Plant and equipment": "TRANSLATION HERE", 
        "Non-current marketable securities": "TRANSLATION HERE", 
        "Other non-current assets": "TRANSLATION HERE", 
        "Payables": "TRANSLATION HERE", 
        "Deferred revenue": "TRANSLATION HERE", 
        "Commercial paper": "TRANSLATION HERE", 
        "Current term debt": "TRANSLATION HERE", 
        "Deferred tax": "TRANSLATION HERE", 
        "Other current liabilities": "TRANSLATION HERE", 
        "Non-current term debt": "TRANSLATION HERE", 
        "Other non-current liabilities": "TRANSLATION HERE", 
        "Paid-in capital": "TRANSLATION HERE", 
        "Dividends and equivalents": "TRANSLATION HERE", 
        "Other equity items": "TRANSLATION HERE", 
        "Revenue": "TRANSLATION HERE", 
        "Other income": "TRANSLATION HERE", 
        "Cost of sales": "TRANSLATION HERE", 
        "Research and development": "TRANSLATION HERE", 
        "Selling, general, and administration": "TRANSLATION HERE", 
        "Depreciation": "TRANSLATION HERE", 
        "Amortization": "TRANSLATION HERE", 
        "Other expenses": "TRANSLATION HERE", 
        "Income taxes": "TRANSLATION HERE", 
    }

}