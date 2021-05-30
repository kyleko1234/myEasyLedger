import React from 'react';
import { PageSettings } from '../../config/page-settings';
import ReportTypeList from './components/report-type-list.js';
import {reportsText} from '../../utils/i18n/reports-text.js';
function Reports() {
    const appContext = React.useContext(PageSettings);

    return (
        <div>

            <h1>
                {reportsText[appContext.locale]["Reports"]}
            </h1>
            <div>
                {appContext.isLoading? <div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div> : <ReportTypeList />}
            </div>
		</div>
    )


}

export default Reports;