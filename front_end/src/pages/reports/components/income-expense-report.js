import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { accountIsEmpty, localizeDate } from '../../../utils/util-fns';
import ReportRow from './report-row';
import AccountInReportSimple from './account-in-report-simple';

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
                        className="report-header"
                    />
                    {incomeExpenseReportDto.incomeAccounts
                        ? incomeExpenseReportDto.incomeAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <AccountInReportSimple
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={1}
                                            category={!appContext.isEnterprise}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child) && detailedView) {
                                                return(
                                                    <AccountInReportSimple
                                                        accountName={child.accountName}
                                                        amounts={child.amounts}
                                                        accountId={child.accountId}
                                                        indentLevel={1}
                                                        isChild
                                                        key={child.accountId}
                                                        className="report-row-detailed"
                                                        category={!appContext.isEnterprise}
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
                        values={incomeExpenseReportDto.totalIncome}
                        isCurrency
                        className="fw-bold"
                    />
                    {/**Expenses */}
                    <ReportRow
                        label={translate("Expenses")}
                        className="report-header border-top-0 mt-5"
                    />
                    {incomeExpenseReportDto.expenseAccounts
                        ? incomeExpenseReportDto.expenseAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <AccountInReportSimple
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={1}
                                            category={!appContext.isEnterprise}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child) && detailedView) {
                                                return(
                                                    <AccountInReportSimple
                                                        accountName={child.accountName}
                                                        amounts={child.amounts}
                                                        accountId={child.accountId}
                                                        indentLevel={1}
                                                        isChild
                                                        key={child.accountId}
                                                        className="report-row-detailed"
                                                        category={!appContext.isEnterprise}
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
                        className="fw-bold"
                    />
                    <ReportRow
                        label={translate("Total Income less Expenses")}
                        values={incomeExpenseReportDto.totalIncomeMinusExpenses}
                        isCurrency
                        className="report-header fw-bold border-top-0 mt-5"
                    />

                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default IncomeExpenseReport;