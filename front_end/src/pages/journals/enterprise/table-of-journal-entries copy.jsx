import React from 'react'
import { useTable, usePagination } from 'react-table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/constants.js';
import JournalEntryViewMode from './journal-entry-view-mode';
import JournalEntryEditMode from './journal-entry-edit-mode';
import { PageSettings } from '../../../config/page-settings.js';
import { tableOfJournalEntriesText } from '../../../utils/i18n/table-of-journal-entries-text.js';
import AccountDetailsEditor from '../../chart-of-accounts/components/account-details-editor';
import JournalEntryEditHistory from './journal-entry-edit-history.js';
import { setConstantValue } from 'typescript';

//Generates a table with react-table 7 using pagination

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function TableOfJournalEntries(props) {
    const appContext = React.useContext(PageSettings);
    const [pageSize, setPageSize] = React.useState(10);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [journalEntryViewModels, setJournalEntryViewModels] = React.useState([]);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);
    const [pageLength, setPageLength] = React.useState(0);
    const [first, setFirst] = React.useState(true);
    const [last, setLast] = React.useState(true);
    const [loading, setLoading] = React.useState(true);

    const previousPage = () => setPageIndex(pageIndex - 1);
    const nextPage = () => setPageIndex(pageIndex + 1);

    const [journalEntryModal, setJournalEntryModal] = React.useState(false);
    const toggleJournalEntryModal = () => setJournalEntryModal(!journalEntryModal);
    const expandJournalEntry = (journalEntryId) => {
        fetchJournalEntry(journalEntryId);
        toggleJournalEntryModal();
    }
    const [editMode, setEditMode] = React.useState(false); //Toggle editmode for an expanded entry
    const [createMode, setCreateMode] = React.useState(false);
    const toggleEditMode = () => setEditMode(!editMode);
  
    const [lineItemData, setLineItemData] = React.useState([]);
    const [journalEntryId, setJournalEntryId] = React.useState(null);
    const [journalEntryDescription, setJournalEntryDescription] = React.useState('');
    const [journalEntryDate, setJournalEntryDate] = React.useState('');
    const [alertMessages, setAlertMessages] = React.useState([]);
    const [accountOptions, setAccountOptions] = React.useState([]);

    const [journalEntryHistoryModal, setJournalEntryHistoryModal] = React.useState(false);
    const toggleJournalEntryHistoryModal = () => setJournalEntryHistoryModal(!journalEntryHistoryModal);
  
    const [accountDetailsEditorModal, setAccountDetailsEditorModal] = React.useState(false);
    const toggleAccountDetailsEditorModal = () => setAccountDetailsEditorModal(!accountDetailsEditorModal);
    
    async function fetchData(pageIndex, pageSize) {
        await axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/journalEntryViewModel?page=${pageIndex}&size=${pageSize}`)
            .then(response => {
                setJournalEntryViewModels(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setPageLength(response.data.size);
            })
            .catch(console.log);

        setLoading(false);
    }

    const fetchJournalEntry = journalEntryId => {
        axios.get(`${API_BASE_URL}/journalEntry/${journalEntryId}`)
            .then(response => {
                var formattedLineItems = []
                let journalEntry = response.data;
                journalEntry.lineItems.forEach(lineItem => {
                    var formattedLineItem = {
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
                setLineItemData(formattedLineItems);
                setJournalEntryId(journalEntry.journalEntryId);
                setJournalEntryDescription(journalEntry.description);
                setJournalEntryDate(journalEntry.journalEntryDate);
                setAlertMessages([]); //reset alert messages every time an entry is fetched to refresh the page          
            })
            .catch(console.log)
    }

    const openEditorForNewEntry = () => {
        setJournalEntryId(null);
        let today = new Date();
        setJournalEntryDate(today.toISOString().split('T')[0]);
        setJournalEntryDescription('');
        setLineItemData([{
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
        }])
        toggleEditMode();
        setCreateMode(true);
        toggleJournalEntryModal();
    }

    const cancelCreateMode = () => {
        setCreateMode(false);
        setAlertMessages([]);
        toggleJournalEntryModal();
    }

    const cancelEditMode = () => {
        fetchJournalEntry(journalEntryId);
        toggleEditMode()
    }

    const handleEditButton = () => {
        toggleEditMode();
        refreshAccounts();
    }

    //refresh lists of accounts and categories, should be called every time the 'edit' button for an entry is clicked
    const fetchAccounts = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`)
            .then(response => {
                const formattedAccounts = response.data.filter(account => !account.hasChildren).map(account => {
                    return ({
                        value: account.accountId,
                        label: account.accountCode ? account.accountCode + " - " + account.accountName : account.accountName,
                        object: account
                    })
                });
                setAccountOptions(formattedAccounts);
            })
            .catch(console.log);
    }

    const formatCurrency = number => {
        if (number == 0) { //falsey items qualify as zero
            return '';
        }
        return (new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(cell.value));
    }

    const checkEntryForValidationErrors = () => {
        let errorMessages = [];
        if (!journalEntryDate) {
            errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Please choose a date for this entry."]);
        }
        if (!journalEntryDescription) {
            errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Please provide a description for this entry."]);
        }
        if (lineItemData.length == 0) {
            errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Entry must have line-items."]);
        }
        let debitSum = 0;
        let creditSum = 0;
        let missingAmount = false;
        let missingAccount = false;
        lineItemData.forEach(lineItem => { // check for missing fields within lineItems, and sum debits and credits.
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
            errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Line-items must have either a debit or credit."]);
        }
        if (missingAccount) {
            errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Line-items must be assigned to an account."]);
        }
        if (debitSum.toFixed(2) !== creditSum.toFixed(2)) {
            errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Debits and Credits must balance."])
        }
        setAlertMessages(errorMessages);
        return errorMessages;
    }

    //Returns a valid request body for PUT/POST /journalEntry created from this function's state
    //POSTable entries have null journalEntryId, otherwise they should be PUT instead. 
    //Before calling this function please check for validity of the entry by making sure checkEntryForValidationErrors().length == 0
    const formatJournalEntryToSendToServer = () => {
        let lineItems = lineItemData.map(lineItem => {
            return {
                accountId: lineItem.accountId,
                amount: (lineItem.debitAmount ? lineItem.debitAmount : lineItem.creditAmount),
                description: lineItem.description,
                isCredit: (lineItem.creditAmount ? true : false)
            }
        });
        return {
            journalEntryId: journalEntryId,
            journalEntryDate: journalEntryDate,
            description: journalEntryDescription,
            organizationId: appContext.currentOrganizationId,
            lineItems: lineItems
        }
    }

    const postJournalEntry = (data) => {
        console.log(data);
        axios.post(`${API_BASE_URL}/journalEntry`, data)
            .then(response => {
                fetchData(pageIndex, pageSize);
                fetchJournalEntry(response.data.journalEntryId);
                setCreateMode(false);
                toggleEditMode();
            }).catch(console.log);
    }

    const putJournalEntry = (id, data) => {
        axios.put(`${API_BASE_URL}/journalEntry/${id}`, data)
            .then(response => {
                console.log(response);
                fetchData(pageIndex, pageSize);
                fetchJournalEntry(id);
                toggleEditMode();
            }).catch(console.log);
    }

    const handleCopyJournalEntryButton = () => {
        let today = new Date();
        setJournalEntryDate(today.toISOString().split('T')[0]);
        toggleEditMode();
        setCreateMode(true);
        setJournalEntryId(null); //must set journalEntryId to null, otherwise program will edit the original journal entry instead of posting a copy to the server. Server requires journalEntryId to be null for POST requests, so we cannot check for createMode=true to determine PUT/POST instead.
    }

    const handleSaveJournalEntryButton = () => {
        if (checkEntryForValidationErrors().length === 0) {
            let formattedEntry = formatJournalEntryToSendToServer();
            if (journalEntryId) {
                putJournalEntry(journalEntryId, formattedEntry);
            } else {
                postJournalEntry(formattedEntry);
            }
        }
    }

    const handleDeleteJournalEntryButton = (id) => {
        axios.delete(`${API_BASE_URL}/journalEntry/${id}`)
            .then(response => {
                console.log(response)
                fetchData(pageIndex, pageSize);
                toggleEditMode();
                toggleJournalEntryModal();
            });
    }

    const handleExitJournalEntryModal = () => {
        setCreateMode(false);
        setEditMode(false);
        setAlertMessages([]);
        toggleJournalEntryModal();
    }


    React.useEffect(() => {
        fetchData(pageIndex, pageSize);
        fetchAccounts();
    }, [pageIndex, pageSize]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h4 >
                    {tableTitle}
                    {parentComponentAccountId ?
                        <Link replace className="icon-link-text-muted m-l-10" to="#" onClick={toggleAccountDetailsEditorModal}>
                            <i className="fa fa-edit"></i>
                        </Link>
                        : null}
                </h4>
                {hasAddEntryButton ?
                    <button className="btn btn-sm btn-primary align-self-center" onClick={() => openEditorForNewEntry()}>
                        <i className="ion ion-md-add fa-fw fa-lg"></i>{tableOfJournalEntriesText[appContext.locale]["Add an entry"]}
                    </button>
                    : null}
            </div>
            <div className="table">
                <div className="thead">
                    <div className="row tr">
                        <div className="th col-2">{tableOfJournalEntriesText[appContext.locale]["Date"]}</div>
                        <div className="th col-6">{tableOfJournalEntriesText[appContext.locale]["Description"]}</div>
                        <div className="th text-right col-2">{tableOfJournalEntriesText[appContext.locale]["Debit"]}</div>
                        <div className="th text-right col-2">{tableOfJournalEntriesText[appContext.locale]["Credit"]}</div>
                    </div>
                </div>
                <div className="tbody">
                    {journalEntryViewModels.map(journalEntryViewModel => {
                        return (
                            <div className="row tr" key={journalEntryViewModel.journalEntryId} onClick={() => expandJournalEntry(journalEntryViewModel.journalEntryId)}>
                                <div className="td col-2">{journalEntryViewModel.journalEntryDate}</div>
                                <div className="td text-truncate col-6">{journalEntryViewModel.description}</div>
                                <div className="td text-right col-2">{formatCurrency(journalEntryViewModel.debitAmount)}</div>
                                <div className="td text-right col-2">{formatCurrency(journalEntryViewModel.creditAmount)}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="d-flex justify-content-between px-1 py-2 border-top " >
                    <div className={first ? "invisible" : " "}>
                        <Link onClick={previousPage} to="#">&larr; {tableOfJournalEntriesText[appContext.locale]["Newer"]}</Link>
                    </div>
                    <div className="align-self-center">
                        Showing {((pageIndex * pageSize) + 1) + "-" + ((pageIndex * pageSize) + pageLength)} of {totalElements}{' '}
                      results
                    </div>{/**TODO replace with page selector */}
                    <div className={last ? "invisible" : ""}>
                        <Link onClick={nextPage} to="#">{tableOfJournalEntriesText[appContext.locale]["Older"]} &rarr;</Link>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={journalEntryExpanded}
                toggle={handleExitJournalEntryModal}
                size="lg" style={{ maxWidth: '1600px', width: '80%', margin: 'auto' }}
                centered={true}
            >
                <ModalHeader>{tableOfJournalEntriesText[appContext.locale]["Journal Entry"]}</ModalHeader>
                <ModalBody>
                    {editMode ?
                        <JournalEntryEditMode
                            data={lineItemData} setLineItemData={setLineItemData}
                            journalEntryDate={journalEntryDate} setJournalEntryDate={setJournalEntryDate}
                            journalEntryDescription={journalEntryDescription} setJournalEntryDescription={setJournalEntryDescription}
                            accountOptions={accountOptions}
                            alertMessages={alertMessages}
                            handleSaveJournalEntryButton={handleSaveJournalEntryButton}>
                        </JournalEntryEditMode> :
                        <JournalEntryViewMode
                            data={lineItemData}
                            journalEntryDate={journalEntryDate}
                            journalEntryDescription={journalEntryDescription}
                        >
                        </JournalEntryViewMode>
                    }
                </ModalBody>
                <ModalFooter className="justify-content-between">
                    {editMode ?
                        <>
                            <div>
                                {createMode ? null :
                                    <button className="btn btn-danger width-10ch" onClick={() => handleDeleteJournalEntryButton(journalEntryId)}>
                                        {tableOfJournalEntriesText[appContext.locale]["Delete"]}
                                    </button>}
                            </div>
                            <div>
                                <button className="btn btn-primary width-10ch"onClick={() => handleSaveJournalEntryButton()}>
                                    {tableOfJournalEntriesText[appContext.locale]["Save"]}
                                </button>
                                <button className="btn btn-white m-l-10 width-10ch" onClick={createMode ? cancelCreateMode : cancelEditMode}>
                                    {tableOfJournalEntriesText[appContext.locale]["Cancel"]}
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <button className="btn btn-white width-175" onClick={toggleJournalEntryHistoryModal}>{tableOfJournalEntriesText[appContext.locale]["View edit history"]}</button>
                            </div>
                            <div>
                                <button className="btn btn-info width-10ch" onClick={handleCopyJournalEntryButton}>{tableOfJournalEntriesText[appContext.locale]["Copy"]}</button>
                                <button className="btn btn-primary m-l-10 width-10ch" onClick={handleEditButton}>{tableOfJournalEntriesText[appContext.locale]["Edit"]}</button>
                                <button className="btn btn-white m-l-10 width-10ch" onClick={handleExitJournalEntryModal}>{tableOfJournalEntriesText[appContext.locale]["Close"]}</button>
                            </div>
                        </>
                    }
                </ModalFooter>
            </Modal>
            {parentComponentAccountId ? <AccountDetailsEditor isOpen={accountDetailsEditorModal} toggle={toggleAccountDetailsEditorModal} selectedAccountId={parentComponentAccountId} fetchData={() => fetchData(pageIndex, pageSize)} /> : null}
            {journalEntryId ? <JournalEntryEditHistory journalEntryId={journalEntryId} isOpen={journalEntryHistoryModal} toggle={toggleJournalEntryHistoryModal} /> : null}
        </>
    )

}

export default TableOfJournalEntries

