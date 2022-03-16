import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import {reportTypeListText} from '../../../utils/i18n/report-type-list-text';

function ReportTypeList() {
    const appContext = React.useContext(PageSettings);

    if (appContext.isEnterprise) {
        return (
            <div>
                <div className="thead mt-2">
                    <div className="bg-light border rounded font-weight-600 d-flex">
                        <div className="td">{reportTypeListText[appContext.locale]["Select a type of report to view..."]}</div>
                    </div>
                </div>
                <div className="tbody">
                    <Link to="/reports/balance-sheet" className="tr d-flex justify-content-between align-items-center">
                            <div className="td indent">{reportTypeListText[appContext.locale]["Balance Sheet"]}</div>
                            <div className="pr-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/income-statement" className="tr d-flex justify-content-between align-items-center">
                            <div className="td indent">{reportTypeListText[appContext.locale]["Income Statement"]}</div>
                            <div className="pr-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/cash-flow" className="tr d-flex justify-content-between align-items-center">
                            <div className="td indent">{reportTypeListText[appContext.locale]["Cash Flow"]}</div>
                            <div className="pr-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/expense" className="tr d-flex justify-content-between align-items-center">
                            <div className="td indent">{reportTypeListText[appContext.locale]["Expense Report"]}</div>
                            <div className="pr-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>

                </div>
            </div>
        )
    
    } else {
        return(
            <div>
                <div className="thead mt-2">
                    <div className="bg-light border rounded font-weight-600 d-flex">
                        <div className="td">{reportTypeListText[appContext.locale]["Select a type of report to view..."]}</div>
                    </div>
                </div>
                <div className="tbody">
                    <Link to="/reports/net-worth" className="tr d-flex justify-content-between align-items-center">
                        <div className="td indent">{reportTypeListText[appContext.locale]["Net Worth"]}</div>
                        <div className="pr-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/income-expense" className="tr d-flex justify-content-between align-items-center">
                        <div className="td indent">{reportTypeListText[appContext.locale]["Income and Expense Report"]}</div>
                        <div className="pr-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/expense" className="tr d-flex justify-content-between align-items-center">
                            <div className="td indent">{reportTypeListText[appContext.locale]["Expense Report"]}</div>
                            <div className="pr-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>

                </div>
            </div>
        )
    }
}

export default ReportTypeList;