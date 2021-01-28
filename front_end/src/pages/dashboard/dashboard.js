import React from 'react';
import { Link } from 'react-router-dom';
import BalanceSummary from './components/balance-summary';
import IncomeAndExpenseSummary from './components/income-and-expense-summary';
import { PageSettings } from '../../config/page-settings';
import {dashboardText} from './dashboard-text';

function Dashboard() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{dashboardText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item active">{dashboardText[appContext.locale]["Dashboard"]}</li>
            </ol>
            <h1 className="page-header">{dashboardText[appContext.locale]["Dashboard"]}</h1>
            <div className="row">
                <div className="col-xl-8 col-lg-6">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> :
                    <IncomeAndExpenseSummary />}
                </div>
                <div className="col-xl-4 col-lg-6">
                    {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : 
                    <BalanceSummary />}
                </div>
            </div>
		</div>
    )


}

export default Dashboard;