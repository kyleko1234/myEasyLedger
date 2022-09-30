import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency } from '../../../utils/util-fns';

function LineItemsFooterEditPersonal({lineItems}){
    const appContext = React.useContext(PageSettings);

    const sumAmounts = () => {
        let sum = 0;
        lineItems.forEach(lineItem => {
            if (lineItem.transactionType.isCredit) {
                sum += parseFloat(lineItem.amount);
            } else {
                sum -= parseFloat(lineItem.amount);
            }
        });
        if (isNaN(sum)) {
            return 0
        } else {
            return sum;
        }
    }
    
    return(
        <>
            <div className="pseudo-tfoot">
                <div className="pseudo-tr d-none d-lg-flex">
                    <div className="pseudo-td col-3">{journalEntriesText[appContext.locale]["Total"]}</div>
                    <div className="pseudo-td col-3"></div>
                    <div className="pseudo-td col-3"></div>
                    <div className="pseudo-td col-2">
                        {formatCurrency(appContext.locale, appContext.currency, sumAmounts())}
                    </div>
                    <div className="pseudo-td col-1"></div>
                </div>
                <div className="pseudo-tr d-flex d-lg-none">
                    <div className="px-2 py-2 w-100 d-flex justify-content-between">
                        <div>
                            {journalEntriesText[appContext.locale]["Total"]}
                        </div>
                        <div className="text-end">
                            {formatCurrency(appContext.locale, appContext.currency, sumAmounts())}
                        </div>
                    </div>
                </div>
            </div>
    </>

    )
}

export default LineItemsFooterEditPersonal;