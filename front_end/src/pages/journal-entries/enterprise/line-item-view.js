import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency } from '../../../utils/util-fns';

function LineItemView({ lineItem, accountOptions }) {
    const appContext = React.useContext(PageSettings);
    const accountOption = accountOptions.find(accountOption => accountOption.value === lineItem.accountId);

    return (
        <>
            {/**Desktop View */}
            <div className="pseudo-tr d-none d-lg-flex">
                <div className="pseudo-td col-6">
                    {lineItem.description}
                </div>
                <div className="pseudo-td col-2">
                    {accountOption ? accountOption.label : null}
                </div>
                <div className="pseudo-td col-2 text-end">
                    {lineItem.debitAmount ? formatCurrency(appContext.locale, appContext.currency, lineItem.debitAmount) : null}
                </div>
                <div className="pseudo-td col-2 text-end">
                    {lineItem.creditAmount ? formatCurrency(appContext.locale, appContext.currency, lineItem.creditAmount) : null}
                </div>
            </div>
            {/**Mobile View */}
            <div className="pseudo-tr d-flex d-lg-none">
                <div className="px-2 py-2 w-100">
                    <div className="fw-semibold">
                        {accountOption ? accountOption.label : null}
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
                                {lineItem.debitAmount ? formatCurrency(appContext.locale, appContext.currency, lineItem.debitAmount) : null}
                            </div>
                        </div>
                        <div className="text-end">
                            <div className="fw-semibold">
                                {journalEntriesText[appContext.locale]["Credit"]}
                            </div>
                            <div>
                                {lineItem.creditAmount ? formatCurrency(appContext.locale, appContext.currency, lineItem.creditAmount) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default LineItemView;