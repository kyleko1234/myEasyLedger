import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { netWorthReportText } from '../../../utils/i18n/net-worth-report-text';
import { accountIsEmpty, localizeDate } from '../../../utils/util-fns';
import ReportRow from './report-row';
import AccountInReportSimple from './account-in-report-simple';

function NetWorthReport({netWorthReportDto, detailedView}) {
    const appContext = React.useContext(PageSettings);
    const translate = text => netWorthReportText[appContext.locale][text];
    const dateLabels = () => {
        let labels = [];
        netWorthReportDto.dateRanges.map(dateRange => {
            if (!dateRange.name || dateRange.name === "Custom") {
                labels.push(translate("As of:") + " " + localizeDate(dateRange.endDate));
            } else {
                labels.push(dateRange.name);
            }
        })
        return labels;
    }
    return(
        <>
            {netWorthReportDto
                ? <div>
                    <ReportRow
                        values={dateLabels()}
                        className="fw-semibold"
                    />
                    {/**Assets */}
                    <ReportRow
                        label={translate("Assets")}
                        className="report-header"
                    />
                    {netWorthReportDto.assetAccounts
                        ? netWorthReportDto.assetAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <AccountInReportSimple
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={1}
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
                        label={translate("Total Assets")}
                        values={netWorthReportDto.totalAssets}
                        isCurrency
                        className="fw-bold"
                    />

                    {/**Liabilities */}
                    <ReportRow
                        label={translate("Liabilities")}
                        className="report-header border-top-0 mt-5"
                    />
                    {netWorthReportDto.liabilityAccounts
                        ? netWorthReportDto.liabilityAccounts.map(account => {
                            if (!accountIsEmpty(account)) {
                                return(
                                    <React.Fragment key={account.accountId}>
                                        <AccountInReportSimple
                                            accountName={account.accountName}
                                            amounts={account.amounts}
                                            accountId={account.accountId}
                                            hasChildren={account.hasChildren}
                                            indentLevel={1}
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
                        label={translate("Total Liabilities")}
                        values={netWorthReportDto.totalLiabilities}
                        isCurrency
                        className="fw-bold"
                    />
                    {/**Total net worth */}
                    <ReportRow
                        label={translate("Total Net Worth")}
                        values={netWorthReportDto.totalNetWorth}
                        isCurrency
                        className="report-header fw-bold border-top-0 mt-5"
                    />
                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default NetWorthReport;