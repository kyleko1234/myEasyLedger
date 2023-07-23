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
                    {/** Operating activities */}
                    <ReportRow
                        label={"Operating activities"}
                        className="fw-semibold border-top-0 mt-3"
                    />
                    <ReportRow
                        label={"Net income"}
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
                    <ReportRow
                        label={"Adjustment for non-operating income and expenses"}
                        values={cashFlowStatementDto.totalAdjustmentForNonOperatingIncomeExpenseNet}
                        indentLevel={1}
                        isCurrency
                    />
                    <ReportRow
                        label={"Income and expenses from operations, net"}
                        values={cashFlowStatementDto.totalIncomeExpenseFromOperatingNet}
                        indentLevel={1}
                        isCurrency
                        className="fw-semibold"
                    />
                    {(accountsAreEmpty(cashFlowStatementDto.nonCashOperatingIncomeExpenseAccounts) && accountsAreEmpty(cashFlowStatementDto.changesInOperatingAssetsLiabilitiesAccounts) && accountsAreEmpty(cashFlowStatementDto.changesInOperatingEquityAccounts))
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
                    {/** Investing activities */}
                    <ReportRow
                        label={"Investing activities"}
                        className="fw-semibold border-top-0 mt-3"
                    />
                    <ReportRow
                        label={"Income and expenses from investing, net "}
                        values={cashFlowStatementDto.totalIncomeExpenseFromInvestingNet}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {detailedView
                        ? cashFlowStatementDto.incomeExpenseFromInvestingAccounts.map(account => {
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
                    {(accountsAreEmpty(cashFlowStatementDto.depreciationAdjustmentAccounts) 
                            && accountsAreEmpty(cashFlowStatementDto.nonCashInvestingIncomeExpenseAccounts) 
                            && accountsAreEmpty(cashFlowStatementDto.changesInInvestingAssetsLiabilitiesAccounts) 
                            && accountsAreEmpty(cashFlowStatementDto.changesInInvestingEquityAccounts))
                        ? null
                        : <ReportRow
                            label={"Adjustments to reconcile investing income to cash generated by investing activities"}
                            isCurrency
                            indentLevel={1}
                            className="fw-semibold"
                        />
                    }
                    {accountsAreEmpty(cashFlowStatementDto.nonCashInvestingIncomeExpenseAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Adjustment for non-cash investing income and expenses"}
                                values={cashFlowStatementDto.totalNonCashInvestingIncomeExpense}
                                indentLevel={1}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.nonCashInvestingIncomeExpenseAccounts.map(account => {
                                    if (!accountIsEmpty(account)) {
                                        return(
                                            <React.Fragment key={account.accountId}>
                                                <ReportRow
                                                    label={account.accountName}
                                                    values={account.amounts}
                                                    isCurrency
                                                    indentLevel={2}
                                                />
                                                {account.children.map(child => {
                                                    if (!accountIsEmpty(child)) {
                                                        return(
                                                            <ReportRow
                                                                key={child.accountId}
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
                        </>
                    }
                    {accountsAreEmpty(cashFlowStatementDto.changesInInvestingAssetsLiabilitiesAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Changes in investing assets and liabilities"}
                                values={cashFlowStatementDto.totalChangesInInvestingAssetsLiabilities}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.changesInInvestingAssetsLiabilitiesAccounts.map(account => {
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
                    {accountsAreEmpty(cashFlowStatementDto.depreciationAdjustmentAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Adjustment for change in book value due to depreciation and amortization"}
                                values={cashFlowStatementDto.totalAdjustmentForDepreciationAmortization}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.depreciationAdjustmentAccounts.map(account => {
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

                    {accountsAreEmpty(cashFlowStatementDto.changesInInvestingEquityAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Changes in investing equity"}
                                values={cashFlowStatementDto.totalChangesInInvestingEquity}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.changesInInvestingEquityAccounts.map(account => {
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
                        label={"Cash flow from investing"}
                        values={cashFlowStatementDto.cashFlowFromInvesting}
                        className="fw-semibold"
                        isCurrency
                    />
                    {/** Financing activities */}
                    <ReportRow
                        label={"Financing activities"}
                        className="fw-semibold border-top-0 mt-3"
                    />
                    <ReportRow
                        label={"Income and expenses from financing, net "}
                        values={cashFlowStatementDto.totalIncomeExpenseFromFinancingNet}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {detailedView
                        ? cashFlowStatementDto.incomeExpenseFromFinancingAccounts.map(account => {
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
                    {(accountsAreEmpty(cashFlowStatementDto.nonCashFinancingIncomeExpenseAccounts) && accountsAreEmpty(cashFlowStatementDto.changesInNonDividendFinancingEquityAccounts) && accountsAreEmpty(cashFlowStatementDto.changesInNonDividendFinancingAssetLiabilityAccounts))
                        ? null
                        : <ReportRow
                            label={"Adjustments to reconcile financing income to cash generated by financing activities"}
                            isCurrency
                            indentLevel={1}
                            className="fw-semibold"
                        />
                    }
                    {accountsAreEmpty(cashFlowStatementDto.nonCashFinancingIncomeExpenseAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Adjustment for non-cash investing income and expenses"}
                                values={cashFlowStatementDto.totalNonCashFinancingIncomeExpense}
                                indentLevel={1}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.nonCashFinancingIncomeExpenseAccounts.map(account => {
                                    if (!accountIsEmpty(account)) {
                                        return(
                                            <React.Fragment key={account.accountId}>
                                                <ReportRow
                                                    label={account.accountName}
                                                    values={account.amounts}
                                                    isCurrency
                                                    indentLevel={2}
                                                />
                                                {account.children.map(child => {
                                                    if (!accountIsEmpty(child)) {
                                                        return(
                                                            <ReportRow
                                                                key={child.accountId}
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
                        </>
                    }
                    {accountsAreEmpty(cashFlowStatementDto.changesInNonDividendFinancingAssetLiabilityAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Changes in non-dividend assets and liabilities"}
                                values={cashFlowStatementDto.totalChangesInNonDividendFinancingAssetLiabilities}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.changesInNonDividendFinancingAssetLiabilityAccounts.map(account => {
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
                    {accountsAreEmpty(cashFlowStatementDto.changesInNonDividendFinancingEquityAccounts)
                        ? null
                        : <>
                            <ReportRow
                                label={"Changes in financing equity"}
                                values={cashFlowStatementDto.totalChangesInNonDividendFinancingEquity}
                                indentLevel={2}
                                isCurrency
                            />
                            {detailedView
                                ? cashFlowStatementDto.changesInNonDividendFinancingEquityAccounts.map(account => {
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
                        label={"Dividends paid"}
                        values={negateArrayOfNumbers(cashFlowStatementDto.totalDividendsPaid)}
                        indentLevel={1}
                        isCurrency
                        className="fw-semibold"
                    />
                    {(accountsAreEmpty(cashFlowStatementDto.dividendEquityAccounts) || !detailedView)
                        ? null
                        : <>
                            <ReportRow
                                label={"Dividend equity"}
                                values={negateArrayOfNumbers(cashFlowStatementDto.totalDividendEquity)}
                                indentLevel={2}
                                isCurrency
                            />
                            {cashFlowStatementDto.dividendEquityAccounts.map(account => {
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
                            })}
                        </>
                    }
                    {(accountsAreEmpty(cashFlowStatementDto.dividendLiabilityAccounts) || !detailedView)
                        ? null
                        : <>
                            <ReportRow
                                label={"Dividend liabilities"}
                                values={negateArrayOfNumbers(cashFlowStatementDto.totalDividendLiabilities)}
                                indentLevel={2}
                                isCurrency
                            />
                            {cashFlowStatementDto.dividendLiabilityAccounts.map(account => {
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
                            })}
                        </>
                    }
                    <ReportRow
                        label={"Cash flow from financing"}
                        values={cashFlowStatementDto.cashFlowFromFinancing}
                        className="fw-semibold"
                        isCurrency
                    />     
                    {/** Cash and cash equivalents: ending balances */}
                    <ReportRow
                        label={"Cash and cash equivalents, ending balances"}
                        values={cashFlowStatementDto.totalCashAndCashEquivalentsEnding}
                        isCurrency
                        className="fw-semibold border-top-0 mt-3"
                    />   
                    {/** Interest paid */}
                    <ReportRow
                        label={"Interest paid"}
                        values={cashFlowStatementDto.totalInterestPaid}
                        isCurrency
                        className="fw-semibold mt-3 border-top-0"
                    />
                    {(accountsAreEmpty(cashFlowStatementDto.interestExpenseAccounts) || !detailedView)
                        ? null
                        : <>
                            <ReportRow
                                label={"Interest expense"}
                                values={cashFlowStatementDto.totalInterestExpense}
                                indentLevel={1}
                                isCurrency
                            />
                            {cashFlowStatementDto.interestExpenseAccounts.map(account => {
                                if (!accountIsEmpty(account)) {
                                    return(
                                        <React.Fragment key={account.accountId}>
                                            <ReportRow
                                                label={account.accountName}
                                                values={account.amounts}
                                                isCurrency
                                                indentLevel={2}
                                            />
                                            {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return(
                                                        <ReportRow
                                                            key={child.accountId}
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
                            })}
                        </>
                    }
                    {(accountsAreEmpty(cashFlowStatementDto.interestLiabilityAccounts) || !detailedView)
                        ? null
                        : <>
                            <ReportRow
                                label={"Interest liabilities"}
                                values={cashFlowStatementDto.totalInterestLiabilities}
                                indentLevel={2}
                                isCurrency
                            />
                            {cashFlowStatementDto.interestLiabilityAccounts.map(account => {
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
                            })}
                        </>
                    }
                    {/** Taxes paid */}
                    <ReportRow
                        label={"Taxes paid"}
                        values={cashFlowStatementDto.totalTaxesPaid}
                        isCurrency
                        className="fw-semibold"
                    />
                    {(accountsAreEmpty(cashFlowStatementDto.taxExpenseAccounts) || !detailedView)
                        ? null
                        : <>
                            <ReportRow
                                label={"Tax expense"}
                                values={cashFlowStatementDto.totalTaxExpense}
                                indentLevel={1}
                                isCurrency
                            />
                            {cashFlowStatementDto.taxExpenseAccounts.map(account => {
                                if (!accountIsEmpty(account)) {
                                    return(
                                        <React.Fragment key={account.accountId}>
                                            <ReportRow
                                                label={account.accountName}
                                                values={account.amounts}
                                                isCurrency
                                                indentLevel={2}
                                            />
                                            {account.children.map(child => {
                                                if (!accountIsEmpty(child)) {
                                                    return(
                                                        <ReportRow
                                                            key={child.accountId}
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
                            })}
                        </>
                    }
                    {(accountsAreEmpty(cashFlowStatementDto.taxLiabilityAccounts) || !detailedView)
                        ? null
                        : <>
                            <ReportRow
                                label={"Tax liabilities"}
                                values={cashFlowStatementDto.totalTaxLiabilities}
                                indentLevel={2}
                                isCurrency
                            />
                            {cashFlowStatementDto.taxLiabilityAccounts.map(account => {
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
                            })}
                        </>
                    }
                </div>
                : null
            }
        </>
    )
}

export default CashFlowStatementStandard;