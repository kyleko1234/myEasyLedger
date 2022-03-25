import React from 'react';
import { PageSettings } from '../../config/page-settings';
import BalanceSheetRender from './components/balance-sheet-render';
import {balanceSheetReportText} from '../../utils/i18n/balance-sheet-report-text.js';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';

function BalanceSheetReport() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();

    return (
        <div>
            <h1>
                {balanceSheetReportText[appContext.locale]["Balance Sheet Report"]} 
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <BalanceSheetRender
                        endDate={params.endDate}
                    />
                }
            </div>
		</div>
    )


}

export default BalanceSheetReport;