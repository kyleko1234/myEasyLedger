import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import NetWorthRender from './components/net-worth-render';
import {netWorthReportText} from '../../utils/i18n/net-worth-report-text.js';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';

function NetWorthReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{netWorthReportText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item"><Link to="/reports">{netWorthReportText[appContext.locale]["Reports"]}</Link></li>
                <li className="breadcrumb-item active">{netWorthReportText[appContext.locale]["Net Worth Report"]}</li>
            </ol>
            <h1 className="page-header">
                {netWorthReportText[appContext.locale]["Net Worth Report"]} 
                <ToggleMobileSidebarButton className="d-md-none float-right "/>
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <NetWorthRender/>}
            </div>
		</div>
    )


}

export default NetWorthReport;