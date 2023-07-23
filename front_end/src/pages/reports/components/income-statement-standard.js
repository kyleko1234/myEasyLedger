import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { accountIsEmpty, localizeDate, subtypeIsEmpty } from '../../../utils/util-fns';
import ReportRow from './report-row';

function IncomeStatementStandard({ incomeStatementDto, detailedView }) {
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
                        className="fw-semibold"
                    />
                    {incomeStatementDto.revenueAccounts.map(account => {
                        if (!accountIsEmpty(account)) {
                            return (
                                <React.Fragment key={account.accountId}>
                                    <ReportRow
                                        label={account.accountName}
                                        values={account.amounts}
                                        isCurrency
                                        indentLevel={1}
                                    />
                                    {detailedView
                                        ? account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return (
                                                    <ReportRow
                                                        key={child.accountId}
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        indentLevel={2}
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
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Cost of sales */}
                    <ReportRow
                        label={translate("Cost of sales")}
                        className="fw-semibold mt-3 border-top-0"
                    />
                    {incomeStatementDto.costOfSalesAccounts.map(account => {
                        if (!accountIsEmpty(account)) {
                            return (
                                <React.Fragment key={account.accountId}>
                                    <ReportRow
                                        label={account.accountName}
                                        values={account.amounts}
                                        isCurrency
                                        indentLevel={1}
                                    />
                                    {detailedView
                                        ? account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return (
                                                    <ReportRow
                                                        key={child.accountId}
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        indentLevel={2}
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
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Gross Profit */}
                    <ReportRow
                        label={translate("Gross profit")}
                        values={incomeStatementDto.totalGrossProfit}
                        className="fw-semibold border-top-0 mt-3"
                        isCurrency
                    />
                    {/** Operating expenses */}
                    <ReportRow
                        label={translate("Operating expenses")}
                        className="fw-semibold mt-3 border-top-0"
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
                                    />
                                    {detailedView
                                        ? subtype.accounts.map(account => {
                                            if (!accountIsEmpty(account)) {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <ReportRow
                                                            label={account.accountName}
                                                            values={account.amounts}
                                                            isCurrency
                                                            indentLevel={2}
                                                        />
                                                        {account.children.map(child => {
                                                            if (!accountIsEmpty(child)) {
                                                                return (
                                                                    <ReportRow
                                                                        label={child.accountName}
                                                                        values={child.amounts}
                                                                        isCurrency
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
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Operating Income */}
                    <ReportRow
                        label={translate("Operating income")}
                        values={incomeStatementDto.totalOperatingIncome}
                        className="fw-semibold border-top-0 mt-3"
                        isCurrency
                    />
                    {/** Non-operating income/expenses */}
                    <ReportRow
                        label={translate("Non-operating income and expenses")}
                        className="fw-semibold mt-3 border-top-0"
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
                                    />
                                    {detailedView
                                        ? subtype.accounts.map(account => {
                                            if (!accountIsEmpty(account)) {
                                                return (
                                                    <React.Fragment key={account.accountId}>
                                                        <ReportRow
                                                            label={account.accountName}
                                                            values={account.amounts}
                                                            isCurrency
                                                            indentLevel={2}
                                                        />
                                                        {account.children.map(child => {
                                                            if (!accountIsEmpty(child)) {
                                                                return (
                                                                    <ReportRow
                                                                        label={child.accountName}
                                                                        values={child.amounts}
                                                                        isCurrency
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
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** EBIT */}
                    <ReportRow
                        label={translate("Earnings before interest and tax")}
                        values={incomeStatementDto.totalEbit}
                        className="fw-semibold border-top-0 mt-3"
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
                                        <ReportRow
                                            label={account.accountName}
                                            values={account.amounts}
                                            isCurrency
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return (
                                                        <ReportRow
                                                            key={child.accountId}
                                                            label={child.accountName}
                                                            values={child.amounts}
                                                            isCurrency
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
                        className="fw-semibold"
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
                                        <ReportRow
                                            label={account.accountName}
                                            values={account.amounts}
                                            isCurrency
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return (
                                                        <ReportRow
                                                            key={child.accountId}
                                                            label={child.accountName}
                                                            values={child.amounts}
                                                            isCurrency
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
                            className="fw-semibold border-top-0 mt-3"
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
                                        <ReportRow
                                            label={account.accountName}
                                            values={account.amounts}
                                            isCurrency
                                            indentLevel={1}
                                        />
                                        {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return (
                                                        <ReportRow
                                                            key={child.accountId}
                                                            label={child.accountName}
                                                            values={child.amounts}
                                                            isCurrency
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
                        className="fw-semibold border-top-0 mt-3"
                        isCurrency
                    />
                </div>
                : null
            }
        </>
    )
}

export default IncomeStatementStandard;