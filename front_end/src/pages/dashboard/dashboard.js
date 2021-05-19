import React from 'react';
import BalanceSummary from './components/balance-summary';
import IncomeAndExpenseSummary from './components/income-and-expense-summary';
import { PageSettings } from '../../config/page-settings';
import {dashboardText} from '../../utils/i18n/dashboard-text';
import {populateSampleUserWithSampleData} from '../../utils/dev-utils'
import ExpenseBreakdown from './components/expense-breakdown';

function Dashboard() {
    const appContext = React.useContext(PageSettings);
    return (
        <div>
            {/*<button type="button" onClick={populateSampleUserWithSampleData}>POPULATE SAMPLE DATA</button> */}
            <div className="row mb-3">
                <div className="col-xl-8 col-lg-6">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <IncomeAndExpenseSummary />}
                </div>
                <div className="col-xl-4 col-lg-6">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <BalanceSummary/> }
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-6">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <ExpenseBreakdown/>}
                </div>
            </div>
		</div>
    )


}

export default Dashboard;