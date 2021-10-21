import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import {netWorthReportText} from '../../../utils/i18n/net-worth-report-text.js';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import { Card, CardBody, Alert } from 'reactstrap';
import { formatCurrency, validateDate } from '../../../utils/util-fns';

function NetWorthRender() {
    const appContext = React.useContext(PageSettings);
    const today = new Date().toISOString().split('T')[0];
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);


    const [endDate, setEndDate] = React.useState(today);
    const [accounts, setAccounts] = React.useState([]);
    const [balanceSheetAssets, setBalanceSheetAssets] = React.useState(null);
    const [balanceSheetLiabilities, setBalanceSheetLiabilities] = React.useState(null);
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [loading, setLoading] = React.useState(true);

    const fetchReport  = async (date) => {
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
    }

    React.useEffect(() => {
        async function fetchInitialReport() {
            setLoading(true);
            await fetchReport(endDate);
            setLoading(false);
        }
        fetchInitialReport(today);
    },[])

    const handleChangeDate = event => {
        setEndDate(event.target.value);
    }
    
    const handleUpdateReportButton = async event => {
        event.preventDefault();
        setInvalidDateAlert(false);
        setLoading(true);
        if (validateDate(endDate)) {
            await fetchReport(endDate);
        } else {
            setInvalidDateAlert(true);
        }
        setLoading(false);
    }

    const formatNumber = (number) => {
        if (number == 0) {
            return formatCurrency(appContext.locale, appContext.currency, 0);
        }
        return formatCurrency(appContext.locale, appContext.currency, number);
    }

    return(
        <>
            <Card className="bg-light shadow-sm very-rounded my-4">
                <CardBody>
                    {invalidDateAlert? <Alert color="danger">{balanceSheetRenderText[appContext.locale]["Invalid date(s) selected."]}</Alert> : null}
                    <form onSubmit={handleUpdateReportButton}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h2 className="h5">{balanceSheetRenderText[appContext.locale]["Options"]}</h2>
                            <button type="submit" className="btn btn-primary" onClick={handleUpdateReportButton}>{balanceSheetRenderText[appContext.locale]["Update report"]}</button>
                        </div>
                        <div className="d-flex mb-2 align-items-center justify-content-between justify-content-sm-start">
                            <label className="mr-5 mb-0">{netWorthReportText[appContext.locale]["As of:"]}</label>
                            <input type="date" placeholder={balanceSheetRenderText[appContext.locale]["yyyy-mm-dd"]} className="form-control width-175 align-self-center" value={endDate} onChange={handleChangeDate}/>
                        </div>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                            <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{balanceSheetRenderText[appContext.locale]["Detailed View"]}</label>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <div>
                {loading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div>:
                    <>
                        <div className="striped-row font-weight-600">
                            {netWorthReportText[appContext.locale]["Assets"]}
                        </div>
                        {accounts.filter(account => account.accountTypeId == 1).map(account => {
                            return(
                                <React.Fragment key={account.accountId}>
                                    <div className="striped-row indent d-flex justify-content-between font-weight-600">
                                        <div>{account.accountName}</div>
                                        <div className={account.debitsMinusCredits >= 0? "" : "text-red"}>{formatNumber(account.debitsMinusCredits)}</div>
                                    </div>
                                    {detailedView? 
                                        accounts
                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                            .map(childAccount => {
                                                return(
                                                        <div key={childAccount.accountId} className="striped-row indent-2 d-flex justify-content-between">
                                                            <div>{childAccount.accountName}</div>
                                                            <div className={childAccount.debitsMinusCredits >= 0? "" : "text-red"}>{formatNumber(childAccount.debitsMinusCredits)}</div>
                                                        </div> 
                                                )
                                        })
                                    : null}
                                </React.Fragment>
                            )
                        })}
                        <div className="font-weight-600 striped-row d-flex justify-content-between">
                            <div>{netWorthReportText[appContext.locale]["Total Assets"]}</div>
                            <div className={balanceSheetAssets.totalAssets >= 0? "" : "text-red"}>{formatNumber(balanceSheetAssets.totalAssets)}</div>
                        </div>
                        <div className="striped-row"><div className="invisible">{/*empty row */}empty row</div></div>
                        <div className="striped-row font-weight-600">
                            {netWorthReportText[appContext.locale]["Liabilities"]}
                        </div>
                        {accounts.filter(account => account.accountTypeId == 2).map(account => {
                            return(
                                <React.Fragment key={account.accountId}>
                                    <div className="striped-row indent d-flex justify-content-between font-weight-600">
                                        <div>{account.accountName}</div>
                                        <div className={account.debitsMinusCredits > 0? "" : "text-red"}>{formatNumber(account.debitsMinusCredits * -1)}</div>
                                    </div>
                                    {detailedView?
                                        accounts
                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                            .map(childAccount => {
                                                    return(
                                                        <div key={childAccount.accountId} className="striped-row indent-2 d-flex justify-content-between">
                                                            <div>{childAccount.accountName}</div>
                                                            <div className={childAccount.debitsMinusCredits > 0? "" : "text-red"}>{formatNumber(childAccount.debitsMinusCredits * -1)}</div>
                                                        </div> 
                                                    )
                                        })
                                    :null}
                                </React.Fragment>
                            )
                        })}
                        <div className="striped-row font-weight-600 d-flex justify-content-between">
                            <div>{netWorthReportText[appContext.locale]["Total Liabilities"]}</div>
                            <div className={balanceSheetLiabilities.totalLiabilities > 0? "" : "text-red"}>{formatNumber(balanceSheetLiabilities.totalLiabilities)}</div>
                        </div>
                        <div className="striped-row"><div className="invisible">{/*empty row */}empty row</div></div>
                        <div className="striped-row font-weight-600 d-flex justify-content-between py-3">
                            <div>{netWorthReportText[appContext.locale]["Total Net Worth"]}</div>
                            <div>{formatNumber(balanceSheetAssets.totalAssets - balanceSheetLiabilities.totalLiabilities)}</div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default NetWorthRender;