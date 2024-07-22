import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { accountIsEmpty, localizeDate, subtypeIsEmpty } from '../../../utils/util-fns';
import ReportRow from './report-row';
import AccountInReportSimple from './account-in-report-simple';

function ExpensesByAccountReport({ incomeExpenseReportDto, detailedView }) {
    const appContext = React.useContext(PageSettings);
    const dateLabels = () => {
        let labels = [];
        incomeExpenseReportDto.dateRanges.map(dateRange => {
            if (!dateRange.name || dateRange.name === "Custom") {
                labels.push(<>
                    <div>
                        {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(dateRange.startDate)}
                    </div>
                    <div>
                        {incomeStatementRenderText[appContext.locale]["To:"] + " " + localizeDate(dateRange.endDate)}
                    </div>
                </>)
            } else {
                labels.push(dateRange.name);
            }
        })
        return labels;
    }
    const translate = text => incomeStatementRenderText[appContext.locale][text];

    return(
        <>
            {incomeExpenseReportDto
                ? <div>
                    <ReportRow
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/**Expenses */}
                    <ReportRow
                        label={translate("Expenses")}
                        className="report-header"
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
                                            nonNumeric
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
                                                        nonNumeric
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

                </div>
                : <LoadingSpinner big/>
            }
        </>
    )

}

export default ExpensesByAccountReport;