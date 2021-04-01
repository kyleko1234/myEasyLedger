import React from 'react';
import { WidgetHeader, Widget } from '../../../components/widget/widget';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import {netWorthReportText} from '../../../utils/i18n/net-worth-report-text.js';

function NetWorthRender() {
    const appContext = React.useContext(PageSettings);
    const today = new Date();

    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [accounts, setAccounts] = React.useState([]);
    const [balanceSheetAssets, setBalanceSheetAssets] = React.useState(null);
    const [balanceSheetLiabilities, setBalanceSheetLiabilities] = React.useState(null);

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/balanceSheet/${endDate}`).then(response => {
                let formattedAccounts = response.data.accountBalances;
                formattedAccounts.forEach(account => {
                    if (account.hasChildren) {
                        let totalDebits = 0;
                        let totalCredits = 0;    
                        formattedAccounts.filter(childAccount => childAccount.parentAccountId == account.accountId).forEach(childAccount => {
                            totalDebits = totalDebits + childAccount.debitTotal;
                            totalCredits = totalCredits + childAccount.creditTotal;
                        })
                        account.debitTotal = totalDebits;
                        account.creditTotal = totalCredits;
                        account.debitsMinusCredits = totalDebits - totalCredits;    
                    }
                })
                setAccounts(formattedAccounts);
                setBalanceSheetAssets(response.data.balanceSheetAssets);
                setBalanceSheetLiabilities(response.data.balanceSheetLiabilities);
            }).catch(console.log);  
            setLoading(false);  
        }
        fetchData();
    },[endDate])

    const handleChangeDate = event => {
        setEndDate(event.target.value);
    }
    
    const formatNumber = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
    }

    return(
        <Widget>
            <WidgetHeader className="bg-light">
                <div className="align-self-center">{netWorthReportText[appContext.locale]["Net Worth Report"]}</div>
                <div className="d-flex">
                    <label className="m-b-0 px-2 align-self-center">{netWorthReportText[appContext.locale]["As of:"]}</label>
                    <input type="date" className="form-control form-control-sm width-125 align-self-center" value={endDate} onChange={handleChangeDate}/>
                </div>
            </WidgetHeader>
            {loading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>:
                <div className="px-2">
                    <table className="table table-nested m-t-5" style={{borderBottom: "1px solid #aeaeae", marginBottom: "1px"}}>
                        <thead>
                            <tr><th>{netWorthReportText[appContext.locale]["Assets"]}</th></tr>
                        </thead>
                        <tbody>
                            {accounts.filter(account => account.accountTypeId == 1).map(account => {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <tr><td className="p-l-30 d-flex justify-content-between font-weight-600 bg-light">
                                            <div>{account.accountName}</div>
                                            <div className={account.debitsMinusCredits >= 0? "" : "text-red"}>{formatNumber(account.debitsMinusCredits)}</div>
                                        </td></tr>
                                        {accounts.filter(childAccount => childAccount.parentAccountId == account.accountId).map(childAccount => {
                                            return(
                                                <tr key={childAccount.accountId}><td className="p-l-60 d-flex justify-content-between">
                                                    <div>{childAccount.accountName}</div>
                                                    <div className={childAccount.debitsMinusCredits >= 0? "" : "text-red"}>{formatNumber(childAccount.debitsMinusCredits)}</div>
                                                </td></tr> 
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr><td className="d-flex justify-content-between">
                                <div>{netWorthReportText[appContext.locale]["Total Assets"]}</div>
                                <div className={balanceSheetAssets.totalAssets >= 0? "" : "text-red"}>{formatNumber(balanceSheetAssets.totalAssets)}</div>
                            </td></tr>
                        </tfoot>
                    </table>
                    <table className="table table-nested" style={{borderBottom: "1px solid #aeaeae", borderTop:"1px solid #aeaeae", marginBottom: "1px"}}>
                        <thead>
                            <tr><th>{netWorthReportText[appContext.locale]["Liabilities"]}</th></tr>
                        </thead>
                        <tbody>
                            {accounts.filter(account => account.accountTypeId == 2).map(account => {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <tr><td className="p-l-30 d-flex justify-content-between font-weight-600 bg-light">
                                            <div>{account.accountName}</div>
                                            <div className={account.debitsMinusCredits > 0? "" : "text-red"}>{formatNumber(account.debitsMinusCredits * -1)}</div>
                                        </td></tr>
                                        {accounts.filter(childAccount => childAccount.parentAccountId == account.accountId).map(childAccount => {
                                            return(
                                                <tr key={childAccount.accountId}><td className="p-l-60 d-flex justify-content-between">
                                                    <div>{childAccount.accountName}</div>
                                                    <div className={childAccount.debitsMinusCredits > 0? "" : "text-red"}>{formatNumber(childAccount.debitsMinusCredits * -1)}</div>
                                                </td></tr> 
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr><td className="d-flex justify-content-between">
                                <div>{netWorthReportText[appContext.locale]["Total Liabilities"]}</div>
                                <div className={balanceSheetLiabilities.totalLiabilities > 0? "" : "text-red"}>{formatNumber(balanceSheetLiabilities.totalLiabilities)}</div>
                            </td></tr>
                        </tfoot>
                    </table>
                    <table className="table m-b-0">
                        <tfoot>
                            <tr><td className="d-flex justify-content-between py-3">
                                <div>{netWorthReportText[appContext.locale]["Total Net Worth"]}</div>
                                <div>{formatNumber(balanceSheetAssets.totalAssets - balanceSheetLiabilities.totalLiabilities)}</div>
                            </td></tr>
                        </tfoot>
                    </table>
                </div>
            }
        </Widget>
    )
}

export default NetWorthRender;