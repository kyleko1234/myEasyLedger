import React from 'react';
import { Tooltip } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryTitleBarSmallScreen({ className, handleCreateAJournalEntryButton }) {
    const appContext = React.useContext(PageSettings);
    const [addAnEntryTooltip, setAddAnEntryTooltip] = React.useState(false);
    const toggleAddAnEntryTooltip = () => setAddAnEntryTooltip(!addAnEntryTooltip);

    return (
        <div className={"d-sm-none my-2 " + className}>
            <h1>
                {journalEntriesText[appContext.locale]["Journal Entries"]}
            </h1>
            <div id="add-an-entry-button-small-screen">
                <button
                    className="btn btn-primary btn-lg d-block w-100"
                    onClick={handleCreateAJournalEntryButton}
                    disabled={appContext.currentPermissionTypeId < 2}
                >
                    {journalEntriesText[appContext.locale]["Add an entry"]}
                </button>
            </div>
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    target="add-an-entry-button-small-screen"
                    isOpen={addAnEntryTooltip}
                    toggle={toggleAddAnEntryTooltip}
                    fade={false}
                >
                    {journalEntriesText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
        </div>
    )

}

export default JournalEntryTitleBarSmallScreen;