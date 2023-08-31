import React from 'react';
import LoadingSpinner from '../../../components/misc/loading-spinner';
import { PageSettings } from '../../../config/page-settings';
import { netWorthReportText } from '../../../utils/i18n/net-worth-report-text';
import { accountIsEmpty, localizeDate } from '../../../utils/util-fns';
import ReportRow from './report-row';

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
                        className="fw-semibold"
                    />
                    {netWorthReportDto.assetAccounts
                        ? netWorthReportDto.assetAccounts.map(account => {
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
                                            if (!accountIsEmpty(child) && detailedView) {
                                                return(
                                                    <ReportRow
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        indentLevel={2}
                                                        key={child.accountId}
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
                        className="fw-semibold"
                    />

                    {/**Liabilities */}
                    <ReportRow
                        label={translate("Liabilities")}
                        className="fw-semibold border-top-0 mt-3"
                    />
                    {netWorthReportDto.liabilityAccounts
                        ? netWorthReportDto.liabilityAccounts.map(account => {
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
                                            if (!accountIsEmpty(child) && detailedView) {
                                                return(
                                                    <ReportRow
                                                        label={child.accountName}
                                                        values={child.amounts}
                                                        isCurrency
                                                        indentLevel={2}
                                                        key={child.accountId}
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
                        className="fw-semibold"
                    />
                    {/**Total net worth */}
                    <ReportRow
                        label={translate("Total Net Worth")}
                        values={netWorthReportDto.totalNetWorth}
                        isCurrency
                        className="fw-semibold border-top-0 mt-3"
                    />
                </div>
                : <LoadingSpinner big/>
            }
        </>
    )
}

export default NetWorthReport;