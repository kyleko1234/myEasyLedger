import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function LineItemsHeader({editMode}) {
    const appContext = React.useContext(PageSettings);
    if (!editMode) {
        return (
            <div className="pseudo-tr bg-light rounded border d-none d-lg-flex">
                <div className="pseudo-th col-6">
                    {journalEntriesText[appContext.locale]["Memo"]}
                </div>
                <div className="pseudo-th col-2">
                    {journalEntriesText[appContext.locale]["Account"]}
                </div>
                <div className="pseudo-th col-2 text-end">
                    {journalEntriesText[appContext.locale]["Debit"]}
                </div>
                <div className="pseudo-th col-2 text-end">
                    {journalEntriesText[appContext.locale]["Credit"]}
                </div>
            </div>
        )
    } else {
        return (
            <div className="pseudo-tr bg-light rounded border d-none d-lg-flex">
                <div className="pseudo-th col-4">
                    {journalEntriesText[appContext.locale]["Memo"]}
                </div>
                <div className="pseudo-th col-3">
                    {journalEntriesText[appContext.locale]["Account"]}
                </div>
                <div className="pseudo-th col-2">
                    {journalEntriesText[appContext.locale]["Debit"]}
                </div>
                <div className="pseudo-th col-2">
                    {journalEntriesText[appContext.locale]["Credit"]}
                </div>
                <div className="pseudo-th col-1">

                </div>
            </div>
        )    
    }
}
export default LineItemsHeader;