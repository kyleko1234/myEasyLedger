import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import PerfectScrollbar from 'react-perfect-scrollbar';
import StripedRow from '../../../components/tables/striped-row';
import { formatCurrency, localizeDate } from '../../../utils/util-fns';
import { DEBIT_ACCOUNT_TYPES } from '../../../utils/constants';

function AccountTransactionsReport({ reportData }) {
    const appContext = React.useContext(PageSettings);

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
                    <CardBody>
                        <PerfectScrollbar>
                            <div className="min-width-md">
                                <div className="position-relative pseudo-tr d-flex bg-light border rounded pseudo-th">
                                    <div className="col-2">
                                        Date
                                    </div>
                                    <div className="col-4">
                                        Description
                                    </div>
                                    <div className="col-2 text-end">
                                        Debit
                                    </div>
                                    <div className="col-2 text-end">
                                        Credit
                                    </div>
                                    <div className="col-2 text-end">
                                        Balance
                                    </div>
                                </div>
                                <StripedRow className="fw-semibold">
                                    <div className=" col-2">
                                    </div>
                                    <div className=" col-4">
                                        Beginning Balance
                                    </div>
                                    <div className=" col-2 text-end">
                                    </div>
                                    <div className=" col-2 text-end">
                                    </div>
                                    <div className=" col-2 text-end">
                                        {formatCurrency(appContext.locale, appContext.currency, reportData.initialDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(reportData.account.accountTypeId) ? 1 : -1))}
                                    </div>
                                </StripedRow>
                                {reportData.lineItems.map(lineItem => {
                                    return (
                                        <StripedRow>
                                            <div className=" col-2">
                                                {localizeDate(lineItem.journalEntryDate)}
                                            </div>
                                            <div className=" col-4">
                                                {lineItem.description ? lineItem.description : lineItem.journalEntryDescription}
                                            </div>
                                            <div className=" col-2 text-end">
                                                {lineItem.isCredit ? null : formatCurrency(appContext.locale, appContext.currency, lineItem.amount)}
                                            </div>
                                            <div className=" col-2 text-end">
                                                {lineItem.isCredit ? formatCurrency(appContext.locale, appContext.currency, lineItem.amount) : null}
                                            </div>
                                            <div className=" col-2 text-end">
                                                {formatCurrency(appContext.locale, appContext.currency, lineItem.currentDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(reportData.account.accountTypeId) ? 1 : -1))}
                                            </div>
                                        </StripedRow>
                                    )
                                })}
                                <StripedRow className="fw-semibold">
                                    <div className=" col-2">
                                    </div>
                                    <div className=" col-4">
                                        Ending Balance
                                    </div>
                                    <div className=" col-2 text-end">
                                    </div>
                                    <div className=" col-2 text-end">
                                    </div>
                                    <div className=" col-2 text-end">
                                        {formatCurrency(appContext.locale, appContext.currency, reportData.endingDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(reportData.account.accountTypeId) ? 1 : -1))}
                                    </div>
                                </StripedRow>
                                <StripedRow className="fw-semibold">
                                    <div className=" col-2">
                                    </div>
                                    <div className=" col-4">
                                        Total Change
                                    </div>
                                    <div className=" col-2 text-end">
                                        {formatCurrency(appContext.locale, appContext.currency, reportData.changeInDebitValue)}
                                    </div>
                                    <div className=" col-2 text-end">
                                        {formatCurrency(appContext.locale, appContext.currency, reportData.changeInCreditValue)}
                                    </div>
                                    <div className=" col-2 text-end">
                                        {formatCurrency(appContext.locale, appContext.currency, reportData.changeInDebitsMinusCredits * (DEBIT_ACCOUNT_TYPES.includes(reportData.account.accountTypeId) ? 1 : -1))}
                                    </div>
                                </StripedRow>

                            </div>
                        </PerfectScrollbar>
                    </CardBody>
                </Card>
            </div>
        </>
    )

}

export default AccountTransactionsReport;