import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL} from '../../../utils/constants';
import { PageSettings } from '../../../config/page-settings';

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

function BalanceSheetRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(true);

    const [asOfDate, setAsOfDate] = React.useState("");
    const [prevPeriodEndDate, setPrevPeriodEndDate] = React.useState("");
    const [currPeriodStartDate, setCurrPeriodStartDate] = React.useState("");
    const [balanceSheetAssets, setBalanceSheetAssets] = React.useState(null);
    const [balanceSheetLiabilities, setBalanceSheetLiabilities] = React.useState(null);
    const [balanceSheetEquity, setBalanceSheetEquity] = React.useState(null);

    const [accountGroupBalances, setAccountGroupBalances] = React.useState([]);
    const [accountBalances, setAccountBalances] = React.useState([]);
    
    const handleChangeDate = date => {
        setEndDate(date);
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
    }


    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/reports/balanceSheet/${endDate}`).then(response => {
                if (response.data) {
                    setAsOfDate(response.data.asOfDate);
                    setPrevPeriodEndDate(response.data.prevPeriodEndDate);
                    setCurrPeriodStartDate(response.data.currPeriodStartDate);
                    setBalanceSheetAssets(response.data.balanceSheetAssets);
                    setBalanceSheetLiabilities(response.data.balanceSheetLiabilities);
                    setBalanceSheetEquity(response.data.balanceSheetEquity);
                    setAccountGroupBalances(response.data.accountGroupBalances);
                    setAccountBalances(response.data.accountBalances);
                }
            }).catch(error => {
                console.log(error);
            })
            setLoading(false);
        }
        fetchData();
    }, [endDate])

    return (
        <div className="widget widget-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title width-half">Balance Sheet</h4>
                <span className="widget-header-title d-flex flex-row justify-content-end">
                         <label className="col-form-label px-2 width-125 text-right">As of: </label>
                         <input type="date" className="form-control form-control-sm align-self-center width-125" value={endDate} onChange={event => handleChangeDate(event.target.value)}/>
                </span>
            </div>
            <div className="px-2">
                {loading? "Loading..." : 
                <div>
                    <table className="table m-b-30">
                        <thead><tr><th>Assets</th></tr></thead>
                        <tbody>
                            <tr><td className="p-l-30 ">
                                <table className="table table-nested">
                                    <thead><tr><th>Current assets</th></tr></thead>
                                    <tbody>
                                        {balanceSheetAssets.currentAssetsSubtypeBalances.map(subtypeBalance => {
                                            return(
                                                <tr key={subtypeBalance.accountSubtypeId}><td className="d-flex justify-content-between p-l-30">
                                                    <div>{subtypeBalance.accountSubtypeName}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits)}</div>
                                                </td></tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot><tr><td className="d-flex justify-content-between">
                                        <div>Total current assets</div><div>{numberAsCurrency(balanceSheetAssets.totalCurrentAssets)}</div>
                                    </td></tr></tfoot>
                                </table>
                                <table className="table table-nested">
                                    <thead><tr><th>Non-current assets</th></tr></thead>
                                    <tbody>
                                        {balanceSheetAssets.nonCurrentAssetsSubtypeBalances.map(subtypeBalance => {
                                            return(
                                                <tr key={subtypeBalance.accountSubtypeId}><td className="d-flex justify-content-between p-l-30">
                                                    <div>{subtypeBalance.accountSubtypeName}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits)}</div>
                                                </td></tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot><tr><td className="d-flex justify-content-between">
                                        <div>Total non-current assets</div><div>{numberAsCurrency(balanceSheetAssets.totalNonCurrentAssets)}</div>
                                    </td></tr></tfoot>
                                </table>
                            </td></tr>
                        </tbody>
                        <tfoot><tr><td className="d-flex justify-content-between">
                            <div>Total assets</div><div>{numberAsCurrency(balanceSheetAssets.totalAssets)}</div>
                        </td></tr></tfoot>
                    </table>

                    <table className="table m-b-30">
                        <thead><tr><th>Liabilities</th></tr></thead>
                        <tbody>
                            <tr><td className="p-l-30">
                                <table className="table table-nested m-b-15">
                                    <thead><tr><th>Current liabilities</th></tr></thead>
                                    <tbody>
                                        {balanceSheetLiabilities.currentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                            return(
                                                <tr key={subtypeBalance.accountSubtypeId}><td className="d-flex justify-content-between p-l-30">
                                                    <div>{subtypeBalance.accountSubtypeName}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                                </td></tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot><tr><td className="d-flex justify-content-between">
                                        <div>Total current liabilities</div><div>{numberAsCurrency(balanceSheetLiabilities.totalCurrentLiabilities)}</div>
                                    </td></tr></tfoot>
                                </table>
                                <table className="table table-nested m-b-15">
                                    <thead><tr><th>Non-current liabilities</th></tr></thead>
                                    <tbody>
                                        {balanceSheetLiabilities.nonCurrentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                            return(
                                                <tr key={subtypeBalance.accountSubtypeId}><td className="d-flex justify-content-between p-l-30">
                                                    <div>{subtypeBalance.accountSubtypeName}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                                </td></tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot><tr><td className="d-flex justify-content-between">
                                        <div>Total non-current liabilities</div><div>{numberAsCurrency(balanceSheetLiabilities.totalNonCurrentLiabilities)}</div>
                                    </td></tr></tfoot>
                                </table>
                            </td></tr>
                        </tbody>
                        <tfoot><tr><td className="d-flex justify-content-between">
                            <div>Total liabilities</div><div>{numberAsCurrency(balanceSheetLiabilities.totalLiabilities)}</div>
                        </td></tr></tfoot>
                    </table>
                    
                    <table className="table table-nested m-b-30">
                        <thead><tr><th>Equity</th></tr></thead>
                        <tbody>
                            {balanceSheetEquity.equityItemsSubtypeBalances.map(subtypeBalance => {
                                return(
                                    <tr key={subtypeBalance.accountSubtypeId}><td className="d-flex justify-content-between p-l-30">
                                        <div>{subtypeBalance.accountSubtypeName}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                    </td></tr>
                                )
                            })}
                            <tr><td className="p-l-30 py-0">
                                <table className="table table-nested">
                                    <thead><tr><th className="px-0">Retained Earnings</th></tr></thead>
                                    <tbody>
                                        <tr><td className="p-l-30 d-flex justify-content-between">
                                            <div>{`Beginning balances (up to ${prevPeriodEndDate})`}</div><div>{numberAsCurrency(balanceSheetEquity.prevPeriodRetainedEarnings)}</div>
                                        </td></tr>
                                        <tr><td className="p-l-30 d-flex justify-content-between">
                                            <div>{`Net income for current period (from ${currPeriodStartDate} to ${asOfDate})`}</div><div>{numberAsCurrency(balanceSheetEquity.currPeriodNetIncome)}</div>
                                        </td></tr>
                                        <tr><td className="p-l-30 d-flex justify-content-between">
                                            <div>{`Less dividends and equivalents for current period (from ${currPeriodStartDate} to ${asOfDate})`}</div><div>{numberAsCurrency(balanceSheetEquity.currPeriodDividendsAndEquivalents)}</div>
                                        </td></tr>
                                    </tbody>
                                    <tfoot><tr><td className="d-flex justify-content-between p-l-0">
                                        <div>Ending balances of retained earnings</div><div>{numberAsCurrency(balanceSheetEquity.totalRetainedEarnings)}</div>
                                    </td></tr></tfoot>
                                </table>
                            </td></tr>
                        </tbody>
                        <tfoot><tr><td className="d-flex justify-content-between">
                            <div>Total equity</div><div>{numberAsCurrency(balanceSheetEquity.totalEquity)}</div>
                        </td></tr></tfoot>
                    </table>
                </div> 
                }
            </div>
        </div>


    )
}

export default BalanceSheetRender;