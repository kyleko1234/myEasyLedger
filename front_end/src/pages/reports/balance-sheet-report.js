import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import BalanceSheetRender from './components/balance-sheet-render';
import {balanceSheetReportText} from '../../utils/i18n/balance-sheet-report-text.js';

function BalanceSheetReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <h1>
                {balanceSheetReportText[appContext.locale]["Balance Sheet Report"]} 
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <BalanceSheetRender/>}
            </div>
		</div>
    )


}

export default BalanceSheetReport;