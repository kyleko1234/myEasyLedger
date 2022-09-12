import React from 'react';
import { PageSettings } from '../../config/page-settings';
import { reportTypeListText } from '../../utils/i18n/report-type-list-text';
import { getDateInCurrentYear, getTodayAsDateString } from '../../utils/util-fns';
import DateRangeControls from './components/date-range-controls';

function ExpensesByVendor(props) {
    const appContext = React.useContext(PageSettings);
    const today = getTodayAsDateString();
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);
    const beginningOfCurrentFiscalYear = getDateInCurrentYear(appContext.permissions.find(permission => permission.organization.id === appContext.currentOrganizationId).organization.fiscalYearBegin);
    const [loading, setLoading] = React.useState(true);

    const [vendorExpenseseDTOs, setVendorExpensesDTOs] = React.useState([]);
    const [datesToRequest, setDatesToRequest] = React.useState([{
        label: "Custom",
        startDate: beginningOfCurrentFiscalYear, 
        endDate: today
    }]);
    const [columnLabels, setColumnLabels] = React.useState([]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);

    const requestReports = async () => {
        let newColumnLabels = [];
        let fetchedReports = [];
        for (const dateObject of datesToRequest) {
            await axios.get(`${API_BASE_URL}/reports/expensesByVendorReport/organization/${appContext.currentOrganizationId}/${dateObject.startDate}/${dateObject.endDate}`).then(response => {
                newColumnLabels.push(dateObject);     //column labels are not updated until the report is actually updated
                fetchedReports.push(response.data);
            }).catch(console.log);
        }
        setColumnLabels(newColumnLabels);
        setVendorExpensesDTOs(fetchedReports);
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
                setDateRangePresets(response.data);
            })
            await requestReports();
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
    
    const handleUpdateReportButton = async (event) => {
        event.preventDefault();
        setInvalidDateAlert(false);
        setLoading(true);
        if (validateDatesToRequest(datesToRequest)) {
            await requestReports();
        } else {
            setInvalidDateAlert(true);
        }
        setLoading(false);
    }

    return(
        <>
            <h1 className="page-header">
                {reportTypeListText[appContext.locale]["Expense Distribution (by Vendor)"]} 
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
                handleCompareButton={handleCompareButton}
                noDetailedView
            />

        </>
    )
}
export default ExpensesByVendor;