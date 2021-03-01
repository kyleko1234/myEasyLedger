import React from 'react';
import BalanceSummary from './components/balance-summary';
import IncomeAndExpenseSummary from './components/income-and-expense-summary';
import { PageSettings } from '../../config/page-settings';
import {dashboardText} from '../../utils/i18n/dashboard-text';
import ToggleMobileSidebarButton from '../../components/sidebar/toggle-mobile-sidebar-button';

function Dashboard() {
    const appContext = React.useContext(PageSettings);
    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item active">{dashboardText[appContext.locale]["Home"]}</li>
            </ol>
            <h1 className="page-header">
                {appContext.currentOrganizationName + " - " + dashboardText[appContext.locale]["Dashboard"]}
                <ToggleMobileSidebarButton className="d-md-none float-right "/>
            </h1>
            <div className="row">
                <div className="col-xl-8 col-lg-6">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <IncomeAndExpenseSummary />}
                </div>
                <div className="col-xl-4 col-lg-6">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <BalanceSummary widgetTitle="Balance Summary"/>}
                </div>
            </div>
		</div>
    )


}

export default Dashboard;