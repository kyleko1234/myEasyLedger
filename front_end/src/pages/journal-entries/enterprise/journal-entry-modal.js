import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { getTodayAsDateString } from '../../../utils/util-fns';
import JournalEntryExpandedView from './journal-entry-expanded-view';
import JournalEntryModalFooter from './journal-entry-modal-footer';
import JournalEntryModalHeader from './journal-entry-modal-header';

function JournalEntryModal({ isOpen, toggle, refreshParentComponent, currentJournalEntryId, accountOptions, vendorOptions, customerOptions }) {
    const appContext = React.useContext(PageSettings);

    const [editMode, setEditMode] = React.useState(false);
    const toggleEditMode = () => setEditMode(!editMode);

    const [lineItems, setLineItems] = React.useState([{
        lineItemId: "",
        accountName: "",
        accountId: "",
        description: "",
        debitAmount: 0,
        creditAmount: 0
    },
    {
        lineItemId: "",
        accountName: "",
        accountId: "",
        description: "",
        debitAmount: 0,
        creditAmount: 0
    }]);
    const [journalEntryDescription, setJournalEntryDescription] = React.useState('');
    const [journalEntryDate, setJournalEntryDate] = React.useState(getTodayAsDateString());
    const [journalEntryVendorId, setJournalEntryVendorId] = React.useState(null);
    const [journalEntryCustomerId, setJournalEntryCustomerId] = React.useState(null);

    const handleModalOnClosed = () => {

    }

    //handle buttons
    const handleDeleteButton = () => {

    }
    const handleSaveButton = () => {

    }
    const handleCancelButton = () => {

    }
    const handleCopyButton = () => {

    }
    const handleEditButton = () => {

    }
    const handleCloseButton = () => {
        toggle()
    }

    const fetchJournalEntry = journalEntryId => {
        if (journalEntryId !== 0) {
            axios.get(`${API_BASE_URL}/journalEntry/${journalEntryId}`)
                .then(response => {
                    let formattedLineItems = []
                    let journalEntry = response.data;
                    journalEntry.lineItems.forEach(lineItem => {
                        let formattedLineItem = {
                            lineItemId: lineItem.lineItemId,
                            accountName: lineItem.accountName,
                            accountId: lineItem.accountId,
                            description: lineItem.description,
                            debitAmount: (lineItem.isCredit ? null : lineItem.amount),
                            creditAmount: (lineItem.isCredit ? lineItem.amount : null)
                        }
                        formattedLineItems.push(formattedLineItem);
                    })
                    formattedLineItems.sort((a, b) => a.lineItemId > b.lineItemId ? 1 : -1) //sort by LineItemId to preserve insertion order
                    setLineItems(formattedLineItems);
                    setJournalEntryDescription(journalEntry.description);
                    setJournalEntryDate(journalEntry.journalEntryDate);
                    setJournalEntryVendorId(journalEntry.vendorId);
                    setJournalEntryCustomerId(journalEntry.customerId);
                })
                .catch(console.log)
        }
    }

    React.useEffect(() => {
        fetchJournalEntry(currentJournalEntryId);
    }, [currentJournalEntryId])


    return (
        <Modal isOpen={isOpen}
            toggle={toggle}
            onClosed={handleModalOnClosed}
            size="xl"
            centered={true}
        >
            <JournalEntryModalHeader 
                editMode={editMode}
                currentJournalEntryId={currentJournalEntryId}
                accountOptions={accountOptions}
                vendorOptions={vendorOptions}
                customerOptions={customerOptions}
            />
            <ModalBody>
                <JournalEntryExpandedView
                    lineItems={lineItems}
                    journalEntryDescription={journalEntryDescription}
                    journalEntryDate={journalEntryDate}
                    accountOptions={accountOptions}
                    vendorOptions={vendorOptions}
                    customerOptions={customerOptions}
                    journalEntryVendorId={journalEntryVendorId}
                    journalEntryCustomerId={journalEntryCustomerId}
                />
            </ModalBody>
            <JournalEntryModalFooter
                editMode={editMode}
                currentJournalEntryId={currentJournalEntryId}
                journalEntryDate={journalEntryDate}
                handleDeleteButton={handleDeleteButton}
                handleSaveButton={handleSaveButton}
                handleCopyButton={handleCopyButton}
                handleCancelButton={handleCancelButton}
                handleCloseButton={handleCloseButton}
                handleEditButton={handleEditButton}
            />
        </Modal>
    )
}

export default JournalEntryModal;