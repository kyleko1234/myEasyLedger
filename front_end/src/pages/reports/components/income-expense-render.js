import React from 'react';
import { PageSettings } from '../../../config/page-settings.js';
import {API_BASE_URL} from '../../../utils/constants.js';
import axios from 'axios';
import {incomeStatementRenderText} from '../../../utils/i18n/income-statement-render-text.js';
import { Card, CardBody, Alert } from 'reactstrap';
import { formatCurrency, getDateInCurrentYear, getTodayAsDateString, localizeDate, validateDate } from '../../../utils/util-fns.js';
import LoadingSpinner from '../../../components/misc/loading-spinner.js';
import StripedRow from '../../../components/tables/striped-row.js';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text.js';

function IncomeExpenseRender(props) {
    //optional props: defualtStartDate, defaultEndDate
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();
    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);

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

    const handleChangeStartDate = (date, i) => {
        let newDatesToRequestArray = datesToRequest.slice();
        newDatesToRequestArray[i] = {
            label: "Custom", 
            startDate: date, 
            endDate: newDatesToRequestArray[i].endDate
        }
        setDatesToRequest(newDatesToRequestArray)
    }
    const handleChangeEndDate = (date, i) => {
        let newDatesToRequestArray = datesToRequest.slice();
        newDatesToRequestArray[i] = {
            label: "Custom", 
            startDate: newDatesToRequestArray[i].startDate, 
            endDate: date
        }
        setDatesToRequest(newDatesToRequestArray)
    }

    const handleSelectDateRangePreset = (selectedOption, i) => {
        if (selectedOption) {
            let dateToRequestObject = {
                label: selectedOption.label,
                startDate: selectedOption.object.startDate,
                endDate: selectedOption.object.endDate
            };
            let newDatesToRequestArray = datesToRequest.slice();
            newDatesToRequestArray[i] = dateToRequestObject;
            setDatesToRequest(newDatesToRequestArray);
        }
    }

    const handleRemoveDateRangeButton = i => {
        let datesArray = datesToRequest.slice();
        datesArray.splice(i, 1);
        setDatesToRequest(datesArray);
    }

    const handleCompareButton = () => {
        let datesArray = datesToRequest.slice();
        datesArray.push({
            label: "Custom", 
            startDate: beginningOfCurrentFiscalYear,
            endDate: today}
        )
        setDatesToRequest(datesArray);
    }
    
    const validateDatesToRequest = datesToRequest => {
        let returnedBoolean = true
        datesToRequest.forEach(dateToRequestObject => {
            if (!(validateDate(dateToRequestObject.startDate) && validateDate(dateToRequestObject.endDate))) {
                returnedBoolean = false;
            }
        })
        return returnedBoolean;
    }

    const handleUpdateReportButton = async event => {
        event.preventDefault();
        setInvalidDateAlert(false);
        setLoading(true);
        if (validateDatesToRequest(datesToRequest)) {
            let fetchedIncomeStatementObjects = [];
            await requestIncomeStatementObjects(fetchedIncomeStatementObjects);
            setIncomeStatementObjects(fetchedIncomeStatementObjects);
        } else {
            setInvalidDateAlert(true);
        }
        setLoading(false);
    }

    return(
        <>
            <Card className="very-rounded shadow-sm bg-light my-4">
                <CardBody>
                    <Alert isOpen={invalidDateAlert} color="danger">
                        {incomeStatementRenderText[appContext.locale]["Invalid date(s) selected."]}
                    </Alert>
                    <form onSubmit={handleUpdateReportButton}>
                        <div className="mb-2">
                            <h2 className="h5">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                        </div>
                        <div className="d-none d-md-block">
                            {datesToRequest.map((dateObject, i) => {
                                return (
                                    <div key={i}>
                                        {datesToRequest.length > 1
                                        ?   <div className="font-weight-semibold my-1 d-flex align-items-center">
                                                {incomeStatementRenderText[appContext.locale]["Date range"] + " " + (i + 1)}
                                                <button className="btn btn-light py-0 px-1 mx-1 border-0" onClick={() => handleRemoveDateRangeButton(i)}>
                                                    <i className="ion ion-md-close fa-fw"></i>
                                                </button>
                                            </div>
                                        : null}
                                        <div className="d-flex w-100 align-items-center mb-2">
                                            <Select
                                                className="col-4 px-0"
                                                classNamePrefix="form-control"
                                                options={dateRangePresets}
                                                menuPortalTarget={document.body}
                                                menuShouldScrollIntoView={false}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                                placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                                value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                            />
                                            <label className="my-0 text-end col-1 px-2" htmlFor={`start-date-${i}`}>
                                                {incomeStatementRenderText[appContext.locale]["From:"]}
                                            </label>
                                            <div className="col-3">
                                                <input 
                                                    type="date" 
                                                    id={`start-date-${i}`}
                                                    placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                    className="form-control col-3" value={datesToRequest[i].startDate} 
                                                    onChange={event => handleChangeStartDate(event.target.value, i)} 
                                                />
                                            </div>
                                            <label className="my-0 text-end col-1 px-2" htmlFor={`end-date-${i}`}>
                                                {incomeStatementRenderText[appContext.locale]["To:"]} 
                                            </label>
                                            <div className='col-3'>
                                                <input 
                                                    type="date" 
                                                    id={`end-date-${i}`}
                                                    placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                    className="form-control col-3" value={datesToRequest[i].endDate} 
                                                    onChange={event => handleChangeEndDate(event.target.value, i)} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="d-md-none">
                            {datesToRequest.map((dateObject, i) => {
                                return (
                                    <div key={i}>
                                        <div className="d-flex my-1 justify-content-between">
                                            <div className="font-weight-semibold d-flex align-items-center">
                                                {incomeStatementRenderText[appContext.locale]["Date range"] + (datesToRequest.length > 1? (" " + (i + 1)) : "" )}
                                                <button className={"btn btn-light py-0 px-1 mx-1 border-0 " + (datesToRequest.length > 1 ? "" : " invisible")} onClick={() => handleRemoveDateRangeButton(i)}>
                                                    <i className="ion ion-md-close fa-fw"></i>
                                                </button>
                                            </div>
                                            <Select
                                                className="col-6 px-0"
                                                classNamePrefix="form-control"
                                                options={dateRangePresets}
                                                menuPortalTarget={document.body}
                                                menuShouldScrollIntoView={false}
                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                                onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                                placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                                value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between text-start align-items-center my-1">
                                            <label className="my-0 col-3 px-0">
                                                {incomeStatementRenderText[appContext.locale]["From:"]} 
                                            </label>
                                            <input 
                                                type="date" 
                                                placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                className="form-control" 
                                                value={datesToRequest[i].startDate} 
                                                onChange={event => handleChangeStartDate(event.target.value, i)} 
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between text-start align-items-center mb-2">
                                            <label className="my-0 col-3 px-0">
                                                {incomeStatementRenderText[appContext.locale]["To:"]}
                                            </label>
                                            <input 
                                                type="date" 
                                                placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                                className="form-control" 
                                                value={datesToRequest[i].endDate} 
                                                onChange={event => handleChangeEndDate(event.target.value, i)} 
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {datesToRequest.length < 3
                            ?   <div className="mb-2">
                                    <Link replace to="#" onClick={handleCompareButton} className="text-decoration-none">
                                    <i className="ion ion-md-add"></i> {incomeStatementRenderText[appContext.locale]["Compare"]}                            </Link>
                                </div>
                            : null
                        }
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="form-check form-switch">
                                <input type="checkbox" role="switch" id="detailedViewCheckbox" className="form-check-input" value={detailedView} onChange={toggleDetailedView} />
                                <label htmlFor="detailedViewCheckbox" className="my-0 form-check-label">{incomeStatementRenderText[appContext.locale]["Detailed View"]}</label>
                            </div>
                            <button type="submit" className="btn btn-primary width-200" onClick={handleUpdateReportButton}>
                                {incomeStatementRenderText[appContext.locale]["Update report"]}
                            </button>
                        </div>
                    </form>
                </CardBody>
            </Card>
            <PerfectScrollbar>
                <div className="min-width-md">
                    <div className="d-flex justify-content-between font-weight-semibold text-end">
                        <div>{/*empty div for spacing*/}</div>
                        <div className="text-end d-flex">
                            {columnLabels.map((columnLabel, i) => {
                                    return(
                                        <div className="pseudo-td width-175" key={i}>
                                            {columnLabel.label === "Custom"
                                            ?   <>
                                                    <div>
                                                        {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(columnLabel.startDate)}
                                                    </div>
                                                    <div>
                                                        {incomeStatementRenderText[appContext.locale]["To:"] + " " + localizeDate(columnLabel.endDate)}
                                                    </div>
                                                </>
                                            : columnLabel.label}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        {(loading || !incomeStatementObjects.length)
                            ? <LoadingSpinner big />
                            : <div>
                                <>
                                    <StripedRow className="font-weight-semibold">
                                        {incomeStatementRenderText[appContext.locale]["Income"]}
                                    </StripedRow>
                                    {incomeStatementObjects[0].accounts
                                            .filter(account => account.accountTypeId == 4)
                                            .map(account => {
                                                return(
                                                    <React.Fragment key={account.accountId}>
                                                        <StripedRow className="indent justify-content-between font-weight-semibold">
                                                            <div>
                                                                {account.accountName}
                                                            </div>
                                                            <div className="text-end d-flex">
                                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                                    let specificAccount = incomeStatement.accounts.find(specificAccount => specificAccount.accountId === account.accountId);
                                                                    return(
                                                                        <div key={i} className={"width-175"}>
                                                                            {formatNumber(specificAccount.debitsMinusCredits * -1)}
                                                                        </div>    
                                                                    )
                                                                })}
                                                            </div>
                                                        </StripedRow>
                                                        {detailedView
                                                            ? incomeStatementObjects[0].accounts
                                                                .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                                .map(childAccount => {
                                                                    return(
                                                                        <StripedRow className="indent-2 justify-content-between" key={childAccount.accountId}>
                                                                            <div>
                                                                                {childAccount.accountName}
                                                                            </div>
                                                                            <div className="text-end d-flex">
                                                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                                                    let specificChildAccount = incomeStatement.accounts.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId);
                                                                                    return(
                                                                                        <div key={i} className={"width-175 "}>
                                                                                            {formatNumber(specificChildAccount.debitsMinusCredits * -1)}
                                                                                        </div>
                                                                                    )
                                                                                })}
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
                                        <div className="text-end d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                return(
                                                    <div key={i} className={"width-175 "}>
                                                        {formatNumber(incomeStatement.totalIncome)}
                                                    </div>              
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                    <StripedRow>
                                        <div className="invisible">{/** empty row */} empty row </div>
                                    </StripedRow>
                                    <StripedRow className="font-weight-semibold">
                                        {incomeStatementRenderText[appContext.locale]["Expenses"]}
                                    </StripedRow>
                                    {incomeStatementObjects[0].accounts
                                        .filter(account => account.accountTypeId == 5)
                                        .map(account => {
                                            return(
                                                <React.Fragment key={account.accountId}>
                                                    <StripedRow className="indent justify-content-between font-weight-semibold">
                                                        <div>
                                                            {account.accountName}
                                                        </div>
                                                        <div className="text-end d-flex">
                                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                                let specificAccount = incomeStatement.accounts.find(specificAccount => specificAccount.accountId === account.accountId);
                                                                return(
                                                                    <div key={i} className={"width-175"}>
                                                                        {formatNumber(specificAccount.debitsMinusCredits)}
                                                                    </div>    
                                                                )
                                                            })}
                                                        </div>
                                                    </StripedRow>
                                                    {detailedView
                                                        ? incomeStatementObjects[0].accounts
                                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                            .map(childAccount => {
                                                                return(
                                                                    <StripedRow className="indent-2 justify-content-between" key={childAccount.accountId}>
                                                                        <div>
                                                                            {childAccount.accountName}
                                                                        </div>
                                                                        <div className="text-end d-flex">
                                                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                                                let specificChildAccount = incomeStatement.accounts.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId);
                                                                                return(
                                                                                    <div key={i} className={"width-175 "}>
                                                                                        {formatNumber(specificChildAccount.debitsMinusCredits)}
                                                                                    </div>
                                                                                )
                                                                            })}
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
                                            {incomeStatementRenderText[appContext.locale]["Total expenses"]}
                                        </div>
                                        <div className="text-end d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                return(
                                                    <div key={i} className={"width-175 "}>
                                                        {formatNumber(incomeStatement.totalExpenses)}
                                                    </div>              
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                    <StripedRow>
                                        <div className="invisible">{/** empty row */} empty row </div>
                                    </StripedRow>
                                    <StripedRow className="font-weight-semibold justify-content-between">
                                        <div>
                                            {incomeStatementRenderText[appContext.locale]["Total Income less Expenses"]}
                                        </div>
                                        <div className="text-end d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                return( 
                                                    <div key={i} className="width-175 ">
                                                        {formatNumber(incomeStatement.netIncome)}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                </>
                            </div>
                        }
                    </div>
                </div>
            </PerfectScrollbar>
        </>
    )
}

export default IncomeExpenseRender;