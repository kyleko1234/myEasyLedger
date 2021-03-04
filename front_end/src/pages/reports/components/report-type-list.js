import React from 'react';
import { Link } from 'react-router-dom';
import { WidgetList, WidgetHeader, WidgetListItem } from '../../../components/widget/widget';
import { PageSettings } from '../../../config/page-settings';
import {reportTypeListText} from '../../../utils/i18n/report-type-list-text';

function ReportTypeList() {
    const appContext = React.useContext(PageSettings);

    if (appContext.isEnterprise) {
        return (
            <WidgetList className="m-b-30">
                <WidgetHeader className="bg-light">
                    {reportTypeListText[appContext.locale]["Select a type of report to view..."]}
                </WidgetHeader>
                <WidgetListItem link to="/reports/balance-sheet" className="bg-white">
                        <div className="p-l-30">{reportTypeListText[appContext.locale]["Balance Sheet"]}</div>
                </WidgetListItem>
                <WidgetListItem link to="/reports/income-statement" className="bg-white">
                        <div className="p-l-30">{reportTypeListText[appContext.locale]["Income Statement"]}</div>
                </WidgetListItem>
                <WidgetListItem link to="/reports/cash-flow" className="bg-white">
                        <div className="p-l-30">{reportTypeListText[appContext.locale]["Cash Flow"]}</div>
                </WidgetListItem>
    
            </WidgetList>
        )
    
    } else {
        return(
            <WidgetList className="m-b-30">
                <WidgetHeader className="bg-light">
                    {reportTypeListText[appContext.locale]["Select a type of report to view..."]}
                </WidgetHeader>
                <WidgetListItem link to="/reports/net-worth" className="bg-white">
                    <div className="p-l-30">{reportTypeListText[appContext.locale]["Net Worth"]}</div>
                </WidgetListItem>
                <WidgetListItem link to="/reports/income-expense" className="bg-white">
                    <div className="p-l-30">{reportTypeListText[appContext.locale]["Income and Expense Report"]}</div>
                </WidgetListItem>
            </WidgetList>
        )
    }
}

export default ReportTypeList;