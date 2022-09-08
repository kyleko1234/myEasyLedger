import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import PerfectScrollbar from 'react-perfect-scrollbar';
import StripedRow from '../../../components/tables/striped-row';
import { formatCurrency, localizeDate } from '../../../utils/util-fns';
import { DEBIT_ACCOUNT_TYPES } from '../../../utils/constants';
import { reportsText } from '../../../utils/i18n/reports-text';

function AccountTransactionsReport({ reportData, accountTypeId }) {
    const appContext = React.useContext(PageSettings);
    const endOfReport = React.useRef(null);

    React.useEffect(() => {
        endOfReport.current?.scrollIntoView({behavior: "smooth"});
    }, [reportData])

    return (
        <>
            <div>
                <h3>
                    {reportData.account.accountCode
                        ? reportData.account.accountCode + " - " + reportData.account.accountName
                        : reportData.account.accountName
                    }
                </h3>
                <Card className="very-rounded shadow-sm">
                    <CardBody >
                        <PerfectScrollbar>
                            <div className="min-width-md">
                                <div className="pseudo-tr d-flex bg-light border rounded pseudo-th ">
                                    <div className="col-2">
                                        {reportsText[appContext.locale]["Date"]}
                                    </div>
                                    <div className="col-4">
                                        {reportsText[appContext.locale]["Description"]}
                                    </div>
                                    <div className="col-2 text-end">
                                        {reportsText[appContext.locale]["Debit"]}
                                    </div>
                                    <div className="col-2 text-end">
                                        {reportsText[appContext.locale]["Credit"]}
                                    </div>
                                    <div className="col-2 text-end">
                                        {reportsText[appContext.locale]["Balance"]}
                                    </div>
                                </div>
                                <div className="account-transactions-report-module">
                                    <StripedRow className="fw-semibold">
                                        <div className=" col-2">
                                        </div>
                                        <div className=" col-4">
                                            {reportsText[appContext.locale]["Starting balance"]}
                                        </div>
                                        <div className=" col-2 text-end">
                                        </div>
                                        <div className=" col-2 text-end">
                                        </div>
                                        <div className=" col-2 text-end">
                                            {formatCurrency(appContext.locale, appContext.currency, reportData.initialDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(accountTypeId) ? 1 : -1))}
                                        </div>
                                    </StripedRow>
                                    {reportData.lineItems.map((lineItem, i)=> {
                                        return (
                                            <StripedRow key={i} className="align-items-center">
                                                <div className=" col-2">
                                                    {localizeDate(lineItem.journalEntryDate)}
                                                </div>
                                                <div className=" col-4">
                                                    <div className="font-size-compact fw-semibold">
                                                        {lineItem.journalEntryDescription}
                                                    </div>
                                                    <div className="font-size-compact fw-light">
                                                        {lineItem.description}
                                                    </div>
                                                </div>
                                                <div className=" col-2 text-end">
                                                    {lineItem.isCredit ? null : formatCurrency(appContext.locale, appContext.currency, lineItem.amount)}
                                                </div>
                                                <div className=" col-2 text-end">
                                                    {lineItem.isCredit ? formatCurrency(appContext.locale, appContext.currency, lineItem.amount) : null}
                                                </div>
                                                <div className=" col-2 text-end">
                                                    {formatCurrency(appContext.locale, appContext.currency, lineItem.currentDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(accountTypeId) ? 1 : -1))}
                                                </div>
                                            </StripedRow>
                                        )
                                    })}
                                    <StripedRow className="fw-semibold">
                                        <div className=" col-2">
                                        </div>
                                        <div className=" col-4">
                                            {reportsText[appContext.locale]["Ending balance"]}
                                        </div>
                                        <div className=" col-2 text-end">
                                        </div>
                                        <div className=" col-2 text-end">
                                        </div>
                                        <div className=" col-2 text-end">
                                            {formatCurrency(appContext.locale, appContext.currency, reportData.endingDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(accountTypeId) ? 1 : -1))}
                                        </div>
                                    </StripedRow>
                                    <StripedRow className="fw-semibold">
                                        <div className=" col-2">
                                        </div>
                                        <div className=" col-4">
                                            {reportsText[appContext.locale]["Total change"]}
                                        </div>
                                        <div className=" col-2 text-end">
                                            {formatCurrency(appContext.locale, appContext.currency, reportData.changeInDebitValue)}
                                        </div>
                                        <div className=" col-2 text-end">
                                            {formatCurrency(appContext.locale, appContext.currency, reportData.changeInCreditValue)}
                                        </div>
                                        <div className=" col-2 text-end">
                                            {formatCurrency(appContext.locale, appContext.currency, reportData.changeInDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(accountTypeId) ? 1 : -1))}
                                        </div>
                                    </StripedRow>
                                    <div ref={endOfReport}>
                                        {/**empty div for auto-scrolling */}
                                    </div>
                                </div>
                            </div>
                        </PerfectScrollbar>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default AccountTransactionsReport;