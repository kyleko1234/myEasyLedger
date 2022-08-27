import React from 'react'
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency } from '../../../utils/util-fns';

function LineItemsFooterView({ lineItems }) {
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
            <div className="pseudo-tfoot">
                <div className="pseudo-tr d-none d-lg-flex">
                    <div className="pseudo-td col-6">{journalEntriesText[appContext.locale]["Total"]}</div>
                    <div className="pseudo-td col-2"></div>
                    <div className="pseudo-td col-2 text-end">
                        {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("debitAmount"))}
                    </div>
                    <div className="pseudo-td col-2 text-end">
                        {formatCurrency(appContext.locale, appContext.currency, sumAmountsInColumn("creditAmount"))}
                    </div>
                </div>
                <div className="pseudo-tr d-flex d-lg-none">
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
        </>
    )
}
export default LineItemsFooterView;