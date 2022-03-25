import React from 'react';
import { PageSettings } from '../../config/page-settings';
import NetWorthRender from './components/net-worth-render';
import {netWorthReportText} from '../../utils/i18n/net-worth-report-text.js';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/misc/loading-spinner';

function NetWorthReport() {
    const appContext = React.useContext(PageSettings);
    const params = useParams();

    return (
        <div>
            <h1 className="page-header">
                {netWorthReportText[appContext.locale]["Net Worth Report"]} 
            </h1>
            <div>
                {appContext.isLoading
                    ? <LoadingSpinner big/> 
                    : <NetWorthRender
                        endDate={params.endDate}
                    />}
            </div>
		</div>
    )


}

export default NetWorthReport;