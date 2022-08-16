import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryTitleBarSmallScreen({className, handleCreateAJournalEntryButton}) {
    const appContext = React.useContext(PageSettings);

    return(
        <div className={"d-sm-none " + className}>
            <h1>
                {journalEntriesText[appContext.locale]["Journal Entries"]}
            </h1>
            <button
                className="btn btn-primary btn-lg d-block w-100"
                onClick={handleCreateAJournalEntryButton}
            >
                {journalEntriesText[appContext.locale]["Add an entry"]}
            </button>
        </div>
    )

}

export default JournalEntryTitleBarSmallScreen;