import React from 'react';
import { ModalFooter, Tooltip } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryModalFooter({editMode, currentJournalEntryId, journalEntryDate, handleDeleteButton, handleSaveButton, handleCancelButton, handleCopyButton, handleEditButton, handleCloseButton}) {
    const appContext = React.useContext(PageSettings);

    const [copyButtonTooltip, setCopyButtonTooltip] = React.useState(false);
    const [editButtonTooltip, setEditButtonTooltip] = React.useState(false);
    const [entryLockedTooltip, setEntryLockedTooltip] = React.useState(false);
    const toggleCopyButtonTooltip = () => setCopyButtonTooltip(!copyButtonTooltip);
    const toggleEditButtonTooltip = () => setEditButtonTooltip(!editButtonTooltip);
    const toggleEntryLockedTooltip = () => setEntryLockedTooltip(!entryLockedTooltip);

    return (
        <ModalFooter className="justify-content-between">
            {editMode ?
                <>
                    <div>
                        {currentJournalEntryId == 0 
                            ? null 
                            : <button className="btn btn-danger width-10ch" onClick={handleDeleteButton}>
                                {journalEntriesText[appContext.locale]["Delete"]}
                            </button>}
                    </div>
                    <div>
                        <button className="btn btn-primary width-10ch" onClick={handleSaveButton}>
                            {journalEntriesText[appContext.locale]["Save"]}
                        </button>
                        <button className="btn btn-white ms-2 width-10ch" onClick={handleCancelButton}>
                            {journalEntriesText[appContext.locale]["Cancel"]}
                        </button>
                    </div>
                </>
                :
                <>
                    <div>
                        {/**empty div to push buttons rightwards */}
                    </div>
                    <div>
                        <div id="copy-button" className="d-inline-block">
                            <button
                                className="btn btn-info width-10ch"
                                onClick={handleCopyButton}
                                disabled={appContext.currentPermissionTypeId < 2}
                            >
                                {journalEntriesText[appContext.locale]["Copy"]}
                            </button>
                        </div>
                        <div id="edit-button" className="d-inline-block">
                            <button
                                className="btn btn-primary ms-2 width-10ch"
                                onClick={handleEditButton}
                                disabled={appContext.currentPermissionTypeId < 2 || journalEntryDate < appContext.lockJournalEntriesBefore}
                            >
                                {journalEntriesText[appContext.locale]["Edit"]}
                            </button>
                        </div>
                        <div className="d-inline-block">
                            <button
                                className="btn btn-white ms-2 width-10ch"
                                onClick={handleCloseButton}
                            >
                                {journalEntriesText[appContext.locale]["Close"]}
                            </button>
                        </div>
                    </div>
                </>
            }
            {appContext.currentPermissionTypeId < 2
                ? <Tooltip
                    target="copy-button"
                    isOpen={copyButtonTooltip}
                    toggle={toggleCopyButtonTooltip}
                    fade={false}
                >
                    {journalEntriesText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
            {appContext.currentPermissionTypeId < 2 && !(journalEntryDate < appContext.lockJournalEntriesBefore) && !editMode
                ? <Tooltip
                    target="edit-button"
                    isOpen={editButtonTooltip}
                    toggle={toggleEditButtonTooltip}
                    fade={false}
                >
                    {journalEntriesText[appContext.locale]["This action requires EDIT permissions for this ledger."]}
                </Tooltip>
                : null
            }
            {journalEntryDate < appContext.lockJournalEntriesBefore && !editMode
                ? <Tooltip
                    target="edit-button"
                    isOpen={entryLockedTooltip}
                    toggle={toggleEntryLockedTooltip}
                    fade={false}
                >
                    {journalEntriesText[appContext.locale]["This journal entry has been locked by an admin of this ledger."]}
                </Tooltip>
                : null
            }
        </ModalFooter>

    )
}

export default JournalEntryModalFooter;