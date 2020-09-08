import React from 'react'
import { useTable, useSortBy } from 'react-table'

function LineItemTable({ data, journalEntryDescription, journalEntryDate }) {

  const columns = React.useMemo(
    () => [ // accessor is the "key" in the data},
      { Header: 'id', accessor: 'lineItemId'},
      { Header: 'Description', accessor: 'description'},
      { Header: 'Account', accessor: 'accountName'},
      { Header: 'Category', accessor: 'categoryName'},
      { Header: 'Debit', accessor: 'debitAmount'},
      { Header: 'Credit', accessor: 'creditAmount'},
    ],
    []
  )

  const initialSort = React.useMemo(
    () => [
      { id: 'lineItemId', desc: false},
    ],
    [])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: initialSort,
        hiddenColumns: ["lineItemId"]
      }
    },
    useSortBy
  )


  return (
    <>
      <div className="row m-b-10">
        <div className="col-md-1"><strong>Date</strong></div> <div className="col-md-11">{journalEntryDate}</div>
      </div>
      <div className="row m-b-10">
        <div className="col-md-1"><strong>Description</strong></div> <div className="col-md-11">{journalEntryDescription}</div>
      </div>
      <br></br>
      
      <div className="table-responsive">
      <table className="table"{...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default LineItemTable
