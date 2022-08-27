import React from 'react';
import { PageSettings } from '../../../config/page-settings';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import TransactionEditHistory from './transaction-edit-history';

function TransactionModalHeader({editMode, currentJournalEntryId, accountOptions}) {
    const appContext = React.useContext(PageSettings);

    const [transactionHistoryModal, setTransactionHistoryModal] = React.useState(false);
    const toggleTransactionHistoryModal = () => setTransactionHistoryModal(!transactionHistoryModal);

    return (
        <div className="h5 px-3 py-3 my-0 border-bottom d-flex justify-content-between align-items-center">
            <div>
                {journalEntriesText[appContext.locale]["Transaction"]}
            </div>
            {!editMode ?
                <div>
                    <button
                        className="btn btn-white width-175"
                        onClick={toggleTransactionHistoryModal}
                        type="button"
                    >
                        {journalEntriesText[appContext.locale]["View edit history"]}
                    </button>
                </div>
                : null
            }
            <TransactionEditHistory
                journalEntryId={currentJournalEntryId}
                isOpen={transactionHistoryModal}
                toggle={toggleTransactionHistoryModal}
                accountOptions={accountOptions}
            />
        </div>
    )
}

export default TransactionModalHeader;