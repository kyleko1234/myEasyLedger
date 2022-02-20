import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants';
import {netWorthReportText} from '../../../utils/i18n/net-worth-report-text.js';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import { Card, CardBody, Alert } from 'reactstrap';
import { formatCurrency, getTodayAsDateString, validateDate } from '../../../utils/util-fns';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import StripedRow from '../../../components/tables/striped-row';

function NetWorthRender() {
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();
    const [loading, setLoading] = React.useState(true);
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);


    const [endDate, setEndDate] = React.useState(today);
    const [accounts, setAccounts] = React.useState([]);
    const [balanceSheetAssets, setBalanceSheetAssets] = React.useState(null);
    const [balanceSheetLiabilities, setBalanceSheetLiabilities] = React.useState(null);

    const [balanceSheetObjects, setBalanceSheetObjects] = React.useState([]);
    const [endDatesToRequest, setEndDatesToRequest] = React.useState([{label: "Custom", endDate:today}]);
    const [columnLabels, setColumnLabels] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);


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

    const requestBalanceSheetObjects = async arrayToStoreObjects => {
        let newColumnLabels = [];
        for (const endDateObject of endDatesToRequest) {
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/balanceSheet/${endDateObject.endDate}`).then(response => {
                newColumnLabels.push(endDateObject);     //column labels are not updated until the report is actually updated
                let formattedAccounts = response.data.accountBalances;
                let formattedBalanceSheetObject = response.data;
                formattedAccounts.forEach(account => {
                    if (account.hasChildren) {
                        let totalDebits = 0;
                        let totalCredits = 0;
                        formattedAccounts.filter(childAccount => childAccount.parentAccountId == account.accountId).forEach(childAccount => {
                            totalDebits = totalDebits + childAccount.debitTotal;
                            totalCredits = totalCredits + childAccount.creditTotal;
                        });
                        account.debitTotal = totalDebits;
                        account.creditTotal = totalCredits;
                        account.debitsMinusCredits = totalDebits - totalCredits;    
                    }
                })
                formattedBalanceSheetObject.accounts = formattedAccounts;
                formattedBalanceSheetObject.balanceSheetAssets = response.data.balanceSheetAssets;
                formattedBalanceSheetObject.balanceSheetLiabilities = response.data.balanceSheetLiabilities;
                arrayToStoreObjects.push(formattedBalanceSheetObject);
            }).catch(console.log);
        }
        setColumnLabels(newColumnLabels);
    }


    React.useEffect(() => {
        async function fetchInitialReport() {
            setLoading(true);
            await fetchReport(endDate);
            setLoading(false);
        }
        fetchInitialReport(today);
    },[])
    
    const handleChangeDate = (date, i) => {
        let newEndDatesToRequestArray = endDatesToRequest.slice();
        newEndDatesToRequestArray[i] = (
            {label: "Custom", endDate: date}
        )
        setEndDatesToRequest(newEndDatesToRequestArray);
    }

    const validateDatesToRequest = endDatesToRequest => {
        let returnedBoolean = true
        endDatesToRequest.forEach(endDateToRequestObject => {
            if (!validateDate(endDateToRequestObject.endDate)) {
                returnedBoolean = false;
            }
        })
        return returnedBoolean;
    }

    const handleUpdateReportButton = async (event) => {
        event.preventDefault();
        setLoading(true);
        setInvalidDateAlert(false);
        if (validateDatesToRequest(endDatesToRequest)) {
            let fetchedBalanceSheetObjects = [];
            await requestBalanceSheetObjects(fetchedBalanceSheetObjects);
            setBalanceSheetObjects(fetchedBalanceSheetObjects);    
        } else {
            setInvalidDateAlert(true);
        }
        setLoading(false);
    }

    const handleSelectDateRangePreset = (selectedOption, i) => {
        if (selectedOption) {
            let endDateToRequestObject = {
                label: selectedOption.label,
                endDate: selectedOption.object.endDate
            };
            let newEndDatesToRequestArray = endDatesToRequest.slice();
            newEndDatesToRequestArray[i] = endDateToRequestObject;
            setEndDatesToRequest(newEndDatesToRequestArray);
        }
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
                setDateRangePresets(response.data);
            })
            let fetchedBalanceSheetObjects = []
            await requestBalanceSheetObjects(fetchedBalanceSheetObjects);
            setBalanceSheetObjects(fetchedBalanceSheetObjects);
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

    return(
        <>
            <Card className="bg-light shadow-sm very-rounded my-4">
                <CardBody>
                    <Alert isOpen={invalidDateAlert} color="danger">
                        {balanceSheetRenderText[appContext.locale]["Invalid date(s) selected."]}
                    </Alert>
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
                {loading
                    ? <LoadingSpinner big/>
                    : <>
                        <StripedRow className="font-weight-semibold">
                            {netWorthReportText[appContext.locale]["Assets"]}
                        </StripedRow>
                        {accounts.filter(account => account.accountTypeId == 1).map(account => {
                            return(
                                <React.Fragment key={account.accountId}>
                                    <StripedRow className="indent d-flex justify-content-between font-weight-semibold">
                                        <div>{account.accountName}</div>
                                        <div className={account.debitsMinusCredits >= 0? "" : "text-red"}>{formatNumber(account.debitsMinusCredits)}</div>
                                    </StripedRow>
                                    {detailedView
                                        ? accounts
                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                            .map(childAccount => {
                                                return(
                                                        <StripedRow key={childAccount.accountId} className="indent-2 d-flex justify-content-between">
                                                            <div>{childAccount.accountName}</div>
                                                            <div className={childAccount.debitsMinusCredits >= 0? "" : "text-red"}>{formatNumber(childAccount.debitsMinusCredits)}</div>
                                                        </StripedRow> 
                                                )
                                        })
                                        : null
                                    }
                                </React.Fragment>
                            )
                        })}
                        <StripedRow className="font-weight-semibold d-flex justify-content-between">
                            <div>{netWorthReportText[appContext.locale]["Total Assets"]}</div>
                            <div className={balanceSheetAssets.totalAssets >= 0? "" : "text-red"}>{formatNumber(balanceSheetAssets.totalAssets)}</div>
                        </StripedRow>
                        <StripedRow>
                            <div className="invisible">{/*empty row */}empty row</div>
                        </StripedRow>
                        <StripedRow className="font-weight-semibold">
                            {netWorthReportText[appContext.locale]["Liabilities"]}
                        </StripedRow>
                        {accounts.filter(account => account.accountTypeId == 2).map(account => {
                            return(
                                <React.Fragment key={account.accountId}>
                                    <StripedRow className="indent justify-content-between font-weight-semibold">
                                        <div>{account.accountName}</div>
                                        <div className={account.debitsMinusCredits > 0? "" : "text-red"}>{formatNumber(account.debitsMinusCredits * -1)}</div>
                                    </StripedRow>
                                    {detailedView
                                        ? accounts
                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                            .map(childAccount => {
                                                    return(
                                                        <StripedRow key={childAccount.accountId} className="indent-2 justify-content-between">
                                                            <div>{childAccount.accountName}</div>
                                                            <div className={childAccount.debitsMinusCredits > 0? "" : "text-red"}>{formatNumber(childAccount.debitsMinusCredits * -1)}</div>
                                                        </StripedRow> 
                                                    )
                                        })
                                        : null
                                    }
                                </React.Fragment>
                            )
                        })}
                        <StripedRow className="font-weight-semibold justify-content-between">
                            <div>{netWorthReportText[appContext.locale]["Total Liabilities"]}</div>
                            <div className={balanceSheetLiabilities.totalLiabilities > 0? "" : "text-red"}>{formatNumber(balanceSheetLiabilities.totalLiabilities)}</div>
                        </StripedRow>
                        <StripedRow>
                            <div className="invisible">{/*empty row */}empty row</div>
                        </StripedRow>
                        <StripedRow className="font-weight-semibold d-flex justify-content-between py-3">
                            <div>{netWorthReportText[appContext.locale]["Total Net Worth"]}</div>
                            <div>{formatNumber(balanceSheetAssets.totalAssets - balanceSheetLiabilities.totalLiabilities)}</div>
                        </StripedRow>
                    </>
                }
            </div>
        </>
    )
}

export default NetWorthRender;