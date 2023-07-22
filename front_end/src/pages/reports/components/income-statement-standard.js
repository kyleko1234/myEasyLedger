import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { accountIsEmpty, localizeDate, subtypeIsEmpty } from '../../../utils/util-fns';
import ReportRow from './report-row';

function IncomeStatementStandard({ incomeStatementDto, detailedView }) {
    const appContext = React.useContext(PageSettings);
    const dateLabels = () => {
        let labels = [];
        incomeStatementDto.dateRanges.map(dateRange => {
            labels.push(<>
                <div>
                    {incomeStatementRenderText[appContext.locale]["From:"] + " " + localizeDate(dateRange.startDate)}
                </div>
                <div>
                    {incomeStatementRenderText[appContext.locale]["To:"] + " " + localizeDate(dateRange.endDate)}
                </div>
            </>)
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
    return (
        <>
            {incomeStatementDto
                ? <div>
                    {/** Report Header */}
                    <ReportRow
                        label={"Income Statement"}
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/** Revenue */}
                    <ReportRow
                        label={"Revenue"}
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
                        label={"Total revenue"}
                        values={incomeStatementDto.totalRevenue}
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Cost of sales */}
                    <ReportRow
                        label={"Cost of sales"}
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
                        label={"Total cost of sales"}
                        values={incomeStatementDto.totalCostOfSales}
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Gross Profit */}
                    <ReportRow
                        label={"Gross profit"}
                        values={incomeStatementDto.totalGrossProfit}
                        className="fw-semibold border-top-0 mt-3"
                        isCurrency
                    />
                    {/** Operating expenses */}
                    <ReportRow
                        label={"Operating expenses"}
                        className="fw-semibold mt-3 border-top-0"
                    />
                    {incomeStatementDto.operatingExpensesSubtypes.map((subtype, i) => {
                        if (!subtypeIsEmpty(subtype)) {
                            return (
                                <React.Fragment key={i}>
                                    <ReportRow
                                        label={subtype.accountSubtypeName /**remember to translate */}
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
                        label={"Total operating expenses"}
                        values={incomeStatementDto.totalOperatingExpenses}
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Operating Income */}
                    <ReportRow
                        label={"Operating income"}
                        values={incomeStatementDto.totalOperatingIncome}
                        className="fw-semibold border-top-0 mt-3"
                        isCurrency
                    />
                    {/** Non-operating income/expenses */}
                    <ReportRow
                        label={"Non-operating income and expenses"}
                        className="fw-semibold mt-3 border-top-0"
                    />
                    {incomeStatementDto.nonOperatingIncomeAndExpenseSubtypes.map((subtype, i) => {
                        if (!subtypeIsEmpty(subtype)) {
                            return (
                                <React.Fragment key={i}>
                                    <ReportRow
                                        label={subtype.accountSubtypeName /**remember to translate */}
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
                        label={"Total non-operating income and expenses, net"}
                        values={incomeStatementDto.totalNonOperatingIncomeAndExpenseSubtypesNet}
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** EBIT */}
                    <ReportRow
                        label={"Earnings before interest and tax"}
                        values={incomeStatementDto.totalEbit}
                        className="fw-semibold border-top-0 mt-3"
                        isCurrency
                    />
                    {/** Interest */}
                    <ReportRow
                        label={"Interest expense"}
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
                        label={"Earnings before tax"}
                        values={incomeStatementDto.totalEarningsBeforeTax}
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Tax */}
                    <ReportRow
                        label={"Tax expense"}
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
                            label={"Non-recurring and extraordinary items"}
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
                        label={"Net income"}
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