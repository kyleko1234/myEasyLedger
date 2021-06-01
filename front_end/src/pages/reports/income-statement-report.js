import React from 'react';
import { PageSettings } from '../../config/page-settings';
import IncomeStatementRender from './components/income-statement-render';
import {incomeStatementReportText} from '../../utils/i18n/income-statement-report-text';

function IncomeStatementReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <h1 className="page-header">
                {incomeStatementReportText[appContext.locale]["Income Statement Report"]} 
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x"><i className="fas fa-circle-notch fa-spin"></i></div> : <IncomeStatementRender/>}
            </div>
		</div>
    )


}

export default IncomeStatementReport;