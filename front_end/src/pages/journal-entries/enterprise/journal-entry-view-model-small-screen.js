import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { formatCurrency } from '../../../utils/util-fns';

function JournalEntryViewModelSmallScreen({ journalEntryDate, description, debitAmount, creditAmount, onClick }) {
    const appContext = React.useContext(PageSettings);

    return (
        <Link replace to="#" className="pseudo-tr d-flex justify-content-between d-md-none align-items-center pseudo-td" onClick={onClick}>
            <div className="px-0 w-100">
                <div className="px-0 font-size-compact fw-semibold">
                    {journalEntryDate}
                </div>
                <div className="px-0">
                    {description}
                </div>
                <div className="d-flex justify-content-between pt-2">
                    <div className="font-size-compact">
                        <div className="fw-semibold">
                            {journalEntriesText[appContext.locale]["Debit"]}
                        </div>
                        <div className="px-0">
                            {debitAmount == 0
                                ? ''
                                : formatCurrency(appContext.locale, appContext.currency, debitAmount)
                            }                            
                        </div>
                    </div>
                    <div className="font-size-compact">
                        <div className="fw-semibold text-end">
                            {journalEntriesText[appContext.locale]["Credit"]}
                        </div>
                        <div className="px-0">
                            {creditAmount == 0
                                ? ''
                                : formatCurrency(appContext.locale, appContext.currency, creditAmount)
                            }                           
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default JournalEntryViewModelSmallScreen;