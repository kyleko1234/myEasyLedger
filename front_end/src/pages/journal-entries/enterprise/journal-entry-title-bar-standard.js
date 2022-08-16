import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryTitleBarStandard({className, handleCreateAJournalEntryButton}) {
    const appContext = React.useContext(PageSettings);

    return(
        <div className={"d-none d-sm-flex justify-content-between align-items-center " + className}>
            <h1 className="my-0">
                {journalEntriesText[appContext.locale]["Journal Entries"]}
            </h1>
            <button
                className="btn btn-primary"
                onClick={handleCreateAJournalEntryButton}
            >
                {journalEntriesText[appContext.locale]["Add an entry"]}
            </button>
        </div>
    )
}

export default JournalEntryTitleBarStandard;