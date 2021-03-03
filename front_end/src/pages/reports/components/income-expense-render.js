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
    const [accountGroups, setAccountGroups] = React.useState([]);
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
                setAccountGroups(response.data.accountGroupBalances);
                setAccounts(response.data.accountBalances);
                setNetIncome(response.data.netIncome);
                setTotalIncome(sumCreditsMinusDebits(response.data.accountGroupBalances.filter(accountGroup => accountGroup.accountTypeId == 4)));
                setTotalExpenses(sumCreditsMinusDebits(response.data.accountGroupBalances.filter(accountGroup => accountGroup.accountTypeId == 5)) * -1);
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
                    <input type="date" className="form-control form-control-sm width-125 align-self-center" value={startDate} onChange={handleChangeStartDate}/>
                    <label className="m-b-0 pl-3 px-2 align-self-center">{incomeStatementRenderText[appContext.locale]["To:"]}</label>
                    <input type="date" className="form-control form-control-sm width-125 align-self-center" value={endDate} onChange={handleChangeEndDate}/>
                </div>
            </WidgetHeader>
            {loading? <div className="d-flex justify-content-center fa-3x py-3 "><i className="fas fa-circle-notch fa-spin"></i></div>:
                <div className="px-2">
                    <table className="table table-nested m-t-5" style={{borderBottom: "1px solid #aeaeae", marginBottom: "1px"}}>
                        <thead>
                            <tr><th>{incomeStatementRenderText[appContext.locale]["Income"]}</th></tr>
                        </thead>
                        <tbody>
                            {accountGroups.filter(accountGroup => accountGroup.accountTypeId == 4).map(accountGroup => {
                                return(
                                    <React.Fragment key={accountGroup.accountGroupId}>
                                        <tr><td className="p-l-30 d-flex justify-content-between font-weight-600 bg-light">
                                            <div>{accountGroup.accountGroupName}</div>
                                        </td></tr>
                                        {accounts.filter(account => account.accountGroupId == accountGroup.accountGroupId).map(account => {
                                            return(
                                                <tr key={account.accountId}><td className="p-l-60 d-flex justify-content-between">
                                                    <div>{account.accountName}</div>
                                                    <div className={account.debitsMinusCredits > 0? "text-red" : ""}>{formatNumber(account.debitsMinusCredits * -1)}</div>
                                                </td></tr> 
                                            )
                                        })}
                                        <tr><td className="p-l-60 d-flex justify-content-between font-weight-600">
                                            <div>{incomeStatementRenderText[appContext.locale]["Total accountGroupName"](accountGroup.accountGroupName)}</div>
                                            <div className={accountGroup.debitsMinusCredits > 0? "text-red" : ""}>{formatNumber(accountGroup.debitsMinusCredits * -1)}</div>
                                        </td></tr>
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
                            {accountGroups.filter(accountGroup => accountGroup.accountTypeId == 5).map(accountGroup => {
                                return(
                                    <React.Fragment key={accountGroup.accountGroupId}>
                                        <tr><td className="p-l-30 d-flex justify-content-between font-weight-600 bg-light">
                                            <div>{accountGroup.accountGroupName}</div>
                                        </td></tr>
                                        {accounts.filter(account => account.accountGroupId == accountGroup.accountGroupId).map(account => {
                                            return(
                                                <tr key={account.accountId}><td className="p-l-60 d-flex justify-content-between">
                                                    <div>{account.accountName}</div>
                                                    <div className={account.debitsMinusCredits >= 0? "text-red" : ""}>{formatNumber(account.debitsMinusCredits)}</div>
                                                </td></tr> 
                                            )
                                        })}
                                        <tr><td className="p-l-60 d-flex justify-content-between font-weight-600">
                                            <div>{incomeStatementRenderText[appContext.locale]["Total accountGroupName"](accountGroup.accountGroupName)}</div>
                                            <div className={accountGroup.debitsMinusCredits >= 0? "text-red" : ""}>{formatNumber(accountGroup.debitsMinusCredits)}</div>
                                        </td></tr>
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