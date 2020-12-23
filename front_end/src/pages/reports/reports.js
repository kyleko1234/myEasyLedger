import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import ReportTypeList from './components/report-type-list.js';

function Reports() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Reports</li>
            </ol>
            <h1 className="page-header">Reports </h1>
            <div>
                {appContext.isLoading? "Loading..." : <ReportTypeList />}
            </div>
		</div>
    )


}

export default Reports;