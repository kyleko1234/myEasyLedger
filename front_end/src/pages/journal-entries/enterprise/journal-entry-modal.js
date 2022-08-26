import axios from 'axios';
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL } from '../../../utils/constants';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { getTodayAsDateString, validateDate } from '../../../utils/util-fns';
import JournalEntryExpandedEdit from './journal-entry-expanded-edit';
import JournalEntryExpandedView from './journal-entry-expanded-view';
import JournalEntryModalFooter from './journal-entry-modal-footer';
import JournalEntryModalHeader from './journal-entry-modal-header';

function JournalEntryModal({ isOpen, toggle, editMode, setEditMode, refreshParentComponent, currentJournalEntryId, setCurrentJournalEntryId, accountOptions, vendorOptions, customerOptions }) {
    const appContext = React.useContext(PageSettings);
    
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
    const [alertMessages, setAlertMessages] = React.useState([]);

    const handleModalOnClosed = () => {
        setEditMode(false);
        setCurrentJournalEntryId(0);
        setLineItems([{
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
        setJournalEntryDescription("");
        setJournalEntryDate(getTodayAsDateString());
        setJournalEntryVendorId(null);
        setJournalEntryCustomerId(null);
        setAlertMessages([]);
    }

    //handle buttons
    const handleDeleteButton = () => {
        axios.delete(`${API_BASE_URL}/journalEntry/${currentJournalEntryId}`)
            .then(response => {
                refreshParentComponent();
                toggle();
            });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setAlertMessages([]);
        if (entryIsValid()) {
            let requestBody = formatJournalEntryToSendToServer();
            if (currentJournalEntryId) {
                putJournalEntry(requestBody);
            } else {
                postJournalEntry(requestBody);
            }
        }
    }
    const handleCancelButton = () => {
        if (currentJournalEntryId == 0) {
            toggle();
        } else {
            toggleEditMode();
            fetchJournalEntry(currentJournalEntryId);    
        }
    }
    const handleCopyButton = () => {
        setCurrentJournalEntryId(0);
        setJournalEntryDate(getTodayAsDateString());
        toggleEditMode();
    }
    const handleEditButton = () => {
        toggleEditMode();
    }
    const handleCloseButton = () => {
        toggle();
    }

    const entryIsValid = () => {
        let errorMessages = [];
        if (!validateDate(journalEntryDate)) {
            errorMessages.push(journalEntriesText[appContext.locale]["Invalid date."]);
        }
        if (!journalEntryDescription) {
            errorMessages.push(journalEntriesText[appContext.locale]["Please provide a description for this entry."]);
        }
        if (lineItems.length == 0) {
            errorMessages.push(journalEntriesText[appContext.locale]["Entry must have line-items."]);
        }
        if (journalEntryDate < appContext.lockJournalEntriesBefore) {
            errorMessages.push(journalEntriesText[appContext.locale]["Journal entry date must not be before"](appContext.lockJournalEntriesBefore, appContext.locale))
        }
        let debitSum = 0;
        let creditSum = 0;
        let missingAmount = false;
        let missingAccount = false;
        lineItems.forEach(lineItem => { // check for missing fields within lineItems, and sum debits and credits.
            if (!lineItem.creditAmount && !lineItem.debitAmount) {
                missingAmount = true;
            }
            if (!lineItem.accountId) {
                missingAccount = true;
            }

            // sum debits and credits
            if (lineItem.debitAmount) {
                debitSum += lineItem.debitAmount;
            }
            if (lineItem.creditAmount) {
                creditSum += lineItem.creditAmount;
            }
        })
        //move missing description and missing amount error messages out of the loop to avoid duplicate messages
        if (missingAmount) {
            errorMessages.push(journalEntriesText[appContext.locale]["Line-items must have either a debit or credit."]);
        }
        if (missingAccount) {
            errorMessages.push(journalEntriesText[appContext.locale]["Line-items must be assigned to an account."]);
        }
        if (debitSum.toFixed(2) !== creditSum.toFixed(2)) {
            errorMessages.push(journalEntriesText[appContext.locale]["Debits and Credits must balance."])
        }
        setAlertMessages(errorMessages);
        if (errorMessages.length !== 0) {
            return false;
        } else {
            return true;
        }
    }

    //Returns a valid request body for PUT/POST /journalEntry created from this function's state
    //POSTable entries have null journalEntryId, otherwise they should be PUT instead. 
    //Before calling this function please check for validity of the entry by making sure entryIsValid() returns true
    const formatJournalEntryToSendToServer = () => {
        let formattedLineItems = lineItems.map(lineItem => {
            return {
                accountId: lineItem.accountId,
                amount: (lineItem.debitAmount ? lineItem.debitAmount : lineItem.creditAmount),
                description: lineItem.description,
                isCredit: (lineItem.creditAmount ? true : false)
            }
        });
        let formattedEntry = {
            journalEntryId: null,
            journalEntryDate: journalEntryDate,
            vendorId: journalEntryVendorId,
            customerId: journalEntryCustomerId,
            description: journalEntryDescription,
            organizationId: appContext.currentOrganizationId,
            lineItems: formattedLineItems
        }
        if (currentJournalEntryId != 0) {
            formattedEntry.journalEntryId = currentJournalEntryId;
        }
        return formattedEntry;
    }

    const postJournalEntry = (requestBody) => {
        axios.post(`${API_BASE_URL}/journalEntry`, requestBody)
            .then(response => {
                refreshParentComponent();
                fetchJournalEntry(response.data.journalEntryId);
                toggleEditMode();
                appContext.createSuccessNotification(journalEntriesText[appContext.locale]["Successfully saved."]);
            }).catch(console.log);
    }

    const putJournalEntry = (requestBody) => {
        axios.put(`${API_BASE_URL}/journalEntry/${currentJournalEntryId}`, requestBody)
            .then(response => {
                refreshParentComponent();
                fetchJournalEntry(currentJournalEntryId);
                toggleEditMode();
                appContext.createSuccessNotification(journalEntriesText[appContext.locale]["Successfully saved."]);
            }).catch(console.log);
    }


    const fetchJournalEntry = journalEntryId => {
        if (journalEntryId != 0) {
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
                            debitAmount: (lineItem.isCredit ? 0 : lineItem.amount),
                            creditAmount: (lineItem.isCredit ? lineItem.amount : 0)
                        }
                        formattedLineItems.push(formattedLineItem);
                    })
                    formattedLineItems.sort((a, b) => a.lineItemId > b.lineItemId ? 1 : -1) //sort by LineItemId to preserve insertion order
                    setLineItems(formattedLineItems);
                    setJournalEntryDescription(journalEntry.description);
                    setJournalEntryDate(journalEntry.journalEntryDate);
                    setJournalEntryVendorId(journalEntry.vendorId);
                    setJournalEntryCustomerId(journalEntry.customerId);
                    setCurrentJournalEntryId(journalEntry.journalEntryId);
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
            <form onSubmit={handleSubmit}>
                <JournalEntryModalHeader
                    editMode={editMode}
                    currentJournalEntryId={currentJournalEntryId}
                    accountOptions={accountOptions}
                    vendorOptions={vendorOptions}
                    customerOptions={customerOptions}
                />
                <ModalBody>
                    {editMode
                        ? <JournalEntryExpandedEdit
                            lineItems={lineItems} setLineItems={setLineItems}
                            journalEntryDescription={journalEntryDescription} setJournalEntryDescription={setJournalEntryDescription}
                            journalEntryDate={journalEntryDate} setJournalEntryDate={setJournalEntryDate}
                            accountOptions={accountOptions}
                            vendorOptions={vendorOptions}
                            customerOptions={customerOptions}
                            alertMessages={alertMessages}
                            journalEntryVendorId={journalEntryVendorId} setJournalEntryVendorId={setJournalEntryVendorId}
                            journalEntryCustomerId={journalEntryCustomerId} setJournalEntryCustomerId={setJournalEntryCustomerId}
                        />
                        : <JournalEntryExpandedView
                            lineItems={lineItems}
                            journalEntryDescription={journalEntryDescription}
                            journalEntryDate={journalEntryDate}
                            accountOptions={accountOptions}
                            vendorOptions={vendorOptions}
                            customerOptions={customerOptions}
                            journalEntryVendorId={journalEntryVendorId}
                            journalEntryCustomerId={journalEntryCustomerId}
                        />
                    }

                </ModalBody>
                <JournalEntryModalFooter
                    editMode={editMode}
                    currentJournalEntryId={currentJournalEntryId}
                    journalEntryDate={journalEntryDate}
                    handleDeleteButton={handleDeleteButton}
                    handleCopyButton={handleCopyButton}
                    handleCancelButton={handleCancelButton}
                    handleCloseButton={handleCloseButton}
                    handleEditButton={handleEditButton}
                />
            </form>
        </Modal>
    )
}

export default JournalEntryModal;