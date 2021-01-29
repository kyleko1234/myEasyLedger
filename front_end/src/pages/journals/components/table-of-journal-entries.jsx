import React from 'react'
import { useTable, usePagination } from 'react-table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {API_BASE_URL} from '../../../utils/constants.js';
import JournalEntryViewMode from './journal-entry-view-mode';
import JournalEntryEditMode from './journal-entry-edit-mode';
import { PageSettings } from '../../../config/page-settings.js';
import {tableOfJournalEntriesText} from './table-of-journal-entries-text.js';

//Generates a table with react-table 7 using pagination

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function TableOfJournalEntries({
  columns,
  data,
  fetchData,
  pageCount: controlledPageCount,
  elementCount,
  tableTitle,
  hasAddEntryButton
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

  const [journalEntryExpanded, setJournalEntryExpanded] = React.useState(false); //Whether or not the modal  is shown
  const toggleJournalEntryExpanded = () => setJournalEntryExpanded(!journalEntryExpanded); //Toggles modal on or off
  const expandJournalEntry = i => { //fetches a journalEntry from the API and toggles the modal on
    fetchJournalEntry(i);
    toggleJournalEntryExpanded();
  }
  const [editMode, setEditMode] = React.useState(false); //Toggle editmode for an expanded entry
  const [createMode, setCreateMode] = React.useState(false);
  const toggleEditMode = () => setEditMode(!editMode);


  const [journalEntryId, setJournalEntryId] = React.useState(null);
  const [journalEntryDescription, setJournalEntryDescription] = React.useState('');
  const [journalEntryDate, setJournalEntryDate] = React.useState('');
  const [lineItemData, setLineItemData] = React.useState([]); //Data to be passed in to lineItemTable
  const [accountOptions, setAccountOptions] = React.useState([]);

  const [alertMessages, setAlertMessages] = React.useState([]);

  const fetchJournalEntry = i => {
    const url = `${API_BASE_URL}/journalEntry/${i}`;
    axios.get(url).then(response => {
      var journalEntry = response.data;
      var formattedLineItems = [];
      journalEntry.lineItems.forEach(lineItem => {
        var formattedLineItem = {
          lineItemId: lineItem.lineItemId,
          accountName: lineItem.accountName,
          accountId: lineItem.accountId,
          description: lineItem.description,
          debitAmount: (lineItem.isCredit ? null : lineItem.amount),
          creditAmount: (lineItem.isCredit ? lineItem.amount : null)
        };
        formattedLineItems.push(formattedLineItem);
      })
      formattedLineItems.sort((a, b) => (a.lineItemId > b.lineItemId) ? 1 : -1) //sort by LineItemId to preserve insertion order
      setLineItemData(formattedLineItems);
      setJournalEntryId(journalEntry.journalEntryId);
      setJournalEntryDescription(journalEntry.description);
      setJournalEntryDate(journalEntry.journalEntryDate);
      setAlertMessages([]); //reset alert messages every time an entry is fetched to refresh the page
    })
      .catch(console.log);
  }
  const openEditorForNewEntry = () => {
    setJournalEntryId(null);
    setJournalEntryDate('');
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
    toggleJournalEntryExpanded();
  }

  const cancelCreateMode = () => {
    setCreateMode(false);
    setAlertMessages([]);
    toggleJournalEntryExpanded();
  }

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])
  
  //initially retrieve categories and accounts from API
  React.useEffect(() => {
    axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/account`).then(response => {
      const formattedAccounts = response.data.map(account => {
        return({
          value: account.accountId,
          label: account.accountName,
          object: account
        })
      });
      setAccountOptions(formattedAccounts);
    })
      .catch(console.log);
  }, [API_BASE_URL, appContext.currentOrganization])

  //refresh lists of accounts and categories, should be called every time the 'edit' button for an entry is clicked
  const refreshAccounts = () => {
    axios.get(`${API_BASE_URL}/organization/${appContext.currentOrganization}/account`).then(response => {
      const formattedAccounts = response.data.map(account => {
        return({
          value: account.accountId,
          label: account.accountName,
          object: account
        })
      });
      setAccountOptions(formattedAccounts);
    })
      .catch(console.log);
  }

  //format table cell value based on column name and locale
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

  const checkEntryForValidationErrors = () => {
    let errorMessages = [];
    if (!journalEntryDate) {
      errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Please choose a date for this entry."]);
    }
    if (!journalEntryDescription) {
      errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Please provide a description for this entry."]);
    }

    let debitSum = 0;
    let creditSum = 0;
    let missingDescription = false;
    let missingAmount = false;
    let missingAccount = false;
    lineItemData.forEach(lineItem => { // check for missing fields within lineItems, and sum debits and credits.
      if (!lineItem.description) {
        missingDescription = true;
      }
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
    if (missingDescription) {
      errorMessages.push(tableOfJournalEntriesText[appContext.locale]["Line-items must have a description."]);
    }
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

  //Returns a POSTable/PUTable journalEntry created from this function's state POSTable entries have null journalEntryId, otherwise they should be PUT instead. 
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
      journalEntryId : journalEntryId,
      journalEntryDate: journalEntryDate,
      description: journalEntryDescription,
      personId: appContext.currentUser,
      organizationId: appContext.currentOrganization,
      lineItems: lineItems
    }
  }

  const postJournalEntry = (data) => {
    console.log(data);
    axios.post(`${API_BASE_URL}/journalEntry`, data)
      .then(response => {
        fetchData({pageIndex, pageSize});
        fetchJournalEntry(response.data.journalEntryId);
        setCreateMode(false);
        toggleEditMode();
      }).catch(console.log);
  }

  const putJournalEntry = (id, data) => {
    axios.put(`${API_BASE_URL}/journalEntry/${id}`, data)
      .then(response => {
        console.log(response);
        fetchData({pageIndex, pageSize});
        fetchJournalEntry(id);
        toggleEditMode();
      }).catch(console.log);
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
        fetchData({pageIndex, pageSize});
        toggleEditMode();
        toggleJournalEntryExpanded();
    });

  }

  // Render the UI for your table
  return (
    <>
      <div className="widget widget-rounded m-b-30">
        <div className="widget-header bg-light">
          <h4 className="widget-header-title d-flex justify-content-between ">
            <div className="align-self-center">{tableTitle}</div>
            <div>
              {hasAddEntryButton ? 
                <button className="btn btn-sm btn-primary align-self-center" onClick={() => openEditorForNewEntry()}>
                  <i className="ion ion-md-add fa-fw fa-lg"></i>{tableOfJournalEntriesText[appContext.locale]["Add an entry"]}
                </button> : null}
            </div>

          </h4>
     
        </div>
        <div className="table-responsive bg-white border-top">
          <table className="table table-hover m-b-0 text-inverse" {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th style={{width: column.width}} className={column.id == "debitAmount" || column.id == "creditAmount" ? "text-right" : ""} {...column.getHeaderProps()}>
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
                  <tr className="cursor-pointer" onClick={() => expandJournalEntry(data[i].journalEntryId)} {...row.getRowProps()}>{/* entry is represented as a clickable row that opens a modal when clicked*/}
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
                {canPreviousPage ? <Link onClick={() => previousPage()} to="/journals">&larr; {tableOfJournalEntriesText[appContext.locale]["Newer"]}</Link> : null}
              </li>
            </ul>
          </span>
          <span className="align-self-center">
            Showing {((pageIndex * page.length) + 1) + "-" + ((pageIndex + 1) * page.length)} of {elementCount}{' '}
                      results
          </span>{/**TODO replace with page selector */}
          <span>
            <ul className="pager align-self-center m-t-0 m-b-0" style={{ width: "25ch" }}>
              <li className={canNextPage ? "next" : "next disabled"}>
                {canNextPage ? <Link onClick={() => nextPage()} to="/journals">{tableOfJournalEntriesText[appContext.locale]["Older"]} &rarr;</Link> : null}
              </li> 
            </ul>
          </span>
        </div>
      </div>
      {/* Modal that opens when a row in the table is clicked */}
      <Modal
        isOpen={journalEntryExpanded}
        toggle={() => toggleJournalEntryExpanded()}
        size="lg" style={{ maxWidth: '1600px', width: '80%', margin: 'auto' }}
        backdrop={editMode ? "static" : true}
        centered={true}
      >
        <ModalHeader style={{backgroundColor: "#e4e4e4"}}>{tableOfJournalEntriesText[appContext.locale]["Journal Entry"]}</ModalHeader>
        <ModalBody className="bg-light">
          {editMode ?
            <JournalEntryEditMode
              data={lineItemData} setLineItemData={setLineItemData}
              journalEntryDate={journalEntryDate} setJournalEntryDate={setJournalEntryDate}
              journalEntryDescription={journalEntryDescription} setJournalEntryDescription={setJournalEntryDescription}
              accountOptions={accountOptions}
              alertMessages={alertMessages}>
            </JournalEntryEditMode> :
            <JournalEntryViewMode
              data={lineItemData}
              journalEntryDate={journalEntryDate}
              journalEntryDescription={journalEntryDescription}
            >
            </JournalEntryViewMode>
          }
        </ModalBody>
        <ModalFooter className="justify-content-between" style={{ backgroundColor: "#e4e4e4" }}>
          {editMode ?
            <>
              <div>
                {createMode ? null : 
                <button 
                  className="btn btn-red" 
                  style={{ width: "10ch" }}
                  onClick={() => handleDeleteJournalEntryButton(journalEntryId)}>{tableOfJournalEntriesText[appContext.locale]["Delete"]}</button>}
              </div>
              <div>
                <button className="btn btn-primary"
                  style={{ width: "10ch" }}
                  onClick={() => handleSaveJournalEntryButton()}>
                  {tableOfJournalEntriesText[appContext.locale]["Save"]}</button>
                <button
                  className="btn btn-white m-l-10"
                  style={{ width: "10ch" }}
                  onClick={() => {
                    createMode ? cancelCreateMode() : fetchJournalEntry(journalEntryId);
                    toggleEditMode();
                  }}>
                  {tableOfJournalEntriesText[appContext.locale]["Cancel"]}</button>
              </div>
            </> :
            <>
              <div>{/*empty div to push the other two buttons to the right*/}</div>
              <div>
                <button className="btn btn-primary" onClick={() => {toggleEditMode(); refreshAccounts()}} style={{ width: "10ch" }}>{tableOfJournalEntriesText[appContext.locale]["Edit"]}</button>
                <button className="btn btn-white m-l-10" onClick={() => toggleJournalEntryExpanded()} style={{ width: "10ch" }}>{tableOfJournalEntriesText[appContext.locale]["Close"]}</button>
              </div>
            </>
          }
        </ModalFooter>
      </Modal>
    </>
  )
}

export default TableOfJournalEntries

