import React from 'react';
import { Link } from 'react-router-dom';

function ReportTypeList() {

    return (
        <div className="widget widget-rounded widget-list widget-list-rounded m-b-30">
            <div className="widget-header bg-light border-bottom">
                <h4 className="widget-header-title">Select a type of report to view...</h4>
            </div>
            <Link to="/reports" className="widget-list-item text-decoration">
                <div className="widget-list-content px-5">
                    <div className="widget-list-title">Balance Sheet</div>
                </div>
                <div className="m-r-10 widget-list-action text-right">
                    <i className="fa fa-angle-right fa-lg text-muted"></i>
                </div>
            </Link>
            <Link to="/reports" className="widget-list-item">
                <div className="widget-list-content px-5">
                    <div className="widget-list-title">Income Statement</div>
                </div>
                <div className="m-r-10 widget-list-action text-right">
                    <i className="fa fa-angle-right fa-lg text-muted"></i>
                </div>
            </Link>

        </div>


    )
}

export default ReportTypeList;