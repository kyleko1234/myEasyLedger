import React from 'react';
import { PageSettings } from '../../config/page-settings';
import IncomeStatementRender from './components/income-statement-render';
import {incomeStatementReportText} from '../../utils/i18n/income-statement-report-text';
import { useParams } from 'react-router';

function IncomeStatementReport() {
    const appContext = React.useContext(PageSettings);
    let params = useParams();

    return (
        <div>
            <h1 className="page-header">
                {incomeStatementReportText[appContext.locale]["Income Statement Report"]} 
            </h1>
            <div>
                {appContext.isLoading
                    ? <div className="d-flex justify-content-center fa-3x"><i className="fas fa-circle-notch fa-spin"></i></div> 
                    : <IncomeStatementRender
                        defaultStartDate={params.startDate}
                        defaultEndDate={params.endDate}
                    />
                }
            </div>
		</div>
    )


}

export default IncomeStatementReport;