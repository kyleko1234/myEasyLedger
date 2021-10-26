import React from 'react';
import { useTable, usePagination } from 'react-table';
import { tableOfJournalEntriesText } from '../../../utils/i18n/table-of-journal-entries-text.js';
import { Link } from 'react-router-dom';
import { PageSettings } from '../../../config/page-settings.js';
import { API_BASE_URL, PERSONAL_TRANSACTION_TYPES } from '../../../utils/constants.js';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import TransactionViewMode from './transaction-view-mode.jsx';
import TransactionEditMode from './transaction-edit-mode.jsx';
import TransactionEditHistory from './transaction-edit-history.js';
import { formatCurrency, getTodayAsDateString, validateDate } from '../../../utils/util-fns.js';


// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data

//Table of Transactions for account detailed view in personal organizations
function TableOfTransactions({
    tableTitle,
    hasAddEntryButton,
    parentComponentAccountId,
    fetchData,
    pageSize,
    pageIndex,
    columns,
    data,
    totalPages,
    totalElements,
    pageLength,
    first,
    last,
    previousPage,
    nextPage,
    loading, 
    category
}) {
    const appContext = React.useContext(PageSettings);
    const transactionTypeOptions = PERSONAL_TRANSACTION_TYPES(appContext.locale);

    const [editMode, setEditMode] = React.useState(false); //Toggle editmode for an expanded entry
    const [createMode, setCreateMode] = React.useState(false);

    const [transactionExpanded, setTransactionExpanded] = React.useState(false);
    const [journalEntryId, setJournalEntryId] = React.useState(null);
    const [journalEntryDescription, setJournalEntryDescription] = React.useState('');
    const [journalEntryDate, setJournalEntryDate] = React.useState('');
    const [fromAccountId, setFromAccountId] = React.useState(null);
    const [fromAccountName, setFromAccountName] = React.useState(null);
    const [lineItemData, setLineItemData] = React.useState([]); //Data to be passed in to lineItemTable
    const [accountOptions, setAccountOptions] = React.useState([]);
    const [alertMessages, setAlertMessages] = React.useState([]);

    const [transactionEditHistoryModal, setTransactionEditHistoryModal] = React.useState(false);
    const toggleTransactionEditHistoryModal = () => setTransactionEditHistoryModal(!transactionEditHistoryModal);

    //refresh lists of accounts and categories, should be called every time the 'edit' button for an entry is clicked
    const refreshAccounts = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`).then(response => {
            const formattedAccounts = response.data.filter(account => !account.hasChildren).map(account => {
                return ({
                    value: account.accountId,
                    label: account.accountName,
                    object: account
                })
            });
            setAccountOptions(formattedAccounts);
        })
            .catch(console.log);
    }


    const expandTransaction = (i) => {
        fetchJournalEntry(i);
        toggleTransactionExpanded();
    }

    const toggleTransactionExpanded = () => {
        setTransactionExpanded(!transactionExpanded);
    }
    const handleTransactionModalOnClose = () => {
        setEditMode(false);
        setCreateMode(false);
        setAlertMessages([]);
        fetchData(pageIndex, pageSize);
    }
    const openEditorForNewTransaction = () => {
        setFromAccountId(parentComponentAccountId);
        setJournalEntryId(null);
        refreshAccounts();
        setJournalEntryDate(getTodayAsDateString());
        setJournalEntryDescription('');
        setLineItemData([{
            lineItemId: "",
            accountName: "",
            accountId: "",
            description: "",
            transactionType: transactionTypeOptions[0],
            transactionTypeName: transactionTypeOptions[0].label,
            amount: 0
        }]);      
        setEditMode(true);
        setCreateMode(true);
        setTransactionExpanded(true);
    }
    const handleCopyTransactionButton = () => {
        setJournalEntryDate(getTodayAsDateString());
        setJournalEntryId(null);
        setCreateMode(true);
        setEditMode(true);
    }
    const handleEditTransactionButton = () => {
        refreshAccounts();
        setEditMode(true);
    }
    const handleCancelEditTransactionButton = () => {
        if (createMode) {
            toggleTransactionExpanded();
        } else {
            setEditMode(false);
            setAlertMessages([]);
            fetchJournalEntry(journalEntryId);    
        }
    }
    const handleDeleteTransactionButton = () => {
        axios.delete(`${API_BASE_URL}/journalEntry/${journalEntryId}`).then(response => {
            console.log(response);
            toggleTransactionExpanded();
        }).catch(console.log);
    }
    const handleCloseTransactionButton = () => {
        setTransactionExpanded(false);
    }
    const handleSaveTransactionButton = () => {
        setAlertMessages([]);
        if (populateAlertMessages().length == 0) {
            let requestBody = prepareRequestBody();
            sendTransactionToServer(requestBody);
        }
    }
    const populateAlertMessages = () => {
        let newAlertMessages = [];
        if (!fromAccountId) {
            newAlertMessages.push(tableOfJournalEntriesText[appContext.locale]["Transaction must be assigned to an account."]);
        }
        if (!validateDate(journalEntryDate)) {
            newAlertMessages.push(tableOfJournalEntriesText[appContext.locale]["Invalid date."]);
        }
        if (!journalEntryDescription) {
            newAlertMessages.push(tableOfJournalEntriesText[appContext.locale]["Transaction must be given a description."]);
        }
        if (lineItemData.length == 0) {
            newAlertMessages.push(tableOfJournalEntriesText[appContext.locale]["Transaction must have at least one item."]);
        }
        let missingAccount = false;
        let missingAmount = false;
        let missingTransactionType = false;
        lineItemData.forEach(lineItem => {
            if (!lineItem.amount) {
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
            newAlertMessages.push(tableOfJournalEntriesText[appContext.locale]["Line-items must be assigned to an account or category."]);
        }
        if (missingAmount) {
            newAlertMessages.push(tableOfJournalEntriesText[appContext.locale]["Please provide an amount for each item."]);
        }
        if (missingTransactionType) {
            newAlertMessages.push(tableOfJournalEntriesText[appContext.locale]["Please specify a transaction type for each item."]);
        }
        setAlertMessages(newAlertMessages);
        return(newAlertMessages);
    }
    const prepareRequestBody = () => {
        let totalDebits = 0;
        let totalCredits = 0;
        let formattedLineItems = lineItemData.map(lineItem => {
            if (lineItem.transactionType.isCredit) {
                totalCredits += lineItem.amount;
            } else {
                totalDebits += lineItem.amount;
            }
            return ({
                accountId: lineItem.accountId,
                amount: lineItem.amount,
                description: lineItem.description,
                isCredit: lineItem.transactionType.isCredit
            });
        });
        if (totalDebits >= totalCredits) {
            formattedLineItems.unshift({
                accountId: fromAccountId,
                amount: totalDebits - totalCredits,
                isCredit: true,
                description: journalEntryDescription
            })
        } else {
            formattedLineItems.unshift({
                accountId: fromAccountId,
                amount: totalCredits - totalDebits,
                isCredit: false,
                description: journalEntryDescription
            })
        }
        return({
            journalEntryId: journalEntryId,
            journalEntryDate: journalEntryDate,
            description: journalEntryDescription,
            organizationId: appContext.currentOrganizationId,
            lineItems: formattedLineItems
        });  
    }
    const sendTransactionToServer = (requestBody) => {
        if (createMode) {
            axios.post(`${API_BASE_URL}/journalEntry`, requestBody).then(response => {
                console.log(response);
                fetchData(pageIndex, pageSize);
                fetchJournalEntry(response.data.journalEntryId);
                setCreateMode(false);
                setEditMode(false);
            }).catch(console.log);
        } else {
            axios.put(`${API_BASE_URL}/journalEntry/${journalEntryId}`, requestBody).then(response => {
                console.log(response);
                fetchData(pageIndex, pageSize);
                fetchJournalEntry(journalEntryId);
                setEditMode(false);
            }).catch(console.log);
        }
    }
    const fetchJournalEntry = (i) => {
        axios.get(`${API_BASE_URL}/journalEntry/${i}`).then(response => {
            let journalEntry = response.data;

            //set the selected journalentry's id, date, desc as state
            setJournalEntryId(journalEntry.journalEntryId);
            setJournalEntryDate(journalEntry.journalEntryDate);
            setJournalEntryDescription(journalEntry.description);

            let lineItems = journalEntry.lineItems.slice();
            lineItems.sort((a, b) => (a.lineItemId > b.lineItemId) ? 1 : -1) //ensure lineItems are sorted by lineItemId ascending

            //remove the first lineitem from the array, and set its account as the 'from' account
            let firstLineItem = lineItems.shift();
            setFromAccountId(firstLineItem.accountId);
            setFromAccountName(firstLineItem.accountName);
            //format line items for display
            let formattedLineItems = lineItems.map(lineItem => {
                let transactionType = transactionTypeOptions.find(transactionType => transactionType.accountTypeIds.includes(lineItem.accountTypeId));
                return ({
                    lineItemId: lineItem.lineItemId,
                    accountName: lineItem.accountName,
                    accountId: lineItem.accountId,
                    description: lineItem.description,
                    transactionType: transactionType,
                    transactionTypeName: transactionType.label,
                    amount: transactionType.isCredit == lineItem.isCredit ? lineItem.amount : lineItem.amount * -1
                });
            });
            setLineItemData(formattedLineItems);
        }).catch(console.log);
    }

    const formatCell = (cellValue, columnAccessor) => {
        switch (columnAccessor) {
            case "creditAmount":
            case "debitAmount":
            case "amount":
                if (cellValue == 0) {
                    return '';
                }
                return formatCurrency(appContext.locale, appContext.currency, cellValue)
            default:
                return (cellValue);
        }
    }

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData(pageIndex, pageSize);
        refreshAccounts();
    }, [pageIndex, pageSize, parentComponentAccountId])


    return (
        <>
            {/*loading? <div className="widget widget-rounded"><div className="d-flex justify-content-center fa-3x py-3"><i className="fas fa-circle-notch fa-spin"></i></div></div> :  this line is commented out for now since seeing a loading spinner every time you close a modal is incredibly annoying */}
            <div className="d-sm-flex justify-content-between align-items-center">
                {tableTitle}
                {hasAddEntryButton ?
                    <button type="button" className="btn btn-primary d-none d-sm-inline-block" onClick={openEditorForNewTransaction} disabled={appContext.currentPermissionTypeId < 2}>
                        {tableOfJournalEntriesText[appContext.locale]["Add a new transaction"]}
                    </button>
                : null}
            </div>
            {hasAddEntryButton ? 
                <div className="d-sm-none">
                    <button type="button" className="btn btn-primary btn-lg mt-2 btn-block" onClick={openEditorForNewTransaction} disabled={appContext.currentPermissionTypeId < 2}>
                        {tableOfJournalEntriesText[appContext.locale]["Add a new transaction"]}
                    </button>
                </div>
            : null}
            <div className="my-2">
                <div className="thead">
                    <div className="d-none d-md-flex tr bg-light border rounded">
                        {columns.map(column => {
                            return(
                                <div key={column.accessor} className={"th " + column.className}>
                                    {column.header}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="tbody">
                    {data.map((row, i) => {
                        return (
                            <Link replace to="#" className="tr d-none d-md-flex" key={i} onClick={() => expandTransaction(row.journalEntryId)}>
                                {columns.map(column => {
                                    return(
                                        <div key={column.accessor} className={"td " + column.className}>
                                            {formatCell(row[column.accessor], column.accessor)}
                                        </div>
                                    )
                                })}
                            </Link>
                        )
                    })}
                    {/**for small screens goes here. this is a bit messy, TODO refactor later */}
                    {data.map((row, i) => {
                        return(
                            <Link replace to="#" className="tr d-flex justify-content-between d-md-none align-items-center td" key={i} onClick={() => expandTransaction(row.journalEntryId)}>
                                {columns.length > 4 //TODO: this is an extreme bandaid solution to accomodate transactions.js having an account column. this should be rewritten when you get the time.
                                    ? <>
                                        <div className={"px-0 w-100 " + (category? "d-flex align-items-center justify-content-between" : "")}>
                                            <div className={category? "w-75" : ""}>
                                                <div className={"px-0 font-size-compact font-weight-600 "}>
                                                    {formatCell(row[columns[0].accessor], columns[0].accessor) + " - " + formatCell(row[columns[1].accessor], columns[1].accessor)}
                                                </div>
                                                <div className={"px-0 text-truncate"}>
                                                    {formatCell(row[columns[2].accessor], columns[2].accessor)}
                                                </div>
                                            </div>
                                            <div className={" justify-content-between pt-2 font-size-compact d-flex"}>
                                                <div>
                                                    <div className={"font-weight-600 " + (category? "d-none": "")}>
                                                            {columns[3].header}
                                                    </div>
                                                    <div className={"px-0 " + (category? "font-size-standard text-right" : "")}>
                                                        {formatCell(row[columns[3].accessor], columns[3].accessor)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={"font-weight-600 text-right " + (category? "d-none" : "")}>
                                                            {columns[4].header}
                                                    </div>
                                                    <div className={"px-0 "}>
                                                        {formatCell(row[columns[4].accessor], columns[4].accessor)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : <>
                                        <div className={"px-0 w-100 " + (category? "d-flex align-items-center justify-content-between" : "")}>
                                            <div className={category? "w-75" : ""}>
                                                <div className={"px-0 font-size-compact font-weight-600 "}>
                                                    {formatCell(row[columns[0].accessor], columns[0].accessor)}
                                                </div>
                                                <div className={"px-0 text-truncate"}>
                                                    {formatCell(row[columns[1].accessor], columns[1].accessor)}
                                                </div>
                                            </div>
                                            <div className={" justify-content-between pt-2 font-size-compact d-flex"}>
                                                <div>
                                                    <div className={"font-weight-600 " + (category? "d-none": "")}>
                                                            {columns[2].header}
                                                    </div>
                                                    <div className={"px-0 " + (category? "font-size-standard text-right" : "")}>
                                                        {formatCell(row[columns[2].accessor], columns[2].accessor)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className={"font-weight-600 text-right " + (category? "d-none" : "")}>
                                                            {columns[3].header}
                                                    </div>
                                                    <div className={"px-0 "}>
                                                        {formatCell(row[columns[3].accessor], columns[3].accessor)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </Link>
                        )
                    })} 
                </div>
                <div className="d-flex justify-content-between px-1 py-2 border-top" >
                    <div className={first ? "invisible" : " "}>
                        <Link replace onClick={previousPage} to="#">&larr; {tableOfJournalEntriesText[appContext.locale]["Newer"]}</Link>
                    </div>
                    <div className="align-self-center">
                        Showing {((pageIndex * pageSize) + 1) + "-" + ((pageIndex * pageSize) + pageLength)} of {totalElements}{' '}
                        results
                    </div>{/**TODO replace with page selector */}
                    <div className={last? " invisible" : " "}>
                        <Link onClick={nextPage} to="#">{tableOfJournalEntriesText[appContext.locale]["Older"]} &rarr;</Link>
                    </div>
                </div>
            </div>
            

            <Modal
                isOpen={transactionExpanded}
                toggle={toggleTransactionExpanded}
                onClosed={handleTransactionModalOnClose}
                size="xl"
                centered={true}
            >
                <h5 className="px-3 py-3 my-0 border-bottom d-flex justify-content-between align-items-center">
                <div>{tableOfJournalEntriesText[appContext.locale]["Transaction"]}</div>
                    {!editMode?
                        <div>
                            <button className="btn btn-white width-175" onClick={toggleTransactionEditHistoryModal}>{tableOfJournalEntriesText[appContext.locale]["View edit history"]}</button>
                        </div>
                    : null}
                </h5>
                <ModalBody>
                    {editMode ?
                        <TransactionEditMode
                            data={lineItemData}
                            journalEntryDescription={journalEntryDescription}
                            setJournalEntryDescription={setJournalEntryDescription}
                            journalEntryDate={journalEntryDate}
                            setJournalEntryDate={setJournalEntryDate}
                            fromAccountName={fromAccountName}
                            setFromAccountName={setFromAccountName}
                            fromAccountId={fromAccountId}
                            setFromAccountId={setFromAccountId}
                            transactionTypeOptions={transactionTypeOptions}
                            accountOptions={accountOptions}
                            handleSaveTransactionButton={handleSaveTransactionButton}
                            setLineItemData={setLineItemData}
                            alertMessages={alertMessages}
                        /> :
                        <TransactionViewMode
                            data={lineItemData}
                            journalEntryDescription={journalEntryDescription}
                            journalEntryDate={journalEntryDate}
                            fromAccountName={fromAccountName}
                        />
                    }
                </ModalBody>
                <ModalFooter className="justify-content-between">
                    {editMode ?
                        <>
                            <div>
                                {createMode ? null :
                                    <button
                                        className="btn btn-danger width-10ch"
                                        onClick={handleDeleteTransactionButton}>{tableOfJournalEntriesText[appContext.locale]["Delete"]}</button>}
                            </div>
                            <div>
                                <button className="btn btn-primary width-10ch"
                                    onClick={handleSaveTransactionButton}>
                                    {tableOfJournalEntriesText[appContext.locale]["Save"]}</button>
                                <button
                                    className="btn btn-white ml-2 width-10ch"
                                    onClick={handleCancelEditTransactionButton}>
                                    {tableOfJournalEntriesText[appContext.locale]["Cancel"]}</button>
                            </div>
                        </> :
                        <>
                            <div>
                                {/** empty div, pushes the other buttons to the right */}
                            </div>
                            <div>
                                <button className="btn btn-info width-10ch" onClick={handleCopyTransactionButton} disabled={appContext.currentPermissionTypeId < 2}>
                                    {tableOfJournalEntriesText[appContext.locale]["Copy"]}
                                </button>
                                <button className="btn btn-primary ml-2 width-10ch" onClick={handleEditTransactionButton} disabled={appContext.currentPermissionTypeId < 2}>
                                    {tableOfJournalEntriesText[appContext.locale]["Edit"]}
                                </button>
                                <button className="btn btn-white ml-2 width-10ch" onClick={handleCloseTransactionButton}>
                                    {tableOfJournalEntriesText[appContext.locale]["Close"]}
                                </button>
                            </div>
                        </>
                    }
                </ModalFooter>
            </Modal>
            {journalEntryId ? <TransactionEditHistory journalEntryId={journalEntryId} isOpen={transactionEditHistoryModal} toggle={toggleTransactionEditHistoryModal}/> : null}
        </>
    )
}

export default TableOfTransactions;
