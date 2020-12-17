import React from 'react';
import { Link } from 'react-router-dom';
import BalanceSummary from './components/balance-summary';
import CashFlowSummary from './components/cash-flow-summary';
import { PageSettings } from '../../config/page-settings';

function Dashboard() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
            </ol>
            <h1 className="page-header">Dashboard </h1>
            <div className="row">
                <div className="col-xl-8 col-lg-6">
                    {appContext.isLoading? <div>Loading...</div> :
                    <CashFlowSummary />}
                </div>
                <div className="col-xl-4 col-lg-6">
                    {appContext.isLoading? <div>Loading...</div> : 
                    <BalanceSummary />}
                </div>
            </div>
		</div>
    )


}

export default Dashboard;