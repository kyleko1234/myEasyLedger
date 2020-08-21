import React from 'react'
import { useTable, useSortBy } from 'react-table'

function LineItemTable({ columns, data }) {

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
