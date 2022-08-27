import React from 'react';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryTableFooter({previousPage, nextPage, pageIndex, pageSize, pageLength, totalElements, first, last}) {
    const appContext = React.useContext(PageSettings);

    return(
        <div className="d-flex justify-content-between px-1 py-2 border-top " >
            <div className={first ? "invisible" : " "}>
                <Link replace onClick={previousPage} to="#">&larr; {journalEntriesText[appContext.locale]["Newer"]}</Link>
            </div>
            <div className="align-self-center">
                {journalEntriesText[appContext.locale]["Footer text"](pageIndex, pageSize, pageLength, totalElements)}
            </div>{/**TODO replace with page selector */}
            <div className={last ? "invisible" : ""}>
                <Link replace onClick={nextPage} to="#">{journalEntriesText[appContext.locale]["Older"]} &rarr;</Link>
            </div>
        </div>

        )
}

export default JournalEntryTableFooter;