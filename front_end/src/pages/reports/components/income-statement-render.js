import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import axios from 'axios';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { Card, CardBody, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { formatCurrency, getDateInCurrentYear, getTodayAsDateString, localizeDate, validateDate } from '../../../utils/util-fns';
import StripedRow from '../../../components/tables/striped-row';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import StyledSelect from '../../../components/misc/styled-select';

/**
 * INCOME STATEMENT FORMAT
 * 
 * 21 Revenue
 *      Revenue account groups
 *          Total Revenue
 * empty
 * 23 Cost of sales
 *      COS account groups
 *          total COS
 *          Gross Profit 
 * empty
 * Operating Expenses
 *      24 R&D
 *      25 SG&A
 *      26 Depreciation
 *      27 Amortization
 *          Total operating expenses
 * empty
 * Operating income
 * 22 - 28 Other income/expense, net
 * Income before provision for income taxes
 * 29 Income taxes
 * empty
 * Net income
 */

function IncomeStatementRender(props) {
    //optional props: defaultStartDate, defaultEndDate
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);

    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [loading, setLoading] = React.useState(true);

    const [incomeStatementObjects, setIncomeStatementObjects] = React.useState([]);
    const [datesToRequest, setDatesToRequest] = React.useState([{
        label: "Custom",
        startDate: props.defaultStartDate ? props.defaultStartDate : beginningOfCurrentFiscalYear, //cannot use defaultProps here because we would need to call appContext at the top level, so conditional is used here instead
        endDate: props.defaultEndDate ? props.defaultEndDate : today
    }]);
    const [columnLabels, setColumnLabels] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);


    const hasZeroAmountsForFieldInAllDateRanges = (fieldName) => {
        let nonZeroAmount = []
        nonZeroAmount = incomeStatementObjects.filter(incomeStatement => incomeStatement[fieldName] != 0);
        if (nonZeroAmount.length) {
            return false;
        } 
        return true;
    }
    
    const renderRow = (accessor, rowName, baseIndent) => {
        let indentClassName = baseIndent === 1 
            ? "indent" 
            : "indent-" + baseIndent;
        if (hasZeroAmountsForFieldInAllDateRanges(accessor) /* && !detailedView */) {
            return null;
        } else {
            return(
                <StripedRow className={"justify-content-between " + indentClassName}>
                    <div>{incomeStatementRenderText[appContext.locale][rowName]}</div>
                    <div className="text-end d-flex">
                        {incomeStatementObjects.map((incomeStatement, i) => {
                            return(
                                <div key={i} className="width-175">
                                    {numberAsCurrency(incomeStatement[accessor])}
                                </div>
                            )
                        })}
                    </div>
                </StripedRow>
            )
        }
    }
    const renderDetails = (subtypeId, typeId, baseIndent) => {
        let incrementIndent = baseIndent + 1;
        let baseIndentClassName = baseIndent === 1 
            ? "indent" 
            : "indent-" + baseIndent;
        let incrementIndentClassName = "indent-" + (incrementIndent);
        if (detailedView) {
            return (
                incomeStatementObjects[0].accountBalances
                    .filter(account => account.accountSubtypeId === subtypeId)
                    .map(account => {
                        return (
                            zeroDebitsMinusCreditsInAccount(account)
                                ? null
                                : <React.Fragment key={account.accountId}>
                                    <StripedRow className={"justify-content-between " + baseIndentClassName}>
                                        <div>{account.accountName}</div>
                                        <div className="text-end d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                let accountDebitsMinusCredits = incomeStatement.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits;
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(sumDebitsAndCreditsOfChildren(account.accountId, i) * (typeId === 5 ? 1 : -1))}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                    {incomeStatementObjects[0].accountBalances
                                        .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                        .map(childAccount => {
                                            return (
                                                zeroDebitsMinusCreditsInAccount(childAccount)
                                                    ? null
                                                    : <StripedRow key={childAccount.accountId} className={"justify-content-between " + incrementIndentClassName}>
                                                        <div>{childAccount.accountName}</div>
                                                        <div className="text-end d-flex">
                                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                                let childAccountDebitsMinusCredits = incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits;
                                                                return(
                                                                    <div key={i} className="width-175">
                                                                        {numberAsCurrency(typeId === 5 ? childAccountDebitsMinusCredits: childAccountDebitsMinusCredits * -1)}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </StripedRow>
                                            )
                                        })}
                                </React.Fragment>
                        )
                    })
            )
        } else {
            return null;
        }
    }

    const requestIncomeStatementObjects = async arrayToStoreObjects => {
        let newColumnLabels = [];
        for (const dateObject of datesToRequest) {
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeStatement/${dateObject.startDate}/${dateObject.endDate}`).then(response => {
                newColumnLabels.push(dateObject);     //column labels are not updated until the report is actually updated
                arrayToStoreObjects.push(response.data);
            }).catch(console.log);
        }
        setColumnLabels(newColumnLabels);
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
                setDateRangePresets(response.data);
            })
            let fetchedIncomeStatementObjects = [];
            await requestIncomeStatementObjects(fetchedIncomeStatementObjects);
            setIncomeStatementObjects(fetchedIncomeStatementObjects);
            setLoading(false);
        }
        fetchData();
    }, []);

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

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return formatCurrency(appContext.locale, appContext.currency, 0);
        }
        return formatCurrency(appContext.locale, appContext.currency, number);
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
            endDate:today}
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

    const handleUpdateReportButton = async (event) => {
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

    const sumDebitsAndCreditsOfChildren = (accountId, indexOfIncomeStatementObject) => {
        let total = 0;
        let childAccounts = incomeStatementObjects[indexOfIncomeStatementObject]
            .accountBalances
            .filter(childAccount => childAccount.parentAccountId === accountId);
        childAccounts
            .forEach(account => {
                if (account.debitsMinusCredits) {
                    total += account.debitsMinusCredits;
                }
        })
        return total;
    }

    //returns true if debitsMinusCredits of an account is zero for all date ranges selected by the user
    const zeroDebitsMinusCreditsInAccount = (account) => {
        for (let i = 0; i < incomeStatementObjects.length; i++) {
            let accountForThisDatePeriod = incomeStatementObjects[i].accountBalances.find(specificAccount => specificAccount.accountId === account.accountId);
            if (account.hasChildren) {
                if (sumDebitsAndCreditsOfChildren(account.accountId, i)) {
                    return false;
                }    
            } else {
                if (accountForThisDatePeriod.debitsMinusCredits) {
                    return false;
                }
            }
        }
        return true;
    }
    
    return (
        <>
            <Card className="very-rounded shadow-sm bg-light my-4">
                <CardBody className="">
                    <Alert isOpen={invalidDateAlert} color="danger">
                        {incomeStatementRenderText[appContext.locale]["Invalid date(s) selected."]}
                    </Alert>
                    <form onSubmit={handleUpdateReportButton}>
                        <div className="mb-2">
                            <h2 className="h5 my-0">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
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
                                            <StyledSelect
                                                className="col-4 px-0"
                                                options={dateRangePresets}
                                                menuShouldScrollIntoView={false}
                                                onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                                placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                                value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                            />
                                            <label className="my-0 text-end col-1 px-2" htmlFor={`start-date=${i}`}>
                                                {incomeStatementRenderText[appContext.locale]["From:"]}
                                            </label>
                                            <div className="col-3">
                                                <input 
                                                    type="date" 
                                                    id={`start-date=${i}`}
                                                    placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]} 
                                                    className="form-control" value={datesToRequest[i].startDate} 
                                                    onChange={event => handleChangeStartDate(event.target.value, i)} 
                                                />
                                            </div>
                                            <label className="my-0 text-end col-1 px-2" htmlFor={`end-date=${i}`}>
                                                {incomeStatementRenderText[appContext.locale]["To:"]} 
                                            </label>
                                            <div className="col-3">
                                                <input 
                                                    type="date" 
                                                    id={`end-date=${i}`}
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
                                            <StyledSelect
                                                className="col-6 px-0"
                                                options={dateRangePresets}
                                                menuShouldScrollIntoView={false}
                                                onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                                placeholder={balanceSheetRenderText[appContext.locale]["Custom"]}
                                                value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between text-start align-items-center my-1">
                                            <label className="my-0 col-3 px-0" htmlFor={`small-screen-start-date-${i}`}>
                                                {incomeStatementRenderText[appContext.locale]["From:"]} 
                                            </label>
                                            <input 
                                                type="date" 
                                                id={`small-screen-start-date-${i}`}
                                                placeholder={incomeStatementRenderText[appContext.locale]["yyyy-mm-dd"]}
                                                className="form-control" 
                                                value={datesToRequest[i].startDate} 
                                                onChange={event => handleChangeStartDate(event.target.value, i)} 
                                            />
                                        </div>
                                        <div className="d-flex justify-content-between text-start align-items-center mb-2">
                                            <label className="my-0 col-3 px-0" htmlFor={`small-screen-end-date-${i}`}>
                                                {incomeStatementRenderText[appContext.locale]["To:"]} 
                                            </label>
                                            <input 
                                                type="date" 
                                                id={`small-screen-end-date-${i}`}
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
                        {
                            columnLabels.map((columnLabel, i) => {
                                return(
                                    <div className="pseudo-td width-175" key={i}>
                                        {columnLabel.label === "Custom"
                                        ?   <>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(columnLabel.startDate)}
                                                </div>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["To:"] + " " +  localizeDate(columnLabel.endDate)}
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
                                {!(incomeStatementObjects[0].accountBalances.filter(account => account.accountSubtypeId === incomeStatementObjects[0].revenueSubtypeId).length) 
                                    ? null 
                                    : <>
                                        <StripedRow className="font-weight-semibold">
                                            {incomeStatementRenderText[appContext.locale]["Revenue"]}
                                        </StripedRow>
                                        {incomeStatementObjects[0].accountBalances
                                            .filter(account => account.accountSubtypeId === incomeStatementObjects[0].revenueSubtypeId)
                                            .map(account => {
                                                return (
                                                    zeroDebitsMinusCreditsInAccount(account)
                                                        ? null
                                                        : <React.Fragment key={account.accountId}>
                                                            <StripedRow className="justify-content-between indent">
                                                                <div>{account.accountName}</div>
                                                                <div className="text-end d-flex">
                                                                    {incomeStatementObjects.map((incomeStatement, i) => {
                                                                        return(
                                                                            <div key={i} className="width-175">
                                                                                {numberAsCurrency(sumDebitsAndCreditsOfChildren(account.accountId, i) * -1)}
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </StripedRow>
                                                            {detailedView 
                                                                ? incomeStatementObjects[0].accountBalances
                                                                    .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                                    .map(childAccount => {
                                                                        return (
                                                                            zeroDebitsMinusCreditsInAccount(childAccount)
                                                                                ? null
                                                                                : <StripedRow key={childAccount.accountId} className="justify-content-between indent-2">
                                                                                    <div>{childAccount.accountName}</div>
                                                                                    <div className="text-end d-flex">
                                                                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                                                                            return(
                                                                                                <div key={i} className="width-175">
                                                                                                    {numberAsCurrency(incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
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
                                            })
                                        }
                                        <StripedRow className="justify-content-between font-weight-semibold">
                                            <div>{incomeStatementRenderText[appContext.locale]["Total revenue"]}</div>
                                            <div className="text-end d-flex">
                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                    return(
                                                        <div key={i} className="width-175">
                                                            {numberAsCurrency(incomeStatement.totalRevenue)}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </StripedRow>
                                        <StripedRow>
                                            <div className="invisible">{/** empty row */} empty row </div>
                                        </StripedRow>
                                    </>
                                }
                                <StripedRow className="font-weight-semibold">
                                    {incomeStatementRenderText[appContext.locale]["Cost of sales"]}
                                </StripedRow>
                                {incomeStatementObjects[0].accountBalances
                                    .filter(account => account.accountSubtypeId === incomeStatementObjects[0].costOfSalesSubtypeId)
                                    .map(account => {
                                        return (
                                            zeroDebitsMinusCreditsInAccount(account)
                                                ? null
                                                : <React.Fragment key={account.accountId}>
                                                    <StripedRow className="justify-content-between indent">
                                                        <div>{account.accountName}</div>
                                                        <div className="text-end d-flex">
                                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                                return(
                                                                    <div key={i} className="width-175">
                                                                        {numberAsCurrency(sumDebitsAndCreditsOfChildren(account.accountId, i))}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </StripedRow>
                                                    {detailedView
                                                        ? incomeStatementObjects[0].accountBalances
                                                            .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                            .map(childAccount => {
                                                                return (
                                                                    zeroDebitsMinusCreditsInAccount(childAccount)
                                                                        ? null
                                                                        : <StripedRow key={childAccount.accountId} className="justify-content-between indent-2">
                                                                            <div>{childAccount.accountName}</div>
                                                                            <div className="text-end d-flex">
                                                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                                                    return(
                                                                                        <div key={i} className="width-175">
                                                                                            {numberAsCurrency(incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits)}
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
                                    })
                                }
                                <StripedRow className="justify-content-between font-weight-semibold ">
                                    <div>{incomeStatementRenderText[appContext.locale]["Total cost of sales"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.totalCostOfSales)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow>
                                    <div className="invisible">{/** empty row */} empty row </div>
                                </StripedRow>

                                <StripedRow className="justify-content-between font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Gross profit"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.grossProfit)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>

                                <StripedRow>
                                    <div className="invisible">{/* empty row */} empty row</div>
                                </StripedRow>

                                <StripedRow className="font-weight-semibold">
                                    {incomeStatementRenderText[appContext.locale]["Operating expenses"]}
                                </StripedRow>
                                {renderRow("totalResearchAndDevelopment", "Research and development", 1)}
                                {renderDetails(incomeStatementObjects[0].researchAndDevelopmentSubtypeId, 5, 2)}
                                {renderRow("totalSalesGeneralAndAdministration", "Sales, general, and administration", 1)}
                                {renderDetails(incomeStatementObjects[0].sgaSubtypeId, 5, 2)}
                                {renderRow("totalDepreciationAndAmortization", "Depreciation and amortization", 1)}
                                {renderDetails(incomeStatementObjects[0].depreciationAmortizationSubtypeId, 5, 2)}
                                <StripedRow className="justify-content-between font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Total operating expenses"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.totalOperatingExpenses)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow>
                                    <div className="invisible">{/* empty row */} empty row</div>
                                </StripedRow>
                                <StripedRow className="justify-content-between font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Operating income"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.operatingIncome)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow>
                                    <div className="invisible">{/* empty row */} empty row</div>
                                </StripedRow>
                                <StripedRow className="font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Other income/expense"]}</div>
                                </StripedRow>
                                {(hasZeroAmountsForFieldInAllDateRanges("incomeFromInvesting") && hasZeroAmountsForFieldInAllDateRanges("expenseFromInvesting")) 
                                    ? null 
                                    : <StripedRow className="justify-content-between indent">
                                        <div>{incomeStatementRenderText[appContext.locale]["Net income/expense from investing activities"]}</div>
                                        <div className="text-end d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(incomeStatement["incomeFromInvesting"] - incomeStatement["expenseFromInvesting"])}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                }
                                {renderDetails(incomeStatementObjects[0].incomeFromInvestingSubtypeId, 4, 2)}
                                {renderDetails(incomeStatementObjects[0].expenseFromInvestingSubtypeId, 4, 2) /** Use a negative number for expenses here since it is a component of other income/expense net*/}
                                {(hasZeroAmountsForFieldInAllDateRanges("incomeFromFinancing") && hasZeroAmountsForFieldInAllDateRanges("expenseFromFinancing")) 
                                    ? null 
                                    : <StripedRow className="justify-content-between indent">
                                        <div>{incomeStatementRenderText[appContext.locale]["Net income/expense from financing activities"]}</div>
                                        <div className="text-end d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(incomeStatement["incomeFromFinancing"] - incomeStatement["expenseFromFinancing"])}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </StripedRow>
                                }
                                {renderDetails(incomeStatementObjects[0].incomeFromFinancingSubtypeId, 4, 2)}
                                {renderDetails(incomeStatementObjects[0].expenseFromFinancingSubtypeId, 4, 2) /** similar reason for using the wrong accountTypeId here as above */}
                                {hasZeroAmountsForFieldInAllDateRanges("interestIncome") 
                                    ? null
                                    : <>
                                        <StripedRow className="justify-content-between indent">
                                            <div>{incomeStatementRenderText[appContext.locale]["Interest income"]}</div>
                                            <div className="text-end d-flex">
                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                    return(
                                                        <div key={i} className="width-175">
                                                            {numberAsCurrency(incomeStatement.interestIncome)}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </StripedRow>
                                        {renderDetails(incomeStatementObjects[0].interestIncomeSubtypeId, 4, 2)}
                                    </>
                                }
                                <StripedRow className="justify-content-between font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Total other income/expense, net"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.totalOtherIncomeExpense)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow>
                                    <div className="invisible">{/* empty row */} empty row</div>
                                </StripedRow>
                                <StripedRow className=" justify-content-between font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Earnings before interest and tax"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.ebit)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="justify-content-between">
                                    <div>{incomeStatementRenderText[appContext.locale]["Interest expense"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.interestExpense)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                {renderDetails(incomeStatementObjects[0].interestExpenseSubtypeId, 5, 1)}
                                <StripedRow className="justify-content-between font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Earnings before tax"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.earningsBeforeTax)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                <StripedRow className="justify-content-between">
                                    <div>{incomeStatementRenderText[appContext.locale]["Tax expense"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.taxExpense)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                                {renderDetails(incomeStatementObjects[0].taxExpenseSubtypeId, 5, 1)}
                                <StripedRow>
                                    <div className="invisible">{/* empty row */} empty row</div>
                                </StripedRow>
                                {hasZeroAmountsForFieldInAllDateRanges("nonRecurringAndExtraordinaryItems") 
                                    ? null 
                                    : <>
                                        <StripedRow className=" justify-content-between">
                                            <div>{incomeStatementRenderText[appContext.locale]["Non-recurring and extraordinary items"]}</div>
                                            <div className="text-end d-flex">
                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                    return(
                                                        <div key={i} className="width-175">
                                                            {numberAsCurrency(incomeStatement.nonRecurringAndExtraordinaryItems)}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </StripedRow>
                                        {renderDetails(incomeStatementObjects[0].nonRecurringSubtypeId, 5, 1)}
                                        <StripedRow className="striped-row">
                                            <div className="invisible">{/* empty row */} empty row</div>
                                        </StripedRow>
                                    </>
                                }
                                <StripedRow className="justify-content-between font-weight-semibold">
                                    <div>{incomeStatementRenderText[appContext.locale]["Net income"]}</div>
                                    <div className="text-end d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.netIncome)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </StripedRow>
                            </div>
                        }
                    </div>
                </div>
            </PerfectScrollbar>
        </>
    )
}

export default IncomeStatementRender;