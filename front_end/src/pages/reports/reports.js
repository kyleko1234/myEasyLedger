import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../config/page-settings';
import ReportTypeList from './components/report-type-list.js';
import {reportsText} from './reports-text.js';

function Reports() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>
            <ol className="breadcrumb float-xl-right">
                <li className="breadcrumb-item"><Link to="/">{reportsText[appContext.locale]["Home"]}</Link></li>
                <li className="breadcrumb-item active">{reportsText[appContext.locale]["Reports"]}</li>
            </ol>
            <h1 className="page-header">{reportsText[appContext.locale]["Reports"]}</h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <ReportTypeList />}
            </div>
		</div>
    )


}

export default Reports;