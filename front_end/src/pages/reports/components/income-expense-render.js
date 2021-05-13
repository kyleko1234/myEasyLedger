import React from 'react';
import {Widget, WidgetHeader} from '../../../components/widget/widget.jsx';
import { PageSettings } from '../../../config/page-settings.js';
import {API_BASE_URL} from '../../../utils/constants.js';
import axios from 'axios';
import {incomeStatementRenderText} from '../../../utils/i18n/income-statement-render-text.js';

function IncomeExpenseRender() {
    const appContext = React.useContext(PageSettings);
    const today = new Date();
    const [startDate, setStartDate] = React.useState(today.getFullYear() + "-01-01");
    const [endDate, setEndDate] = React.useState(today.toISOString().split('T')[0]);
    const [accounts, setAccounts] = React.useState([]);
    const [totalIncome, setTotalIncome] = React.useState(null);
    const [totalExpenses, setTotalExpenses] = React.useState(null);
    const [netIncome, setNetIncome] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const sumCreditsMinusDebits = (objects) => {
        let totalDebitsMinusCredits = 0;
        objects.forEach(object => {
            totalDebitsMinusCredits = totalDebitsMinusCredits + object.debitsMinusCredits;
        })
        return totalDebitsMinusCredits * -1;
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeStatement/${startDate}/${endDate}`).then(response => {
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
                setNetIncome(response.data.netIncome);
                setTotalIncome(sumCreditsMinusDebits(formattedAccounts.filter(account => account.accountTypeId == 4)));
                setTotalExpenses(sumCreditsMinusDebits(formattedAccounts.filter(account => account.accountTypeId == 5)) * -1);
            }).catch(console.log);  
            setLoading(false);  
        }
        fetchData();
    }, [startDate, endDate]);

    const formatNumber = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
    }



    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value);
    }
    const handleChangeEndDate = event => {
        setEndDate(event.target.value);
    }

    

    return(
        <Widget>
            <WidgetHeader className="bg-light">
                <div className="align-self-center">{incomeStatementRenderText[appContext.locale]["Income and Expense Report"]}</div>
                <div className="d-flex">
                    <label className="m-b-0 px-2 align-self-center">{incomeStatementRenderText[appContext.locale]["From:"]}</label>
                    <input type="date" className="form-control form-control-sm width-150 align-self-center" value={startDate} onChange={handleChangeStartDate}/>
                    <label className="m-b-0 pl-3 px-2 align-self-center">{incomeStatementRenderText[appContext.locale]["To:"]}</label>
                    <input type="date" className="form-control form-control-sm width-150 align-self-center" value={endDate} onChange={handleChangeEndDate}/>
                </div>
            </WidgetHeader>
            {loading? <div className="d-flex justify-content-center fa-3x py-3 "><i className="fas fa-circle-notch fa-spin"></i></div>:
                <div className="px-2">
                    <table className="table table-nested m-t-5" style={{borderBottom: "1px solid #aeaeae", marginBottom: "1px"}}>
                        <thead>
                            <tr><th>{incomeStatementRenderText[appContext.locale]["Income"]}</th></tr>
                        </thead>
                        <tbody>
                            {accounts.filter(account => account.accountTypeId == 4).map(account => {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <tr><td className="p-l-30 d-flex justify-content-between font-weight-600 bg-light">
                                            <div>{account.accountName}</div>
                                            <div className={account.debitsMinusCredits > 0? "text-red" : ""}>{formatNumber(account.debitsMinusCredits * -1)}</div>
                                        </td></tr>
                                        {accounts.filter(childAccount => childAccount.parentAccountId == account.accountId).map(childAccount => {
                                            return(
                                                <tr key={childAccount.accountId}><td className="p-l-60 d-flex justify-content-between">
                                                    <div>{childAccount.accountName}</div>
                                                    <div className={childAccount.debitsMinusCredits > 0? "text-red" : ""}>{formatNumber(childAccount.debitsMinusCredits * -1)}</div>
                                                </td></tr> 
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr><td className="d-flex justify-content-between">
                                <div>{incomeStatementRenderText[appContext.locale]["Total Income"]}</div>
                                <div className={totalIncome >= 0? "" : "text-red"}>{formatNumber(totalIncome)}</div>
                            </td></tr>
                        </tfoot>
                    </table>
                    <table className="table table-nested" style={{borderBottom: "1px solid #aeaeae", borderTop:"1px solid #aeaeae", marginBottom: "1px"}}>
                        <thead>
                            <tr><th>{incomeStatementRenderText[appContext.locale]["Expenses"]}</th></tr>
                        </thead>
                        <tbody>
                            {accounts.filter(account => account.accountTypeId == 5).map(account => {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <tr><td className="p-l-30 d-flex justify-content-between font-weight-600 bg-light">
                                            <div>{account.accountName}</div>
                                            <div className={account.debitsMinusCredits >= 0? "text-red" : ""}>{formatNumber(account.debitsMinusCredits)}</div>
                                        </td></tr>
                                        {accounts.filter(childAccount => childAccount.parentAccountId == account.accountId).map(childAccount => {
                                            return(
                                                <tr key={childAccount.accountId}><td className="p-l-60 d-flex justify-content-between">
                                                    <div>{childAccount.accountName}</div>
                                                    <div className={childAccount.debitsMinusCredits >= 0? "text-red" : ""}>{formatNumber(childAccount.debitsMinusCredits)}</div>
                                                </td></tr> 
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr><td className="d-flex justify-content-between">
                                <div>{incomeStatementRenderText[appContext.locale]["Total Expenses"]}</div>
                                <div className={totalExpenses > 0? "text-red" : ""}>{formatNumber(totalExpenses)}</div>
                            </td></tr>
                        </tfoot>
                    </table>
                    <table className="table m-b-0">
                        <tfoot>
                            <tr><td className="d-flex justify-content-between py-3">
                                <div>{incomeStatementRenderText[appContext.locale]["Total Income less Expenses"]}</div>
                                <div>{formatNumber(netIncome)}</div>
                            </td></tr>
                        </tfoot>
                    </table>
                </div>
            }

        </Widget>
    )
}

export default IncomeExpenseRender;