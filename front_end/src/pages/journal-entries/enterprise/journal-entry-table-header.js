import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryTableHeader(props) {
    const appContext = React.useContext(PageSettings);
    
    return (
        <div className="mt-2 d-none d-md-flex pseudo-tr bg-light border rounded">
            <div className="pseudo-th col-md-2">
                {journalEntriesText[appContext.locale]["Date"]}
            </div>
            <div className="pseudo-th text-truncate col-md-6">
                {journalEntriesText[appContext.locale]["Description"]}
            </div>
            <div className="pseudo-th text-end col-md-2">
                {journalEntriesText[appContext.locale]["Debit"]}
            </div>
            <div className="pseudo-th text-end col-md-2">
                {journalEntriesText[appContext.locale]["Credit"]}
            </div>
        </div>

    )
}
export default JournalEntryTableHeader;