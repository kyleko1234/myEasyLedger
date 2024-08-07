import React from 'react';
import { Alert } from 'reactstrap';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { balanceSheetRenderText } from '../../../utils/i18n/balance-sheet-render-text';
import { accountIsEmpty, arrayIsAllZeroes, localizeDate, subtypeIsEmpty } from '../../../utils/util-fns';
import ReportRow from './report-row';
import AccountInReport from './account-in-report';

function BalanceSheetReport({balanceSheetDto, detailedView}) {
    const appContext = React.useContext(PageSettings);
    const translate = text => balanceSheetRenderText[appContext.locale][text];
    const dateLabels = () => {
        let labels = [];
        balanceSheetDto.dateRanges.map(dateRange => {
            if (!dateRange.name || dateRange.name === "Custom") {
                labels.push(translate("As of:") + " " + localizeDate(dateRange.endDate));
            } else {
                labels.push(dateRange.name);
            }
        })
        return labels;
    }
    const [unbalancedAlert, setUnbalancedAlert] = React.useState(true);

    React.useEffect(() => {
        //TODO: check for unbalanced balance sheets
    }, [])
    return(
        <>
            <Alert isOpen={balanceSheetDto? balanceSheetDto.unbalanced: false} color="danger">
                {balanceSheetRenderText[appContext.locale]["This balance sheet does not satisfy the accounting equation. Please check that the initial debit and credit values of all accounts are set up correctly."]}
            </Alert>
            {balanceSheetDto
                ? <div>
                    {/** Date Labels */}
                    <ReportRow
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/** Assets */}
                    <ReportRow
                        label={translate("Assets")}
                        className="report-header"
                    />
                    <ReportRow
                        label={translate("Current assets")}
                        values={balanceSheetDto.totalCurrentAssets}
                        isCurrency
                        indentLevel={1}
                        className="report-subheader"
                    />
                    {balanceSheetDto.currentAssetsSubtypes
                        ? balanceSheetDto.currentAssetsSubtypes.map((subtype, i)=> {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={translate(subtype.accountSubtypeName)}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) { 
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <AccountInReport
                                                                accountName={account.accountName}
                                                                accountId={account.accountId}
                                                                amounts={account.amounts}
                                                                hasChildren={account.hasChildren}
                                                                indentLevel={3}
                                                            />
                                                            {account.children.map(child => {
                                                                if (!accountIsEmpty(child)) {
                                                                    return(
                                                                        <AccountInReport
                                                                            accountName={child.accountName}
                                                                            amounts={child.amounts}
                                                                            accountId={child.accountId}
                                                                            key={child.accountId}
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
                        })
                        : null
                    }
                    <ReportRow
                        label={translate("Non-current assets")}
                        values={balanceSheetDto.totalNonCurrentAssets}
                        isCurrency
                        indentLevel={1}
                        className="report-subheader"
                    />
                    {balanceSheetDto.nonCurrentAssetsSubtypes
                        ? balanceSheetDto.nonCurrentAssetsSubtypes.map((subtype, i) => {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={translate(subtype.accountSubtypeName)}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <AccountInReport
                                                                accountName={account.accountName}
                                                                amounts={account.amounts}
                                                                accountId={account.accountId}
                                                                hasChildren={account.hasChildren}
                                                                indentLevel={3}
                                                            />
                                                            {account.children.map(child => {
                                                                if (!accountIsEmpty(child)) {
                                                                    return(
                                                                        <AccountInReport
                                                                            accountName={child.accountName}
                                                                            amounts={child.amounts}
                                                                            key={child.accountId}
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
                        })
                        : null
                    }
                    <ReportRow
                        label={translate("Total assets")}
                        className="fw-bold"
                        isCurrency
                        values={balanceSheetDto.totalAssets}
                    />
                    {/** Liabilities */}
                    <ReportRow
                        label={translate("Liabilities")}
                        className="border-top-0 mt-5 report-header"
                    />
                    <ReportRow
                        label={translate("Current liabilities")}
                        values={balanceSheetDto.totalCurrentLiabilities}
                        isCurrency
                        indentLevel={1}
                        className="report-subheader"
                    />
                    {balanceSheetDto.currentLiabilitiesSubtypes
                        ? balanceSheetDto.currentLiabilitiesSubtypes.map((subtype, i)=> {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={translate(subtype.accountSubtypeName)}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <AccountInReport
                                                                accountName={account.accountName}
                                                                amounts={account.amounts}
                                                                accountId={account.accountId}
                                                                hasChildren={account.hasChildren}
                                                                indentLevel={3}
                                                            />
                                                            {account.children.map(child => {
                                                                if (!accountIsEmpty(child)) {
                                                                    return(
                                                                        <AccountInReport
                                                                            accountName={child.accountName}
                                                                            amounts={child.amounts}
                                                                            key={child.accountId}
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
                        })
                        : null
                    }
                    <ReportRow
                        label={translate("Non-current liabilities")}
                        values={balanceSheetDto.totalNonCurrentLiabilities}
                        isCurrency
                        indentLevel={1}
                        className="report-subheader"
                    />
                    {balanceSheetDto.nonCurrentLiabilitiesSubtypes
                        ? balanceSheetDto.nonCurrentLiabilitiesSubtypes.map((subtype, i) => {
                            if (!subtypeIsEmpty(subtype)) {
                                return(
                                    <React.Fragment key={i}>
                                        <ReportRow
                                            label={translate(subtype.accountSubtypeName)}
                                            values={subtype.totalDebitsMinusCredits}
                                            isCurrency
                                            indentLevel={2}
                                        />
                                        {detailedView 
                                            ? subtype.accounts.map((account, i) => {
                                                if (!accountIsEmpty(account)) {
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <AccountInReport
                                                                accountName={account.accountName}
                                                                amounts={account.amounts}
                                                                accountId={account.accountId}
                                                                hasChildren={account.hasChildren}
                                                                indentLevel={3}
                                                            />
                                                            {account.children.map(child => {
                                                                if (!accountIsEmpty(child)) {
                                                                    return(
                                                                        <AccountInReport
                                                                            accountName={child.accountName}
                                                                            amounts={child.amounts}
                                                                            key={child.accountId}
                                                                            accountId={child.accountId}
                                                                            indentLevel={3}
                                                                            isChild
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
                        label={translate("Total liabilities")}
                        className="fw-bold"
                        isCurrency
                        values={balanceSheetDto.totalLiabilities}
                    />
                    {/** Equity */}
                    <ReportRow
                        label={translate("Equity")}
                        className="report-header border-top-0 mt-5"
                    />
                    <ReportRow
                        label={translate("Paid-in capital")}
                        values={balanceSheetDto.totalPaidInCapital}
                        isCurrency
                        indentLevel={1}
                        className="report-subheader"
                    />
                    {detailedView 
                        ? balanceSheetDto.paidInCapitalAccounts.map((account, i) => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={i}>
                                        <AccountInReport
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={2}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return(
                                                    <AccountInReport
                                                        accountName={child.accountName}
                                                        amounts={child.amounts}
                                                        accountId={child.accountId}
                                                        key={child.accountId}
                                                        indentLevel={2}
                                                        isChild
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
                        label={translate("Share-based compensation")}
                        values={balanceSheetDto.totalShareBasedCompensation}
                        isCurrency
                        indentLevel={1}
                        className="report-subheader"
                    />
                    {detailedView 
                        ? balanceSheetDto.shareBasedCompensationAccounts.map((account, i) => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={i}>
                                        <AccountInReport
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={2}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return(
                                                    <AccountInReport
                                                        accountName={child.accountName}
                                                        amounts={child.amounts}
                                                        accountId={child.accountId}
                                                        key={child.accountId}
                                                        indentLevel={2}
                                                        isChild
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
                        label={translate("Other equity items")}
                        values={balanceSheetDto.totalOtherEquityItems}
                        isCurrency
                        indentLevel={1}
                        className="report-subheader"
                    />
                    {detailedView 
                        ? balanceSheetDto.otherEquityItemsAccounts.map((account, i) => {
                            if (!accountIsEmpty(account)) {
                                return (
                                    <React.Fragment key={i}>
                                        <AccountInReport
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={2}
                                        />
                                        {account.children.map(child => {
                                            if (!accountIsEmpty(child)) {
                                                return(
                                                    <AccountInReport
                                                        accountName={child.accountName}
                                                        amounts={child.amounts}
                                                        accountId={child.accountId}
                                                        key={child.accountId}
                                                        indentLevel={2}
                                                        isChild
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
                        label={translate("Retained earnings")}
                        indentLevel={1}
                        className="report-subheader"
                    />
                    <ReportRow
                        label={translate("Beginning balances")}
                        values={balanceSheetDto.retainedEarningsBeginningBalances}
                        isCurrency
                        indentLevel={2}
                    />
                    <ReportRow
                        label={translate("Net income for current fiscal period")}
                        values={balanceSheetDto.netIncomeCurrentPeriod}
                        isCurrency
                        indentLevel={2}
                    />
                    <ReportRow
                        label={translate("Dividends for current fiscal period")}
                        values={balanceSheetDto.totalDividendsAndEquivalentsCurrentPeriod}
                        isCurrency
                        indentLevel={2}
                    />
                    <ReportRow
                        label={translate("Ending balances of retained earnings")}
                        values={balanceSheetDto.retainedEarningsEndingBalances}
                        isCurrency
                        indentLevel={2}
                        className="fw-semibold"
                    />
                    <ReportRow
                        label={translate("Total equity")}
                        values={balanceSheetDto.totalEquity}
                        isCurrency
                        className="fw-bold"
                    />


                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default BalanceSheetReport;