export const API_BASE_URL = 'http://localhost:8080/v0.2';
export const ACCESS_TOKEN = 'easyLedgerAccessToken';
export const REFRESH_TOKEN = 'easyLedgerRefreshToken';

/**
 * BALANCE SHEET FORMAT
 *  ASSETS
 *      Current Assets
 *          1: Cash and cash equivalents
 *          2: Current marketable securities
 *          3: Receivables
 *          4: Inventories 
 *          5: Other current assets
 *      Non Current Assets
 *          6: Property
 *          7: Plant and equipment
 *          8: Non-current marketable securities
 *          9: Other non-current assets
 *  LIABILITIES
 *      Current Liabilities
 *          10: Payables
 *          11: Deferred revenue
 *          12: Commercial paper
 *          13: Current term debt
 *          14: Deferred tax
 *          15: Other current liabilities
 *      Non Current Liabilities
 *          16: Non-current term debt
 *          17: Other non-current liabilities
 *  SHAREHOLDER'S EQUITY
 *      18: Paid-in Capital
 *      20: Other equity items
 *      Retained Earnings
 *          Beginning Balances (21 + 22 - (23, 24, 25, 26, 27, 28, 29) - 19 up to end of previous period)
 *              Add Net Income for current period (21 + 22 - (23, 24, 25, 26, 27, 28, 29))
 *              Less 19: Dividends and equivalents for current period
 *          Ending Balances (as of specified date)
 */     
export const BALANCE_SHEET_SUBTYPE_CHART = {
    currentAssetSubtypes: [1, 2, 3, 4, 5],
    nonCurrentAssetSubtypes: [6, 7, 8, 9],
    currentLiabilitySubtypes: [10, 11, 12, 13, 14, 15],
    nonCurrentLiabilitySubtypes: [16, 17],
    equitySubtypes: [18, 20],
    dividendSubtypes: [19],
    incomeSubtypes: [21, 22],
    expenseSubtypes: [23, 24, 25, 26, 27, 28, 29]
}
