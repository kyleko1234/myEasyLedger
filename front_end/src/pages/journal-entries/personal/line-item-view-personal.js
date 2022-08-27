import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency } from '../../../utils/util-fns';

function LineItemViewPersonal({ lineItem }) {
    const appContext = React.useContext(PageSettings);

    return (
        <>
            {/**Desktop View */}
            <div className="pseudo-tr d-none d-lg-flex">
                <div className="pseudo-td col-3">
                    {lineItem.transactionTypeName}
                </div>

                <div className="pseudo-td col-3">
                    {lineItem.accountName}
                </div>
                <div className="pseudo-td col-4">
                    {lineItem.description}
                </div>
                <div className="pseudo-td col-2 text-end">
                    {formatCurrency(appContext.locale, appContext.currency, lineItem.amount)}
                </div>
            </div>
            {/**Mobile View */}
            <div className="pseudo-tr d-flex d-lg-none">
                <div className="px-2 py-2 w-100">
                    <div className="fw-semibold">
                        {lineItem.transactionTypeName + " - " + lineItem.accountName}
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="mb-2">
                            {lineItem.description
                                ? lineItem.description
                                : <em className="text-muted font-weight-light">
                                    {journalEntriesText[appContext.locale]["No memo"]}
                                </em>
                            }
                        </div>
                        <div className="text-end">
                            {formatCurrency(appContext.locale, appContext.currency, lineItem.amount)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default LineItemViewPersonal;