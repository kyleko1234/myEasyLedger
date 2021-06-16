import React from 'react';
import { PageSettings } from '../../../config/page-settings.js';
import {API_BASE_URL} from '../../../utils/constants.js';
import axios from 'axios';
import {incomeStatementRenderText} from '../../../utils/i18n/income-statement-render-text.js';
import { Card, CardBody} from 'reactstrap';

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
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

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
        <>
            <Card className="very-rounded shadow-sm bg-light my-4">
                <CardBody>
                    <h2 className="h5">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                    <div className="d-sm-flex align-items-center">
                        <div className="d-flex align-items-center mr-3 mb-2">
                            <label className="my-0 pr-2">{incomeStatementRenderText[appContext.locale]["From:"]}</label>
                            <input type="date" className="form-control form-control-sm width-150 align-self-center" value={startDate} onChange={handleChangeStartDate}/>
                        </div>
                        <div className="d-flex align-items-center mr-3 mb-2">
                            <label className="my-0 pr-2">{incomeStatementRenderText[appContext.locale]["To:"]}</label>
                            <input type="date" className="form-control form-control-sm width-150 align-self-center" value={endDate} onChange={handleChangeEndDate}/>
                        </div>
                    </div>
                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                        <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{incomeStatementRenderText[appContext.locale]["Detailed View"]}</label>
                    </div>
                </CardBody>
            </Card>
            {loading? <div className="d-flex justify-content-center fa-3x py-3 "><i className="fas fa-circle-notch fa-spin"></i></div>:
                <div className="px-2">
                    <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Income"]}</div>
                        {accounts.filter(account => account.accountTypeId == 4).map(account => {
                            return(
                                <React.Fragment key={account.accountId}>
                                    <div className="indent striped-row justify-content-between font-weight-600">
                                        <div>{account.accountName}</div>
                                        <div className={account.debitsMinusCredits > 0? "text-red" : ""}>{formatNumber(account.debitsMinusCredits * -1)}</div>
                                    </div>
                                    {detailedView?
                                        accounts
                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                            .map(childAccount => {
                                                return(
                                                    <div className="striped-row indent-2 justify-content-between" key={childAccount.accountId}>
                                                        <div>{childAccount.accountName}</div>
                                                        <div className={childAccount.debitsMinusCredits > 0? "text-red" : ""}>{formatNumber(childAccount.debitsMinusCredits * -1)}</div>
                                                    </div> 
                                                )
                                        })
                                    : null}
                                </React.Fragment>
                            )
                        })}
                    <div className="striped-row justify-content-between font-weight-600">
                        <div>{incomeStatementRenderText[appContext.locale]["Total Income"]}</div>
                        <div className={totalIncome >= 0? "" : "text-red"}>{formatNumber(totalIncome)}</div>
                    </div>
                    <div className="striped-row">
                        <div className="invisible">{/** empty row */} empty row </div>
                    </div>
                    <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Expenses"]}</div>
                    {accounts.filter(account => account.accountTypeId == 5).map(account => {
                        return(
                            <React.Fragment key={account.accountId}>
                                <div className="indent striped-row justify-content-between font-weight-600">
                                    <div>{account.accountName}</div>
                                    <div className={account.debitsMinusCredits >= 0? "text-red" : ""}>{formatNumber(account.debitsMinusCredits)}</div>
                                </div>
                                {detailedView? 
                                    accounts
                                        .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                        .map(childAccount => {
                                            return(
                                                <div className="indent-2 striped-row justify-content-between"key={childAccount.accountId}>
                                                    <div>{childAccount.accountName}</div>
                                                    <div className={childAccount.debitsMinusCredits >= 0? "text-red" : ""}>{formatNumber(childAccount.debitsMinusCredits)}</div>
                                                </div> 
                                            )
                                    })
                                : null}
                            </React.Fragment>
                        )
                    })}
                    <div className="striped-row font-weight-600 justify-content-between">
                        <div>{incomeStatementRenderText[appContext.locale]["Total Expenses"]}</div>
                        <div className={totalExpenses > 0? "text-red" : ""}>{formatNumber(totalExpenses)}</div>
                    </div>
                    <div className="striped-row">
                        <div className="invisible">{/** empty row */} empty row </div>
                    </div>
                    <div className="striped-row font-weight-600 justify-content-between">
                        <div>{incomeStatementRenderText[appContext.locale]["Total Income less Expenses"]}</div>
                        <div>{formatNumber(netIncome)}</div>
                    </div>
                </div>
            }
        </>
    )
}

export default IncomeExpenseRender;