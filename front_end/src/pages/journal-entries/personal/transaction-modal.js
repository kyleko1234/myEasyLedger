import axios from 'axios';
import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { PageSettings } from '../../../config/page-settings';
import { API_BASE_URL, PERSONAL_TRANSACTION_TYPES } from '../../../utils/constants';
import { journalEntriesText } from '../../../utils/i18n/journal-entries-text';
import { getTodayAsDateString, returnStringToNearestCentPrecisionNumber, validateDate } from '../../../utils/util-fns';
import JournalEntryModalFooter from '../enterprise/journal-entry-modal-footer';
import TransactionExpandedEdit from './transaction-expanded-edit';
import TransactionExpandedView from './transaction-expanded-view';
import TransactionModalHeader from './transaction-modal-header';

function TransactionModal({ isOpen, toggle, editMode, setEditMode, refreshParentComponent, currentJournalEntryId, setCurrentJournalEntryId, accountOptions, defaultFromAccountId, defaultFromAccountName }) {
    const appContext = React.useContext(PageSettings);
    const transactionTypeOptions = PERSONAL_TRANSACTION_TYPES(appContext.locale);

    const toggleEditMode = () => setEditMode(!editMode);
    const [lineItems, setLineItems] = React.useState([{
        lineItemId: "",
        accountName: "",
        accountId: "",
        description: "",
        transactionType: transactionTypeOptions[0],
        transactionTypeId: transactionTypeOptions[0].value,
        transactionTypeName: transactionTypeOptions[0].label,
        amount: 0
    }]);
    const [journalEntryDescription, setJournalEntryDescription] = React.useState('');
    const [journalEntryDate, setJournalEntryDate] = React.useState(getTodayAsDateString());
    const [fromAccountId, setFromAccountId] = React.useState(defaultFromAccountId ? defaultFromAccountId : null);
    const [fromAccountName, setFromAccountName] = React.useState(defaultFromAccountName ? defaultFromAccountName : null);
    const [balancerLineItemId, setBalancerLineItemId] = React.useState('');

    const [alertMessages, setAlertMessages] = React.useState([]);

    const handleModalOnClosed = () => {
        setLineItems([{
            lineItemId: "",
            accountName: "",
            accountId: "",
            description: "",
            transactionType: transactionTypeOptions[0],
            transactionTypeId: transactionTypeOptions[0].value,
            transactionTypeName: transactionTypeOptions[0].label,
            amount: 0
        }]);
        setEditMode(false);
        setAlertMessages([]);
        setCurrentJournalEntryId(0);
        setJournalEntryDescription("");
        setJournalEntryDate(getTodayAsDateString());
        setFromAccountId(defaultFromAccountId);
        setFromAccountName(defaultFromAccountName);
    }

    //handle buttons
    const handleDeleteButton = () => {
        axios.delete(`${API_BASE_URL}/journalEntry/${currentJournalEntryId}`)
            .then(response => {
                refreshParentComponent();
                toggle();
            });
    }
    const handleSubmit = event => {
        event.preventDefault();
        setAlertMessages([]);
        if (transactionIsValid()) {
            let requestBody = prepareRequestBody();
            if (currentJournalEntryId) {
                putTransaction(requestBody);
            } else {
                postTransaction(requestBody);
            }
        }
    }
    const handleCancelButton = () => {
        if (currentJournalEntryId == 0) {
            toggle();
        } else {
            toggleEditMode();
            fetchTransaction(currentJournalEntryId);    
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

    const transactionIsValid = () => {
        let newAlertMessages = [];
        if (!fromAccountId) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Transaction must be assigned to an account."]);
        }
        if (!validateDate(journalEntryDate)) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Invalid date."]);
        }
        if (!journalEntryDescription) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Transaction must be given a description."]);
        }
        if (lineItems.length == 0) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Transaction must have at least one item."]);
        }
        if (journalEntryDate < appContext.lockJournalEntriesBefore) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Transaction date must not be before"](appContext.lockJournalEntriesBefore, appContext.locale))
        }
        let missingAccount = false;
        let missingAmount = false;
        let missingTransactionType = false;
        lineItems.forEach(lineItem => {
            if (!returnStringToNearestCentPrecisionNumber(lineItem.amount)) {
                missingAmount = true;
            }
            if (!lineItem.accountId) {
                missingAccount = true;
            }
            if (!lineItem.transactionType) {
                missingTransactionType = true;
            }
        })
        if (missingAccount) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Line-items must be assigned to an account or category."]);
        }
        if (missingAmount) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Please provide an amount for each item."]);
        }
        if (missingTransactionType) {
            newAlertMessages.push(journalEntriesText[appContext.locale]["Please specify a transaction type for each item."]);
        }
        setAlertMessages(newAlertMessages);
        if (newAlertMessages.length) {
            return false;
        } else {
            return true;
        }
    }
    
    const prepareRequestBody = () => {
        let formattedTransaction = {
            journalEntryId: null,
            journalEntryDate: journalEntryDate,
            description: journalEntryDescription,
            organizationId: appContext.currentOrganizationId,
            lineItems: lineItems,
            fromAccountId: fromAccountId,
            balancerLineItemId: balancerLineItemId
        };  
        if (currentJournalEntryId != 0) {
            formattedTransaction.journalEntryId = currentJournalEntryId;
        }
        return formattedTransaction;
    }

    const postTransaction = (requestBody) => {
        axios.post(`${API_BASE_URL}/transaction`, requestBody)
            .then(response => {
                refreshParentComponent();
                fetchTransaction(response.data.journalEntryId);
                toggleEditMode();
                appContext.createSuccessNotification(journalEntriesText[appContext.locale]["Successfully saved."]);
            }).catch(console.log);
    }

    const putTransaction = (requestBody) => {
        axios.put(`${API_BASE_URL}/transaction/${currentJournalEntryId}`, requestBody)
            .then(response => {
                refreshParentComponent();
                fetchTransaction(currentJournalEntryId);
                toggleEditMode();
                appContext.createSuccessNotification(journalEntriesText[appContext.locale]["Successfully saved."]);
            }).catch(console.log);
    }

    const fetchTransaction = (journalEntryId) => {
        if (journalEntryId != 0) {
            axios.get(`${API_BASE_URL}/transaction/${journalEntryId}`).then(response => {
                let journalEntry = response.data;

                //set the selected journalentry's id, date, desc as state
                setCurrentJournalEntryId(journalEntry.journalEntryId);
                setJournalEntryDate(journalEntry.journalEntryDate);
                setJournalEntryDescription(journalEntry.description);
                setBalancerLineItemId(journalEntry.balancerLineItemId);
                setFromAccountId(journalEntry.fromAccountId);
                setFromAccountName(journalEntry.fromAccountName);
                journalEntry.lineItems.forEach(lineItem => {
                    lineItem.transactionType = transactionTypeOptions.find((transactionType => transactionType.value == lineItem.transactionTypeId));
                })
                setLineItems(journalEntry.lineItems);
            }).catch(console.log);
        }
    }

    React.useEffect(() => {
        fetchTransaction(currentJournalEntryId);
    }, [currentJournalEntryId])

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            onClosed={handleModalOnClosed}
            size="xl"
            centered={true}
        >
            <form onSubmit={handleSubmit}>
                <TransactionModalHeader
                    editMode={editMode}
                    currentJournalEntryId={currentJournalEntryId}
                    accountOptions={accountOptions}
                />
                <ModalBody>
                    {editMode
                        ? <TransactionExpandedEdit
                            lineItems={lineItems} setLineItems={setLineItems}
                            journalEntryDescription={journalEntryDescription} setJournalEntryDescription={setJournalEntryDescription}
                            journalEntryDate={journalEntryDate} setJournalEntryDate={setJournalEntryDate}
                            fromAccountId={fromAccountId} setFromAccountId={setFromAccountId}
                            fromAccountName={fromAccountName} setFromAccountName={setFromAccountName}
                            accountOptions={accountOptions} alertMessages={alertMessages}
                        />
                        : <TransactionExpandedView
                            lineItems={lineItems}
                            journalEntryDescription={journalEntryDescription}
                            journalEntryDate={journalEntryDate}
                            fromAccountName={fromAccountName}
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
export default TransactionModal;