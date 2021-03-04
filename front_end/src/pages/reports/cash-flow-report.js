import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import CashFlowRender from './components/cash-flow-render';
import {cashFlowReportText} from '../../utils/i18n/cash-flow-report-text.js';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';

function CashFlowReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{cashFlowReportText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item"><Link to="/reports">{cashFlowReportText[appContext.locale]["Reports"]}</Link></li>
                <li className="breadcrumb-item active">{cashFlowReportText[appContext.locale]["Cash Flow Report"]}</li>
            </ol>
            <h1 className="page-header">
                {cashFlowReportText[appContext.locale]["Cash Flow Report"]} 
                <ToggleMobileSidebarButton className="d-md-none float-right "/>
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <CashFlowRender/>}
            </div>
		</div>
    )


}

export default CashFlowReport;