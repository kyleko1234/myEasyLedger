import React from 'react'
import { useTable, usePagination } from 'react-table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LineItemTable from './line-item-table';
import LineItemForm from './line-item-form';

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
  organizationId,
  API_URL,
  localization
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
    state: { pageIndex, pageSize},
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

  const [journalEntryExpanded, setJournalEntryExpanded] = React.useState(false); //Whether or not the modal  is shown
  const toggleJournalEntryExpanded = () => setJournalEntryExpanded(!journalEntryExpanded); //Toggles modal on or off
  const expandJournalEntry = i => { //fetches a journalEntry from the API and toggles the modal on
    fetchJournalEntry(i);
    toggleJournalEntryExpanded();
  }
  const [editMode, setEditMode] = React.useState(false); //Toggle editmode for an expanded entry
  const toggleEditMode = () => setEditMode(!editMode);
  

  const [journalEntryId, setJournalEntryId] = React.useState(null);
  const [journalEntryDescription, setJournalEntryDescription] = React.useState('');
  const [journalEntryDate, setJournalEntryDate] = React.useState('');
  const [lineItemData, setLineItemData] = React.useState([]); //Data to be passed in to lineItemTable
  const [categories, setCategories] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  
  const fetchJournalEntry = i => {
    const url = `${API_URL}/journalEntry/${i}`;
    axios.get(url).then(response => {
        var journalEntry = response.data;
        var formattedLineItems = [];
        journalEntry.lineItems.forEach( lineItem => {
          var formattedLineItem = {
            lineItemId: lineItem.lineItemId,
            accountName: lineItem.accountName,
            accountId: lineItem.accountId,
            accountTypeId: lineItem.accountTypeId,
            description: lineItem.description,
            debitAmount: (lineItem.isCredit ? null : lineItem.amount),
            creditAmount: (lineItem.isCredit ? lineItem.amount : null),
            categoryName: lineItem.categoryName,
            categoryId: lineItem.categoryId
          };
          formattedLineItems.push(formattedLineItem);
        })
        formattedLineItems.sort((a, b) => (a.lineItemId > b.lineItemId) ? 1 : -1) //sort by LineItemId to preserve insertion order
        setLineItemData(formattedLineItems);
        setJournalEntryId(journalEntry.journalEntryId);
        setJournalEntryDescription(journalEntry.description);
        setJournalEntryDate(journalEntry.journalEntryDate);
      })
      .catch(console.log);
  }

  const fetchCategoriesAndAccounts = i => {
      axios.get(`${API_URL}/organization/${i}/category`).then(response => {
      const categories = response.data;
      setCategories(categories);
    })
    .catch(console.log);
    axios.get(`${API_URL}/organization/${i}/account`).then(response => {
      const accounts = response.data;
      setAccounts(accounts);
    })
  }

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  React.useEffect(() => {
    fetchCategoriesAndAccounts(organizationId);
  }, [organizationId])

  //format table cell value based on column name and locale
  const formatCellValue = cell => {
    let columnId = cell.column.id;
    switch (columnId) {
      case "creditAmount":
      case "debitAmount":
        return (new Intl.NumberFormat(localization.locale, { style: 'currency', currency:localization.currency }).format(cell.value));
      default: 
        return (cell.value);
    }
  }

  

  // Render the UI for your table
  return (
    <><div className="table-responsive">
      <table  className="table table-hover m-b-0 text-inverse" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
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
              <tr style={{cursor: "pointer"}} onClick={() => expandJournalEntry(data[i].journalEntryId)} {...row.getRowProps()}>{/* entry is represented as a clickable row that opens a modal when clicked*/}
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{formatCellValue(cell)}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Modal that opens when a row in the table is clicked */}
      <Modal 
        isOpen={journalEntryExpanded} 
        toggle={() => toggleJournalEntryExpanded()}
        size="lg" style={{maxWidth: '1600px', width: '80%', margin: 'auto'}}
        backdrop={editMode ? "static" : true}
      >
          <ModalHeader className="bg-dark text-white">Journal Entry</ModalHeader>
          <ModalBody className="bg-light">
            {editMode ?
              <LineItemForm 
                data={lineItemData} setLineItemData={setLineItemData}
                journalEntryDate={journalEntryDate} setJournalEntryDate={setJournalEntryDate}
                journalEntryDescription={journalEntryDescription} setJournalEntryDescription={setJournalEntryDescription}
                categories={categories} 
                accounts={accounts}
                localization={localization}>
              </LineItemForm> :
              <LineItemTable
                data={lineItemData}
                journalEntryDate={journalEntryDate}
                journalEntryDescription={journalEntryDescription}
                localization={localization}>
              </LineItemTable>
            }
          </ModalBody>
          <ModalFooter className="justify-content-between"  style={{backgroundColor: "#e4e4e4"}}>
            {editMode ? 
              <>
                <div>
                  <button className="btn btn-red" style={{width: "10ch"}}>Delete</button>
                </div>
                <div>
                  <button className="btn btn-primary" 
                    style={{width: "10ch"}} 
                    onClick={() => {
                      console.log(journalEntryId);
                      console.log(journalEntryDate);
                      console.log(journalEntryDescription);
                      console.log(lineItemData);
                  }}>
                    Print?</button>
                  <button 
                    className="btn btn-white m-l-10" 
                    style={{width: "10ch"}}
                    onClick={() => {
                      toggleEditMode();
                      fetchJournalEntry(journalEntryId);
                    }}>
                    Cancel</button>
                </div>
              </> :
                <>
                  <div></div>
                  <div>
                    <button className="btn btn-primary" onClick={() => toggleEditMode()} style={{width: "10ch"}}>Edit</button>
                    <button className="btn btn-white m-l-10" onClick={() => toggleJournalEntryExpanded()} style={{width: "10ch"}}>Close</button>
                  </div>
              </>
            }
          </ModalFooter>
      </Modal>

      </div>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
    <div className="row px-3 py-2">

                <ul className="pager m-t-0 m-b-0">
                    <li className={canPreviousPage? "previous" : "previous disabled"}>
                        {canPreviousPage? <Link onClick={() => previousPage()}>&larr; Newer</Link> : null} 
                    </li>
                </ul>
                <span className="py-2">
                    Showing {((pageIndex * page.length) + 1) + "-" + ((pageIndex + 1) * page.length)} of {elementCount}{' '}
                    results
                </span>
                <ul className="pager m-t-0 m-b-0">
                    <li className={canNextPage? "next" : "next disabled"}>
                        {canNextPage? <Link onClick={() => nextPage()}>Older &rarr;</Link> : null}
                    </li>
                </ul>
                

        {/*go to page, page size*/}
        {/*<span className="p-10">
            Go to page: {' '}
            <input className="p-10 form-control-sm"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
                }}
            /> {' '}
        </span>*/}


    </div>

    </>
  )
}

export default TableOfJournalEntries

