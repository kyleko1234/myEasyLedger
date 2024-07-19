import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { accountIsEmpty, localizeDate, subtypeIsEmpty } from '../../../utils/util-fns';
import ReportRow from './report-row';
import AccountInReport from './account-in-report';

function IncomeStatementReport({ incomeStatementDto, detailedView }) {
    const appContext = React.useContext(PageSettings);
    const dateLabels = () => {
        let labels = [];
        incomeStatementDto.dateRanges.map(dateRange => {
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
    const accountsAreEmpty = accounts => {
        for (let i = 0; i < accounts.length; i++) {
            if (!accountIsEmpty(accounts[i])) {
                return false;
            }
        }
        return true;
    }
    const translate = text => incomeStatementRenderText[appContext.locale][text];

    return (
        <>
            {incomeStatementDto
                ? <div>
                    {/** Report Header */}
                    <ReportRow
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/** Revenue */}
                    <ReportRow
                        label={translate("Revenue")}
                        className="report-header"
                    />
                    {incomeStatementDto.revenueAccounts.map(account => {
                        if (!accountIsEmpty(account)) {
                            return (
                                <React.Fragment key={account.accountId}>
                                    <AccountInReport
                                        accountName={account.accountName}
                                        amounts={account.amounts}
                                        accountId={account.accountId}
                                        hasChildren={account.hasChildren}
                                        indentLevel={1}
                                    />
                                    {detailedView
                                        ? account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return (
                                                    <AccountInReport
                                                        key={child.accountId}
                                                        accountId={child.accountId}
                                                        accountName={child.accountName}
                                                        amounts={child.amounts}
                                                        indentLevel={2}
                                                        isChild
                                                    />
                                                )
                                            }
                                        })
                                        : null
                                    }
                                </React.Fragment>
                            )
                        }
                    })}
                    <ReportRow
                        label={translate("Total revenue")}
                        values={incomeStatementDto.totalRevenue}
                        className="fw-bold"
                        isCurrency
                    />
                    {/** Cost of sales */}
                    <ReportRow
                        label={translate("Cost of sales")}
                        className="report-header border-top-0"
                    />
                    {incomeStatementDto.costOfSalesAccounts.map(account => {
                        if (!accountIsEmpty(account)) {
                            return (
                                <React.Fragment key={account.accountId}>
                                    <AccountInReport
                                        accountName={account.accountName}
                                        amounts={account.amounts}
                                        accountId={account.accountId}
                                        hasChildren={account.hasChildren}
                                        indentLevel={1}
                                    />
                                    {detailedView
                                        ? account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return (
                                                    <AccountInReport
                                                        key={child.accountId}
                                                        accountId={child.accountId}
                                                        accountName={child.accountName}
                                                        amounts={child.amounts}
                                                        indentLevel={2}
                                                        isChild
                                                    />
                                                )
                                            }
                                        })
                                        : null
                                    }
                                </React.Fragment>
                            )
                        }
                    })}
                    <ReportRow
                        label={translate("Total cost of sales")}
                        values={incomeStatementDto.totalCostOfSales}
                        className="fw-bold"
                        isCurrency
                    />
                    {/** Gross Profit */}
                    <ReportRow
                        label={translate("Gross profit")}
                        values={incomeStatementDto.totalGrossProfit}
                        className="report-header fw-bold border-top-0"
                        isCurrency
                    />
                    {/** Operating expenses */}
                    <ReportRow
                        label={translate("Operating expenses")}
                        className="report-header mt-5 border-top-0"
                    />
                    {incomeStatementDto.operatingExpensesSubtypes.map((subtype, i) => {
                        if (!subtypeIsEmpty(subtype)) {
                            return (
                                <React.Fragment key={i}>
                                    <ReportRow
                                        label={balanceSheetRenderText[appContext.locale][subtype.accountSubtypeName] /**remember to translate */}
                                        values={subtype.totalDebitsMinusCredits}
                                        isCurrency
                                        indentLevel={1}
                                        className="report-subheader"
                                    />
                                    {detailedView
                                        ? subtype.accounts.map(account => {
                                            if (!accountIsEmpty(account)) {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <AccountInReport
                                                            accountName={account.accountName}
                                                            amounts={account.amounts}
                                                            accountId={account.accountId}
                                                            hasChildren={account.hasChildren}
                                                            indentLevel={2}
                                                        />
                                                        {account.children.map(child => {
                                                            if (!accountIsEmpty(child)) {
                                                                return (
                                                                    <AccountInReport
                                                                        key={child.accountId}
                                                                        accountName={child.accountName}
                                                                        amounts={child.amounts}
                                                                        accountId={child.accountId}
                                                                        isChild
                                                                        indentLevel={3}
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
                                </React.Fragment>
                            )
                        }
                    })}
                    <ReportRow
                        label={translate("Total operating expenses")}
                        values={incomeStatementDto.totalOperatingExpenses}
                        className="fw-bold"
                        isCurrency
                    />
                    {/** Operating Income */}
                    <ReportRow
                        label={translate("Operating income")}
                        values={incomeStatementDto.totalOperatingIncome}
                        className="report-header fw-bold border-top-0"
                        isCurrency
                    />
                    {/** Non-operating income/expenses */}
                    <ReportRow
                        label={translate("Non-operating income and expenses")}
                        className="report-header mt-5 border-top-0"
                    />
                    {incomeStatementDto.nonOperatingIncomeAndExpenseSubtypes.map((subtype, i) => {
                        if (!subtypeIsEmpty(subtype)) {
                            return (
                                <React.Fragment key={i}>
                                    <ReportRow
                                        label={balanceSheetRenderText[appContext.locale][subtype.accountSubtypeName] /**remember to translate */}
                                        values={subtype.totalDebitsMinusCredits}
                                        isCurrency
                                        indentLevel={1}
                                        className="report-subheader"
                                    />
                                    {detailedView
                                        ? subtype.accounts.map(account => {
                                            if (!accountIsEmpty(account)) {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <AccountInReport
                                                            accountName={account.accountName}
                                                            amounts={account.amounts}
                                                            accountId={account.accountId}
                                                            hasChildren={account.hasChildren}
                                                            indentLevel={2}
                                                        />
                                                        {account.children.map(child => {
                                                            if (!accountIsEmpty(child)) {
                                                                return (
                                                                    <AccountInReport
                                                                        key={child.accountId}
                                                                        accountName={child.accountName}
                                                                        amounts={child.amounts}
                                                                        accountId={child.accountId}
                                                                        isChild
                                                                        indentLevel={3}
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
                                </React.Fragment>
                            )
                        }
                    })}
                    <ReportRow
                        label={translate("Total non-operating income and expenses, net")}
                        values={incomeStatementDto.totalNonOperatingIncomeAndExpenseSubtypesNet}
                        className="fw-bold"
                        isCurrency
                    />
                    {/** EBIT */}
                    <ReportRow
                        label={translate("Earnings before interest and tax")}
                        values={incomeStatementDto.totalEbit}
                        className="report-header fw-bold border-top-0 mt-5"
                        isCurrency
                    />
                    {/** Interest */}
                    <ReportRow
                        label={translate("Interest expense")}
                        className="fw-semibold"
                        isCurrency
                        values={incomeStatementDto.totalInterest}
                    />
                    {detailedView
                        ? incomeStatementDto.interestAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={account.accountId}>
                                        <AccountInReport
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return (
                                                        <AccountInReport
                                                            key={child.accountId}
                                                            accountName={child.accountName}
                                                            amounts={child.amounts}
                                                            accountId={child.accountId}
                                                            isChild
                                                            indentLevel={2}
                                                        />
                                                    )
                                                }
                                            })
                                        }
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    {/**EBT */}
                    <ReportRow
                        label={translate("Earnings before tax")}
                        values={incomeStatementDto.totalEarningsBeforeTax}
                        className="report-header fw-bold"
                        isCurrency
                    />
                    {/** Tax */}
                    <ReportRow
                        label={translate("Tax expense")}
                        className="fw-semibold"
                        isCurrency
                        values={incomeStatementDto.totalTaxes}
                    />
                    {detailedView
                        ? incomeStatementDto.taxAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={account.accountId}>
                                        <AccountInReport
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return (
                                                        <AccountInReport
                                                            key={child.accountId}
                                                            accountName={child.accountName}
                                                            amounts={child.amounts}
                                                            accountId={child.accountId}
                                                            isChild
                                                            indentLevel={2}
                                                        />
                                                    )
                                                }
                                            })
                                        }
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    {/** Non-recurring and extraordinary */}
                    {!accountsAreEmpty(incomeStatementDto.nonRecurringAccounts)
                        ? <ReportRow
                            label={translate("Non-recurring and extraordinary items")}
                            className="report-header border-top-0 mt-5"
                            isCurrency
                            values={incomeStatementDto.totalNonRecurringNet}
                        />
                        : null
                    }
                    {detailedView
                        ? incomeStatementDto.nonRecurringAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={account.accountId}>
                                        <AccountInReport
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return (
                                                        <AccountInReport
                                                            key={child.accountId}
                                                            accountName={child.accountName}
                                                            amounts={child.amounts}
                                                            accountId={child.accountId}
                                                            isChild
                                                            indentLevel={2}
                                                        />
                                                    )
                                                }
                                            })
                                        }
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    {/**Net income */}
                    <ReportRow
                        label={translate("Net income")}
                        values={incomeStatementDto.netIncome}
                        className="report-header fw-bold border-top-0"
                        isCurrency
                    />
                </div>
                : null
            }
        </>
    )
}

export default IncomeStatementReport;