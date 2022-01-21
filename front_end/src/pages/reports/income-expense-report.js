import React from 'react';
import { PageSettings } from '../../config/page-settings';
import IncomeExpenseRender from './components/income-expense-render';
import {incomeStatementReportText} from '../../utils/i18n/income-statement-report-text';
import { useParams } from 'react-router';
import LoadingSpinner from '../../components/misc/loading-spinner';

function IncomeExpenseReport() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();
    
    return (
        <div>
            <h1>
                {incomeStatementReportText[appContext.locale]["Income and Expense Report"]} 
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/>
                    : <IncomeExpenseRender
                        defaultStartDate={params.startDate}
                        defaultEndDate={params.endDate}
                    />
                }
            </div>
		</div>
    )


}

export default IncomeExpenseReport;