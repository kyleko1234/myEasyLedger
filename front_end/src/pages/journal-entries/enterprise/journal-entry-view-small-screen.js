import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency, localizeDate } from '../../../utils/util-fns';

function JournalEntryViewSmallScreen({ lineItems, accountOptions }) {
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
            {/**Journal entry date, description, vendor, customer not rendered because it is rendered on JournalEntryViewStandard even on small screens */}
            <div className="pseudo-table d-lg-none">
                <div className="pseudo-tbody border-top">
                    {lineItems.map(lineItem => {
                        let accountOption = accountOptions.find(accountOption => accountOption.value === lineItem.accountId);
                        return (
                            <div key={lineItem.lineItemId} className="pseudo-tr d-flex">
                                <div className="px-2 py-2 w-100">
                                    <div className="fw-semibold">
                                        {accountOption.label}
                                    </div>
                                    <div className="mb-2">
                                        {lineItem.description 
                                            ? lineItem.description
                                            : <em className="text-muted font-weight-light">
                                                {journalEntriesText[appContext.locale]["No memo"]}
                                            </em>
                                        }
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <div className="">
                                            <div className="fw-semibold">
                                                {journalEntriesText[appContext.locale]["Debit"]}
                                            </div>
                                            <div>
                                                {lineItem.debitAmount? formatCurrency(appContext.locale, appContext.currency, lineItem.debitAmount) : null}
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-semibold">
                                                {journalEntriesText[appContext.locale]["Credit"]}
                                            </div>
                                            <div>
                                                {lineItem.creditAmount? formatCurrency(appContext.locale, appContext.currency, lineItem.creditAmount) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div className="pseudo-tfoot">
                    <div className="pseudo-tr d-flex">
                        <div className="px-2 py-2 w-100 d-flex justify-content-between">
                            <div>
                                <div>
                                    {journalEntriesText[appContext.locale]["Total Debit"]}
                                </div>
                                <div className="fw-normal">
                                    {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("debitAmount"))}
                                </div>
                            </div>
                            <div className="text-end">
                                <div>
                                    {journalEntriesText[appContext.locale]["Total Credit"]}
                                </div>
                                <div className="fw-normal">
                                    {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("creditAmount"))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JournalEntryViewSmallScreen;