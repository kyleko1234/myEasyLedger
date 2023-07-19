import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { balanceSheetReportText } from '../../utils/i18n/balance-sheet-report-text';
import { getTodayAsDateString, validateDate } from '../../utils/util-fns';
import DateRangeControls from './components/date-range-controls';

function BalanceSheetPageV2() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();

    const today = getTodayAsDateString();
    const [loading, setLoading] = React.useState(true);
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);
    const [datesToRequest, setDatesToRequest] = React.useState([{
        label: "Custom", 
        endDate: params.endDate? params.endDate : today
    }]);
    const [dateRangePresets, setDateRangePresets] = React.useState([]);
    const [invalidDateAlert, setInvalidDateAlert] = React.useState(false);
    const [unbalancedAlert, setUnbalancedAlert] = React.useState(false);
    const [balanceSheets, setBalanceSheets] = React.useState([]);

    const fetchBalanceSheets = async () => {
        
    }

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);
            await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/dateRangePresetsUpToDate/${today}/${appContext.locale}`).then(response => {
                setDateRangePresets(response.data);
            })
            await fetchBalanceSheets();
            setLoading(false);
        }
        fetchData();
    }, [])

    const validateDatesToRequest = dateRangeObjects => {
        let returnedBoolean = true
        dateRangeObjects.forEach(dateRangeObject => {
            if (!validateDate(dateRangeObject.endDate)) {
                returnedBoolean = false;
            }
        })
        return returnedBoolean;
    }

    const handleUpdateReportButton = async (event) => {
        event.preventDefault();
        setLoading(true);
        setInvalidDateAlert(false);
        if (validateDatesToRequest(datesToRequest)) {
            fetchBalanceSheets()
        } else {
            setInvalidDateAlert(true);
        }
        setLoading(false);
    }

    const handleRemoveDateRangeButton = i => {
        let datesArray = datesToRequest.slice();
        datesArray.splice(i, 1);
        setDatesToRequest(datesArray);
    }

    const handleSelectDateRangePreset = (selectedOption, i) => {
        if (selectedOption) {
            let dateToRequestObject = {
                label: selectedOption.label,
                endDate: selectedOption.object.endDate
            };
            let newDatesToRequestArray = datesToRequest.slice();
            newDatesToRequestArray[i] = dateToRequestObject;
            setDatesToRequest(newDatesToRequestArray);
        }
    }

    const handleChangeEndDate = (date, i) => {
        let newDatesToRequestArray = datesToRequest.slice();
        newDatesToRequestArray[i] = (
            {label: "Custom", endDate: date}
        )
        setDatesToRequest(newDatesToRequestArray);
    }

    const handleCompareButton = () => {
        let endDatesArray = datesToRequest.slice();
        endDatesArray.push({
            label: "Custom", 
            endDate: today}
        )
        setDatesToRequest(endDatesArray);
    }

    return (
        <div>
            <h1>
                {balanceSheetReportText[appContext.locale]["Balance Sheet Report"]} (v2)
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        <DateRangeControls
                            datesToRequest={datesToRequest}
                            invalidDateAlert={invalidDateAlert}
                            handleUpdateReportButton={handleUpdateReportButton}
                            handleRemoveDateRangeButton={handleRemoveDateRangeButton}
                            dateRangePresets={dateRangePresets}
                            handleSelectDateRangePreset={handleSelectDateRangePreset}
                            handleChangeEndDate={handleChangeEndDate}
                            detailedView={detailedView}
                            toggleDetailedView={toggleDetailedView}
                            handleCompareButton={handleCompareButton}
                            singleDate
                        />
                    </div>

                }
            </div>
        </div>
    )
}

export default BalanceSheetPageV2;