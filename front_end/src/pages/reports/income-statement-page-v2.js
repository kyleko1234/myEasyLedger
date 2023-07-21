import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';
import { PageSettings } from '../../config/page-settings';
import { incomeStatementReportText } from '../../utils/i18n/income-statement-report-text';

function IncomeStatementPageV2() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();

    return (
        <div>
            <h1>
                {incomeStatementReportText[appContext.locale]["Income Statement Report"]} 
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : null
                }
            </div>
        </div>
    )
}
export default IncomeStatementPageV2;