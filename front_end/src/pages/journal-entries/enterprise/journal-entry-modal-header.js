import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';

function JournalEntryModalHeader({editMode}) {
    const appContext = React.useContext(PageSettings);

    const [journalEntryHistoryModal, setJournalEntryHistoryModal] = React.useState(false);
    const toggleJournalEntryHistoryModal = () => setJournalEntryHistoryModal(!journalEntryHistoryModal);

    return (
        <div className="h5 px-3 py-3 my-0 border-bottom d-flex justify-content-between align-items-center">
            <div>
                {journalEntriesText[appContext.locale]["Journal Entry"]}
            </div>
            {!editMode ?
                <div>
                    <button
                        className="btn btn-white width-175"
                        onClick={toggleJournalEntryHistoryModal}
                    >
                        {journalEntriesText[appContext.locale]["View edit history"]}
                    </button>
                </div>
                : null
            }
        </div>
    )
}

export default JournalEntryModalHeader;