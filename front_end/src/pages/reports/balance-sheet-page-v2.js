import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { balanceSheetReportText } from '../../utils/i18n/balance-sheet-report-text';
import { getTodayAsDateString } from '../../utils/util-fns';
import DateRangeControls from './components/date-range-controls';

function BalanceSheetPageV2() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();

    return (
        <div>
            <h1>
                {balanceSheetReportText[appContext.locale]["Balance Sheet Report"]} (v2)
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <div>
                        
                    </div>

                }
            </div>
        </div>
    )
}

export default BalanceSheetPageV2;