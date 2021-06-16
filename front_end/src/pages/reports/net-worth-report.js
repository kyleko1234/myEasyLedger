import React from 'react';
import { PageSettings } from '../../config/page-settings';
import NetWorthRender from './components/net-worth-render';
import {netWorthReportText} from '../../utils/i18n/net-worth-report-text.js';

function NetWorthReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <h1 className="page-header">
                {netWorthReportText[appContext.locale]["Net Worth Report"]} 
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <NetWorthRender/>}
            </div>
		</div>
    )


}

export default NetWorthReport;