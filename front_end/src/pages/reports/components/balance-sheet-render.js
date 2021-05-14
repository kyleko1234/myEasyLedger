import React from 'react';
import axios from 'axios';
import { API_BASE_URL} from '../../../utils/constants';
import { PageSettings } from '../../../config/page-settings';
import {balanceSheetRenderText} from '../../../utils/i18n/balance-sheet-render-text.js'; 

function BalanceSheetRender() {
    const appContext = React.useContext(PageSettings);

    const today = new Date();
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [loading, setLoading] = React.useState(true);

    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const [asOfDate, setAsOfDate] = React.useState("");
    const [prevPeriodEndDate, setPrevPeriodEndDate] = React.useState("");
    const [currPeriodStartDate, setCurrPeriodStartDate] = React.useState("");
    const [balanceSheetAssets, setBalanceSheetAssets] = React.useState(null);
    const [balanceSheetLiabilities, setBalanceSheetLiabilities] = React.useState(null);
    const [balanceSheetEquity, setBalanceSheetEquity] = React.useState(null);
    

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
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/balanceSheet/${endDate}`).then(response => {
                if (response.data) {
                    setAsOfDate(response.data.asOfDate);
                    setPrevPeriodEndDate(response.data.prevPeriodEndDate);
                    setCurrPeriodStartDate(response.data.currPeriodStartDate);
                    setBalanceSheetAssets(response.data.balanceSheetAssets);
                    setBalanceSheetLiabilities(response.data.balanceSheetLiabilities);
                    setBalanceSheetEquity(response.data.balanceSheetEquity);
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
            <div className="widget-header bg-light border-bottom d-flex justify-content-between align-items-center px-3 py-1">
                <div className="font-weight-600">{balanceSheetRenderText[appContext.locale]["Balance Sheet"]}</div>
                <div className="custom-control custom-switch">
                    <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView}/>
                    <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{balanceSheetRenderText[appContext.locale]["Detailed View"]}</label>
                </div>
                <div className="d-flex">
                         <label className="col-form-label px-2 width-125 text-right">{balanceSheetRenderText[appContext.locale]["As of:"]} </label>
                         <input type="date" className="form-control form-control-sm align-self-center width-150" value={endDate} onChange={event => handleChangeDate(event.target.value)}/>
                </div>
            </div>
            <div className="px-2">
                {loading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                <div>
                    <table className="table table-striped m-t-5">
                        <thead><tr><th>{balanceSheetRenderText[appContext.locale]["Assets"]}</th></tr></thead>
                        <tbody>
                            <tr><td className="p-l-30 font-weight-600">{balanceSheetRenderText[appContext.locale]["Current assets"]}</td></tr>
                            {balanceSheetAssets.currentAssetsSubtypeBalances.map(subtypeBalance => {
                                return(
                                    <>
                                        <tr key={subtypeBalance.accountSubtypeId}>
                                            <td className="d-flex justify-content-between p-l-30">
                                                <div className="p-l-30">{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits)}</div>
                                            </td>
                                        </tr>
                                        {detailedView?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <>
                                                        <tr key={account.accountId}>
                                                            <td className="d-flex justify-content-between p-l-30">
                                                                <div className="p-l-60">{account.accountName}</div><div>{account.hasChildren? null : numberAsCurrency(account.debitsMinusCredits)}</div>
                                                            </td>
                                                        </tr>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return(
                                                                    <tr key={childAccount.accountId}>
                                                                        <td className="d-flex justify-content-between p-l-60">
                                                                            <div className="p-l-60">{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits)}</div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )
                                            })
                                        : null}
                                    </>
                                )
                            })}
                            <tr><td className="d-flex justify-content-between font-weight-600 p-l-30">
                                        <div className="p-l-60">{balanceSheetRenderText[appContext.locale]["Total current assets"]}</div><div>{numberAsCurrency(balanceSheetAssets.totalCurrentAssets)}</div>
                            </td></tr>
                            <tr><td className="p-l-30 font-weight-600">{balanceSheetRenderText[appContext.locale]["Non-current assets"]}</td></tr>
                            {balanceSheetAssets.nonCurrentAssetsSubtypeBalances.map(subtypeBalance => {
                                return(
                                    <>
                                        <tr key={subtypeBalance.accountSubtypeId}>
                                            <td className="d-flex justify-content-between p-l-30">
                                                <div className="p-l-30">{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits)}</div>
                                            </td>
                                        </tr>
                                        {detailedView?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <>
                                                        <tr key={account.accountId}>
                                                            <td className="d-flex justify-content-between p-l-30">
                                                                <div className="p-l-60">{account.accountName}</div><div>{account.hasChildren? null : numberAsCurrency(account.debitsMinusCredits)}</div>
                                                            </td>
                                                        </tr>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return(
                                                                    <tr key={childAccount.accountId}>
                                                                        <td className="d-flex justify-content-between p-l-60">
                                                                            <div className="p-l-60">{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits)}</div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )
                                            })
                                        : null}
                                    </>
                                )
                            })}
                            <tr><td className="d-flex justify-content-between font-weight-600 p-l-30">
                                <div className="p-l-60">{balanceSheetRenderText[appContext.locale]["Total non-current assets"]}</div><div>{numberAsCurrency(balanceSheetAssets.totalNonCurrentAssets)}</div>
                            </td></tr>
                        </tbody>
                        <tfoot><tr><td className="d-flex justify-content-between">
                            <div>{balanceSheetRenderText[appContext.locale]["Total assets"]}</div><div>{numberAsCurrency(balanceSheetAssets.totalAssets)}</div>
                        </td></tr></tfoot>
                    </table>

                    <hr/>

                    <table className="table table-striped">
                        <thead><tr><th>{balanceSheetRenderText[appContext.locale]["Liabilities"]}</th></tr></thead>
                        <tbody>
                            <tr><td className="p-l-30 font-weight-600">{balanceSheetRenderText[appContext.locale]["Current liabilities"]}</td></tr>
                            {balanceSheetLiabilities.currentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                return(
                                    <>
                                        <tr key={subtypeBalance.accountSubtypeId}>
                                            <td className="d-flex justify-content-between p-l-30">
                                                <div className="p-l-30">{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                            </td>
                                        </tr>
                                        {detailedView?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <>
                                                        <tr key={account.accountId}>
                                                            <td className="d-flex justify-content-between p-l-30">
                                                                <div className="p-l-60">{account.accountName}</div><div>{account.hasChildren? null : numberAsCurrency(account.debitsMinusCredits * -1)}</div>
                                                            </td>
                                                        </tr>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return(
                                                                    <tr key={childAccount.accountId}>
                                                                        <td className="d-flex justify-content-between p-l-60">
                                                                            <div className="p-l-60">{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits * -1)}</div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )
                                            })
                                        : null}

                                    </>
                                )
                            })}
                            <tr><td className="d-flex justify-content-between p-l-30 font-weight-600">
                                        <div className="p-l-60">{balanceSheetRenderText[appContext.locale]["Total current liabilities"]}</div><div>{numberAsCurrency(balanceSheetLiabilities.totalCurrentLiabilities)}</div>
                            </td></tr>
                            <tr><td className="p-l-30 font-weight-600">{balanceSheetRenderText[appContext.locale]["Non-current liabilities"]}</td></tr>
                            {balanceSheetLiabilities.nonCurrentLiabilitiesSubtypeBalances.map(subtypeBalance => {
                                return(
                                    <tr key={subtypeBalance.accountSubtypeId}><td className="d-flex justify-content-between p-l-30">
                                        <div className="p-l-30">{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                    </td></tr>
                                )
                            })}
                            <tr><td className="d-flex justify-content-between p-l-30 font-weight-600">
                                <div className="p-l-60">{balanceSheetRenderText[appContext.locale]["Total non-current liabilities"]}</div><div>{numberAsCurrency(balanceSheetLiabilities.totalNonCurrentLiabilities)}</div>
                            </td></tr>
                        </tbody>
                        <tfoot><tr><td className="d-flex justify-content-between">
                            <div>{balanceSheetRenderText[appContext.locale]["Total liabilities"]}</div><div>{numberAsCurrency(balanceSheetLiabilities.totalLiabilities)}</div>
                        </td></tr></tfoot>
                    </table>

                    <hr/>
                    
                    <table className="table table-striped table-nested">
                        <thead><tr><th>{balanceSheetRenderText[appContext.locale]["Equity"]}</th></tr></thead>
                        <tbody>
                            {balanceSheetEquity.equityItemsSubtypeBalances.map(subtypeBalance => {
                                return(
                                    <>
                                        <tr key={subtypeBalance.accountSubtypeId}>
                                            <td className="d-flex justify-content-between p-l-30">
                                                <div>{balanceSheetRenderText[appContext.locale][subtypeBalance.accountSubtypeName]}</div><div>{numberAsCurrency(subtypeBalance.debitsMinusCredits * -1)}</div>
                                            </td>
                                        </tr>
                                        {detailedView?
                                        accountBalances
                                            .filter(account => account.accountSubtypeId === subtypeBalance.accountSubtypeId)
                                            .map(account => {
                                                return (
                                                    <>
                                                        <tr key={account.accountId}>
                                                            <td className="d-flex justify-content-between p-l-30">
                                                                <div className="p-l-30">{account.accountName}</div><div>{account.hasChildren? null : numberAsCurrency(account.debitsMinusCredits * -1)}</div>
                                                            </td>
                                                        </tr>
                                                        {accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                                            .map(childAccount => {
                                                                return(
                                                                    <tr key={childAccount.accountId}>
                                                                        <td className="d-flex justify-content-between p-l-30">
                                                                            <div className="p-l-60">{childAccount.accountName}</div><div>{numberAsCurrency(childAccount.debitsMinusCredits * -1)}</div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </>
                                                )
                                            })
                                        : null}
                                    </>
                                )
                            })}
                            <tr><td className="p-l-30 font-weight-600"> {balanceSheetRenderText[appContext.locale]["Retained Earnings"]}</td></tr>
                            <tr><td className="p-l-30 d-flex justify-content-between">
                                <div className="p-l-30">{balanceSheetRenderText[appContext.locale]["Beginning balances"](prevPeriodEndDate)}</div><div>{numberAsCurrency(balanceSheetEquity.prevPeriodRetainedEarnings)}</div>
                            </td></tr>
                            <tr><td className="p-l-30 d-flex justify-content-between">
                                <div className="p-l-30">{balanceSheetRenderText[appContext.locale]["Net income for current period"](currPeriodStartDate, asOfDate)}</div><div>{numberAsCurrency(balanceSheetEquity.currPeriodNetIncome)}</div>
                            </td></tr>
                            <tr><td className="p-l-30 d-flex justify-content-between">
                                <div className="p-l-30">{balanceSheetRenderText[appContext.locale]["Dividends for current period"](currPeriodStartDate, asOfDate)}</div><div>{numberAsCurrency(balanceSheetEquity.currPeriodDividendsAndEquivalents)}</div>
                            </td></tr>
                            <tr><td className="d-flex justify-content-between p-l-30 font-weight-600">
                                        <div className="p-l-60">{balanceSheetRenderText[appContext.locale]["Ending balances of retained earnings"]}</div><div>{numberAsCurrency(balanceSheetEquity.totalRetainedEarnings)}</div>
                            </td></tr>
                        </tbody>
                        <tfoot><tr><td className="d-flex justify-content-between">
                            <div>{balanceSheetRenderText[appContext.locale]["Total equity"]}</div><div>{numberAsCurrency(balanceSheetEquity.totalEquity)}</div>
                        </td></tr></tfoot>
                    </table>
                </div> 
                }
            </div>
        </div>


    )
}

export default BalanceSheetRender;