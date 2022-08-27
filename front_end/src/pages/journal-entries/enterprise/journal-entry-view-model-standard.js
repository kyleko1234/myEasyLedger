import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { formatCurrency } from '../../../utils/util-fns';

function JournalEntryViewModelStandard({journalEntryDate, description, debitAmount, creditAmount, onClick}) {
    const appContext = React.useContext(PageSettings);

    return (
        <Link replace to="#" className="pseudo-tr d-none d-md-flex" onClick={onClick}>
            <div className="pseudo-td col-md-2">
                {journalEntryDate}
            </div>
            <div className="pseudo-td text-truncate col-md-6">
                {description}
            </div>
            <div className="pseudo-td text-end col-md-2">
                {debitAmount == 0
                    ? ''
                    : formatCurrency(appContext.locale, appContext.currency, debitAmount)
                }
            </div>
            <div className="pseudo-td text-end col-md-2">
                {creditAmount == 0
                    ? ''
                    : formatCurrency(appContext.locale, appContext.currency, creditAmount)
                }
            </div>
        </Link>
    )
}

export default JournalEntryViewModelStandard;