import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import {reportTypeListText} from '../../../utils/i18n/report-type-list-text';

function ReportTypeList() {
    const appContext = React.useContext(PageSettings);

    if (appContext.isEnterprise) {
        return (
            <div>
                <div className="pseudo-thead mt-2">
                    <div className="bg-light border rounded fw-semibold d-flex">
                        <div className="pseudo-td">{reportTypeListText[appContext.locale]["Select a type of report to view..."]}</div>
                    </div>
                </div>
                <div className="pseudo-tbody">
                    <Link to="/reports/balance-sheet" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Balance Sheet"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/income-statement" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Income Statement"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/cash-flow" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Cash Flow"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/account-transactions-report" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Account Transactions Report"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/expenses-by-account" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Expense Distribution (by Account)"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/expenses-by-vendor" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Expense Distribution (by Vendor)"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/income-by-customer" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Income Distribution (by Customer)"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>

                </div>
            </div>
        )
    
    } else {
        return(
            <div>
                <div className="pseudo-thead mt-2">
                    <div className="bg-light border rounded fw-semibold d-flex">
                        <div className="pseudo-td">{reportTypeListText[appContext.locale]["Select a type of report to view..."]}</div>
                    </div>
                </div>
                <div className="tbody">
                    <Link to="/reports/net-worth" className="pseudo-tr d-flex justify-content-between align-items-center">
                        <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Net Worth"]}</div>
                        <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/income-expense" className="pseudo-tr d-flex justify-content-between align-items-center">
                        <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Income and Expense Report"]}</div>
                        <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>
                    <Link to="/reports/expenses-by-account" className="pseudo-tr d-flex justify-content-between align-items-center">
                            <div className="pseudo-td indent">{reportTypeListText[appContext.locale]["Expense Distribution (by Category)"]}</div>
                            <div className="pe-2 text-muted"><i className="fas fa-angle-right "></i></div>
                    </Link>

                </div>
            </div>
        )
    }
}

export default ReportTypeList;