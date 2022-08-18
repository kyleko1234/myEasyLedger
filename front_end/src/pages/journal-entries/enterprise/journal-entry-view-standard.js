import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency, localizeDate } from '../../../utils/util-fns';

function JournalEntryViewStandard({ lineItems, journalEntryDate, journalEntryDescription, accountOptions, vendorOptions, customerOptions, journalEntryVendorId, journalEntryCustomerId }) {
    const appContext = React.useContext(PageSettings);

    const sumAmountsInColumn = columnName => {
        let sum = 0;
        lineItems.forEach(lineItem => {
            sum += lineItem[columnName];
        });
        if (isNaN(sum)) {
            return 0
        } else {
            return sum;
        }
    }

    return (
        <>
            <div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Date"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {localizeDate(journalEntryDate)}
                    </div>
                </div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Description"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {journalEntryDescription}
                    </div>
                </div>
                <div className="row mb-2 px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Vendor"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {journalEntryVendorId
                            ? vendorOptions
                                .find(vendorOption => vendorOption.object.vendorId === journalEntryVendorId)
                                .object.vendorName
                            : <div className="text-muted fw-light">
                                {journalEntriesText[appContext.locale]["None"]}
                            </div>
                        }
                    </div>
                </div>
                <div className="row px-2 px-lg-0">
                    <div className="col-md-3 col-lg-2">
                        <strong>{journalEntriesText[appContext.locale]["Customer"]}</strong>
                    </div>
                    <div className="col-md-9 col-lg-10">
                        {journalEntryCustomerId
                            ? customerOptions
                                .find(customerOption => customerOption.object.customerId === journalEntryCustomerId)
                                .object.customerName
                            : <div className="text-muted fw-light">
                                {journalEntriesText[appContext.locale]["None"]}
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="pseudo-table d-none d-lg-block">
                    <div className="pseudo-thead">
                        <div className="pseudo-tr bg-light rounded border d-flex">
                            <div className="pseudo-th col-6">
                                {journalEntriesText[appContext.locale]["Memo"]}
                            </div>
                            <div className="pseudo-th col-2">
                                {journalEntriesText[appContext.locale]["Account"]}
                            </div>
                            <div className="pseudo-th col-2 text-end">
                                {journalEntriesText[appContext.locale]["Debit"]}
                            </div>
                            <div className="pseudo-th col-2 text-end">
                                {journalEntriesText[appContext.locale]["Credit"]}
                            </div>
                        </div>
                    </div>
                    <div className="pseudo-tbody">
                        {lineItems.map(lineItem => {
                            let accountOption = accountOptions.find(accountOption => accountOption.value === lineItem.accountId);
                            return (
                                <div className="pseudo-tr d-flex" key={lineItem.lineItemId}>
                                    <div className="pseudo-td col-6">
                                        {lineItem.description}
                                    </div>
                                    <div className="pseudo-td col-2">
                                        {accountOption.label}
                                    </div>
                                    <div className="pseudo-td col-2 text-end">
                                        {lineItem.debitAmount? formatCurrency(appContext.locale, appContext.currency, lineItem.debitAmount) : null}
                                    </div>
                                    <div className="pseudo-td col-2 text-end">
                                        {lineItem.creditAmount? formatCurrency(appContext.locale, appContext.currency, lineItem.creditAmount) : null}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="pseudo-tfoot">
                        <div className="pseudo-tr d-flex">
                            <div className="pseudo-td col-6">{journalEntriesText[appContext.locale]["Total"]}</div>
                            <div className="pseudo-td col-2"></div>
                            <div className="pseudo-td col-2 text-end">
                                {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("debitAmount"))}
                            </div>
                            <div className="pseudo-td col-2 text-end">
                                {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("creditAmount"))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalEntryViewStandard;