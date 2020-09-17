import React from 'react'
import { useTable } from 'react-table'

function LineItemTable({ data, journalEntryDescription, journalEntryDate, localization}) {

  const columns = React.useMemo(
    () => [ // accessor is the "key" in the data},
      { Header: 'Description', accessor: 'description', width:'40%'},
      { Header: 'Account', accessor: 'accountName', width:'20%'},
      { Header: 'Category', accessor: 'categoryName', width:'20%'},
      { Header: 'Debit', accessor: 'debitAmount', width:'10%'},
      { Header: 'Credit', accessor: 'creditAmount', width:'10%'},
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data
    }
  )

  const sumAmountsInColumn = columnName => {
    let sum = 0;
    data.forEach(row => {
        sum += row[columnName];
    });
    if (isNaN(sum)) {
        return 0
    } else {
        return sum;
    }
  }

  const formatCell = cell => {
    let columnId = cell.column.id;
    switch (columnId) {
      case "debitAmount":
      case "creditAmount":
        if (cell.value) {
          return (new Intl.NumberFormat(localization.locale, { style: 'currency', currency:localization.currency }).format(cell.value));
        } else {
          return null;
        }
      default:
        return cell.value;
    }
  }

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
                <th {...column.getHeaderProps()} style={{width: column.width}}>
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
                      <td {...cell.getCellProps()}>{formatCell(cell)}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total</strong></td>
            <td></td>
            <td></td>
            <td><strong>{new Intl.NumberFormat(localization.locale, { style: 'currency', currency:localization.currency }).format(sumAmountsInColumn("debitAmount"))}</strong></td>
            <td><strong>{new Intl.NumberFormat(localization.locale, { style: 'currency', currency:localization.currency }).format(sumAmountsInColumn("creditAmount"))}</strong></td>
          </tr>
        </tfoot>
      </table>
      </div>
    </>
  )
}

export default LineItemTable
