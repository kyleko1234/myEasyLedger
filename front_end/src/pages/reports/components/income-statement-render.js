import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import axios from 'axios';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { Card, CardBody } from 'reactstrap';
import Select from 'react-select';
import { Link } from 'react-router-dom';

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
function IncomeStatementRender() {
    const appContext = React.useContext(PageSettings);
    const dateToday = new Date();
    const today = dateToday.toISOString().split(`T`)[0];

    const getDateInCurrentYear = date => {
        let dateComponentArray = date.split('-');
        return (dateToday.getFullYear() + "-" + dateComponentArray[1] + "-" + dateComponentArray[2]);
    }

    
    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);
    const [startDate, setStartDate] = React.useState(dateToday.getFullYear() + "-01-01");
    const [endDate, setEndDate] = React.useState(dateToday.toISOString().split('T')[0]);
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [loading, setLoading] = React.useState(true);

    const [totalRevenue, setTotalRevenue] = React.useState(null);
    const [totalCostOfSales, setTotalCostOfSales] = React.useState(null);
    const [grossProfit, setGrossProfit] = React.useState(null);
    const [rd, setRd] = React.useState(null);
    const [sga, setSga] = React.useState(null);
    const [da, setDa] = React.useState(null);
    const [totalOperatingExpenses, setTotalOperatingExpenses] = React.useState(null);
    const [operatingIncome, setOperatingIncome] = React.useState(null);
    const [incomeFromInvesting, setIncomeFromInvesting] = React.useState(null);
    const [incomeFromFinancing, setIncomeFromFinancing] = React.useState(null);
    const [expenseFromInvesting, setExpenseFromInvesting] = React.useState(null);
    const [expenseFromFinancing, setExpenseFromFinancing] = React.useState(null);
    const [totalOtherIncomeExpense, setTotalOtherIncomeExpense] = React.useState(null);
    const [ebit, setEbit] = React.useState(null);
    const [interestExpense, setInterestExpense] = React.useState(null);
    const [earningsBeforeTax, setEarningsBeforeTax] = React.useState(null);
    const [taxExpense, setTaxExpense] = React.useState(null);
    const [nonRecurringAndExtraordinaryItems, setNonRecurringAndExtraordinaryItems] = React.useState(null);
    const [netIncome, setNetIncome] = React.useState(null);

    const [revenueSubtypeId, setRevenueSubtypeId] = React.useState(null);
    const [incomeFromInvestingSubtypeId, setIncomeFromInvestingSubtypeId] = React.useState(null);
    const [incomeFromFinancingSubtypeId, setIncomeFromFinancingSubtypeId] = React.useState(null);
    const [expenseFromInvestingSubtypeId, setExpenseFromInvestingSubtypeId] = React.useState(null);
    const [expenseFromFinancingSubtypeId, setExpenseFromFinancingSubtypeId] = React.useState(null);
    const [otherIncomeSubtypeId, setOtherIncomeSubtypeId] = React.useState(null);
    const [costOfSalesSubtypeId, setCostOfSalesSubtypeId] = React.useState(null);
    const [researchAndDevelopmentSubtypeId, setResearchAndDevelopmentSubtypeId] = React.useState(null);
    const [sgaSubtypeId, setSgaSubtypeId] = React.useState(null);
    const [depreciationAmortizationSubtypeId, setDepreciationAmortizationSubtypeId] = React.useState(null);
    const [otherExpensesSubtypeId, setOtherExpensesSubtypeId] = React.useState(null);
    const [interestExpenseSubtypeId, setInterestExpenseSubtypeId] = React.useState(null);
    const [taxExpenseSubtypeId, setTaxExpenseSubtypeId] = React.useState(null);
    const [nonRecurringSubtypeId, setNonRecurringSubtypeId] = React.useState(null);

    const [accountBalances, setAccountBalances] = React.useState(null);

    const [incomeStatementObjects, setIncomeStatementObjects] = React.useState([]);
    const [datesToRequest, setDatesToRequest] = React.useState([{
        label: "Custom",
        startDate: beginningOfCurrentFiscalYear,
        endDate: today
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
    
    const renderRow = (accessor, rowName) => {
        if (hasZeroAmountsForFieldInAllDateRanges(accessor)) {
            return null;
        } else {
            return(
                <div className="striped-row justify-content-between indent">
                    <div>{incomeStatementRenderText[appContext.locale][rowName]}</div>
                    <div className="text-right d-flex">
                        {incomeStatementObjects.map((incomeStatement, i) => {
                            return(
                                <div key={i} className="width-175">
                                    {numberAsCurrency(incomeStatement[accessor])}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
    const renderDetails = (subtypeId, typeId) => {
        if (detailedView) {
            return (
                incomeStatementObjects[0].accountBalances
                    .filter(account => account.accountSubtypeId === subtypeId)
                    .map(account => {
                        return (
                            <React.Fragment key={account.accountId}>
                                <div className="striped-row justify-content-between indent-2">
                                    <div>{account.accountName}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            let accountDebitsMinusCredits = incomeStatement.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits;
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(typeId === 5 ? accountDebitsMinusCredits: accountDebitsMinusCredits * -1)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {incomeStatementObjects[0].accountBalances
                                    .filter(childAccount => childAccount.parentAccountId === account.accountId)
                                    .map(childAccount => {
                                        return (
                                            <div key={childAccount.accountId} className="striped-row justify-content-between indent-3">
                                                <div>{childAccount.accountName}</div>
                                                <div className="text-right d-flex">
                                                    {incomeStatementObjects.map((incomeStatement, i) => {
                                                        let childAccountDebitsMinusCredits = incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits;
                                                        return(
                                                            <div key={i} className="width-175">
                                                                {numberAsCurrency(typeId === 5 ? childAccountDebitsMinusCredits: childAccountDebitsMinusCredits * -1)}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
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
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}`).then(response => {
                let formattedPresets = response.data.map(preset => {
                    return{
                        value: preset.name,
                        label: preset.name,
                        object: preset
                    }
                })
                setDateRangePresets(formattedPresets);
            })
            let fetchedIncomeStatementObjects = [];
            await requestIncomeStatementObjects(fetchedIncomeStatementObjects);
            setIncomeStatementObjects(fetchedIncomeStatementObjects);

            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/incomeStatement/${startDate}/${endDate}`).then(response => {
                if (response.data) {
                    setTotalRevenue(response.data.totalRevenue);
                    setTotalCostOfSales(response.data.totalCostOfSales);
                    setGrossProfit(response.data.grossProfit);
                    setRd(response.data.totalResearchAndDevelopment);
                    setSga(response.data.totalSalesGeneralAndAdministration);
                    setDa(response.data.totalDepreciationAndAmortization);
                    setTotalOperatingExpenses(response.data.totalOperatingExpenses);
                    setOperatingIncome(response.data.operatingIncome);
                    setIncomeFromInvesting(response.data.incomeFromInvesting);
                    setIncomeFromFinancing(response.data.incomeFromFinancing);
                    setExpenseFromInvesting(response.data.expenseFromInvesting);
                    setExpenseFromFinancing(response.data.expenseFromFinancing);
                    setTotalOtherIncomeExpense(response.data.totalOtherIncomeExpense);
                    setEbit(response.data.ebit);
                    setInterestExpense(response.data.interestExpense);
                    setEarningsBeforeTax(response.data.earningsBeforeTax);
                    setTaxExpense(response.data.taxExpense);
                    setNonRecurringAndExtraordinaryItems(response.data.nonRecurringAndExtraordinaryItems);
                    setNetIncome(response.data.netIncome);
                    setRevenueSubtypeId(response.data.revenueSubtypeId);
                    setIncomeFromInvestingSubtypeId(response.data.incomeFromInvestingSubtypeId);
                    setIncomeFromFinancingSubtypeId(response.data.incomeFromFinancingSubtypeId);
                    setExpenseFromInvestingSubtypeId(response.data.expenseFromInvestingSubtypeId);
                    setExpenseFromFinancingSubtypeId(response.data.expenseFromFinancingSubtypeId);
                    setOtherIncomeSubtypeId(response.data.otherIncomeSubtypeId);
                    setCostOfSalesSubtypeId(response.data.costOfSalesSubtypeId);
                    setResearchAndDevelopmentSubtypeId(response.data.researchAndDevelopmentSubtypeId);
                    setSgaSubtypeId(response.data.sgaSubtypeId);
                    setDepreciationAmortizationSubtypeId(response.data.depreciationAmortizationSubtypeId);
                    setOtherExpensesSubtypeId(response.data.otherExpensesSubtypeId);
                    setInterestExpenseSubtypeId(response.data.interestExpenseSubtypeId);
                    setTaxExpenseSubtypeId(response.data.setTaxExpenseSubtypeId);
                    setNonRecurringSubtypeId(response.data.nonRecurringSubtypeId);
                    let rawAccountBalances = response.data.accountBalances;
                    rawAccountBalances.forEach(account => {
                        if (account.hasChildren) {
                            let totalDebits = 0;
                            let totalCredits = 0;
                            rawAccountBalances.filter(childAccount => childAccount.parentAccountId == account.accountId).forEach(childAccount => {
                                totalDebits = totalDebits + childAccount.debitTotal;
                                totalCredits = totalCredits + childAccount.creditTotal;
                            })
                            account.debitTotal = totalDebits;
                            account.creditTotal = totalCredits;
                            account.debitsMinusCredits = totalDebits - totalCredits;
                        }
                    })
                    setAccountBalances(rawAccountBalances);
                }
            }).catch(error => {
                console.log(error);
            });
            setLoading(false);
        }
        fetchData();
    }, [startDate, endDate]);

    const handleChangeStartDate = (date, i) => {
        let newDatesToRequestArray = datesToRequest.slice();
        newDatesToRequestArray[i] = {
            label: "Custom", startDate: date
        }
        setDatesToRequest(newDatesToRequestArray)
    }
    const handleChangeEndDate = (date, i) => {
        let newDatesToRequestArray = datesToRequest.slice();
        newDatesToRequestArray[i] = {
            label: "Custom", endDate: date
        }
        setDatesToRequest(newDatesToRequestArray)
    }

    const numberAsCurrency = (number) => {
        if (number == 0) {
            return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(0);
        }
        return new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(number)
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
    
    const handleUpdateReportButton = async () => {
        setLoading(true);
        let fetchedIncomeStatementObjects = [];
        await requestIncomeStatementObjects(fetchedIncomeStatementObjects);
        setIncomeStatementObjects(fetchedIncomeStatementObjects);
        setLoading(false);
    }



    return (
        <>
            <Card className="very-rounded shadow-sm bg-light my-4">
                <CardBody className="">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="h5 my-0">{incomeStatementRenderText[appContext.locale]["Options"]}</h2>
                        <button className="btn btn-primary" onClick={handleUpdateReportButton}>
                            {incomeStatementRenderText[appContext.locale]["Update report"]}
                        </button>
                    </div>
                    <div className="d-none d-md-block">
                        {datesToRequest.map((dateObject, i) => {
                            return (
                                <div key={i}>
                                    {datesToRequest.length > 1
                                    ?   <div className="font-weight-600 my-1 d-flex align-items-center">
                                            {incomeStatementRenderText[appContext.locale]["Date range"] + " " + (i + 1)}
                                            <button className="btn btn-light py-0 px-1 mx-1 border-0" onClick={() => handleRemoveDateRangeButton(i)}>
                                                <i className="ion ion-md-close fa-fw"></i>
                                            </button>
                                        </div>
                                    : null}
                                    <div className="d-flex w-100 align-items-center mb-2">
                                        <Select
                                            className="col-4 px-0"
                                            options={dateRangePresets}
                                            menuPortalTarget={document.body}
                                            menuShouldScrollIntoView={false}
                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                            onChange={selectedOption => handleSelectDateRangePreset(selectedOption, i)}
                                            placeholder={"Custom"}
                                            value={datesToRequest[i].label === "Custom" ? null : dateRangePresets.find(preset => preset.label == datesToRequest[i].label)}
                                        />
                                        <label className="my-0 text-right col-1 px-2">{incomeStatementRenderText[appContext.locale]["From:"]} </label>
                                        <input type="date" className="form-control col-3" value={datesToRequest[i].startDate} onChange={event => handleChangeStartDate(event.target.value, i)} />
                                        <label className="my-0 text-right col-1 px-2">{incomeStatementRenderText[appContext.locale]["To:"]} </label>
                                        <input type="date" className="form-control col-3" value={datesToRequest[i].endDate} onChange={event => handleChangeEndDate(event.target.value, i)} />
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
                    : null}
                    <div className="custom-control custom-switch">
                        <input type="checkbox" id="detailedViewCheckbox" className="custom-control-input" value={detailedView} onChange={toggleDetailedView} />
                        <label htmlFor="detailedViewCheckbox" className="my-0 custom-control-label">{incomeStatementRenderText[appContext.locale]["Detailed View"]}</label>
                    </div>

                </CardBody>
            </Card>
            <div className="overflow-auto">
                <div className="min-width-lg">
                    <div className="d-flex justify-content-between font-weight-600 text-right">
                        <div>{/*empty div for spacing*/}</div>
                        <div className="text-right d-flex">
                        {
                            columnLabels.map((columnLabel, i) => {
                                return(
                                    <div className="td width-175" key={i}>
                                        {columnLabel.label === "Custom"
                                        ?   <>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["From:"] + " " + columnLabel.startDate}
                                                </div>
                                                <div>
                                                    {incomeStatementRenderText[appContext.locale]["To:"] + " " + columnLabel.endDate}
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
                        {(loading || !incomeStatementObjects.length) ? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                            <div>
                                {!(accountBalances.filter(account => account.accountSubtypeId === revenueSubtypeId).length) ? null :
                                    <>
                                        <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Revenue"]}</div>
                                        {incomeStatementObjects[0].accountBalances
                                            .filter(account => account.accountSubtypeId === revenueSubtypeId)
                                            .map(account => {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <div className="striped-row justify-content-between indent">
                                                            <div>{account.accountName}</div>
                                                            <div className="text-right d-flex">
                                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                                    return(
                                                                        <div key={i} className="width-175">
                                                                            {numberAsCurrency(incomeStatement.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits * -1)}
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                        {detailedView ?
                                                            incomeStatementObjects[0].accountBalances
                                                                .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                                .map(childAccount => {
                                                                    return (
                                                                        <div key={childAccount.accountId} className="striped-row justify-content-between indent-2">
                                                                            <div>{childAccount.accountName}</div>
                                                                            <div className="text-right d-flex">
                                                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                                                    return(
                                                                                        <div key={i} className="width-175">
                                                                                            {numberAsCurrency(incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits * -1)}
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            : null}
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                        <div className="striped-row justify-content-between indent-2 font-weight-600">
                                            <div>{incomeStatementRenderText[appContext.locale]["Total revenue"]}</div>
                                            <div className="text-right d-flex">
                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                    return(
                                                        <div key={i} className="width-175">
                                                            {numberAsCurrency(incomeStatement.totalRevenue)}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="striped-row">
                                            <div className="invisible">{/** empty row */} empty row </div>
                                        </div>
                                    </>
                                }
                                <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Cost of sales"]}</div>
                                {incomeStatementObjects[0].accountBalances
                                    .filter(account => account.accountSubtypeId === costOfSalesSubtypeId)
                                    .map(account => {
                                        return (
                                            <React.Fragment key={account.accountId}>
                                                <div className="striped-row justify-content-between indent-2">
                                                    <div>{incomeStatementRenderText[appContext.locale]["Total cost of sales"]}</div>
                                                    <div className="text-right d-flex">
                                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                                            return(
                                                                <div key={i} className="width-175">
                                                                    {numberAsCurrency(incomeStatement.accountBalances.find(specificAccount => specificAccount.accountId === account.accountId).debitsMinusCredits)}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                {detailedView ?
                                                    incomeStatementObjects[0].accountBalances
                                                        .filter(childAccount => childAccount.parentAccountId == account.accountId)
                                                        .map(childAccount => {
                                                            return (
                                                                <div key={childAccount.accountId} className="striped-row justify-content-between indent-2">
                                                                    <div>{childAccount.accountName}</div>
                                                                    <div className="text-right d-flex">
                                                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                                                            return(
                                                                                <div key={i} className="width-175">
                                                                                    {numberAsCurrency(incomeStatement.accountBalances.find(specificChildAccount => specificChildAccount.accountId === childAccount.accountId).debitsMinusCredits)}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    : null}
                                            </React.Fragment>
                                        )

                                    })
                                }
                                <div className="striped-row justify-content-between font-weight-600 indent-2">
                                    <div>{incomeStatementRenderText[appContext.locale]["Total cost of sales"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.totalCostOfSales)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="striped-row">
                                    <div className="invisible">{/** empty row */} empty row </div>
                                </div>

                                <div className="striped-row justify-content-between font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Gross profit"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.grossProfit)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>

                                <div className="striped-row font-weight-600">{incomeStatementRenderText[appContext.locale]["Operating expenses"]}</div>
                                {renderRow("totalResearchAndDevelopment", "Research and development")}
                                {renderDetails(incomeStatementObjects[0].researchAndDevelopmentSubtypeId, 5)}
                                {renderRow("totalSalesGeneralAndAdministration", "Sales, general, and administration")}
                                {renderDetails(incomeStatementObjects[0].sgaSubtypeId, 5)}
                                {renderRow("totalDepreciationAndAmortization", "Depreciation and amortization")}
                                {renderDetails(incomeStatementObjects[0].depreciationAmortizationSubtypeId, 5)}
                                <div className="striped-row justify-content-between indent-2 font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Total operating expenses"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.totalOperatingExpenses)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                                
                                <div className="striped-row justify-content-between font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Operating income"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.operatingIncome)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>

                                <div className="striped-row font-weight-600"><div>{incomeStatementRenderText[appContext.locale]["Other income/expense"]}</div></div>

                                {(hasZeroAmountsForFieldInAllDateRanges("incomeFromInvesting") && hasZeroAmountsForFieldInAllDateRanges("expenseFromInvesting")) ? null : 
                                    <div className="striped-row justify-content-between indent">
                                        <div>{incomeStatementRenderText[appContext.locale]["Net income/expense from investing activities"]}</div>
                                        <div className="text-right d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(incomeStatement[incomeFromInvesting] - incomeStatement[expenseFromInvesting])}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                }
                                {renderDetails(incomeFromInvestingSubtypeId, 4)}
                                {renderDetails(expenseFromInvestingSubtypeId, 4) /** Use a negative number for expenses here since it is a component of other income/expense net*/}
                                {(hasZeroAmountsForFieldInAllDateRanges("incomeFromFinancing") && hasZeroAmountsForFieldInAllDateRanges("expenseFromFinancing")) ? null : 
                                    <div className="striped-row justify-content-between indent">
                                        <div>{incomeStatementRenderText[appContext.locale]["Net income/expense from financing activities"]}</div>
                                        <div className="text-right d-flex">
                                            {incomeStatementObjects.map((incomeStatement, i) => {
                                                return(
                                                    <div key={i} className="width-175">
                                                        {numberAsCurrency(incomeStatement[incomeFromFinancing] - incomeStatement[expenseFromFinancing])}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                }
                                {renderDetails(incomeFromFinancingSubtypeId, 4)}
                                {renderDetails(expenseFromFinancingSubtypeId, 4) /** similar reason for using the wrong accountTypeId here as above */}
                                <div className="striped-row justify-content-between indent-2 font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Total other income/expense, net"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.totalOtherIncomeExpense)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>

                                <div className="striped-row justify-content-between font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Earnings before interest and tax"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.ebit)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row justify-content-between">
                                    <div>{incomeStatementRenderText[appContext.locale]["Interest expense"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.interestExpense)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row justify-content-between font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Earnings before tax"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.earningsBeforeTax)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row justify-content-between">
                                    <div>{incomeStatementRenderText[appContext.locale]["Tax expense"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.taxExpense)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                                {hasZeroAmountsForFieldInAllDateRanges("nonRecurringAndExtraordinaryItems") ? null : 
                                    <>
                                        <div className="striped-row justify-content-between">
                                            <div>{incomeStatementRenderText[appContext.locale]["Non-recurring and extraordinary items"]}</div>
                                            <div className="text-right d-flex">
                                                {incomeStatementObjects.map((incomeStatement, i) => {
                                                    return(
                                                        <div key={i} className="width-175">
                                                            {numberAsCurrency(incomeStatement.nonRecurringAndExtraordinaryItems)}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="striped-row"><div className="invisible">{/* empty row */} empty row</div></div>
                                    </>
                                }
                      
                                <div className="striped-row justify-content-between font-weight-600">
                                    <div>{incomeStatementRenderText[appContext.locale]["Net income"]}</div>
                                    <div className="text-right d-flex">
                                        {incomeStatementObjects.map((incomeStatement, i) => {
                                            return(
                                                <div key={i} className="width-175">
                                                    {numberAsCurrency(incomeStatement.netIncome)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default IncomeStatementRender;