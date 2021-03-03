import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import IncomeExpenseRender from './components/income-expense-render';
import {incomeStatementReportText} from '../../utils/i18n/income-statement-report-text';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';

function IncomeExpenseReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{incomeStatementReportText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item"><Link to="/reports">{incomeStatementReportText[appContext.locale]["Reports"]}</Link></li>
                <li className="breadcrumb-item active">{incomeStatementReportText[appContext.locale]["Income and Expense Report"]}</li>
            </ol>
            <h1 className="page-header">
                {incomeStatementReportText[appContext.locale]["Income and Expense Report"]} 
                <ToggleMobileSidebarButton className="d-md-none float-right "/>
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <IncomeExpenseRender/>
                }
            </div>
		</div>
    )


}

export default IncomeExpenseReport;