import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { API_BASE_URL } from '../../utils/constants';
import { balanceSheetReportText } from '../../utils/i18n/balance-sheet-report-text';
import BalanceSheetStandard from './components/balance-sheet-standard';
import DateRangeControls from './components/date-range-controls';

function BalanceSheetPageV2() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();

    const [loading, setLoading] = React.useState(true);
    const [detailedView, setDetailedView] = React.useState(false);
    const toggleDetailedView = () => setDetailedView(!detailedView);

    const [balanceSheetDto, setBalanceSheetDto] = React.useState();

    const fetchBalanceSheets = async (datesToRequest) => {
        setLoading(true);
        axios.post(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/reports/balanceSheet`, datesToRequest)
            .then(response => {
                setBalanceSheetDto(response.data);
                setLoading(false);
            })
            .catch(response => {
                console.log(response);
                setLoading(false);
            })
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
                            parentComponentDataFetchFunction={fetchBalanceSheets}
                            detailedView={detailedView}
                            toggleDetailedView={toggleDetailedView}
                            singleDate
                            defaultEndDate={params.endDate? params.endDate : null}
                        />
                        <BalanceSheetStandard
                            balanceSheetDto={balanceSheetDto}
                            detailedView={detailedView}
                        />
                    </div>

                }
            </div>
        </div>
    )
}

export default BalanceSheetPageV2;