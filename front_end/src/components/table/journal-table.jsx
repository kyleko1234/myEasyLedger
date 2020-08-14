import React from 'react';
import { useTable } from 'react-table';

function JournalTable ({ data }) {
    const columns = React.useMemo(
        () => [ // accessor is the "key" in the data},
          { Header: 'Date', accessor: 'entryDate'},
          { Header: 'Description', accessor: 'description'},
          { Header: 'Debit', accessor: 'debitAmount'},
          { Header: 'Credit', accessor: 'creditAmount'},
        ],
        []
    )
    console.log(data);

    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance

   // Render the UI for your table
   return (
    <div className="table-responsive">
    <table className="table m-b-0 table-hover" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}

export default JournalTable