import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { accountIsEmpty, localizeDate } from '../../../utils/util-fns';
import ReportRow from './report-row';

function IncomeExpenseReport({incomeExpenseReportDto, detailedView}) {
    const appContext = React.useContext(PageSettings);
    const translate = text => incomeStatementRenderText[appContext.locale][text];

    const dateLabels = () => {
        let labels = [];
        incomeExpenseReportDto.dateRanges.map(dateRange => {
            if (!dateRange.name || dateRange.name === "Custom") {
                labels.push(<>
                    <div>
                        {translate("From:") + " " + localizeDate(dateRange.startDate)}
                    </div>
                    <div>
                        {translate("To:") + " " + localizeDate(dateRange.endDate)}
                    </div>
                </>)
            } else {
                labels.push(dateRange.name);
            }
        })
        return labels;
    }

    return(
        <>
            {incomeExpenseReportDto
                ? <div>
                    <ReportRow
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/**Income */}
                    <ReportRow
                        label={translate("Income")}
                        className="fw-semibold"
                    />
                    {incomeExpenseReportDto.incomeAccounts
                        ? incomeExpenseReportDto.incomeAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <ReportRow
                                            label={account.accountName}
                                            values={account.amounts}
                                            isCurrency
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child) && detailedView) {
                                                return(
                                                    <ReportRow
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        indentLevel={2}
                                                        key={child.accountId}
                                                    />
                                                )
                                            }
                                        })}
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={translate("Total Income")}
                        values={incomeExpenseReportDto.totalExpenses}
                        isCurrency
                        className="fw-semibold"
                    />
                    {/**Expenses */}
                    <ReportRow
                        label={translate("Expenses")}
                        className="fw-semibold border-top-0 mt-3"
                    />
                    {incomeExpenseReportDto.expenseAccounts
                        ? incomeExpenseReportDto.expenseAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <ReportRow
                                            label={account.accountName}
                                            values={account.amounts}
                                            isCurrency
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child) && detailedView) {
                                                return(
                                                    <ReportRow
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        indentLevel={2}
                                                        key={child.accountId}
                                                    />
                                                )
                                            }
                                        })}
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={translate("Total expenses")}
                        values={incomeExpenseReportDto.totalExpenses}
                        isCurrency
                        className="fw-semibold"
                    />
                    <ReportRow
                        label={translate("Total Income less Expenses")}
                        values={incomeExpenseReportDto.totalIncomeMinusExpenses}
                        isCurrency
                        className="fw-semibold border-top-0 mt-3"
                    />

                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default IncomeExpenseReport;