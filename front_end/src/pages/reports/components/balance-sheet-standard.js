import React from 'react';
import { Alert } from 'reactstrap';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import { accountIsEmpty, arrayIsAllZeroes, subtypeIsEmpty } from '../../../utils/util-fns';
import ReportRow from './report-row';

function BalanceSheetStandard({balanceSheetDto, detailedView}) {
    const appContext = React.useContext(PageSettings);
    const dateLabels = () => {
        let labels = []
        balanceSheetDto.dateRanges.map(dateRange => {
            labels.push(dateRange.endDate)
        })
        return labels;
    }
    const [unbalancedAlert, setUnbalancedAlert] = React.useState(false);

    React.useEffect(() => {
        //TODO: check for unbalanced balance sheets
    }, [])
    return(
        <>
            <Alert isOpen={unbalancedAlert} color="danger">
                {balanceSheetRenderText[appContext.locale]["This balance sheet does not satisfy the accounting equation. Please check that the initial debit and credit values of all accounts are set up correctly."]}
            </Alert>
            {balanceSheetDto
                ? <div>
                    {/** Report Header */}
                    <ReportRow
                        label={"Balance sheet as of:"}
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/** Assets */}
                    <ReportRow
                        label={"Assets"}
                        className="fw-semibold"
                    />
                    <ReportRow
                        label={"Current assets"}
                        values={balanceSheetDto.totalCurrentAssets}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {balanceSheetDto.currentAssetsSubtypes
                        ? balanceSheetDto.currentAssetsSubtypes.map((subtype, i)=> {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={subtype.accountSubtypeName /**remember to translate */}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) {
                                                    return (
                                                        <React.Fragment key={i}>
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
                                                                            label={child.accountName}
                                                                            values={child.amounts}
                                                                            isCurrency
                                                                            key={child.accountId}
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
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={"Non-current assets"}
                        values={balanceSheetDto.totalNonCurrentAssets}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {balanceSheetDto.nonCurrentAssetsSubtypes
                        ? balanceSheetDto.nonCurrentAssetsSubtypes.map((subtype, i) => {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={subtype.accountSubtypeName}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) {
                                                    return (
                                                        <React.Fragment key={i}>
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
                                                                            label={child.accountName}
                                                                            values={child.amounts}
                                                                            isCurrency
                                                                            key={child.accountId}
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
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={"Total assets"}
                        className="fw-semibold"
                        isCurrency
                        values={balanceSheetDto.totalAssets}
                    />
                    {/** Liabilities */}
                    <ReportRow
                        label={"Liabilities"}
                        className="fw-semibold border-top-0 mt-3"
                    />
                    <ReportRow
                        label={"Current liabilities"}
                        values={balanceSheetDto.totalCurrentLiabilities}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {balanceSheetDto.currentLiabilitiesSubtypes
                        ? balanceSheetDto.currentLiabilitiesSubtypes.map((subtype, i)=> {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={subtype.accountSubtypeName /**remember to translate */}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) {
                                                    return (
                                                        <React.Fragment key={i}>
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
                                                                            label={child.accountName}
                                                                            values={child.amounts}
                                                                            isCurrency
                                                                            key={child.accountId}
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
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={"Non-current liabilities"}
                        values={balanceSheetDto.totalNonCurrentLiabilities}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {balanceSheetDto.nonCurrentLiabilitiesSubtypes
                        ? balanceSheetDto.nonCurrentLiabilitiesSubtypes.map((subtype, i) => {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={subtype.accountSubtypeName}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) {
                                                    return (
                                                        <React.Fragment key={i}>
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
                                                                            label={child.accountName}
                                                                            values={child.amounts}
                                                                            isCurrency
                                                                            key={child.accountId}
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
                                    </React.Fragment>
                                )
                            }
                        })
                        : null
                    }
                    <ReportRow
                        label={"Total liabilities"}
                        className="fw-semibold"
                        isCurrency
                        values={balanceSheetDto.totalLiabilities}
                    />
                    {/** Equity */}
                    <ReportRow
                        label={"Equity"}
                        className="fw-semibold border-top-0 mt-3"
                    />
                    <ReportRow
                        label={"Paid-in capital"}
                        values={balanceSheetDto.totalPaidInCapital}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {detailedView 
                        ? balanceSheetDto.paidInCapitalAccounts.map((account, i) => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={i}>
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
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        key={child.accountId}
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
                        label={"Share-based compensation"}
                        values={balanceSheetDto.totalShareBasedCompensation}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {detailedView 
                        ? balanceSheetDto.shareBasedCompensationAccounts.map((account, i) => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={i}>
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
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        key={child.accountId}
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
                        label={"Other equity items"}
                        values={balanceSheetDto.totalOtherEquityItems}
                        isCurrency
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    {detailedView 
                        ? balanceSheetDto.otherEquityItemsAccounts.map((account, i) => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={i}>
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
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        key={child.accountId}
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
                        label={"Retained earnings"}
                        indentLevel={1}
                        className="fw-semibold"
                    />
                    <ReportRow
                        label={"Beginning balances"}
                        values={balanceSheetDto.retainedEarningsBeginningBalances}
                        isCurrency
                        indentLevel={2}
                    />
                    <ReportRow
                        label={"Net income for current fiscal period"}
                        values={balanceSheetDto.netIncomeCurrentPeriod}
                        isCurrency
                        indentLevel={2}
                    />
                    <ReportRow
                        label={"Less dividends and equivalents for current fiscal period"}
                        values={balanceSheetDto.totalDividendsAndEquivalentsCurrentPeriod}
                        isCurrency
                        indentLevel={2}
                    />
                    <ReportRow
                        label={"Net income for current fiscal period"}
                        values={balanceSheetDto.netIncomeCurrentPeriod}
                        isCurrency
                        indentLevel={2}
                    />
                    <ReportRow
                        label={"Ending balances of retained earnings"}
                        values={balanceSheetDto.retainedEarningsEndingBalances}
                        isCurrency
                        indentLevel={2}
                        className="fw-semibold"
                    />
                    <ReportRow
                        label={"Total equity"}
                        values={balanceSheetDto.totalEquity}
                        isCurrency
                        className="fw-semibold"
                    />


                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default BalanceSheetStandard;