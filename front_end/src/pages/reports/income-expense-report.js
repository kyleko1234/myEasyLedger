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
            <h1>
                {incomeStatementReportText[appContext.locale]["Income and Expense Report"]} 
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