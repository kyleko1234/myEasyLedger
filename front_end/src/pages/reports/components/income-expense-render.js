import React from 'react';
import { PageSettings } from '../../../config/page-settings.js';
import {API_BASE_URL} from '../../../utils/constants.js';
import axios from 'axios';
import {incomeStatementRenderText} from '../../../utils/i18n/income-statement-render-text.js';
import { Card, CardBody, Alert } from 'reactstrap';
import { formatCurrency, getDateInCurrentYear, getTodayAsDateString, validateDate } from '../../../utils/util-fns.js';
import LoadingSpinner from '../../../components/misc/loading-spinner.js';
import StripedRow from '../../../components/tables/striped-row.js';
function IncomeExpenseRender(props) {
    //optional props: defualtStartDate, defaultEndDate
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();
    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);

    const [startDate, setStartDate] = React.useState(props.defaultStartDate? props.defaultStartDate : beginningOfCurrentFiscalYear);
    const [endDate, setEndDate] = React.useState(props.defaultEndDate? props.defaultEndDate : today);
    const [accounts, setAccounts] = React.useState([]);
    const [totalIncome, setTotalIncome] = React.useState(null);
    const [totalExpenses, setTotalExpenses] = React.useState(null);
    const [netIncome, setNetIncome] = React.useState();

    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const [incomeStatementObjects, setIncomeStatementObjects] = React.useState([]);
    const [datesToRequest, setDatesToRequest] = React.useState([{
        label: "Custom",
        startDate: props.defaultStartDate ? props.defaultStartDate : beginningOfCurrentFiscalYear, //cannot use defaultProps here because we would need to call appContext at the top level, so conditional is used here instead
        endDate: props.defaultEndDate ? props.defaultEndDate : today
    }]);
    const [columnLabels, setColumnLabels] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);


    const sumCreditsMinusDebits = (objects) => {
        let totalDebitsMinusCredits = 0;
        objects.forEach(object => {
            totalDebitsMinusCredits = totalDebitsMinusCredits + object.debitsMinusCredits;
        })
        return totalDebitsMinusCredits * -1;
    }

    const fetchReport =  async (startDate, endDate) => {
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
    }

    const requestIncomeStatementObjects = async arrayToStoreObjects => {
        let newColumnLabels = [];
        for (const dateObject of datesToRequest) {
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeStatement/${dateObject.startDate}/${dateObject.endDate}`).then(response => {
                newColumnLabels.push(dateObject);     //column labels are not updated until the report is actually updated
                let formattedIncomeStatementObject = response.data;
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
                formattedIncomeStatementObject.accounts = formattedAccounts;
                formattedIncomeStatementObject.netIncome = response.data.netIncome;
                formattedIncomeStatementObject.totalIncome = sumCreditsMinusDebits(formattedAccounts.filter(account => account.accountTypeId == 4));
                formattedIncomeStatementObject.totalExpenses = sumCreditsMinusDebits(formattedAccounts.filter(account => account.accountTypeId == 5)) * -1;
                arrayToStoreObjects.push(formattedIncomeStatementObject);
            }).catch(console.log);
        }
        setColumnLabels(newColumnLabels);
    }

    React.useEffect(() => {
        async function fetchInitialReport() {
            setLoading(true);
            await fetchReport(startDate, endDate);
            setLoading(false);
        }
        fetchInitialReport();
    }, []);

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
                setDateRangePresets(response.data);
            });
            let fetchedIncomeStatementObjects = [];
            await requestIncomeStatementObjects(fetchedIncomeStatementObjects);
            setIncomeStatementObjects(fetchedIncomeStatementObjects);
            setLoading(false);
        }
        fetchData();
    }, [])

    const formatNumber = (number) => {
        if (number == 0) {
            return formatCurrency(appContext.locale, appContext.currency, 0);
        }
        return formatCurrency(appContext.locale, appContext.currency, number);
    }

    const handleUpdateReportButton = async event => {
        event.preventDefault();
        setInvalidDateAlert(false);
        setLoading(true);
        if (validateDate(startDate) && validateDate(endDate)) {
            await fetchReport(startDate, endDate);
        } else {
            setInvalidDateAlert(true);
        }
        setLoading(false);
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
                    <Alert isOpen={invalidDateAlert} color="danger">
                        {incomeStatementRenderText[appContext.locale]["Invalid date(s) selected."]}
                    </Alert>
                    <form onSubmit={handleUpdateReportButton}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h2 className="h5">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                            <button type="submit" className="btn btn-primary" onClick={handleUpdateReportButton}>{incomeStatementRenderText[appContext.locale]["Update report"]}</button>
                        </div>
                        <div className="d-sm-flex align-items-center">
                            <div className="d-flex align-items-center justify-content-between mr-3 mb-2">
                                <label className="my-0 mr-5">{incomeStatementRenderText[appContext.locale]["From:"]}</label>
                                <input type="date" placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} className="form-control form-control-sm width-175 align-self-center" value={startDate} onChange={handleChangeStartDate}/>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mr-3 mb-2">
                                <label className="my-0 mr-5">{incomeStatementRenderText[appContext.locale]["To:"]}</label>
                                <input type="date" placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} className="form-control form-control-sm width-175 align-self-center" value={endDate} onChange={handleChangeEndDate}/>
                            </div>
                        </div>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                            <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{incomeStatementRenderText[appContext.locale]["Detailed View"]}</label>
                        </div>
                    </form>
                </CardBody>
            </Card>
            {loading
                ? <LoadingSpinner big />
                : <div className="px-2">
                    <StripedRow className="font-weight-semibold">
                        {incomeStatementRenderText[appContext.locale]["Income"]}
                    </StripedRow>
                        {accounts.filter(account => account.accountTypeId == 4).map(account => {
                            return(
                                <React.Fragment key={account.accountId}>
                                    <StripedRow className="indent justify-content-between font-weight-semibold">
                                        <div>
                                            {account.accountName}
                                        </div>
                                        <div className={account.debitsMinusCredits > 0? "text-red" : ""}>
                                            {formatNumber(account.debitsMinusCredits * -1)}
                                        </div>
                                    </StripedRow>
                                    {detailedView
                                        ? accounts
                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                            .map(childAccount => {
                                                return(
                                                    <StripedRow className="indent-2 justify-content-between" key={childAccount.accountId}>
                                                        <div>
                                                            {childAccount.accountName}
                                                        </div>
                                                        <div className={childAccount.debitsMinusCredits > 0? "text-red" : ""}>
                                                            {formatNumber(childAccount.debitsMinusCredits * -1)}
                                                        </div>
                                                    </StripedRow> 
                                                )
                                            })
                                        : null
                                    }
                                </React.Fragment>
                            )
                        })}
                    <StripedRow className="justify-content-between font-weight-semibold">
                        <div>
                            {incomeStatementRenderText[appContext.locale]["Total Income"]}
                        </div>
                        <div className={totalIncome >= 0? "" : "text-red"}>
                            {formatNumber(totalIncome)}
                        </div>
                    </StripedRow>
                    <StripedRow>
                        <div className="invisible">{/** empty row */} empty row </div>
                    </StripedRow>
                    <StripedRow className="font-weight-semibold">
                        {incomeStatementRenderText[appContext.locale]["Expenses"]}
                    </StripedRow>
                    {accounts.filter(account => account.accountTypeId == 5).map(account => {
                        return(
                            <React.Fragment key={account.accountId}>
                                <StripedRow className="indent justify-content-between font-weight-semibold">
                                    <div>
                                        {account.accountName}
                                    </div>
                                    <div className={account.debitsMinusCredits >= 0? "text-red" : ""}>
                                        {formatNumber(account.debitsMinusCredits)}
                                    </div>
                                </StripedRow>
                                {detailedView 
                                    ? accounts
                                        .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                        .map(childAccount => {
                                            return(
                                                <StripedRow className="indent-2 justify-content-between"key={childAccount.accountId}>
                                                    <div>
                                                        {childAccount.accountName}
                                                    </div>
                                                    <div className={childAccount.debitsMinusCredits >= 0? "text-red" : ""}>
                                                        {formatNumber(childAccount.debitsMinusCredits)}
                                                    </div>
                                                </StripedRow> 
                                            )
                                        })
                                    : null
                                }
                            </React.Fragment>
                        )
                    })}
                    <StripedRow className="font-weight-semibold justify-content-between">
                        <div>
                            {incomeStatementRenderText[appContext.locale]["Total Expenses"]}
                        </div>
                        <div className={totalExpenses > 0? "text-red" : ""}>
                            {formatNumber(totalExpenses)}
                        </div>
                    </StripedRow>
                    <StripedRow>
                        <div className="invisible">{/** empty row */} empty row </div>
                    </StripedRow>
                    <StripedRow className="font-weight-semibold justify-content-between">
                        <div>
                            {incomeStatementRenderText[appContext.locale]["Total Income less Expenses"]}
                        </div>
                        <div>
                            {formatNumber(netIncome)}
                        </div>
                    </StripedRow>
                </div>
            }
        </>
    )
}

export default IncomeExpenseRender;