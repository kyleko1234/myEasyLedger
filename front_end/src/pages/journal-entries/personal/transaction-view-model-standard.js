import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { formatCurrency } from '../../../utils/util-fns';

function TransactionViewModelStandard({journalEntryDate, accountName, description, debitAmount, creditAmount, onClick}) {
    const appContext = React.useContext(PageSettings);

    return (
        <Link replace to="#" className="pseudo-tr d-none d-md-flex align-items-center" onClick={onClick}>
            <div className="pseudo-td col-md-2 text-nowrap">
                {journalEntryDate}
            </div>
            <div className="pseudo-td text-truncate col-md-2">
                {accountName}
            </div>
            <div className="pseudo-td text-truncate col-md-4">
                {description}
            </div>
            <div className="pseudo-td text-end col-md-2 text-nowrap">
                {debitAmount == 0
                    ? ''
                    : formatCurrency(appContext.locale, appContext.currency, debitAmount)
                }
            </div>
            <div className="pseudo-td text-end col-md-2 text-nowrap">
                {creditAmount == 0
                    ? ''
                    : formatCurrency(appContext.locale, appContext.currency, creditAmount)
                }
            </div>
        </Link>
    )
}

export default TransactionViewModelStandard;