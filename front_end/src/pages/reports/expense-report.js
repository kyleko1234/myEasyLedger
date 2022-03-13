import React from 'react';
import { PageSettings } from '../../config/page-settings';
import { useParams } from 'react-router';
import LoadingSpinner from '../../components/misc/loading-spinner';
import DateRangeControls from './components/date-range-controls';
import { formatCurrency, getDateInCurrentYear, getTodayAsDateString, validateDate } from '../../utils/util-fns';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import PersonalExpenseReportRender from './components/personal-expense-report-render';
import EnterpriseExpenseReportRender from './components/enterprise-expense-report-render';
import PersonalExpenseReportPieChart from './components/personal-expense-report-pie-chart';

function ExpenseReport() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();
    const defaultStartDate = params.startDate;
    const defaultEndDate = params.endDate;
    const today = getTodayAsDateString();
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);

    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [loading, setLoading] = React.useState(true);

    const [incomeStatementObjects, setIncomeStatementObjects] = React.useState([]);
    const [datesToRequest, setDatesToRequest] = React.useState([{
        label: "Custom",
        startDate: defaultStartDate ? defaultStartDate : beginningOfCurrentFiscalYear, //cannot use defaultProps here because we would need to call appContext at the top level, so conditional is used here instead
        endDate: defaultEndDate ? defaultEndDate : today
    }]);
    const [columnLabels, setColumnLabels] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);

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

    const sumCreditsMinusDebits = (objects) => {
        let totalDebitsMinusCredits = 0;
        objects.forEach(object => {
            totalDebitsMinusCredits = totalDebitsMinusCredits + object.debitsMinusCredits;
        })
        return totalDebitsMinusCredits * -1;
    }


    return (
        <div>
            <h1 className="page-header">
                Expense Report
            </h1>
            <DateRangeControls 
                datesToRequest={datesToRequest}
                invalidDateAlert={invalidDateAlert}
                handleUpdateReportButton={handleUpdateReportButton}
                handleRemoveDateRangeButton={handleRemoveDateRangeButton}
                dateRangePresets={dateRangePresets}
                handleSelectDateRangePreset={handleSelectDateRangePreset}
                handleChangeStartDate={handleChangeStartDate}
                handleChangeEndDate={handleChangeEndDate}
                detailedView={detailedView}
                toggleDetailedView={toggleDetailedView}
                handleCompareButton={handleCompareButton}
            />
            <div>
                {(appContext.isLoading)
                    ? <LoadingSpinner big />
                    : (appContext.isEnterprise 
                        ? <PersonalExpenseReportPieChart //for now everyone gets the same treatment. TODO make an enterprise version better
                            columnLabels={columnLabels}
                            incomeStatementObjects={incomeStatementObjects}
                            loading={loading}
                        />
                        : <PersonalExpenseReportPieChart
                            columnLabels={columnLabels}
                            incomeStatementObjects={incomeStatementObjects}
                            loading={loading}
                        />
                    )
                }
            </div>
            <hr/>
            <div>
                {(appContext.isLoading)
                    ? <LoadingSpinner big />
                    : (appContext.isEnterprise
                        ? <EnterpriseExpenseReportRender
                            columnLabels={columnLabels}
                            incomeStatementObjects={incomeStatementObjects}
                            loading={loading}
                            numberAsCurrency={numberAsCurrency}
                            detailedView={detailedView}
                        />
                        : <PersonalExpenseReportRender 
                            columnLabels={columnLabels}
                            incomeStatementObjects={incomeStatementObjects}
                            loading={loading}
                            numberAsCurrency={numberAsCurrency}
                            detailedView={detailedView}
                        />
                    )
                }
            </div>
		</div>
    )


}

export default ExpenseReport;