import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import {reportTypeListText} from './report-type-list-text';

function ReportTypeList() {
    const appContext = React.useContext(PageSettings);

    return (
        <div className="widget widget-rounded widget-list widget-list-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">{reportTypeListText[appContext.locale]["Select a type of report to view..."]}</h4>
            </div>
            <Link to="/reports/balance-sheet" className="widget-list-item bg-white">
                <div className="widget-list-content px-5">
                    <div className="widget-list-title">{reportTypeListText[appContext.locale]["Balance Sheet"]}</div>
                </div>
                <div className="m-r-10 widget-list-action text-right">
                    <i className="fa fa-angle-right fa-lg text-muted"></i>
                </div>
            </Link>
            <Link to="/reports/income-statement" className="widget-list-item bg-white">
                <div className="widget-list-content px-5">
                    <div className="widget-list-title">{reportTypeListText[appContext.locale]["Income Statement"]}</div>
                </div>
                <div className="m-r-10 widget-list-action text-right">
                    <i className="fa fa-angle-right fa-lg text-muted"></i>
                </div>
            </Link>

        </div>


    )
}

export default ReportTypeList;