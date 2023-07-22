import React from 'react';
import { PageSettings } from '../../config/page-settings';
import { cashFlowReportText } from '../../utils/i18n/cash-flow-report-text';

function CashFlowPageV2() {
    const appContext = React.useContext(PageSettings);
    
    return(
        <div>
            <h1>
                {cashFlowReportText[appContext.locale]["Cash Flow Report"]} (v2)
            </h1>
        </div>
    )
}

export default CashFlowPageV2;