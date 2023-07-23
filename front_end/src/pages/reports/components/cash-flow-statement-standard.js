import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { incomeStatementRenderText } from '../../../utils/i18n/income-statement-render-text';
import { accountIsEmpty, arrayIsAllZeroes, localizeDate, negateArrayOfNumbers } from '../../../utils/util-fns';
import ReportRow from './report-row';

function CashFlowStatementStandard({ cashFlowStatementDto, detailedView }) {
    const appContext = React.useContext(PageSettings);
    const dateLabels = () => {
        let labels = [];
        cashFlowStatementDto.dateRanges.map(dateRange => {
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
            {cashFlowStatementDto
                ? <div>
                    {/** Report Header */}
                    <ReportRow
                        label={"Cash Flow Statement"}
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/** Cash and cash equivalents: beginning balances */}
                    <ReportRow
                        label={"Cash and cash equivalents, beginning balances"}
                        values={cashFlowStatementDto.totalCashAndCashEquivalentsBeginning}
                        isCurrency
                        className="fw-semibold"
                    />
                    {detailedView
                        ? cashFlowStatementDto.cashAndCashEquivalentsAccountsBeginning.map(account => {
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
                                            if (!accountIsEmpty(child)) {
                                                return(
                                                    <ReportRow
                                                        key={child.accountId}
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        indentLevel={2}
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
                    {/** Operating Activities */}
                    <ReportRow
                        label={"Operating Activities"}
                        className="fw-semibold border-top-0 mt-3"

                    />
                    <ReportRow
                        label={"Net Income"}
                        values={cashFlowStatementDto.totalNetIncome}
                        isCurrency
                        indentLevel={1}
                    />
                    {detailedView
                        ? cashFlowStatementDto.incomeExpenseAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <ReportRow
                                            label={account.accountName}
                                            values={negateArrayOfNumbers(account.amounts)}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return(
                                                    <ReportRow
                                                        key={child.accountId}
                                                        label={child.accountName}
                                                        values={negateArrayOfNumbers(child.amounts)}
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
                    {(accountsAreEmpty(cashFlowStatementDto.nonCashOperatingIncomeExpenseAccounts) && arrayIsAllZeroes(cashFlowStatementDto.totalAdjustmentForNonOperatingIncomeExpenseNet))
                        ? null
                        : <ReportRow
                            label={"Adjustments to reconcile operating income to cash generated by operating activities"}
                            isCurrency
                            indentLevel={1}
                            className="fw-semibold"
                        />
                    }
                    {accountsAreEmpty(cashFlowStatementDto.nonCashOperatingIncomeExpenseAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Adjustment for non-cash operating income and expenses"}
                                values={cashFlowStatementDto.totalNonCashOperatingIncomeExpense}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.nonCashOperatingIncomeExpenseAccounts.map(account => {
                                    if (!accountIsEmpty(account)) {
                                        return(
                                            <React.Fragment key={account.accountId}>
                                                <ReportRow
                                                    label={account.accountName}
                                                    values={account.amounts}
                                                    isCurrency
                                                    indentLevel={3}
                                                />
                                                {account.children.map(child => {
                                                    if (!accountIsEmpty(child)) {
                                                        return(
                                                            <ReportRow
                                                                key={child.accountId}
                                                                label={child.accountName}
                                                                values={child.amounts}
                                                                isCurrency
                                                                indentLevel={4}
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
                        </>
                    }
                    {arrayIsAllZeroes(cashFlowStatementDto.totalAdjustmentForNonOperatingIncomeExpenseNet)
                        ? null
                        : <ReportRow
                            label={"Adjustment for non-operating income and expenses"}
                            values={cashFlowStatementDto.totalAdjustmentForNonOperatingIncomeExpenseNet}
                            indentLevel={2}
                            isCurrency
                        />
                    }
                    {accountsAreEmpty(cashFlowStatementDto.changesInOperatingAssetsLiabilitiesAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Changes in operating assets and liabilities"}
                                values={cashFlowStatementDto.totalChangesInOperatingAssetsLiabilities}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.changesInOperatingAssetsLiabilitiesAccounts.map(account => {
                                    if (!accountIsEmpty(account)) {
                                        return(
                                            <React.Fragment key={account.accountId}>
                                                <ReportRow
                                                    label={account.accountName}
                                                    values={negateArrayOfNumbers(account.amounts)}
                                                    isCurrency
                                                    indentLevel={3}
                                                />
                                                {account.children.map(child => {
                                                    if (!accountIsEmpty(child)) {
                                                        return(
                                                            <ReportRow
                                                                key={child.accountId}
                                                                label={child.accountName}
                                                                values={negateArrayOfNumbers(child.amounts)}
                                                                isCurrency
                                                                indentLevel={4}
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
                        </>
                    }
                    {accountsAreEmpty(cashFlowStatementDto.changesInOperatingEquityAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Changes in operating equity"}
                                values={cashFlowStatementDto.totalChangesInOperatingEquity}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.changesInOperatingEquityAccounts.map(account => {
                                    if (!accountIsEmpty(account)) {
                                        return(
                                            <React.Fragment key={account.accountId}>
                                                <ReportRow
                                                    label={account.accountName}
                                                    values={negateArrayOfNumbers(account.amounts)}
                                                    isCurrency
                                                    indentLevel={3}
                                                />
                                                {account.children.map(child => {
                                                    if (!accountIsEmpty(child)) {
                                                        return(
                                                            <ReportRow
                                                                key={child.accountId}
                                                                label={child.accountName}
                                                                values={negateArrayOfNumbers(child.amounts)}
                                                                isCurrency
                                                                indentLevel={4}
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
                        </>
                    }
                    <ReportRow
                        label="Cash flow from operations"
                        values={cashFlowStatementDto.cashFlowFromOperations}
                        className="fw-semibold"
                        isCurrency
                    />
                </div>
                : null
            }
        </>
    )
}

export default CashFlowStatementStandard;