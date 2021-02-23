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


// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data

//Table of Transactions for account detailed view in personal organizations
function TableOfTransactions({
    columns,
    data,
    fetchData,
    pageCount: controlledPageCount,
    elementCount,
    tableTitle,
    hasAddEntryButton,
    parentComponentAccountId
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    )

    const appContext = React.useContext(PageSettings);
    const transactionTypeOptions = PERSONAL_TRANSACTION_TYPES(appContext.locale);

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

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


    //refresh lists of accounts and categories, should be called every time the 'edit' button for an entry is clicked
    const refreshAccounts = () => {
        axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganizationId}/account`).then(response => {
            const formattedAccounts = response.data.map(account => {
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
    //initially retrieve categories and accounts from API
    React.useEffect(() => {
        refreshAccounts();
    }, [API_BASE_URL, appContext.currentOrganizationId])



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
        fetchData({pageIndex, pageSize});
    }
    const openEditorForNewTransaction = () => {
        setFromAccountId(parentComponentAccountId);
        setJournalEntryId(null);
        let today = new Date();
        setJournalEntryDate(today.toISOString().split('T')[0]);
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
        let today = new Date();
        setJournalEntryDate(today.toISOString().split('T')[0]);
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
            newAlertMessages.push("Transaction must be assigned to an account.");
        }
        if (!journalEntryDate) {
            newAlertMessages.push("Transaction must have a date.")
        }
        if (!journalEntryDescription) {
            newAlertMessages.push("Transaction must be given a description.")
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
            newAlertMessages.push("Line-items must be assigned to an account or category.");
        }
        if (missingAmount) {
            newAlertMessages.push("Please provide an amount for each item.");
        }
        if (missingTransactionType) {
            newAlertMessages.push("Please specify a transaction type for each item.");
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
            personId: appContext.personId,
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


    const formatCellValue = cell => {
        let columnId = cell.column.id;
        switch (columnId) {
            case "creditAmount":
            case "debitAmount":
                if (cell.value == 0) {
                    return '';
                }
                return (new Intl.NumberFormat(appContext.locale, { style: 'currency', currency: appContext.currency }).format(cell.value));
            default:
                return (cell.value);
        }
    }

    return (
        <>
            <div className="widget widget-rounded m-b-30">
                <div className="widget-header bg-light">
                    <h4 className="widget-header-title d-flex justify-content-between ">
                        <div className="align-self-center">{tableTitle}</div>
                        <div>
                            {hasAddEntryButton ?
                                <button className="btn btn-sm btn-primary align-self-center" onClick={openEditorForNewTransaction}>
                                    <i className="ion ion-md-add fa-fw fa-lg"></i> Add a new transaction
                                </button> : null}
                        </div>
                    </h4>
                </div>
                <div className="table-responsive bg-white border-top">
                    <table {...getTableProps()} className="table table-hover m-b-0 text-inverse">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th style={{ width: column.width }} className={column.id == "debitAmount" || column.id == "creditAmount" ? "text-right" : ""} {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? ' 🔽'
                                                        : ' 🔼'
                                                    : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr className="cursor-pointer" onClick={() => expandTransaction(data[i].journalEntryId)} {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            return <td className={cell.column.id == "debitAmount" || cell.column.id == "creditAmount" ? "text-right" : ""} {...cell.getCellProps()}> {formatCellValue(cell)} </td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-between px-1 py-2 border-top bg-light" >
                    <span style={{ width: "25ch" }}>
                        <ul className="pager align-self-center m-t-0 m-b-0">
                            <li className={canPreviousPage ? "previous" : "previous disabled"}>
                                {canPreviousPage ? <Link onClick={() => previousPage()} to="#">&larr; {tableOfJournalEntriesText[appContext.locale]["Newer"]}</Link> : null}
                            </li>
                        </ul>
                    </span>
                    <span className="align-self-center">
                        Showing {((pageIndex * pageSize) + 1) + "-" + ((pageIndex * pageSize) + page.length)} of {elementCount}{' '}
                        results
                    </span>{/**TODO replace with page selector */}
                    <span>
                        <ul className="pager align-self-center m-t-0 m-b-0" style={{ width: "25ch" }}>
                            <li className={canNextPage ? "next" : "next disabled"}>
                                {canNextPage ? <Link onClick={() => nextPage()} to="#">{tableOfJournalEntriesText[appContext.locale]["Older"]} &rarr;</Link> : null}
                            </li>
                        </ul>
                    </span>
                </div>
            </div>

            <Modal
                isOpen={transactionExpanded}
                toggle={toggleTransactionExpanded}
                onClosed={handleTransactionModalOnClose}
                size="lg" style={{ maxWidth: '1600px', width: '80%', margin: 'auto' }}
                centered={true}
            >
                <ModalHeader style={{ backgroundColor: "#e4e4e4" }}>
                    Transaction
                </ModalHeader>
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
                <ModalFooter style={{ backgroundColor: "#e4e4e4" }} className="justify-content-between">
                    {editMode ?
                        <>
                            <div>
                                {createMode ? null :
                                    <button
                                        className="btn btn-red width-10ch"
                                        onClick={handleDeleteTransactionButton}>{tableOfJournalEntriesText[appContext.locale]["Delete"]}</button>}
                            </div>
                            <div>
                                <button className="btn btn-primary width-10ch"
                                    onClick={handleSaveTransactionButton}>
                                    {tableOfJournalEntriesText[appContext.locale]["Save"]}</button>
                                <button
                                    className="btn btn-white m-l-10 width-10ch"
                                    onClick={handleCancelEditTransactionButton}>
                                    {tableOfJournalEntriesText[appContext.locale]["Cancel"]}</button>
                            </div>
                        </> :
                        <>
                            <div>{/*empty div to push the other two buttons to the right*/}</div>
                            <div>
                                <button className="btn btn-info width-10ch" onClick={handleCopyTransactionButton}>{tableOfJournalEntriesText[appContext.locale]["Copy"]}</button>
                                <button className="btn btn-primary m-l-10 width-10ch" onClick={handleEditTransactionButton}>{tableOfJournalEntriesText[appContext.locale]["Edit"]}</button>
                                <button className="btn btn-white m-l-10 width-10ch" onClick={handleCloseTransactionButton}>{tableOfJournalEntriesText[appContext.locale]["Close"]}</button>
                            </div>
                        </>
                    }
                </ModalFooter>
            </Modal>
        </>
    )
}

export default TableOfTransactions;
