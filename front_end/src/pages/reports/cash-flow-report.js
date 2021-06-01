import React from 'react';
import { PageSettings } from '../../config/page-settings';
import CashFlowRender from './components/cash-flow-render';
import {cashFlowReportText} from '../../utils/i18n/cash-flow-report-text.js';

function CashFlowReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <h1 className="page-header">
                {cashFlowReportText[appContext.locale]["Cash Flow Report"]} 
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <CashFlowRender/>}
            </div>
		</div>
    )


}

export default CashFlowReport;