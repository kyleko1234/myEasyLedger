import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import ReportRender from './components/report-render.js';

function BalanceSheetReport() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/reports">Reports</Link></li>
                <li className="breadcrumb-item active">Balance Sheet Report</li>
            </ol>
            <h1 className="page-header">Balance Sheet Report </h1>
            <div>
                {appContext.isLoading? "Loading..." : <ReportRender title="Balance Sheet" />}
            </div>
		</div>
    )


}

export default BalanceSheetReport;