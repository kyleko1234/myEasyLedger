import React from 'react'
import { useTable, usePagination } from 'react-table'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LineItemTable from './line-item-table';

//Generates a table with react-table 7 using pagination

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function TableOfEntries({
  columns,
  data,
  fetchData,
  pageCount: controlledPageCount,
  elementCount
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

  const [entryExpanded, setEntryExpanded] = React.useState(false); //Whether or not the modal  is shown
  const toggleEntryExpanded = () => setEntryExpanded(!entryExpanded); //Toggles modal on or off

  const API_URL = 'http://localhost:8080/v0.1';


  const [lineItemData, setLineItemData] = React.useState([]);
  const expandEntry = i => {
    fetchEntry(i);
    toggleEntryExpanded();
  }
  const [entryDescription, setEntryDescription] = React.useState();
  const [entryDate, setEntryDate] = React.useState('no');

  const fetchEntry = i => {
    const url = `${API_URL}/entry/${i}`;
    axios.get(url).then(response => {
        var entry = response.data;
        var formattedLineItems = [];
        entry.lineItems.forEach( lineItem => {
          var formattedLineItem = {
            lineItemId: lineItem.lineItemId,
            accountName: lineItem.accountName,
            description: lineItem.description,
            debitAmount: (lineItem.isCredit ? null : lineItem.amount.toFixed(2)),
            creditAmount: (lineItem.isCredit ? lineItem.amount.toFixed(2) : null),
            categoryName: lineItem.categoryName
          };
          formattedLineItems.push(formattedLineItem);
        })
        setLineItemData(formattedLineItems);
        setEntryDescription(entry.description);
        setEntryDate(entry.entryDate);
      })
      .catch(console.log);
  }

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

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
              <tr style={{cursor: "pointer"}} onClick={() => expandEntry(data[i].entryId)} {...row.getRowProps()}>{/* entry is represented as a clickable row that opens a modal when clicked*/}
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Modal that opens when a row in the table is clicked */}
      <Modal isOpen={entryExpanded} toggle={() => toggleEntryExpanded()}size="lg" style={{maxWidth: '1600px', width: '80%', margin: 'auto'}}>
          <ModalHeader toggle={() => toggleEntryExpanded()} className="bg-dark text-white">Journal Entry</ModalHeader>
          <ModalBody>
            <LineItemTable data={lineItemData} entryDate={entryDate} entryDescription={entryDescription}></LineItemTable>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary">Action</button>
            <button className="btn btn-white" onClick={() => toggleEntryExpanded()}>Close</button>
          </ModalFooter>
      </Modal>

      </div>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
    <div className="row px-3 py-2">
        {/*<span >
            <button className="btn btn-white " onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'First'}
            </button>{' '}
            <button className="btn btn-white" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'Previous'}
            </button>{' '}
            <button className="btn btn-white" onClick={() => nextPage()} disabled={!canNextPage}>
                {'Next'}
            </button>{' '}
            <button className="btn btn-white" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'Last'}
            </button>{' '}
        </span> */}
        
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
                
        

        {/* <span className="p-10" style={{textAlign: "center"}}>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
         </span> */}

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

export default TableOfEntries

