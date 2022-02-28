import React from 'react';
import { PageSettings } from '../../config/page-settings';
import IncomeStatementRender from './components/income-statement-render';
import {incomeStatementReportText} from '../../utils/i18n/income-statement-report-text';
import { useParams } from 'react-router';
import LoadingSpinner from '../../components/misc/loading-spinner';

function ExpenseReport() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();

    return (
        <div>
            <h1 className="page-header">
                Expense Report
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big />
                    : <div>
                        REPORT GOES HERE
                    </div>
                }
            </div>
		</div>
    )


}

export default ExpenseReport;