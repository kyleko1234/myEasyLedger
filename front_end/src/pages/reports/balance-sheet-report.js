import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import BalanceSheetRender from './components/balance-sheet-render';
import {balanceSheetReportText} from '../../utils/i18n/balance-sheet-report-text.js';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';

function BalanceSheetReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{balanceSheetReportText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item"><Link to="/reports">{balanceSheetReportText[appContext.locale]["Reports"]}</Link></li>
                <li className="breadcrumb-item active">{balanceSheetReportText[appContext.locale]["Balance Sheet Report"]}</li>
            </ol>
            <h1 className="page-header">
                {balanceSheetReportText[appContext.locale]["Balance Sheet Report"]} 
                <ToggleMobileSidebarButton className="d-md-none float-right "/>
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <BalanceSheetRender/>}
            </div>
		</div>
    )


}

export default BalanceSheetReport;