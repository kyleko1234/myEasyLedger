import React from 'react';
import BalanceSummary from './components/balance-summary';
import IncomeAndExpenseSummary from './components/income-and-expense-summary';
import { PageSettings } from '../../config/page-settings';
import {dashboardText} from '../../utils/i18n/dashboard-text';
import {populateSampleUserWithSampleData} from '../../utils/dev-utils'
import ExpenseBreakdown from './components/expense-breakdown';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import NetAssets from './components/net-assets';
import LoadingSpinner from '../../components/misc/loading-spinner';

function Dashboard() {
    const appContext = React.useContext(PageSettings);

    return (
        <>
            {appContext.currentOrganizationId
                ? <div>
                    {/*<button type="button" onClick={populateSampleUserWithSampleData}>POPULATE SAMPLE DATA</button>*/}
                    <div className="row mb-md-3">
                        <div className="col-xl-8 col-lg-6 mb-3 mb-lg-0">
                            {appContext.isLoading ? <LoadingSpinner big /> :
                            <IncomeAndExpenseSummary/>}
                        </div>
                        <div className="col-xl-4 col-lg-6 mb-3 mb-lg-0">
                            {appContext.isLoading ? <LoadingSpinner big /> : 
                            <BalanceSummary/>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            {appContext.isLoading ? <LoadingSpinner big /> : 
                            <ExpenseBreakdown/>}
                        </div>
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            {appContext.isLoading ? <LoadingSpinner big /> :
                            <NetAssets/>}
                        </div>
                    </div>
                </div>
                : <div className="d-flex justify-content-center">
                    <div className="text-muted h3 pt-3 text-center">
                        {dashboardText[appContext.locale]["Create a new ledger by clicking the button in the upper-right corner."]}
                    </div>
                </div>
            }
        </>
    )


}

export default Dashboard;